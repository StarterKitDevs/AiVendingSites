import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-web-agency.vercel.app'),
  title: 'AI Web Agency - AI-Powered Websites Built in Minutes',
  description: 'Professional websites with payment → automated creation → live deployment. Get your business online with enterprise-grade features in under an hour.',
  keywords: 'AI website builder, automated web development, professional websites, fast website creation',
  authors: [{ name: 'AI Web Agency' }],
  openGraph: {
    title: 'AI Web Agency - AI-Powered Websites Built in Minutes',
    description: 'Professional websites with payment → automated creation → live deployment.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Web Agency - AI-Powered Websites Built in Minutes',
    description: 'Professional websites with payment → automated creation → live deployment.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 