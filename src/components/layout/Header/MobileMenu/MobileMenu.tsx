'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

import MobaileNavList from './MobileNavList';
import LanguageSwitcher from '@/components/I18n/LanguageSwitcher';
import Logo from '@/components/UI/Logo';
import Link from 'next/link';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  useLockBodyScroll(isOpen);

  const handleCloseAll = () => {
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden relative w-10 h-10">
        <Image src={'/UI/burger-menu.svg'} fill alt="Menu" />
      </button>

      <div
        className={`${isOpen ? 'translate-x-0' : 'translate-x-full'}
         md:hidden fixed top-0 left-0 w-full h-screen py-11 px-4
         backdrop-blur-md bg-header-gradient z-300 bg-black
          transition-all duration-main overflow-x-scroll
         `}
      >
        <div className="flex justify-between mb-7">
          <Link href={'/'} onClick={handleCloseAll}>
            <Logo />
          </Link>
          <LanguageSwitcher />
        </div>
        <MobaileNavList
          onClose={handleCloseAll}
          isOpenDropdown={isOpenDropdown}
          setIsOpenDropdown={setIsOpenDropdown}
        />
      </div>
    </>
  );
};

export default MobileMenu;
