import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'GRIT Quad Biking Arena — Port Harcourt',
  description: "Port Harcourt's premier outdoor quad biking and ATV adventure destination. Rugged tracks, real machines, all skill levels welcome.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-grit-black text-grit-white font-body antialiased">
        {children}
      </body>
    </html>
  )
}
