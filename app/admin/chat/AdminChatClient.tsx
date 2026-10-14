
'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Bell,
  BellRing,
  Check,
  CheckCheck,
  LoaderCircle,
  LogOut,
  MessageCircle,
  RefreshCw,
  Send,
  ShieldCheck,
} from 'lucide-react'
import type { RealtimeChannel } from '@supabase/supabase-js'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import styles from './admin-chat.module.css'

type Conversation = {
  id: string
  visitor_id: string
  last_message_preview: string | null
  last_message_at: string
  created_at: string
  unread_count?: number
}

type ChatMessage = {
  id: string
  conversation_id: string
  sender_role: 'visitor' | 'admin'
  body: string
  read_at: string | null
  created_at: string
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ar', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('ar', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

export default function AdminChatClient() {
  const router = useRouter()

  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [permission, setPermission] = useState('default')

  const listChannel = useRef<RealtimeChannel | null>(null)
  const selectedChannel = useRef<RealtimeChannel | null>(null)
  const selectedRef = useRef('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const loadConversations = useCallback(async () => {
    const { data: rows, error: listError } = await supabase
      .from('chat_conversations')
      .select(
        'id, visitor_id, last_message_preview, last_message_at, created_at'
      )
      .order('last_message_at', { ascending: false })

    if (listError) throw listError

    const { data: unreadRows, error: unreadError } = await supabase
      .from('chat_messages')
      .select('conversation_id')
      .eq('sender_role', 'visitor')
      .is('read_at', null)

    if (unreadError) throw unreadError

    const unreadMap = new Map<string, number>()

    for (const row of unreadRows ?? []) {
      unreadMap.set(
        row.conversation_id,
        (unreadMap.get(row.conversation_id) ?? 0) + 1
      )
    }

    const next = ((rows ?? []) as Conversation[]).map((row) => ({
      ...row,
      unread_count: unreadMap.get(row.id) ?? 0,
    }))

    setConversations(next)
    return next
  }, [])

  const loadMessages = useCallback(async (id: string) => {
    const { data, error: messagesError } = await supabase
      .from('chat_messages')
      .select(
        'id, conversation_id, sender_role, body, read_at, created_at'
      )
      .eq('conversation_id', id)
      .order('created_at', { ascending: true })

    if (messagesError) throw messagesError

    setMessages((data ?? []) as ChatMessage[])

    // فتح المحادثة يعني قراءة رسائل الطالب غير المقروءة.
    const readTime = new Date().toISOString()

    const { error: readError } = await supabase
      .from('chat_messages')
      .update({ read_at: readTime })
      .eq('conversation_id', id)
      .eq('sender_role', 'visitor')
      .is('read_at', null)

    if (readError) throw readError

    setMessages((current) =>
      current.map((message) =>
        message.sender_role === 'visitor' && !message.read_at
          ? { ...message, read_at: readTime }
          : message
      )
    )
  }, [])

  const initialize = useCallback(async () => {
    setError('')

    try {
      const {
        data: authData,
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !authData.user || authData.user.is_anonymous) {
        router.replace('/auth/login?next=%2Fadmin%2Fchat')
        return
      }

      const {
        data: isAdmin,
        error: adminError,
      } = await supabase.rpc('is_hadeel_admin')

      if (adminError) throw adminError

      if (isAdmin !== true) {
        setAuthorized(false)
        setError('هذا القسم مخصص لإدارة منصة هديل فقط.')
        return
      }

      setAuthorized(true)

      const next = await loadConversations()

      if (next.length > 0) {
        const firstId = next[0].id
        setSelectedId(firstId)
        selectedRef.current = firstId
        await loadMessages(firstId)
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر تحميل لوحة المحادثات.'
      )
    } finally {
      setLoading(false)
    }
  }, [loadConversations, loadMessages, router])

  useEffect(() => {
    void initialize()

    return () => {
      if (listChannel.current) {
        void supabase.removeChannel(listChannel.current)
        listChannel.current = null
      }

      if (selectedChannel.current) {
        void supabase.removeChannel(selectedChannel.current)
        selectedChannel.current = null
      }
    }
  }, [initialize])

  // تحديث قائمة المحادثات عند وصول رسائل جديدة.
  useEffect(() => {
    if (!authorized) return

    const channel = supabase
      .channel('admin-chat-conversation-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
        },
        async (payload) => {
          try {
            const incoming = payload.new as Partial<ChatMessage>

            if (
              payload.eventType === 'INSERT' &&
              incoming.sender_role === 'visitor' &&
              typeof window !== 'undefined' &&
              'Notification' in window &&
              Notification.permission === 'granted' &&
              document.visibilityState !== 'visible'
            ) {
              new Notification('رسالة جديدة في منصة هديل', {
                body: incoming.body ?? 'وصلت رسالة جديدة.',
                tag: incoming.id,
              })
            }

            await loadConversations()

            const currentId = selectedRef.current

            if (
              currentId &&
              incoming.conversation_id === currentId
            ) {
              await loadMessages(currentId)
            }
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : 'تعذر تحديث المحادثات.'
            )
          }
        }
      )
      .subscribe()

    listChannel.current = channel

    return () => {
      void supabase.removeChannel(channel)

      if (listChannel.current === channel) {
        listChannel.current = null
      }
    }
  }, [authorized, loadConversations, loadMessages])

  // الاشتراك في الرسائل الخاصة بالمحادثة المفتوحة.
  useEffect(() => {
    if (!authorized || !selectedId) return

    const channel = supabase
      .channel(`admin-chat-${selectedId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${selectedId}`,
        },
        async () => {
          try {
            await loadMessages(selectedId)
            await loadConversations()
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : 'تعذر تحديث الرسائل.'
            )
          }
        }
      )
      .subscribe()

    selectedChannel.current = channel

    return () => {
      void supabase.removeChannel(channel)

      if (selectedChannel.current === channel) {
        selectedChannel.current = null
      }
    }
  }, [authorized, selectedId, loadMessages, loadConversations])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [messages])

  async function chooseConversation(id: string) {
    setSelectedId(id)
    selectedRef.current = id
    setMessages([])
    setError('')

    try {
      await loadMessages(id)
      await loadConversations()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر فتح هذه المحادثة.'
      )
    }
  }

  async function refreshConversations() {
    setError('')

    try {
      const next = await loadConversations()

      if (selectedRef.current) {
        await loadMessages(selectedRef.current)
      } else if (next.length > 0) {
        await chooseConversation(next[0].id)
      }

      setNotice('تم تحديث المحادثات.')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر تحديث المحادثات.'
      )
    }
  }

  async function enableNotifications() {
    if (!('Notification' in window)) {
      setNotice('متصفحك لا يدعم إشعارات الويب.')
      return
    }

    const result = await Notification.requestPermission()
    setPermission(result)

    setNotice(
      result === 'granted'
        ? 'تم السماح بالإشعارات عندما تكون اللوحة مفتوحة في المتصفح.'
        : 'لم يتم السماح بالإشعارات. تحقق من إعدادات المتصفح.'
    )
  }

  async function sendReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const body = draft.trim()

    if (!body || !selectedId || sending) return

    setSending(true)
    setError('')

    try {
      const { error: sendError } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: selectedId,
          sender_role: 'admin',
          body,
        })

      if (sendError) throw sendError

      setDraft('')
      await loadMessages(selectedId)
      await loadConversations()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر إرسال الرد. حاول مرة أخرى.'
      )
    } finally {
      setSending(false)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    router.replace('/auth/login')
    router.refresh()
  }

  if (loading) {
    return (
      <main className={styles.page} dir="rtl">
        <div className={styles.state}>
          <LoaderCircle className={styles.spin} size={28} />
          <p>جارٍ التحقق من الصلاحيات وتحميل المحادثات...</p>
        </div>
      </main>
    )
  }

  if (!authorized) {
    return (
      <main className={styles.page} dir="rtl">
        <div className={styles.state}>
          <ShieldCheck size={34} />
          <strong>لوحة الإدارة</strong>
          <p role="alert">
            {error || 'ليس لديك صلاحية الدخول إلى هذه الصفحة.'}
          </p>
          <Link href="/account">العودة إلى حسابي</Link>
          <Link href="/">العودة إلى الصفحة الرئيسية</Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page} dir="rtl">
      <header className={styles.pageHeader}>
        <div className={styles.headingIcon}>
          <MessageCircle size={25} />
        </div>

        <div className={styles.headingText}>
          <span className={styles.eyebrow}>إدارة منصة هديل</span>
          <h1>محادثات الطلاب</h1>
          <p>تابع الرسائل الواردة وردّ على استفسارات الطلاب.</p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={enableNotifications}
            disabled={permission === 'granted'}
          >
            <Bell size={16} />
            {permission === 'granted'
              ? 'الإشعارات مفعّلة'
              : 'تفعيل الإشعارات'}
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => void refreshConversations()}
          >
            <RefreshCw size={16} />
            تحديث
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => void logout()}
          >
            <LogOut size={16} />
            خروج
          </button>
        </div>
      </header>

      {error && (
        <div className={styles.alert} role="alert">
          {error}
        </div>
      )}

      {notice && (
        <div className={styles.notice} role="status">
          {notice}
        </div>
      )}

      <section className={styles.inbox}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div>
              <h2>الوارد</h2>
              <p>{conversations.length} محادثة</p>
            </div>
            <BellRing size={20} />
          </div>

          {conversations.length === 0 ? (
            <div className={styles.emptyList}>
              <MessageCircle size={27} />
              <strong>لا توجد محادثات بعد</strong>
              <p>ستظهر هنا محادثات الطلاب المسجلين.</p>
            </div>
          ) : (
            <div className={styles.conversationList}>
              {conversations.map((conversation) => {
                const selected = conversation.id === selectedId

                return (
                  <button
                    key={conversation.id}
                    type="button"
                    onClick={() => void chooseConversation(conversation.id)}
                    className={`${styles.conversationItem} ${
                      selected ? styles.conversationSelected : ''
                    }`}
                  >
                    <span className={styles.avatar}>
                      <MessageCircle size={19} />
                    </span>

                    <span className={styles.conversationInfo}>
                      <strong>طالب من منصة هديل</strong>
                      <span className={styles.preview}>
                        {conversation.last_message_preview ||
                          'ابدأ المحادثة بالرد على الطالب'}
                      </span>
                      <small>
                        {formatDate(
                          conversation.last_message_at ||
                            conversation.created_at
                        )}
                      </small>
                    </span>

                    {(conversation.unread_count ?? 0) > 0 && (
                      <span className={styles.unreadBadge}>
                        {conversation.unread_count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </aside>

        <section className={styles.thread}>
          {!selectedId ? (
            <div className={styles.noSelection}>
              <span>
                <MessageCircle size={30} />
              </span>
              <h2>اختر محادثة</h2>
              <p>
                اختر محادثة من القائمة لعرض الرسائل والرد على الطالب.
              </p>
            </div>
          ) : (
            <>
              <header className={styles.threadHeader}>
                <Link href="/" className={styles.backLink}>
                  <ArrowRight size={16} />
                  الرئيسية
                </Link>

                <span className={styles.threadAvatar}>
                  <MessageCircle size={21} />
                </span>

                <div>
                  <strong>محادثة طالب</strong>
                  <small>معرّف المحادثة: {selectedId.slice(0, 8)}</small>
                </div>

                <span className={styles.secureLabel}>
                  <ShieldCheck size={15} />
                  محادثة خاصة
                </span>
              </header>

              <div className={styles.threadMessages} aria-live="polite">
                {messages.length === 0 ? (
                  <div className={styles.emptyThread}>
                    <MessageCircle size={24} />
                    <p>لا توجد رسائل في هذه المحادثة حتى الآن.</p>
                  </div>
                ) : (
                  messages.map((message) => {
                    const mine = message.sender_role === 'admin'

                    return (
                      <div
                        key={message.id}
                        className={`${styles.messageRow} ${
                          mine ? styles.adminRow : styles.visitorRow
                        }`}
                      >
                        <article
                          className={`${styles.bubble} ${
                            mine
                              ? styles.adminBubble
                              : styles.visitorBubble
                          }`}
                        >
                          <p>{message.body}</p>

                          <footer>
                            <time>{formatTime(message.created_at)}</time>

                            {mine &&
                              (message.read_at ? (
                                <CheckCheck
                                  size={15}
                                  className={styles.checkRead}
                                  aria-label="قرأ الطالب الرد"
                                />
                              ) : (
                                <Check
                                  size={14}
                                  className={styles.checkSent}
                                  aria-label="تم إرسال الرد"
                                />
                              ))}
                          </footer>
                        </article>
                      </div>
                    )
                  })
                )}

                <div ref={bottomRef} />
              </div>

              <form className={styles.composer} onSubmit={sendReply}>
                <label className={styles.srOnly} htmlFor="admin-reply">
                  اكتب الرد
                </label>

                <textarea
                  id="admin-reply"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="اكتب ردك للطالب..."
                  rows={1}
                  maxLength={4000}
                  disabled={sending}
                />

                <button
                  type="submit"
                  disabled={!draft.trim() || sending}
                  aria-label="إرسال الرد"
                  title="إرسال الرد"
                >
                  {sending ? (
                    <LoaderCircle className={styles.spin} size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </form>
            </>
          )}
        </section>
      </section>

      <p className={styles.pageFoot}>
        <Link href="/">العودة إلى منصة هديل</Link>
      </p>
    </main>
  )
}
