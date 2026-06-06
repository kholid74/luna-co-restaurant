import { createClient } from '@/lib/supabase/server'

async function getStats() {
  try {
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]

    const [totalRes, todayRes, pendingRes, menuItems] = await Promise.all([
      supabase.from('reservations').select('id', { count: 'exact', head: true }),
      supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('date', today),
      supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('menu_items').select('id', { count: 'exact', head: true }),
    ])

    const recentReservations = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(8)

    return {
      total: totalRes.count ?? 0,
      today: todayRes.count ?? 0,
      pending: pendingRes.count ?? 0,
      menuCount: menuItems.count ?? 0,
      recent: recentReservations.data ?? [],
    }
  } catch {
    return { total: 0, today: 0, pending: 0, menuCount: 0, recent: [] }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-page-title">Dashboard</h1>
        <a href="/#reservation" target="_blank" className="admin-btn admin-btn-secondary">
          ↗ Lihat Booking Form
        </a>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat">
          <div className="admin-stat-label">Total Reservasi</div>
          <div className="admin-stat-value">{stats.total}</div>
          <div className="admin-stat-sub">Sepanjang waktu</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Hari Ini</div>
          <div className="admin-stat-value">{stats.today}</div>
          <div className="admin-stat-sub">Reservasi hari ini</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Menunggu</div>
          <div className="admin-stat-value" style={{ color: '#92400e' }}>{stats.pending}</div>
          <div className="admin-stat-sub">Perlu dikonfirmasi</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Item Menu</div>
          <div className="admin-stat-value">{stats.menuCount}</div>
          <div className="admin-stat-sub">Total menu aktif</div>
        </div>
      </div>

      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Reservasi Terbaru</h2>
          <a href="/admin/reservations" className="admin-btn admin-btn-secondary" style={{ fontSize: 13, padding: '6px 14px' }}>
            Lihat semua
          </a>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Tamu</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.recent.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px 14px' }}>
                  Belum ada reservasi
                </td>
              </tr>
            )}
            {stats.recent.map((r: any) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 700 }}>{r.name}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.guests}</td>
                <td>
                  <span className={`badge badge-${r.status}`}>
                    {r.status === 'pending' ? 'Menunggu' : r.status === 'confirmed' ? 'Konfirmasi' : 'Batal'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
