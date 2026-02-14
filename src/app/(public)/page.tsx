import AnimationLine from '@/components/common/AnimationLine';
import BasedOnSection from '@/components/sections/home/BasedOnSection';
import DirectionSection from '@/components/sections/home/DirectionsSection';
import HeroSection from '@/components/sections/home/HeroSection';
import LocationSection from '@/components/sections/home/LocationSection';
// import PartnersSection from '@/components/sections/home/PartnersSection';
import PortfolioSection from '@/components/sections/home/PortfolioSection';
import ServicesSection from '@/components/sections/home/ServicesSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AnimationLine />
      <BasedOnSection />
      <DirectionSection />
      <ServicesSection />
      <PortfolioSection />
      {/* <PartnersSection /> */}
      <LocationSection />
    </>
  );
};

export default HomePage;
