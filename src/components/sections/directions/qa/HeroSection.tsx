import Image from 'next/image';

import PageTitle from '@/components/UI/PageTitle';
import SectionContainer from '@/components/UI/section/SectionContainer';

const HeroSection = () => {
  return (
    <section className="pt-31 md:pb-1.5">
      <SectionContainer>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="max-w-170">
              <PageTitle>Your Stability Is Your Profit</PageTitle>
            </div>
            <p className="font-title text-title-sm text-center md:text-start mt-4 mb-2 md:md-0">
              quality assurance
            </p>
          </div>
          <div className="relative w-50 h-59.5 md:w-65 md:h-80">
            <Image
              src={'/images/rabbits/hero/qa.png'}
              alt="QA"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default HeroSection;
