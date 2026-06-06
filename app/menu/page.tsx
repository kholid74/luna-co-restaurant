import { getMenuCategoriesWithItems } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { PrintButton } from './PrintButton'

export const metadata = { title: 'Menu — Luma & Co.' }

export default async function MenuPage() {
  const categories = await getMenuCategoriesWithItems()

  return (
    <>
      <div className="menu-download-bar">
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 15 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Kembali
        </a>
        <span>Luma &amp; Co. · Signature Menu</span>
        <PrintButton />
      </div>

      <div className="menu-page">
        <div className="menu-page-header">
          <div className="brand-mark" style={{ width: 64, height: 64, fontSize: 28 }}>L</div>
          <h1>Luma &amp; Co.</h1>
          <p>Signature Menu · Rasa Nusantara, Teknik Modern</p>
        </div>

        {categories.map((cat) => (
          <section key={cat.id} className="menu-page-category">
            <h2>{cat.name}</h2>
            <div className="menu-page-grid">
              {cat.items.map((item) => (
                <div key={item.id} className="menu-page-item">
                  <div className="menu-page-item-header">
                    <h3>{item.name}</h3>
                    <span className="menu-page-item-price">{formatPrice(item.price)}</span>
                  </div>
                  {item.description && <p>{item.description}</p>}
                  {item.tag && (
                    <span className="menu-item-tag" style={{ marginTop: 10 }}>{item.tag}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="menu-page-footer">
          <p><strong>Luma &amp; Co. Restaurant</strong></p>
          <p>Jl. Suryo No. 28, Senopati, Jakarta Selatan · hello@lumarestaurant.id</p>
          <p style={{ marginTop: 12, fontSize: 12 }}>
            Menu berputar mengikuti musim. Harga sudah termasuk pajak.
          </p>
        </div>
      </div>
    </>
  )
}
