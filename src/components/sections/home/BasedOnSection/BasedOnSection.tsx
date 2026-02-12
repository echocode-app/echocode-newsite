import BasedOnVideo from './BasedOnVideo';
import MetricsList from './MetricsList';

import SectionContainer from '@/components/UI/SectionContainer';

const BasedOnSection = () => {
  return (
    <section className="pt-12.5 pb-10 md:pt-15 md:pb-25">
      <SectionContainer>
        <h2 className="mb-3 mx-auto font-title text-title-base max-w-89.5 md:max-w-153.5 md:text-[20px] text-center">
          SPECIALIZING IN THE FULL CYCLE OF MOBILE <span className="text-[9px]">&</span> WEB
          DEVELOPMENT
        </h2>
        <p className="max-w-152 mb-10 mx-auto text-main-sm">
          We don’t just code; we build digital power. Our team blends deep tech expertise with
          strategy to deliver products that outperform the market and redefine user experience.
        </p>
        <BasedOnVideo />
        <MetricsList />
      </SectionContainer>
    </section>
  );
};

export default BasedOnSection;
