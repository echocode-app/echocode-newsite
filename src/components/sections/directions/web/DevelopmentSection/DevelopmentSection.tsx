import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import DevelopmentList from './DevelopmentList';

const DevelopmentSection = () => {
  return (
    <section className="pb-10 md:pb-6">
      <SectionGradientLine height="1" />
      <SectionContainer>
        <div className="mb-10">
          <SectionTitle>DEVELOPMENT CYCLE</SectionTitle>
        </div>
        <DevelopmentList />
      </SectionContainer>
    </section>
  );
};

export default DevelopmentSection;
