import { Analytics } from '@vercel/analytics/next'
import { IBM_Plex_Mono, Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-plex-mono', weight: ['400', '500'] })
import './globals.css'

export const metadata: Metadata = {
  title: 'AKSOS — Intelligence infrastructure for Africa',
  description: 'AKSOS is building the systems and relationships needed to understand how information connects across Africa.',
  generator: 'AKSOS',
  icons: {
    icon: '/aksos-symbol-traced.svg'
    apple: '/aksos-symbol-traced.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0b0b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${plexMono.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
