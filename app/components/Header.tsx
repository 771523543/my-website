'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowLeft,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  X,
} from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const pathname = usePathname()
  const router = useRouter()

  const isServicesPage = pathname.startsWith('/services')

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setSearchValue('')
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const query = searchValue.trim()

    if (!query) {
      return
    }

    closeMenu()
    setSearchOpen(false)

    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const homeLink = isServicesPage ? '/' : '#top'

  return (
    <>
      <div className="announcement">
        <Sparkles size={15} />
        خصم خاص على خدمات منصة هديل لفترة محدودة
        <ArrowLeft size={15} />
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a
            className="brand"
            href={homeLink}
            onClick={closeMenu}
          >
            <Image
              className="brand-logo"
              src="/hadeel-platform-logo.png"
              alt="شعار منصة هديل للخدمات الطلابية"
              width={54}
              height={54}
              priority
            />

            <span>
              منصة هديل
              <span className="brand-dot">.</span>
            </span>
          </a>

          <nav
            className={
              menuOpen
                ? 'nav-links mobile-open'
                : 'nav-links'
            }
          >
            <a
              href={homeLink}
              onClick={closeMenu}
            >
              الرئيسية
            </a>

            <a
              href={isServicesPage ? '/#story' : '#story'}
              onClick={closeMenu}
            >
              قصتنا
            </a>

            <a
              href={isServicesPage ? '/#services' : '#services'}
              onClick={closeMenu}
            >
              خدماتنا
            </a>

            <a
              href={
                isServicesPage
                  ? '/#gpa-calculator'
                  : '#gpa-calculator'
              }
              onClick={closeMenu}
            >
              حاسبة المعدل
            </a>

            <a
              href={
                isServicesPage
                  ? '/#testimonials'
                  : '#testimonials'
              }
              onClick={closeMenu}
            >
              آراء العملاء
            </a>

            <a
              href={
                isServicesPage
                  ? '/#faq'
                  : '#faq'
              }
              onClick={closeMenu}
            >
              الأسئلة الشائعة
            </a>

            <a
              href={
                isServicesPage
                  ? '/#contact'
                  : '#contact'
              }
              onClick={closeMenu}
            >
              اتصل بنا
            </a>
          </nav>

          <div className="nav-actions">
            <form
              className={
                searchOpen
                  ? 'header-search is-open'
                  : 'header-search'
              }
              onSubmit={handleSearch}
            >
              <button
                type="button"
                className="header-search-toggle"
                aria-label={
                  searchOpen
                    ? 'إغلاق البحث'
                    : 'فتح البحث'
                }
                aria-expanded={searchOpen}
                onClick={() => {
                  setSearchOpen((current) => !current)
                  setMenuOpen(false)
                }}
              >
                {searchOpen ? (
                  <X size={19} />
                ) : (
                  <Search size={19} />
                )}
              </button>

              {searchOpen && (
                <input
                  type="search"
                  value={searchValue}
                  onChange={(event) =>
                    setSearchValue(event.target.value)
                  }
                  placeholder="ابحث في الموقع..."
                  aria-label="البحث في الموقع"
                  autoFocus
                />
              )}

              {searchOpen && (
                <button
                  type="submit"
                  className="header-search-submit"
                  aria-label="تنفيذ البحث"
                >
                  <ArrowLeft size={17} />
                </button>
              )}
            </form>

            <a
              className="primary-button header-order"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              اطلب خدمتك الآن
            </a>

            <button
              type="button"
              className="menu-button"
              aria-label={
                menuOpen
                  ? 'إغلاق القائمة'
                  : 'فتح القائمة'
              }
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((current) => !current)
                setSearchOpen(false)
              }}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}