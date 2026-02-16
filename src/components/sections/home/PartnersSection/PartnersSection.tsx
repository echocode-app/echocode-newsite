import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import PartnersList from './PartnerList';
import Image from 'next/image';

const PartnersSection = () => {
  return (
    <section className="pb-10 md:pb-25">
      <SectionGradientLine height="2" />
      <SectionContainer>
        <div className="mb-10">
          <SectionTitle>Partners</SectionTitle>
        </div>
        <div className="relative flex items-center py-19.25 h-70 w-full overflow-hidden">
          <Image
            src={'/UI/backgrounds/partners-bg.png'}
            fill
            alt="Partners"
            className="object-cover"
          />
          <PartnersList />
          {/* <div
            className="absolute inset-0 pointer-events-none z-20 h-full 
           md:bg-[linear-gradient(to_right,black_0%,transparent_1%,transparent_99%,black_100%)]
           bg-[linear-gradient(to_right,black_0%,transparent_15%,transparent_85%,black_100%)]"
          /> */}
        </div>
      </SectionContainer>
    </section>
  );
};

export default PartnersSection;
