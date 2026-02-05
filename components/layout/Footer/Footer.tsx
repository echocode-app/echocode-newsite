import SectionContainer from '@/components/UI/SectionContainer';
import Arrow from './Arrow';
import FooterNavigation from './FooterNavigation';

const Footer = () => {
  return (
    <footer className="pt-10 pb-6">
      <SectionContainer>
        <h2 className="mb-4 font-extra font-extrabold text-[40px] leading-none">
          HAVE A PROJECT IN MIND?
        </h2>
        <strong className="block mb-2 font-medium leading-none text-[12px]">
          Just send us your contact email and we will contact you.
        </strong>
        <button
          className="flex justify-between items-center w-full mb-12 pl-3.5 pr-6 py-2 
        rounded-secondary border-gray60 border cursor-pointer"
        >
          <div>
            <p className="font-title text-[10px] text-left leading-[1.4] tracking-[0.4px]">
              Your email
            </p>
            <span className="text-main-xs  text-primary-gray">tamplate@mail.com</span>
          </div>
          <Arrow />
        </button>
        <FooterNavigation />
      </SectionContainer>
    </footer>
  );
};

export default Footer;
