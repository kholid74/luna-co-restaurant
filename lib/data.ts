import type { MenuCategoryWithItems, GalleryItem, Promotion } from '@/lib/types'

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co'

/* ── Fallback / seed data ──────────────────── */

const FALLBACK_MENU: MenuCategoryWithItems[] = [
  {
    id: 'dinner',
    name: 'Dinner',
    slug: 'dinner',
    order: 0,
    created_at: '',
    items: [
      { id: '1', name: 'Barramundi Panggang Arang', description: 'Ikan barramundi panggang arang, sambal matah citrus, sayur musiman dari kebun lokal.', price: 145000, category_id: 'dinner', is_available: true, image_url: null, tag: "Chef's Pick", order: 0, created_at: '' },
      { id: '2', name: 'Short Rib Rawon Glaze', description: 'Short rib 12 jam dengan glaze rawon pekat, potato pavé renyah, dan microherbs.', price: 185000, category_id: 'dinner', is_available: true, image_url: null, tag: 'Signature', order: 1, created_at: '' },
      { id: '3', name: 'Urap Garden Bowl', description: 'Sayuran lokal pilihan, kelapa sangrai, kemangi segar, dressing jeruk limau dan kencur.', price: 98000, category_id: 'dinner', is_available: true, image_url: null, tag: 'Vegetarian', order: 2, created_at: '' },
    ],
  },
  {
    id: 'brunch',
    name: 'Brunch',
    slug: 'brunch',
    order: 1,
    created_at: '',
    items: [
      { id: '4', name: 'Kaya French Toast', description: 'Roti brioche buatan sendiri, kaya pandan lembut, salted coconut cream, pisang karamel.', price: 82000, category_id: 'brunch', is_available: true, image_url: null, tag: null, order: 0, created_at: '' },
      { id: '5', name: 'Soto Benedict', description: 'Poached egg sempurna, hollandaise kunyit, ayam kampung suwir, sourdough panggang.', price: 118000, category_id: 'brunch', is_available: true, image_url: null, tag: 'Best Seller', order: 1, created_at: '' },
      { id: '6', name: 'Tropical Granola Bowl', description: 'Greek yogurt lokal, granola rempah buatan dapur, mangga harum manis, markisa, madu hutan.', price: 72000, category_id: 'brunch', is_available: true, image_url: null, tag: null, order: 2, created_at: '' },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    slug: 'drinks',
    order: 2,
    created_at: '',
    items: [
      { id: '7', name: 'Kopi Rempah Tonic', description: 'Espresso single origin, tonic water, kayu manis, orange peel segar. Dingin dan komplex.', price: 58000, category_id: 'drinks', is_available: true, image_url: null, tag: 'Signature', order: 0, created_at: '' },
      { id: '8', name: 'Luma Citrus Fizz', description: 'Jeruk bali segar, perasan lemon, rosemary infused, sparkling soda. Tanpa alkohol.', price: 64000, category_id: 'drinks', is_available: true, image_url: null, tag: 'Mocktail', order: 1, created_at: '' },
      { id: '9', name: 'Rosella Negroni', description: 'Gin pilihan, vermouth rosella buatan bar, bitter aromatic, hiasan orange smoke.', price: 118000, category_id: 'drinks', is_available: true, image_url: null, tag: null, order: 2, created_at: '' },
    ],
  },
]

const FALLBACK_GALLERY: GalleryItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80', alt: 'Ruang makan utama Luma & Co.', section: 'gallery', order: 0, created_at: '' },
  { id: '2', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80', alt: 'Meja makan premium dengan pencahayaan hangat', section: 'gallery', order: 1, created_at: '' },
  { id: '3', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80', alt: 'Bar dan area cocktail Luma & Co.', section: 'gallery', order: 2, created_at: '' },
]

/* ── Data fetching ─────────────────────────── */

export async function getMenuCategoriesWithItems(): Promise<MenuCategoryWithItems[]> {
  if (!isSupabaseConfigured) return FALLBACK_MENU

  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    const { data: categories } = await supabase
      .from('menu_categories')
      .select('*')
      .order('order')

    if (!categories?.length) return FALLBACK_MENU

    const { data: items } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .order('order')

    return categories.map((cat) => ({
      ...cat,
      items: (items ?? []).filter((item) => item.category_id === cat.id),
    }))
  } catch {
    return FALLBACK_MENU
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) return FALLBACK_GALLERY

  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()

    const { data } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('section', 'gallery')
      .order('order')
      .limit(6)

    return data?.length ? data : FALLBACK_GALLERY
  } catch {
    return FALLBACK_GALLERY
  }
}

export async function getActivePromotion(): Promise<Promotion | null> {
  if (!isSupabaseConfigured) return null

  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]

    const { data } = await supabase
      .from('promotions')
      .select('*')
      .eq('is_active', true)
      .or(`start_date.is.null,start_date.lte.${today}`)
      .or(`end_date.is.null,end_date.gte.${today}`)
      .limit(1)
      .maybeSingle()

    return data
  } catch {
    return null
  }
}

