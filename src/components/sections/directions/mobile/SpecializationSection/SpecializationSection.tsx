import Image from 'next/image';

import specializations from '@/data/directions/specializations.json';

import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import SpecializationList from './SpecializationList';

const SpecializationSection = () => {
  return (
    <section>
      <SectionGradientLine height="1" />
      <SectionContainer>
        <div className="flex justify-between gap-10">
          <div className="lg:w-120">
            <div className="mb-2.5">
              <SectionTitle>PROFESSIONAL SPECIALIZATION</SectionTitle>
            </div>
            <p className="mb-10 text-main-sm">
              We are focused on building products that deliver predictable results. Our expertise
              spans complex technical solutions and efficient monetization models.
            </p>
            <div className="relative w-120 h-[252px] overflow-hidden">
              <Image
                src={'/images/rabbits/specialization.png'}
                alt="Specialization"
                fill
                className="object-cover scale-125"
              />
            </div>
          </div>
          <SpecializationList list={specializations} />
        </div>
      </SectionContainer>
    </section>
  );
};

export default SpecializationSection;
