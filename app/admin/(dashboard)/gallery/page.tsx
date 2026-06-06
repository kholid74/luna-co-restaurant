import { createClient } from '@/lib/supabase/server'
import { addGalleryItem, deleteGalleryItem, updateSiteContent } from '@/app/admin/actions'

export default async function GalleryPage() {
  let galleryItems: any[] = []
  let siteContent: any[] = []

  try {
    const supabase = await createClient()
    const [galleryRes, contentRes] = await Promise.all([
      supabase.from('gallery_items').select('*').order('order'),
      supabase.from('site_content').select('*'),
    ])
    galleryItems = galleryRes.data ?? []
    siteContent = contentRes.data ?? []
  } catch {}

  const getContent = (key: string) => siteContent.find((c: any) => c.key === key)?.value ?? ''

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-page-title">Gallery & Konten</h1>
      </div>

      {/* Site content editor */}
      <div className="admin-card" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 800 }}>Edit Konten Website</h2>
        <div style={{ display: 'grid', gap: 16 }}>
          {[
            { key: 'hero_tagline', label: 'Hero Tagline', placeholder: 'Rasa Nusantara, dibawakan dengan presisi.' },
            { key: 'chef_quote', label: 'Chef Quote', placeholder: 'Quote dari chef...' },
            { key: 'chef_name', label: 'Nama Chef', placeholder: 'Chef Bagas Wibisono' },
            { key: 'restaurant_address', label: 'Alamat Restoran', placeholder: 'Jl. Suryo No. 28...' },
            { key: 'restaurant_hours', label: 'Jam Operasional', placeholder: 'Brunch: Sabtu–Minggu...' },
          ].map(({ key, label, placeholder }) => (
            <form
              key={key}
              action={async (formData: FormData) => {
                'use server'
                await updateSiteContent(key, formData.get('value') as string)
              }}
              className="admin-form"
              style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'end' }}
            >
              <label>
                {label}
                <input name="value" type="text" defaultValue={getContent(key)} placeholder={placeholder} />
              </label>
              <button type="submit" className="admin-btn admin-btn-primary" style={{ height: 42 }}>
                Simpan
              </button>
            </form>
          ))}
        </div>
      </div>

      {/* Gallery items */}
      <div className="admin-card" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 800 }}>Tambah Foto Gallery</h2>
        <form action={addGalleryItem} className="admin-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'end' }}>
          <label>
            URL Foto *
            <input name="url" type="url" placeholder="https://images.unsplash.com/..." required />
          </label>
          <label>
            Alt text
            <input name="alt" type="text" placeholder="Deskripsi foto untuk aksesibilitas" />
          </label>
          <div style={{ display: 'grid', gap: 12 }}>
            <label>
              Urutan
              <input name="order" type="number" defaultValue="0" min="0" style={{ height: 42 }} />
            </label>
          </div>
          <input type="hidden" name="section" value="gallery" />
          <div style={{ gridColumn: '1/-1' }}>
            <button type="submit" className="admin-btn admin-btn-primary">+ Tambah Foto</button>
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800 }}>
          Foto Gallery
          <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: 13, marginLeft: 8 }}>
            {galleryItems.length} foto
          </span>
        </h2>
        {galleryItems.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Belum ada foto gallery</p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
          {galleryItems.map((item: any) => (
            <div key={item.id} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', background: '#f5f2ee' }}>
              <img src={item.url} alt={item.alt ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: '.2s', display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                <form action={deleteGalleryItem.bind(null, item.id)}>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-danger"
                    style={{ fontSize: 12, padding: '4px 10px' }}
                    onClick={(e) => { if (!confirm('Hapus foto ini?')) e.preventDefault() }}
                  >
                    Hapus
                  </button>
                </form>
              </div>
              {item.alt && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,.6)', padding: '6px 10px', fontSize: 11, color: '#fff' }}>
                  {item.alt}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
