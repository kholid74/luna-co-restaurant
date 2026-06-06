import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  date: z.string().min(1),
  time: z.string().min(1),
  guests: z.string().min(1),
  notes: z.string().optional(),
})

function buildWhatsAppUrl(data: z.infer<typeof schema>): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '6281234567890'
  const text = encodeURIComponent(
    `Halo Luma & Co.! Saya ingin konfirmasi reservasi:\n\n` +
    `Nama: ${data.name}\n` +
    `Tanggal: ${data.date}\n` +
    `Jam: ${data.time}\n` +
    `Tamu: ${data.guests}\n` +
    `No. WA: ${data.phone}\n` +
    (data.notes ? `Catatan: ${data.notes}` : '')
  )
  return `https://wa.me/${number}?text=${text}`
}

async function sendConfirmationEmail(data: z.infer<typeof schema>) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === 're_your_key_here') return

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: process.env.FROM_EMAIL ?? 'reservasi@lumarestaurant.id',
      to: [
        process.env.RESTAURANT_EMAIL ?? 'hello@lumarestaurant.id',
        ...(data.email ? [data.email] : []),
      ],
      subject: `Reservasi baru: ${data.name} — ${data.date} ${data.time}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto">
          <h2 style="color:#241915">Reservasi Baru — Luma & Co.</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#725f58;font-size:14px">Nama</td><td style="padding:8px 0;font-weight:700">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#725f58;font-size:14px">Tanggal</td><td style="padding:8px 0;font-weight:700">${data.date}</td></tr>
            <tr><td style="padding:8px 0;color:#725f58;font-size:14px">Jam</td><td style="padding:8px 0;font-weight:700">${data.time}</td></tr>
            <tr><td style="padding:8px 0;color:#725f58;font-size:14px">Tamu</td><td style="padding:8px 0;font-weight:700">${data.guests}</td></tr>
            <tr><td style="padding:8px 0;color:#725f58;font-size:14px">WhatsApp</td><td style="padding:8px 0;font-weight:700">${data.phone}</td></tr>
            ${data.email ? `<tr><td style="padding:8px 0;color:#725f58;font-size:14px">Email</td><td style="padding:8px 0;font-weight:700">${data.email}</td></tr>` : ''}
            ${data.notes ? `<tr><td style="padding:8px 0;color:#725f58;font-size:14px">Catatan</td><td style="padding:8px 0;font-weight:700">${data.notes}</td></tr>` : ''}
          </table>
          <p style="margin-top:24px;font-size:13px;color:#725f58">Luma & Co. · Jl. Suryo No. 28, Senopati, Jakarta Selatan</p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Email send failed:', err)
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Data tidak valid', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const data = parsed.data

  const isSupabaseConfigured =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co'

  if (isSupabaseConfigured) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()

      const guestsNum = parseInt(data.guests.replace(/\D/g, '')) || 1

      await supabase.from('reservations').insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        date: data.date,
        time: data.time,
        guests: guestsNum,
        notes: data.notes || null,
        status: 'pending',
      })
    } catch (err) {
      console.error('Supabase insert failed:', err)
    }
  }

  await sendConfirmationEmail(data)

  return NextResponse.json({
    success: true,
    whatsappUrl: buildWhatsAppUrl(data),
  })
}
