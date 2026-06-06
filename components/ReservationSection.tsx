'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().min(8, 'Nomor telepon tidak valid'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  date: z.string().min(1, 'Pilih tanggal'),
  time: z.string().min(1, 'Pilih jam'),
  guests: z.string().min(1, 'Pilih jumlah tamu'),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ReservationSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [successMsg, setSuccessMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error ?? 'Terjadi kesalahan')

      setSuccessMsg(`Terima kasih, ${data.name}! Reservasi diterima untuk ${data.guests} tamu pada ${data.date} pukul ${data.time}.`)
      setStatus('success')
      reset()

      if (json.whatsappUrl) {
        setTimeout(() => window.open(json.whatsappUrl, '_blank'), 800)
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section className="section-pad" id="reservation">
      <div className="reservation-grid">
        <div className="reservation-copy reveal">
          <p className="eyebrow">Reservasi</p>
          <h2>Book your table in under a minute.</h2>
          <p>
            Isi form di bawah — kami akan konfirmasi via WhatsApp. Untuk private
            dining atau acara khusus, tambahkan catatan di kolom notes.
          </p>
          <ul className="checklist">
            <li>Brunch: Sabtu–Minggu 10:00–15:00</li>
            <li>Dinner: Senin–Minggu 18:00–22:30</li>
            <li>Private room untuk 8–16 tamu</li>
            <li>Konfirmasi via WhatsApp dalam 1 jam</li>
          </ul>
        </div>

        <form
          className="booking-form reveal"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {status === 'success' && (
            <div className="form-success">
              ✓ {successMsg} Kami menghubungi Anda via WhatsApp segera.
            </div>
          )}
          {status === 'error' && (
            <div className="form-success" style={{ background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}>
              Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.
            </div>
          )}

          <label>
            Nama lengkap *
            <input
              {...register('name')}
              type="text"
              placeholder="Nama Anda"
              autoComplete="name"
            />
            {errors.name && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.name.message}</span>}
          </label>

          <label>
            Nomor WhatsApp *
            <input
              {...register('phone')}
              type="tel"
              placeholder="+62 812 3456 7890"
              autoComplete="tel"
            />
            {errors.phone && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.phone.message}</span>}
          </label>

          <label>
            Tanggal *
            <input
              {...register('date')}
              type="date"
              min={today}
            />
            {errors.date && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.date.message}</span>}
          </label>

          <label>
            Jam *
            <select {...register('time')}>
              <option value="">Pilih jam</option>
              <optgroup label="Brunch (Sabtu–Minggu)">
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>13:00</option>
              </optgroup>
              <optgroup label="Dinner (Setiap hari)">
                <option>18:00</option>
                <option>18:30</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>20:30</option>
                <option>21:00</option>
              </optgroup>
            </select>
            {errors.time && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.time.message}</span>}
          </label>

          <label>
            Jumlah tamu *
            <select {...register('guests')}>
              <option value="">Pilih jumlah</option>
              <option>1 tamu</option>
              <option>2 tamu</option>
              <option>3 tamu</option>
              <option>4 tamu</option>
              <option>5 tamu</option>
              <option>6 tamu</option>
              <option>7–8 tamu</option>
              <option>9–16 tamu (Private Room)</option>
            </select>
            {errors.guests && <span style={{ color: '#dc2626', fontSize: 12 }}>{errors.guests.message}</span>}
          </label>

          <label>
            Email (opsional)
            <input
              {...register('email')}
              type="email"
              placeholder="email@anda.com"
              autoComplete="email"
            />
          </label>

          <label className="full-width" style={{ gridColumn: '1/-1' }}>
            Catatan khusus
            <input
              {...register('notes')}
              type="text"
              placeholder="Ulang tahun, alergi makanan, kursi khusus..."
            />
          </label>

          <div className="full-width">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === 'loading'}
              style={{ width: '100%' }}
            >
              {status === 'loading' ? 'Memproses...' : 'Request Reservation'}
            </button>
            <p style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--muted)' }}>
              Setelah submit, Anda akan diarahkan ke WhatsApp untuk konfirmasi cepat.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
