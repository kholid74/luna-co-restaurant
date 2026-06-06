import { SiteHeader } from '@/components/SiteHeader'
import { HeroSection } from '@/components/HeroSection'
import { TrustStrip } from '@/components/TrustStrip'
import { ExperienceSection } from '@/components/ExperienceSection'
import { MenuSection } from '@/components/MenuSection'
import { ChefSection } from '@/components/ChefSection'
import { GallerySection } from '@/components/GallerySection'
import { ReviewsSection } from '@/components/ReviewsSection'
import { ReservationSection } from '@/components/ReservationSection'
import { VisitSection } from '@/components/VisitSection'
import { SiteFooter } from '@/components/SiteFooter'
import { PromoBanner } from '@/components/PromoBanner'
import { RevealObserver } from '@/components/RevealObserver'
import {
  getMenuCategoriesWithItems,
  getGalleryItems,
  getActivePromotion,
} from '@/lib/data'

export default async function HomePage() {
  const [menuData, galleryItems, promotion] = await Promise.all([
    getMenuCategoriesWithItems(),
    getGalleryItems(),
    getActivePromotion(),
  ])

  return (
    <>
      <RevealObserver />
      {promotion && <PromoBanner promotion={promotion} />}
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustStrip />
        <ExperienceSection />
        <MenuSection menuData={menuData} />
        <ChefSection />
        <GallerySection items={galleryItems} />
        <ReviewsSection />
        <ReservationSection />
        <VisitSection />
      </main>
      <SiteFooter />
    </>
  )
}
