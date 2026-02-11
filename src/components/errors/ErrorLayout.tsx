import { ReactNode, Suspense } from 'react';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import ContactUsBtn from '../modals/ContactUsModal/ContactUsBtn';

interface ErrorLayoutProps {
  children: ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  return (
    <>
      <div className="relative">
        <Header />
        <main>{children}</main>
        <Suspense fallback={null}>
          <ContactUsBtn />
        </Suspense>
      </div>
      <Footer />
    </>
  );
};

export default ErrorLayout;
