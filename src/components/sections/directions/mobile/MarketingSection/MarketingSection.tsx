import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';

const MarketingSection = () => {
  return (
    <section>
      <SectionContainer>
        <SectionGradientLine height="1" />
        <SectionTitle>GROWTH & MARKETING</SectionTitle>
        <p>
          Professional development is only half of the story. We help products become visible in
          stores using proven optimization methods and strategic promotion.
        </p>
      </SectionContainer>
    </section>
  );
};

export default MarketingSection;
