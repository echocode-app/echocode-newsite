import Image from 'next/image';

import PageTitle from '@/components/UI/PageTitle';
import SectionContainer from '@/components/UI/section/SectionContainer';

const HeroSection = () => {
  return (
    <section className="pt-45 md:pt-41.5">
      <SectionContainer>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-135">
            <PageTitle>Build great products</PageTitle>
          </div>
          <div className="relative w-50 h-59.5 md:w-70 md:h-85">
            <Image
              src={'/images/rabbits/hero/career.png'}
              alt="Career"
              fill
              className="object-cover -scale-x-100"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default HeroSection;
