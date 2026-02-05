import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { poppins, wadik, inter } from '@/styles/fonts/fonts';

// import Header from '@/components/layout/Header/Header';
// import Footer from '@/components/layout/Footer/Footer';
// import HeroBackground from "@/components/UI/HeroBackground";

import './globals.css';

export const metadata: Metadata = {
  title: 'Echocode',
  description: 'Echocode',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${wadik.variable} antialiased relative`}
      >
        {/* <HeroBackground /> */}
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
