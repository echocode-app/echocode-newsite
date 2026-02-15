import Image from 'next/image';

import PageTitle from '@/components/UI/PageTitle';
import SectionContainer from '@/components/UI/section/SectionContainer';

const HeroSection = () => {
  return (
    <section className="pt-31 md:pb-10">
      <SectionContainer>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-160">
            <PageTitle>Real product people</PageTitle>
          </div>
          <div className="relative w-50 h-50 md:min-w-65 md:h-71.5">
            <Image
              src={'/images/rabbits/hero/web.png'}
              alt="Team"
              fill
              priority
              className="object-cover -scale-x-100"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default HeroSection;
