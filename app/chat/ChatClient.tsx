'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  LoaderCircle,
  MessageCircle,
  Send,
  ShieldCheck,
} from 'lucide-react'
import type { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import styles from './chat.module.css'

type ChatMessage = {
  id: string
  conversation_id: string
  sender_role: 'visitor' | 'admin'
  body: string
  read_at: string | null
  created_at: string
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('ar', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

export default function ChatClient() {
  const router = useRouter()

  const [conversationId, setConversationId] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [notificationPermission, setNotificationPermission] =
    useState('default')

  const bottomRef = useRef<HTMLDivElement>(null)
  const channelRef = useRef<RealtimeChannel | null>(null)

  // تحميل الرسائل وتحديد ردود المدير التي قرأها الطالب.
  const loadMessages = useCallback(async (id: string) => {
    const { data, error: queryError } = await supabase
      .from('chat_messages')
      .select(
        'id, conversation_id, sender_role, body, read_at, created_at'
      )
      .eq('conversation_id', id)
      .order('created_at', { ascending: true })

    if (queryError) throw queryError

    const loadedMessages = (data ?? []) as ChatMessage[]

    // ردود المدير التي لم يسبق تسجيل قراءتها.
    const unreadAdminMessages = loadedMessages.filter(
      (message) =>
        message.sender_role === 'admin' &&
        message.read_at === null
    )

    let updatedReadTimes: Record<string, string> = {}

    if (unreadAdminMessages.length > 0) {
      const messageIds = unreadAdminMessages.map(
        (message) => message.id
      )

      const readAt = new Date().toISOString()

      const { data: updatedMessages, error: updateError } =
        await supabase
          .from('chat_messages')
          .update({ read_at: readAt })
          .in('id', messageIds)
          .eq('conversation_id', id)
          .eq('sender_role', 'admin')
          .is('read_at', null)
          .select('id, read_at')

      // لا نمنع ظهور المحادثة إذا تعذر تحديث حالة القراءة.
      if (updateError) {
        console.error(
          'تعذر تحديث حالة قراءة ردود المدير:',
          updateError.message
        )
      } else {
        updatedReadTimes = Object.fromEntries(
          (updatedMessages ?? []).map((message) => [
            message.id,
            message.read_at,
          ])
        )
      }
    }

    // تحديث حالة الرسائل محليًا بالنتائج المؤكدة من قاعدة البيانات.
    const finalMessages = loadedMessages.map((message) => {
      const confirmedReadAt = updatedReadTimes[message.id]

      return confirmedReadAt
        ? { ...message, read_at: confirmedReadAt }
        : message
    })

    setMessages(finalMessages)
  }, [])

  useEffect(() => {
    let active = true

    async function startChat() {
      setLoading(true)
      setError('')

      try {
        const {
          data: authData,
          error: authError,
        } = await supabase.auth.getUser()

        if (authError) throw authError

        const user = authData.user

        // لا نسمح للمستخدم غير المسجل أو المجهول بالمحادثة.
        if (!user || user.is_anonymous) {
          router.replace('/auth/login?next=%2Fchat')
          return
        }

        // نبحث عن محادثة الحساب الحالي فقط.
        const { data: existing, error: findError } = await supabase
          .from('chat_conversations')
          .select('id')
          .eq('visitor_id', user.id)
          .maybeSingle()

        if (findError) throw findError

        let id = existing?.id as string | undefined

        // إنشاء محادثة إذا لم تكن موجودة.
        if (!id) {
          const { data: created, error: createError } =
            await supabase
              .from('chat_conversations')
              .insert({ visitor_id: user.id })
              .select('id')
              .single()

          if (createError) {
            // إعادة البحث إذا أنشأ الحساب محادثة في تبويب آخر.
            const { data: retry } = await supabase
              .from('chat_conversations')
              .select('id')
              .eq('visitor_id', user.id)
              .maybeSingle()

            if (!retry?.id) throw createError

            id = retry.id
          } else {
            id = created.id
          }
        }

        if (!active || !id) return

        setConversationId(id)
        await loadMessages(id)
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'تعذر فتح المحادثة. حاول مرة أخرى.'
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    if (
      typeof window !== 'undefined' &&
      'Notification' in window
    ) {
      setNotificationPermission(Notification.permission)
    }

    void startChat()

    return () => {
      active = false

      if (channelRef.current) {
        void supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [loadMessages, router])

  // تحديث الرسائل لحظيًا عند وصول رسالة أو تغيير حالة قراءتها.
  useEffect(() => {
    if (!conversationId) return

    const channel = supabase
      .channel(`student-chat-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const incoming = payload.new as ChatMessage

            setMessages((current) =>
              current.some((message) => message.id === incoming.id)
                ? current
                : [...current, incoming].sort(
                    (a, b) =>
                      new Date(a.created_at).getTime() -
                      new Date(b.created_at).getTime()
                  )
            )

            if (
              incoming.sender_role === 'admin' &&
              typeof window !== 'undefined' &&
              'Notification' in window &&
              Notification.permission === 'granted' &&
              document.visibilityState !== 'visible'
            ) {
              new Notification('رسالة جديدة من منصة هديل', {
                body: incoming.body,
                tag: incoming.id,
              })
            }
          }

          if (payload.eventType === 'UPDATE') {
            const updated = payload.new as ChatMessage

            setMessages((current) =>
              current.map((message) =>
                message.id === updated.id ? updated : message
              )
            )
          }
        }
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      void supabase.removeChannel(channel)

      if (channelRef.current === channel) {
        channelRef.current = null
      }
    }
  }, [conversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages])

  async function enableNotifications() {
    if (!('Notification' in window)) {
      setNotice('متصفحك لا يدعم إشعارات الويب.')
      return
    }

    const permission = await Notification.requestPermission()
    setNotificationPermission(permission)

    setNotice(
      permission === 'granted'
        ? 'تم تفعيل إشعارات الردود عند دعم المتصفح لها.'
        : 'لم يتم السماح بالإشعارات. يمكنك تفعيلها من إعدادات المتصفح.'
    )
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const body = draft.trim()

    if (!body || !conversationId || sending) return

    setSending(true)
    setError('')

    try {
      const { data, error: sendError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          sender_role: 'visitor',
          body,
        })
        .select(
          'id, conversation_id, sender_role, body, read_at, created_at'
        )
        .single()

      if (sendError) throw sendError

      setMessages((current) =>
        current.some((message) => message.id === data.id)
          ? current
          : [...current, data as ChatMessage]
      )

      setDraft('')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر إرسال الرسالة. تحقق من اتصالك وحاول مرة أخرى.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <main className={styles.page} dir="rtl">
      <section
        className={styles.chatCard}
        aria-label="المحادثة المباشرة"
      >
        <header className={styles.header}>
          <div className={styles.brandIcon}>
            <MessageCircle size={27} />
          </div>

          <div className={styles.headerText}>
            <span className={styles.eyebrow}>تواصل مباشر</span>
            <h1>محادثة منصة هديل</h1>
            <p>نسعد بمساعدتك، اكتب رسالتك مباشرة.</p>
          </div>

          <span
            className={styles.onlineDot}
            title="المحادثة متاحة"
          />
        </header>

        <div className={styles.securityNote}>
          <ShieldCheck size={17} />
          <span>محادثتك خاصة بحسابك المسجّل.</span>
        </div>

        <div className={styles.toolbar}>
          <span>
            <BellRing size={16} />
            تنبيهات الردود
          </span>

          <button
            type="button"
            onClick={enableNotifications}
            disabled={notificationPermission === 'granted'}
          >
            <Bell size={15} />
            {notificationPermission === 'granted'
              ? 'الإشعارات مفعّلة'
              : 'تفعيل الإشعارات'}
          </button>
        </div>

        <section
          className={styles.messages}
          aria-live="polite"
          aria-label="الرسائل"
        >
          <div className={styles.welcome}>
            <span className={styles.welcomeIcon}>
              <MessageCircle size={22} />
            </span>
            <strong>أهلًا بك في منصة هديل 🌟</strong>
            <p>اكتب استفسارك، وسنرد عليك هنا.</p>
          </div>

          {loading && (
            <div className={styles.loading}>
              <LoaderCircle size={19} />
              جارٍ تجهيز المحادثة...
            </div>
          )}

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          {!loading &&
            messages.map((message) => {
              const mine = message.sender_role === 'visitor'

              return (
                <div
                  key={message.id}
                  className={`${styles.messageRow} ${
                    mine ? styles.mineRow : styles.theirsRow
                  }`}
                >
                  <article
                    className={`${styles.bubble} ${
                      mine ? styles.mine : styles.theirs
                    }`}
                  >
                    <p>{message.body}</p>

                    <footer>
                      <time>{formatTime(message.created_at)}</time>

                      {mine &&
                        (message.read_at ? (
                          <CheckCheck
                            size={16}
                            className={styles.readChecks}
                            aria-label="تمت قراءة الرسالة"
                          />
                        ) : (
                          <Check
                            size={15}
                            className={styles.singleCheck}
                            aria-label="تم إرسال الرسالة"
                          />
                        ))}
                    </footer>
                  </article>
                </div>
              )
            })}

          <div ref={bottomRef} />
        </section>

        {notice && (
          <p className={styles.notice} role="status">
            {notice}
          </p>
        )}

        <form className={styles.composer} onSubmit={sendMessage}>
          <label className={styles.srOnly} htmlFor="chat-message">
            اكتب رسالتك
          </label>

          <textarea
            id="chat-message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="اكتب رسالتك هنا..."
            rows={1}
            maxLength={4000}
            disabled={loading || !conversationId || sending}
          />

          <button
            type="submit"
            disabled={
              loading ||
              !conversationId ||
              !draft.trim() ||
              sending
            }
            aria-label="إرسال الرسالة"
            title="إرسال الرسالة"
          >
            {sending ? (
              <LoaderCircle className={styles.spin} size={20} />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>

        <p className={styles.footerNote}>
          المحادثة محفوظة في حسابك.{' '}
          <Link href="/">العودة إلى منصة هديل</Link>
        </p>
      </section>
    </main>
  )
}