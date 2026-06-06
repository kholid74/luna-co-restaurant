export function ChefSection() {
  return (
    <section className="section-pad chef-section">
      <div className="chef-image reveal">
        <img
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
          alt="Chef Bagas Wibisono di dapur Luma & Co."
          loading="lazy"
        />
      </div>
      <div className="chef-copy reveal">
        <p className="eyebrow">Chef's Note</p>
        <h2>
          "Kami tidak mencoba membuat makanan Indonesia terasa{' '}
          <em>modern</em> — kami membuat masakan modern yang{' '}
          <em>jiwanya</em> tetap Indonesia."
        </h2>
        <p>
          Chef Bagas Wibisono memulai perjalanannya di warung makan ibunya di
          Solo, lalu melatih tekniknya selama 8 tahun di Eropa. Kembali ke
          Jakarta, ia membawa satu misi: memuliakan bahan-bahan Indonesia tanpa
          menghilangkan kenyamanan yang membuatnya familiar.
        </p>
        <p>
          Setiap hidangan di Luma &amp; Co. punya cerita daerah dan alasan untuk
          ada di piring Anda malam ini.
        </p>
        <a className="text-link" href="#reservation">
          Reserve the tasting table →
        </a>
      </div>
    </section>
  )
}
