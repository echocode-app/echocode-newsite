import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
// import HeroBackground from "@/components/UI/HeroBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <HeroBackground /> */}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
