import { createClient } from '@/lib/supabase/server'
import { updateReservationStatus } from '@/app/admin/actions'

export default async function ReservationsPage() {
  let reservations: any[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('reservations')
      .select('*')
      .order('date', { ascending: false })
      .order('time')
    reservations = data ?? []
  } catch {}

  const pending = reservations.filter((r) => r.status === 'pending')
  const confirmed = reservations.filter((r) => r.status === 'confirmed')
  const cancelled = reservations.filter((r) => r.status === 'cancelled')

  return (
    <>
      <div className="admin-topbar">
        <h1 className="admin-page-title">Reservasi</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="badge badge-pending">{pending.length} menunggu</span>
          <span className="badge badge-confirmed">{confirmed.length} terkonfirmasi</span>
        </div>
      </div>

      <div className="admin-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Tamu</th>
              <th>Kontak</th>
              <th>Catatan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: 'var(--muted)', padding: '48px 14px' }}>
                  Belum ada reservasi masuk
                </td>
              </tr>
            )}
            {reservations.map((r) => (
              <tr key={r.id}>
                <td style={{ fontWeight: 700 }}>{r.name}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.guests}</td>
                <td>
                  <div style={{ fontSize: 13 }}>{r.phone}</div>
                  {r.email && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{r.email}</div>}
                </td>
                <td style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 160 }}>{r.notes ?? '—'}</td>
                <td>
                  <span className={`badge badge-${r.status}`}>
                    {r.status === 'pending' ? 'Menunggu' : r.status === 'confirmed' ? 'Terkonfirmasi' : 'Dibatalkan'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {r.status !== 'confirmed' && (
                      <form action={updateReservationStatus.bind(null, r.id, 'confirmed')}>
                        <button type="submit" className="admin-btn" style={{ background: '#dcfce7', color: '#166534', padding: '5px 10px', fontSize: 12 }}>
                          ✓ Konfirmasi
                        </button>
                      </form>
                    )}
                    {r.status !== 'cancelled' && (
                      <form action={updateReservationStatus.bind(null, r.id, 'cancelled')}>
                        <button type="submit" className="admin-btn admin-btn-danger" style={{ padding: '5px 10px', fontSize: 12 }}>
                          Batalkan
                        </button>
                      </form>
                    )}
                    <a
                      href={`https://wa.me/${r.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Halo ${r.name}, reservasi Anda di Luma & Co. tanggal ${r.date} pukul ${r.time} sudah dikonfirmasi. Sampai jumpa!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="admin-btn"
                      style={{ background: '#dcfce7', color: '#166534', padding: '5px 10px', fontSize: 12 }}
                    >
                      WA
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
