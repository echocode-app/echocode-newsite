import { Dispatch, SetStateAction } from 'react';

import NavLink from '../NavLink';
import MobileDropdownList from './MobileDropdownList';
import Image from 'next/image';

interface MobileNavListProps {
  onClose: () => void;
  isOpenDropdown: boolean;
  setIsOpenDropdown: Dispatch<SetStateAction<boolean>>;
}

const MobileNavList = ({ onClose, isOpenDropdown, setIsOpenDropdown }: MobileNavListProps) => {
  return (
    <ul className="flex flex-col items-center gap-8">
      <li>
        <button
          type="button"
          aria-expanded={isOpenDropdown}
          onClick={() => setIsOpenDropdown((prev) => !prev)}
          className={`relative flex gap-1  items-center font-main uppercase text-main-base-link text-center`}
        >
          Service Directions
          <div className="relative w-5 h-5">
            <Image
              src={'/UI/dropdown.svg'}
              alt="Dropdown"
              fill
              className={`${isOpenDropdown ? 'rotate-x-180' : 'rotate-x-0'} 
              transition-all duration-main`}
            />
          </div>
        </button>

        <MobileDropdownList
          isOpenDropdown={isOpenDropdown}
          onClose={onClose}
          onCloseDropdown={() => setIsOpenDropdown(false)}
        />
      </li>

      <li onClick={onClose}>
        <NavLink link="/portfolio">Portfolio</NavLink>
      </li>
      <li onClick={onClose}>
        <NavLink link="/team">Team</NavLink>
      </li>
      <li onClick={onClose}>
        <NavLink link="/career">Career</NavLink>
      </li>
      <li onClick={onClose}>
        <NavLink link="/partnership">Partnership</NavLink>
      </li>
    </ul>
  );
};

export default MobileNavList;
