'use client'

import { useState } from 'react'
import type { MenuCategoryWithItems } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  menuData: MenuCategoryWithItems[]
}

export function MenuSection({ menuData }: Props) {
  const [activeSlug, setActiveSlug] = useState(menuData[0]?.slug ?? 'dinner')
  const activeCategory = menuData.find((c) => c.slug === activeSlug) ?? menuData[0]

  return (
    <section className="section-pad" id="menu" style={{ paddingTop: 72 }}>
      <div className="section-heading reveal">
        <p className="eyebrow">Signature Menu</p>
        <h2>Curated dishes with a local soul.</h2>
        <p>Menu kami berputar mengikuti musim — selalu ada alasan untuk kembali.</p>
      </div>

      <div className="menu-tabs reveal" role="tablist" aria-label="Kategori menu">
        {menuData.map((cat) => (
          <button
            key={cat.slug}
            className={`tab${activeSlug === cat.slug ? ' active' : ''}`}
            type="button"
            role="tab"
            aria-selected={activeSlug === cat.slug}
            onClick={() => setActiveSlug(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="menu-grid reveal" role="tabpanel">
        {activeCategory?.items.map((item) => (
          <article key={item.id} className="menu-item">
            <div className="menu-item-top">
              <div className="menu-item-text">
                <div className="menu-item-header">
                  <h3>{item.name}</h3>
                  <span className="menu-item-price">{formatPrice(item.price)}</span>
                </div>
                <p>{item.description}</p>
                {item.tag && <span className="menu-item-tag">{item.tag}</span>}
              </div>
              <div className="menu-item-thumb">
                {item.image_url && <img src={item.image_url} alt={item.name} />}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="menu-cta reveal">
        <a href="/menu" className="btn btn-secondary" style={{ fontSize: 14 }}>
          Lihat semua menu
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <span className="menu-cta-note">Tersedia untuk diunduh dalam format PDF</span>
      </div>
    </section>
  )
}
