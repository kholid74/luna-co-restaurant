import type { Promotion } from '@/lib/types'

interface Props {
  promotion: Promotion
}

export function PromoBanner({ promotion }: Props) {
  return (
    <div className="promo-banner" role="banner">
      {promotion.title}
      {promotion.description && ` — ${promotion.description}`}
      {promotion.cta_text && promotion.cta_link && (
        <>
          {' '}
          <a href={promotion.cta_link}>{promotion.cta_text}</a>
        </>
      )}
    </div>
  )
}
