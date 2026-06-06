export interface MenuCategory {
  id: string
  name: string
  slug: string
  order: number
  created_at: string
}

export interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  category_id: string | null
  is_available: boolean
  image_url: string | null
  tag: string | null
  order: number
  created_at: string
}

export interface MenuItemWithCategory extends MenuItem {
  menu_categories: MenuCategory | null
}

export interface Reservation {
  id: string
  name: string
  phone: string
  email: string | null
  date: string
  time: string
  guests: number
  status: 'pending' | 'confirmed' | 'cancelled'
  notes: string | null
  created_at: string
}

export interface GalleryItem {
  id: string
  url: string
  alt: string | null
  section: string
  order: number
  created_at: string
}

export interface Promotion {
  id: string
  title: string
  description: string | null
  image_url: string | null
  cta_text: string | null
  cta_link: string | null
  start_date: string | null
  end_date: string | null
  is_active: boolean
  created_at: string
}

export interface SiteContent {
  id: string
  key: string
  value: string
  type: string
  updated_at: string
}

export interface MenuCategoryWithItems extends MenuCategory {
  items: MenuItem[]
}

export interface ReservationFormData {
  name: string
  phone: string
  email?: string
  date: string
  time: string
  guests: number
  notes?: string
}
