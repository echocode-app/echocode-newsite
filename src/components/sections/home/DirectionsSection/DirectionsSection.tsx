import SectionContainer from '@/components/UI/SectionContainer';
import SectionGradientLine from '@/components/UI/SectionGradientLine';
import SectionTitle from '@/components/UI/SectionTitle';
import DirectionList from './DirectionList';

const DirectionSection = () => {
  return (
    <section className="pb-10 md:pb-25">
      <SectionGradientLine height="2" />
      <SectionContainer>
        <div className="mb-10">
          <SectionTitle>Service Directions</SectionTitle>
        </div>
        <DirectionList />
      </SectionContainer>
    </section>
  );
};

export default DirectionSection;
