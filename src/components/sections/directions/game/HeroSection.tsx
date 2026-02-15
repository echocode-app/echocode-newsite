import Image from 'next/image';

import PageTitle from '@/components/UI/PageTitle';
import SectionContainer from '@/components/UI/section/SectionContainer';

const HeroSection = () => {
  return (
    <section className="pt-31 pb-2">
      <SectionContainer>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="max-w-115">
              <PageTitle>LEVEL UP Reality</PageTitle>
            </div>
            <p className="font-title text-title-sm text-center md:text-start mt-4">
              Game Development
            </p>
          </div>
          <div className="relative w-50 h-50 md:w-79.5 md:h-79.5">
            <Image
              priority
              src={'/images/rabbits/hero/game.png'}
              alt="Game"
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
