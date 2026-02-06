import Link from 'next/link';

import NavList from './NavList';

import LanguageSwitcher from '@/components/I18n/LanguageSwitcher';
import Logo from '@/components/UI/Logo';
import SectionContainer from '@/components/UI/SectionContainer';

const Header = () => {
  return (
    <header
      className="fixed py-11  w-full z-100 before:absolute before:inset-0
    before:bg-header-gradient
    before:backdrop-blur-md
    before:z-0"
    >
      <SectionContainer>
        <div className="flex justify-between items-center z-10">
          <Link href={'/'} className="flex items-center mr-9.25 gap-3 z-10">
            <Logo />
            <p className="hidden xl:block font-title text-title-xs">Echocode.app</p>
          </Link>
          <div>
            <NavList />
          </div>
          <LanguageSwitcher />
        </div>
      </SectionContainer>
    </header>
  );
};

export default Header;
