'use client'

import { useState } from 'react'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header" style={{ position: 'relative' }}>
      <a className="brand" href="/#top" aria-label="Luma & Co. homepage">
        <span className="brand-mark">L</span>
        <span>Luma &amp; Co.</span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      <nav className={`site-nav${open ? ' open' : ''}`}>
        <a href="/#menu" onClick={() => setOpen(false)}>Menu</a>
        <a href="/#experience" onClick={() => setOpen(false)}>Experience</a>
        <a href="/#reviews" onClick={() => setOpen(false)}>Reviews</a>
        <a href="/#visit" onClick={() => setOpen(false)}>Visit</a>
        <a className="nav-cta" href="/#reservation" onClick={() => setOpen(false)}>
          Reservasi
        </a>
      </nav>
    </header>
  )
}
