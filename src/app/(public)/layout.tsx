import { Suspense } from 'react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBackground from '@/components/UI/HeroBackground';
import ContactUsBtn from '@/components/modals/ContactUsModal/ContactUsBtn';
import ModalPortal from '@/components/modals/ModalPortal';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative">
        <HeroBackground />
        <Header />
        <main>{children}</main>
        <ContactUsBtn />
        <Suspense fallback={null}>
          <ModalPortal />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
