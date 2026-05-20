import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import '../globals.css'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin — PLATA925',
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={dmSans.className}>
      <body className="bg-gray-50 antialiased">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  )
}
