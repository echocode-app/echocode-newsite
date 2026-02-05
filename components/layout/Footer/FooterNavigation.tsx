import FooterNavLink from './FooterNavLink';

const FooterNavigation = () => {
  return (
    <div className="py-8 px-4 bg-white rounded-base">
      <h4 className="mb-2.5 font-title text-title-xs text-accent">Echocode.app</h4>
      <p className="max-w-66 mb-8 text-main-xs leading-[1.2] text-secondary-gray">
        We design digital architectures that change the game. Every pixel and line of code is
        engineered for peak performance.
      </p>
      <div className="flex gap-4">
        <div>
          <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
            STUDIO
          </h3>
          <ul className="flex flex-col gap-1 w-36.5">
            <FooterNavLink link="/">Services</FooterNavLink>
            <FooterNavLink link="/">Portfolio</FooterNavLink>
            <FooterNavLink link="/">Partnership</FooterNavLink>
            <FooterNavLink link="/">Careers</FooterNavLink>
          </ul>
        </div>
        <div>
          <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
            Subscribe to
          </h3>
          <ul className="flex flex-col gap-1 w-36.5">
            <FooterNavLink link="/">LinkedIn →</FooterNavLink>
            <FooterNavLink link="/">Upwork →</FooterNavLink>
            <FooterNavLink link="/">Freelancehunt →</FooterNavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterNavigation;
