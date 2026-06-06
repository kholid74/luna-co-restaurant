const cards = [
  {
    num: '01',
    title: 'Meja dalam 60 detik',
    body: 'Reservasi lewat form, WhatsApp, atau telepon — sesuai kenyamanan Anda. Konfirmasi langsung.',
  },
  {
    num: '02',
    title: 'Menu berubah setiap musim',
    body: 'Bahan dipilih dari pasar lokal setiap pagi. Tidak ada dua kunjungan yang terasa sama.',
  },
  {
    num: '03',
    title: 'Pengalaman yang personal',
    body: 'Dari meja reguler hingga private room untuk 16 tamu — setiap sesi diatur dengan teliti.',
  },
]

export function ExperienceSection() {
  return (
    <section className="section-pad intro-grid" id="experience">
      <div className="section-kicker reveal">
        <p className="eyebrow">Kenapa Luma & Co.</p>
        <h2>Casual untuk weekdays, refined untuk perayaan.</h2>
      </div>
      {cards.map((c) => (
        <div key={c.num} className="intro-card reveal">
          <span className="card-num">{c.num}</span>
          <h3>{c.title}</h3>
          <p>{c.body}</p>
        </div>
      ))}
    </section>
  )
}
