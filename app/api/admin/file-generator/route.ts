
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.AI_GATEWAY_API_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

    const authorization = request.headers.get('authorization')

    if (!apiKey) {
      return NextResponse.json(
        { error: 'إعداد AI_GATEWAY_API_KEY غير مكتمل في Vercel.' },
        { status: 503 }
      )
    }

    if (
      !supabaseUrl ||
      !supabaseKey ||
      !authorization?.startsWith('Bearer ')
    ) {
      return NextResponse.json(
        { error: 'يرجى تسجيل الدخول أولًا.' },
        { status: 401 }
      )
    }

    const token = authorization.slice(7)

    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

    const { data: userData, error: userError } =
      await supabase.auth.getUser(token)

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: 'انتهت جلسة الدخول. سجّل الدخول مجددًا.' },
        { status: 401 }
      )
    }

    const { data: isAdmin, error: adminError } =
      await supabase.rpc('is_hadeel_admin')

    if (adminError || isAdmin !== true) {
      return NextResponse.json(
        { error: 'مولّد الملفات مخصص لمدير منصة هديل.' },
        { status: 403 }
      )
    }

    const body = await request.json()

    const prompt =
      typeof body.prompt === 'string' ? body.prompt.trim() : ''

    const documentType =
      typeof body.documentType === 'string'
        ? body.documentType
        : 'research'

    const university =
      typeof body.university === 'string'
        ? body.university.trim().slice(0, 180)
        : ''

    const requirements =
      typeof body.requirements === 'string'
        ? body.requirements.trim().slice(0, 6000)
        : ''

    const sourceText =
      typeof body.sourceText === 'string'
        ? body.sourceText.slice(0, 18000)
        : ''

    const settings =
      body.settings && typeof body.settings === 'object'
        ? body.settings
        : {}

    if (!prompt || prompt.length > 30000) {
      return NextResponse.json(
        { error: 'اكتب المطلوب بحد أقصى 30 ألف حرف.' },
        { status: 400 }
      )
    }

    const allowedTypes = [
      'research',
      'assignment',
      'presentation',
      'spreadsheet',
      'report',
      'plan',
    ]

    if (!allowedTypes.includes(documentType)) {
      return NextResponse.json(
        { error: 'نوع الملف غير مدعوم.' },
        { status: 400 }
      )
    }

    const types: Record<string, string> = {
      research: 'بحث علمي أو تقرير أكاديمي',
      assignment: 'تكليف جامعي',
      presentation: 'عرض تقديمي مقسم إلى شرائح',
      spreadsheet: 'جدول عمل وتحليل بيانات',
      report: 'تقرير مهني أو إداري',
      plan: 'خطة أو مشروع',
    }

    const systemPrompt = `
أنت مساعد إعداد محتوى أكاديمي ومهني باللغة العربية لصاحب منصة هديل.

نوع العمل: ${types[documentType]}.

التزم بما يلي:
- اكتب بالعربية الفصحى وبأسلوب منظم.
- استخدم Markdown للعناوين والقوائم والجداول.
- لا تختلق مراجع أو أسماء مؤلفين أو روابط.
- ضع [يحتاج إلى التحقق من المرجع] عند الحاجة إلى مرجع غير متحقق منه.
- لا تخترع نتائج بحث أو بيانات إحصائية حقيقية.
- إذا لم تتوفر بيانات فعلية للتحليل، وضح ذلك.
- في العروض، قسّم المحتوى إلى شرائح مرقمة.
- في الجداول، استخدم جداول واضحة ومنظمة.
- لا تدّع أن العمل نُفذ لعميل حقيقي إذا لم يحدث ذلك.
- أخرج المحتوى النهائي فقط.
`

    const userPrompt = [
      `المطلوب:\n${prompt}`,
      university ? `الجامعة:\n${university}` : '',
      requirements ? `المتطلبات:\n${requirements}` : '',
      sourceText ? `محتوى الملف المرفق:\n${sourceText}` : '',
      `إعدادات التنسيق:\n${JSON.stringify(settings)}`,
    ]
      .filter(Boolean)
      .join('\n\n')

    const response = await fetch(
      'https://ai-gateway.vercel.sh/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model:
            process.env.HADEEL_AI_MODEL ||
            'openai/gpt-4.1-mini',
          temperature: 0.35,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        }),
        signal: AbortSignal.timeout(55000),
      }
    )

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error(
        'AI Gateway error:',
        response.status,
        detail.slice(0, 400)
      )

      return NextResponse.json(
        { error: 'تعذر التوليد. تحقق من إعدادات AI Gateway وحاول مجددًا.' },
        { status: 502 }
      )
    }

    const result = await response.json()
    const content = result?.choices?.[0]?.message?.content

    if (typeof content !== 'string' || !content.trim()) {
      return NextResponse.json(
        { error: 'لم يرجع الذكاء الاصطناعي محتوى صالحًا.' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      content: content.trim(),
      model: result?.model || 'AI Gateway',
    })
  } catch (error) {
    console.error('Hadeel file generator error:', error)

    return NextResponse.json(
      {
        error:
          error instanceof Error && error.name === 'TimeoutError'
            ? 'استغرق التوليد وقتًا طويلًا. حاول بمحتوى أقصر.'
            : 'حدث خطأ أثناء إنشاء المحتوى.',
      },
      { status: 500 }
    )
  }
}
