import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Luma & Co. | Modern Indonesian Dining — Jakarta',
    template: '%s | Luma & Co.',
  },
  description:
    'Restoran modern Jakarta dengan menu Indonesia kontemporer. Nikmati makan malam berkesan, brunch akhir pekan, dan private dining di Senopati.',
  keywords: ['restoran Jakarta', 'fine dining Senopati', 'Indonesian cuisine', 'restaurant reservation Jakarta'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Luma & Co.',
    title: 'Luma & Co. | Modern Indonesian Dining',
    description: 'Menu Indonesia kontemporer, bahan lokal pilihan, dan pengalaman makan yang tidak terlupakan di jantung Senopati, Jakarta.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
