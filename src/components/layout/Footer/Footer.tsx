import Arrow from './Arrow';
import FooterNavigation from './FooterNavigation';
import License from './License';

const Footer = () => {
  return (
    <footer className="pt-10 pb-6">
      <div className="max-w-318.5 mx-auto px-4 md:px-8">
        <div className="mb-4 md:mb-12 md:flex md:justify-between md:items-center">
          <h2 className="font-extra font-extrabold text-[40px] leading-none">
            HAVE A PROJECT IN MIND?
          </h2>
          <button
            className="hidden md:block min-w-64.5 px-6 py-4 font-title text-title-base 
          leading-[1.4] tracking-[0.64px] border rounded-primary border-gray60 cursor-pointer"
          >
            Contact us
          </button>
        </div>
        <strong className="md:hidden block mb-2 font-medium leading-none text-[12px]">
          Just send us your contact email and we will contact you.
        </strong>
        <button
          className="md:hidden flex justify-between items-center w-full mb-12 pl-3.5 pr-6 py-2 
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
        <License />
      </div>
    </footer>
  );
};

export default Footer;
