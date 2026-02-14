import services from '@/data/services.json';
import servicesReverse from '@/data/services-reverse.json';

import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import ServiceList from './ServiceList';

const ServicesSection = () => {
  return (
    <section className="pb-10 md:pb-25">
      <SectionGradientLine height="1" />
      <SectionContainer>
        <div className="mb-2">
          <SectionTitle>Our services</SectionTitle>
        </div>
        <p className="max-w-128.5 mb-10 text-main-sm">
          We go beyond outsourcing. We become your dedicated tech partner, ensuring your product
          evolves with the market trends.
        </p>
        <div className="mb-4">
          <ServiceList list={services} />
        </div>
        <ServiceList list={servicesReverse} directionReverse={true} />
      </SectionContainer>
    </section>
  );
};

export default ServicesSection;
