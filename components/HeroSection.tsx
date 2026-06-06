export function HeroSection() {
  return (
    <section className="hero" id="top" aria-label="Hero section">
      <div className="reveal">
        <p className="eyebrow">Jakarta · Modern Indonesian Dining</p>
        <h1>
          Rasa Nusantara, <em>dibawakan</em> dengan presisi.
        </h1>
        <p className="hero-lede">
          Menu berputar musiman, bahan dari pasar lokal pilihan, dan dapur terbuka
          yang mengundang Anda masuk ke ritme dapur kami.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#reservation">
            Reserve a Table
          </a>
          <a className="btn btn-secondary" href="#menu">
            Explore Menu
          </a>
        </div>
        <div className="hero-proof" aria-label="Fakta restoran">
          <div>
            <strong>4.9</strong>
            <span>Google rating</span>
          </div>
          <div>
            <strong>12+</strong>
            <span>Signature dishes</span>
          </div>
          <div>
            <strong>2019</strong>
            <span>Buka sejak</span>
          </div>
        </div>
      </div>

      <div className="hero-visual reveal" aria-hidden="true">
        <div className="photo-card photo-main">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=80"
            alt="Interior restoran modern dengan pencahayaan hangat"
            loading="eager"
          />
          <span className="floating-badge">Open kitchen · seasonal menu</span>
        </div>
        <div className="photo-card photo-small">
          <img
            src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80"
            alt="Chef menata hidangan dengan teliti"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
