import Image from 'next/image';

import PageTitle from '@/components/UI/PageTitle';
import SectionContainer from '@/components/UI/section/SectionContainer';

const HeroSection = () => {
  return (
    <section className="pt-45 pb-2">
      <SectionContainer>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="max-w-145">
              <PageTitle>Scale. Yield. Dominance</PageTitle>
            </div>
            <p className="font-title text-title-sm text-center md:text-start mt-4">iGaming</p>
          </div>
          <div className="relative w-50 h-50 md:w-79.5 md:h-79.5 z-10">
            <Image
              src={'/images/rabbits/hero/igaming.png'}
              alt="iGaming"
              fill
              className="object-cover -scale-x-100 z-1"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default HeroSection;
