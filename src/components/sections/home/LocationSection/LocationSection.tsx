import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import LocationList from './LocationList';

const LocationSection = () => {
  return (
    <section className="pb-18.5 md:pb-4">
      <SectionGradientLine height="1" />
      <SectionContainer>
        <div className="mb-2">
          <SectionTitle>Our locations</SectionTitle>
        </div>
        <p className="mb-10 max-w-128.5 text-main-sm ">
          Global footprint, local expertise. With distributed teams and strategic offices, we
          deliver high-end solutions to clients worldwide
        </p>
        <LocationList />
      </SectionContainer>
    </section>
  );
};

export default LocationSection;
