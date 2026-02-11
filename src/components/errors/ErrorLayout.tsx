import { ReactNode } from 'react';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import ContactUsBtn from '../modals-temp/ContactUsModal/ContactUsBtn';
// import ContactUsBtn from '../modals/ContactUsModal';

interface ErrorLayoutProps {
  children: ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  return (
    <>
      <div className="relative">
        <Header />
        <main>{children}</main>
        <ContactUsBtn />
      </div>
      <Footer />
    </>
  );
};

export default ErrorLayout;
