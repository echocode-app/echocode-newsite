import FooterNavLink from './FooterNavLink';
import FooterSocialLink from './FooterSocialLink';
import EmailLink from '../EmailLink';
import Link from 'next/link';
import SocailLinks from './SocialLinks';

const FooterNavigation = () => (
  <div className="mb-12 py-8 px-4 lg:px-10 lg:flex lg:justify-between bg-white rounded-base">
    <div className="md:flex md:justify-between md:mb-8 lg:mb-0 lg:w-185.5">
      <div>
        <Link href={'/'} className="block mb-2.5 font-title text-title-xs text-accent">
          Echocode.app
        </Link>
        <p className="w-66 mb-8 md:mb-0 text-main-xs leading-[1.2] text-secondary-gray">
          We design digital architectures that change the game. Every pixel and line of code is
          engineered for peak performance.
        </p>
      </div>
      <div className="flex gap-4 mb-8 md:mb-0">
        <div>
          <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
            STUDIO
          </h3>
          <ul className="flex flex-col gap-1 w-36.5 lg:w-51">
            <FooterNavLink link="/service-direction/mobile-development">Services</FooterNavLink>
            <FooterNavLink link="/portfolio">Portfolio</FooterNavLink>
            <FooterNavLink link="/partnership">Partnership</FooterNavLink>
            <FooterNavLink link="/career">Careers</FooterNavLink>
          </ul>
        </div>
        <div>
          <h3 className="mb-6 font-title text-[10px] text-base-gray opacity-65 tracking-[0.4px] uppercase">
            Subscribe to
          </h3>
          <ul className="flex flex-col gap-1 w-36.5 lg:w-34.5">
            <FooterSocialLink link="http://linkedin.com/company/echocode">
              LinkedIn →
            </FooterSocialLink>
            <FooterSocialLink link="http://linkedin.com/company/echocode">
              Upwork →
            </FooterSocialLink>
            <FooterSocialLink link="http://linkedin.com/company/echocode">
              Freelancehunt →
            </FooterSocialLink>
            <FooterSocialLink link="http://linkedin.com/company/echocode">
              Behance →
            </FooterSocialLink>
          </ul>
        </div>
      </div>
    </div>
    <div className="lg:flex lg:flex-col lg:justify-between">
      <EmailLink />
      <SocailLinks />
    </div>
  </div>
);

export default FooterNavigation;
