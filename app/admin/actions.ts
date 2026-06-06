'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/* ── Auth ─────────────────────────────────── */

export async function login(_: unknown, formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) return { error: error.message }
  redirect('/admin')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

/* ── Menu ─────────────────────────────────── */

export async function createMenuItem(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('menu_items').insert({
    name: formData.get('name') as string,
    description: (formData.get('description') as string) || null,
    price: parseInt(formData.get('price') as string),
    category_id: (formData.get('category_id') as string) || null,
    tag: (formData.get('tag') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
    is_available: formData.get('is_available') === 'true',
    order: parseInt((formData.get('order') as string) ?? '0'),
  })
  if (error) return { error: error.message }
  revalidatePath('/admin/menu')
  revalidatePath('/')
}

export async function updateMenuItem(id: string, formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('menu_items')
    .update({
      name: formData.get('name') as string,
      description: (formData.get('description') as string) || null,
      price: parseInt(formData.get('price') as string),
      category_id: (formData.get('category_id') as string) || null,
      tag: (formData.get('tag') as string) || null,
      image_url: (formData.get('image_url') as string) || null,
      is_available: formData.get('is_available') === 'true',
    })
    .eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/menu')
  revalidatePath('/')
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient()
  await supabase.from('menu_items').delete().eq('id', id)
  revalidatePath('/admin/menu')
  revalidatePath('/')
}

/* ── Reservations ─────────────────────────── */

export async function updateReservationStatus(id: string, status: 'confirmed' | 'cancelled') {
  const supabase = await createClient()
  await supabase.from('reservations').update({ status }).eq('id', id)
  revalidatePath('/admin/reservations')
}

/* ── Promotions ───────────────────────────── */

export async function createPromotion(formData: FormData) {
  const supabase = await createClient()
  await supabase.from('promotions').insert({
    title: formData.get('title') as string,
    description: (formData.get('description') as string) || null,
    cta_text: (formData.get('cta_text') as string) || null,
    cta_link: (formData.get('cta_link') as string) || null,
    start_date: (formData.get('start_date') as string) || null,
    end_date: (formData.get('end_date') as string) || null,
    is_active: formData.get('is_active') === 'true',
  })
  revalidatePath('/admin/promotions')
  revalidatePath('/')
}

export async function togglePromotion(id: string, isActive: boolean) {
  const supabase = await createClient()
  await supabase.from('promotions').update({ is_active: isActive }).eq('id', id)
  revalidatePath('/admin/promotions')
  revalidatePath('/')
}

export async function deletePromotion(id: string) {
  const supabase = await createClient()
  await supabase.from('promotions').delete().eq('id', id)
  revalidatePath('/admin/promotions')
  revalidatePath('/')
}

/* ── Gallery ──────────────────────────────── */

export async function addGalleryItem(formData: FormData) {
  const supabase = await createClient()
  await supabase.from('gallery_items').insert({
    url: formData.get('url') as string,
    alt: (formData.get('alt') as string) || null,
    section: (formData.get('section') as string) || 'gallery',
    order: parseInt((formData.get('order') as string) ?? '0'),
  })
  revalidatePath('/admin/gallery')
  revalidatePath('/')
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient()
  await supabase.from('gallery_items').delete().eq('id', id)
  revalidatePath('/admin/gallery')
  revalidatePath('/')
}

/* ── Site content ─────────────────────────── */

export async function updateSiteContent(key: string, value: string) {
  const supabase = await createClient()
  await supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' })
  revalidatePath('/admin/gallery')
  revalidatePath('/')
}
