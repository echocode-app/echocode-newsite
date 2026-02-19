import FullCycleSection from '@/components/sections/directions/mobile/FullCycleSection';
import HeroSection from '@/components/sections/directions/mobile/HeroSection';
import MarketingSection from '@/components/sections/directions/mobile/MarketingSection';
import SpecializationSection from '@/components/sections/directions/mobile/SpecializationSection';
import StaticGradientLine from '@/components/UI/StaticGradientLine';

const Mobile = () => {
  return (
    <>
      <HeroSection />
      <StaticGradientLine />
      <FullCycleSection />
      <SpecializationSection />
      <MarketingSection />
    </>
  );
};

export default Mobile;
