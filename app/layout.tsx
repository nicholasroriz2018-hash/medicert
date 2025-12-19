import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'MediCert - Atestados Médicos Digitais Online',
    template: '%s | MediCert'
  },
  description: 'Emissão rápida e legal de atestados médicos digitais. Atendimento online 24h por médicos certificados. Válido em todo Brasil (Lei 13.989).',
  keywords: ['atestado médico', 'telemedicina', 'atestado online', 'consulta médica online', 'atestado digital', 'médico online'],
  authors: [{ name: 'MediCert' }],
  creator: 'MediCert',
  publisher: 'MediCert',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://medicert.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'MediCert - Atestados Médicos Digitais Online',
    description: 'Emissão rápida e legal de atestados médicos digitais. Atendimento online 24h por médicos certificados.',
    siteName: 'MediCert',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MediCert - Atestados Médicos Digitais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediCert - Atestados Médicos Digitais Online',
    description: 'Emissão rápida e legal de atestados médicos digitais. Atendimento online 24h.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#10b981' },
    { media: '(prefers-color-scheme: dark)', color: '#10b981' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark" data-scroll-behavior="smooth">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        {/* Core Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
        {/* Form Page Font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Payment Page Font */}
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Icons */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-200">
        {children}
      </body>
    </html>
  )
}
