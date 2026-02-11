import { ReactNode } from 'react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroBackground from '@/components/UI/HeroBackground';
import ContactUsBtn from '@/components/modals/ContactUsModal/ContactUsBtn';

const PublicLayout = ({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) => {
  return (
    <>
      <div className="relative">
        <HeroBackground />
        <Header />
        <main>{children}</main>
        {modal}
        <ContactUsBtn />
      </div>
      <Footer />
    </>
  );
};

export default PublicLayout;
