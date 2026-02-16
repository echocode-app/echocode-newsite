import type { Metadata } from 'next';
import ComingSoon from '@/app/coming-soon/page';

export const metadata: Metadata = {
  metadataBase: new URL('https://echocode.digital'),

  title: 'Echocode | coming soon',

  description:
    'EchoCode is a software development company specializing in iOS, Android, Flutter, Web and iGaming solutions. We provide design, QA and product management services. Website launching soon.',

  robots: {
    index: false,
    follow: false,
  },

  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },

  manifest: '/favicon/site.webmanifest',

  appleWebApp: {
    title: 'EchoCode',
  },

  openGraph: {
    title: 'Echocode — iOS, Android & iGaming Development',
    description:
      'Custom mobile and web development solutions: iOS, Android, Flutter and iGaming. Design, QA and product management services. Website launching soon.',
    url: 'https://echocode.digital',
    siteName: 'Echocode',
    images: [
      {
        url: '/images/rabbits/hero/design.png',
        width: 1200,
        height: 630,
        alt: 'Echocode — Software Development Company',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Echocode — iOS, Android & iGaming Development',
    description:
      'Mobile & web development company. iOS, Android, Flutter and iGaming solutions. Launching soon.',
    images: ['/images/rabbits/hero/design.png'],
  },

  alternates: {
    canonical: 'https://echocode.digital',
  },
};

export default function HomePage() {
  return <ComingSoon />;
}
