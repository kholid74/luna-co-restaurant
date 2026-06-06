const items = [
  'Buka sejak 2019',
  'Farm-to-table sourcing',
  'Private room tersedia',
  'Open kitchen experience',
]

export function TrustStrip() {
  return (
    <div className="trust-strip" aria-label="Keunggulan restoran">
      {items.map((label) => (
        <div key={label} className="trust-item">
          <span className="trust-dot" aria-hidden="true" />
          {label}
        </div>
      ))}
    </div>
  )
}
