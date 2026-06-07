export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand" href="/#top" aria-label="Luma & Co. homepage">
          <span className="brand-mark">L</span>
          <span>Luma &amp; Co.</span>
        </a>
        <p className="footer-copy">
          Jl. Suryo No. 28, Senopati, Jakarta Selatan
        </p>
      </div>
      <div className="footer-right">
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="/#menu">Menu</a>
          <a href="/#experience">Experience</a>
          <a href="/#reservation">Reservasi</a>
          <a href="/#visit">Visit</a>
        </nav>
        <p className="footer-copy" style={{ margin: 0 }}>
          © {new Date().getFullYear()} &nbsp;Luma &amp; Co.
        </p>
      </div>
    </footer>
  )
}
