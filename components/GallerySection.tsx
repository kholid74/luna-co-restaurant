import type { GalleryItem } from '@/lib/types'

interface Props {
  items: GalleryItem[]
}

export function GallerySection({ items }: Props) {
  const displayed = items.slice(0, 3)

  return (
    <section className="section-pad" aria-label="Galeri restoran" style={{ paddingBottom: 48 }}>
      <div className="section-heading compact reveal">
        <p className="eyebrow">Ambience</p>
        <h2>Dirancang untuk dinner dates, work lunches, dan private gatherings.</h2>
      </div>
      <div className="gallery-grid reveal">
        {displayed.map((item) => (
          <img
            key={item.id}
            src={item.url}
            alt={item.alt ?? 'Suasana Luma & Co.'}
            loading="lazy"
          />
        ))}
      </div>
      <div className="gallery-cta reveal">
        <a className="btn btn-secondary" href="#reservation">
          Reserve for this experience →
        </a>
      </div>
    </section>
  )
}
