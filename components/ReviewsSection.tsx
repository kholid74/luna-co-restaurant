const reviews = [
  {
    initial: 'T',
    name: 'Tiara W.',
    meta: 'Regular guest',
    quote:
      'Barramundi-nya luar biasa — saus sambal citrus-nya tidak saya temukan di tempat lain di Jakarta. Sudah empat kali balik dan rasanya tidak pernah mengecewakan.',
  },
  {
    initial: 'D',
    name: 'Dimas & Lena',
    meta: 'Private dining',
    quote:
      'Pesan private room untuk anniversary kami. Tim-nya sangat detail, dari menu custom sampai pencahayaan yang pas. Momen yang tidak akan kami lupakan.',
  },
  {
    initial: 'M',
    name: 'Marco S.',
    meta: 'Food & travel writer',
    quote:
      'Short Rib Rawon Glaze adalah salah satu hidangan terbaik yang pernah saya coba di Jakarta. Daging meleleh, glaze-nya kompleks tanpa berlebihan. Referensi wajib.',
  },
]

export function ReviewsSection() {
  return (
    <section className="section-pad" id="reviews">
      <div className="section-heading compact reveal">
        <p className="eyebrow">Tamu Bercerita</p>
        <h2>What guests remember.</h2>
      </div>
      <div className="review-grid">
        {reviews.map((r) => (
          <article key={r.name} className="review-card reveal">
            <div className="stars" aria-label="5 bintang">★★★★★</div>
            <blockquote>"{r.quote}"</blockquote>
            <div className="reviewer">
              <div className="reviewer-initial" aria-hidden="true">
                {r.initial}
              </div>
              <div>
                <div className="reviewer-name">{r.name}</div>
                <div className="reviewer-meta">{r.meta}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
