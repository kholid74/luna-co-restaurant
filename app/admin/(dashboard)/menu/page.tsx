import { createClient } from '@/lib/supabase/server'
import { createMenuItem, deleteMenuItem } from '@/app/admin/actions'
import { formatPrice } from '@/lib/utils'

export default async function MenuPage() {
  let categories: any[] = []
  let items: any[] = []

  try {
    const supabase = await createClient()
    const [catRes, itemRes] = await Promise.all([
      supabase.from('menu_categories').select('*').order('order'),
      supabase.from('menu_items').select('*, menu_categories(name)').order('order'),
    ])
    categories = catRes.data ?? []
    items = itemRes.data ?? []
  } catch {}

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-page-title">Menu</h1>
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>{items.length} item</span>
      </div>

      {/* Add new item */}
      <div className="admin-card" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 800 }}>Tambah Item Menu</h2>
        <form action={createMenuItem} className="admin-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <label>
            Nama hidangan *
            <input name="name" type="text" placeholder="Barramundi Panggang Arang" required />
          </label>
          <label>
            Harga (IDR) *
            <input name="price" type="number" placeholder="145000" required min="0" />
          </label>
          <label style={{ gridColumn: '1/-1' }}>
            Deskripsi
            <textarea name="description" placeholder="Deskripsi singkat hidangan..." />
          </label>
          <label style={{ gridColumn: '1/-1' }}>
            URL Foto
            <input name="image_url" type="url" placeholder="https://images.unsplash.com/..." />
          </label>
          <label>
            Kategori
            <select name="category_id">
              <option value="">Pilih kategori</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label>
            Tag (opsional)
            <input name="tag" type="text" placeholder="Signature, Best Seller, Vegetarian..." />
          </label>
          <label>
            Urutan
            <input name="order" type="number" defaultValue="0" min="0" />
          </label>
          <label>
            Status
            <select name="is_available" defaultValue="true">
              <option value="true">Tersedia</option>
              <option value="false">Tidak tersedia</option>
            </select>
          </label>
          <div style={{ gridColumn: '1/-1' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              + Tambah Item
            </button>
          </div>
        </form>
      </div>

      {/* Items list by category */}
      {categories.map((cat: any) => {
        const catItems = items.filter((i: any) => i.category_id === cat.id)
        return (
          <div key={cat.id} className="admin-card" style={{ marginBottom: 16 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800 }}>
              {cat.name}
              <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: 13, marginLeft: 8 }}>
                {catItems.length} item
              </span>
            </h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 56 }}></th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Tag</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {catItems.length === 0 && (
                  <tr><td colSpan={6} style={{ color: 'var(--muted)', padding: '20px 14px', fontSize: 13 }}>Belum ada item</td></tr>
                )}
                {catItems.map((item: any) => (
                  <tr key={item.id}>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{
                        width: 48, height: 48,
                        borderRadius: 10,
                        overflow: 'hidden',
                        background: 'linear-gradient(145deg, var(--cream), var(--accent-light))',
                        flexShrink: 0,
                      }}>
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{item.name}</div>
                      {item.description && (
                        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                          {item.description.slice(0, 60)}...
                        </div>
                      )}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-dark)' }}>
                      {formatPrice(item.price)}
                    </td>
                    <td>{item.tag ? <span className="menu-item-tag" style={{ marginTop: 0 }}>{item.tag}</span> : '—'}</td>
                    <td>
                      <span className={item.is_available ? 'badge badge-confirmed' : 'badge badge-cancelled'}>
                        {item.is_available ? 'Tersedia' : 'Tidak tersedia'}
                      </span>
                    </td>
                    <td>
                      <form action={deleteMenuItem.bind(null, item.id)}>
                        <button
                          type="submit"
                          className="admin-btn admin-btn-danger"
                          style={{ fontSize: 12, padding: '5px 10px' }}
                          onClick={(e) => { if (!confirm(`Hapus "${item.name}"?`)) e.preventDefault() }}
                        >
                          Hapus
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )
}
