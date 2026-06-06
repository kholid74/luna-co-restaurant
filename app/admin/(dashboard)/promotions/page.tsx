import { createClient } from '@/lib/supabase/server'
import { createPromotion, togglePromotion, deletePromotion } from '@/app/admin/actions'

export default async function PromotionsPage() {
  let promotions: any[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('promotions').select('*').order('created_at', { ascending: false })
    promotions = data ?? []
  } catch {}

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-page-title">Promosi & Banner</h1>
      </div>

      <div className="admin-card" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 800 }}>Buat Promosi Baru</h2>
        <form action={createPromotion} className="admin-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <label style={{ gridColumn: '1/-1' }}>
            Judul promosi *
            <input name="title" type="text" placeholder="Promo Dinner Spesial — Hemat 20%" required />
          </label>
          <label style={{ gridColumn: '1/-1' }}>
            Deskripsi (tampil di banner)
            <input name="description" type="text" placeholder="Berlaku setiap Senin–Rabu" />
          </label>
          <label>
            Teks CTA (opsional)
            <input name="cta_text" type="text" placeholder="Pesan sekarang" />
          </label>
          <label>
            Link CTA (opsional)
            <input name="cta_link" type="text" placeholder="/#reservation" />
          </label>
          <label>
            Tanggal mulai
            <input name="start_date" type="date" />
          </label>
          <label>
            Tanggal berakhir
            <input name="end_date" type="date" />
          </label>
          <label>
            Status awal
            <select name="is_active" defaultValue="true">
              <option value="true">Aktif (tampil di website)</option>
              <option value="false">Draft (tersembunyi)</option>
            </select>
          </label>
          <div style={{ gridColumn: '1/-1' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              + Buat Promosi
            </button>
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800 }}>Daftar Promosi</h2>
        {promotions.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Belum ada promosi</p>
        )}
        <div style={{ display: 'grid', gap: 12 }}>
          {promotions.map((p: any) => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderRadius: 12,
                background: '#faf7f4',
                border: '1px solid var(--line)',
                gap: 12,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontWeight: 800, fontSize: 15 }}>{p.title}</span>
                  <span className={`badge ${p.is_active ? 'badge-confirmed' : 'badge-cancelled'}`}>
                    {p.is_active ? 'Aktif' : 'Draft'}
                  </span>
                </div>
                {p.description && <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>{p.description}</p>}
                {(p.start_date || p.end_date) && (
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                    {p.start_date && `Mulai: ${p.start_date}`}
                    {p.start_date && p.end_date && ' · '}
                    {p.end_date && `Berakhir: ${p.end_date}`}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <form action={togglePromotion.bind(null, p.id, !p.is_active)}>
                  <button type="submit" className="admin-btn admin-btn-secondary" style={{ fontSize: 13, padding: '6px 12px' }}>
                    {p.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                </form>
                <form action={deletePromotion.bind(null, p.id)}>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-danger"
                    style={{ fontSize: 13, padding: '6px 12px' }}
                    onClick={(e) => { if (!confirm('Hapus promosi ini?')) e.preventDefault() }}
                  >
                    Hapus
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
