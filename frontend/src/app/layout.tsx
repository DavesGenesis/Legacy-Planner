import type { Metadata } from 'next'
import './globals.css'
import Protection from '@/components/Protection'

export const metadata: Metadata = {
  title: 'Comprehensive Legacy Planning Suite',
  description: 'Professional wealth transfer analysis and legacy planning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <Protection />
        {children}
      </body>
    </html>
  )
}
