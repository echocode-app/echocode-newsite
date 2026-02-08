import OrderButton from '@/components/UI/OrderButton';
import SectionContainer from '@/components/UI/SectionContainer';

export default function Home() {
  return (
    <>
      <section className="pt-45 pb-36.5 md:pt-41.5 md:pb-13.5">
        <SectionContainer>
          <h1
            className="max-w-85.5 mx-auto mb-4 font-title text-title-3xl text-center 
        md:max-w-170 md:text-title-6xl"
          >
            Echocode: Digital Studio
          </h1>
          <p className="mb-4.5 text-[10px] text-center md:text-main-base md:mb-9">
            Accelerate your digital products with expert IT development.
          </p>
          <OrderButton />
        </SectionContainer>
      </section>
    </>
  );
}
