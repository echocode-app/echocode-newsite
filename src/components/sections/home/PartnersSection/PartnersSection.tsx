import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import PartnersList from './PartnerList';
import Image from 'next/image';

const PartnersSection = () => {
  return (
    <section className="pb-25">
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
            className="object-contain"
          />
          <PartnersList />
        </div>
      </SectionContainer>
    </section>
  );
};

export default PartnersSection;
