export function VisitSection() {
  return (
    <div className="visit-section" id="visit">
      <div className="visit-card reveal">
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,.55)' }}>
          Kunjungi Kami
        </p>
        <h2>Luma &amp; Co. Senopati</h2>
        <p>Jl. Suryo No. 28, Senopati, Jakarta Selatan</p>
        <p style={{ marginTop: 6 }}>
          Brunch: Sabtu–Minggu 10:00–15:00 &nbsp;·&nbsp; Dinner: Senin–Minggu 18:00–22:30
        </p>
        <div className="visit-actions">
          <a
            className="btn btn-secondary"
            href="https://maps.google.com/?q=Jl.+Suryo+No.+28+Senopati+Jakarta+Selatan"
            target="_blank"
            rel="noreferrer"
          >
            Buka di Maps
          </a>
          <a className="btn btn-primary" href="#reservation">
            Reserve Now
          </a>
        </div>
      </div>
    </div>
  )
}
