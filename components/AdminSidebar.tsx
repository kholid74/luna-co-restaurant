'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { logout } from '@/app/admin/actions'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/reservations', label: 'Reservasi', icon: '📋' },
  { href: '/admin/menu', label: 'Menu', icon: '🍽' },
  { href: '/admin/gallery', label: 'Gallery & Konten', icon: '🖼' },
  { href: '/admin/promotions', label: 'Promosi', icon: '🏷' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-head">
        <Link className="brand" href="/" style={{ color: '#fff' }}>
          <span className="brand-mark">L</span>
          <span>Luma &amp; Co.</span>
        </Link>
        <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,.4)', paddingLeft: 44 }}>
          Admin Panel
        </p>
      </div>

      <nav className="admin-nav">
        <p className="admin-nav-section">Menu utama</p>
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-item${isActive ? ' active' : ''}`}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}

        <p className="admin-nav-section" style={{ marginTop: 16 }}>Akun</p>
        <Link href="/" className="admin-nav-item" target="_blank">
          <span style={{ fontSize: 16 }}>↗</span>
          Lihat Website
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="admin-nav-item"
            style={{ width: '100%', background: 'none', border: 0, cursor: 'pointer', color: 'rgba(255,255,255,.6)', textAlign: 'left' }}
          >
            <span style={{ fontSize: 16 }}>⎋</span>
            Keluar
          </button>
        </form>
      </nav>
    </aside>
  )
}
