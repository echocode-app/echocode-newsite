import projects from '@/data/projects.json';

import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import PortfolioList from './PortfolioList';

const PortfolioSection = () => {
  return (
    <section className="pb-10 md:pb-25">
      <SectionGradientLine height="1" />
      <SectionContainer>
        <div className="mb-2">
          <SectionTitle>Portfolio</SectionTitle>
        </div>
        <p className="max-w-146.5 mb-10 text-main-sm">
          Our latest work. From scalable platforms to niche mobile apps, we deliver technology that
          works for your business.
        </p>
        <PortfolioList list={projects} />
      </SectionContainer>
    </section>
  );
};

export default PortfolioSection;
