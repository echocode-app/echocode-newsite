import AnimationLine from '@/components/common/AnimationLine';
import BasedOnSection from '@/components/sections/home/BasedOnSection';
import DirectionSection from '@/components/sections/home/DirectionsSection';
import HeroSection from '@/components/sections/home/HeroSection';
import ServicesSection from '@/components/sections/home/ServicesSection';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AnimationLine />
      <BasedOnSection />
      <DirectionSection />
      <ServicesSection />
    </>
  );
};

export default HomePage;
