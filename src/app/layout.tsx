import type { Metadata } from 'next';

import { poppins, wadik, inter } from '@/styles/fonts/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Echocode',
  description: 'Echocode',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${wadik.variable} antialiased relative`}
      >
        {children}
      </body>
    </html>
  );
}
