import DropdownList from './DropdownList';
import NavLink from './NavLink';

const NavList = () => {
  return (
    <nav>
      <ul className="hidden md:flex gap-4 xl:gap-8">
        <li className="relative group z-100">
          <NavLink link={'/service-direction'}>Service Directions</NavLink>
          <DropdownList />
        </li>
        <li>
          <NavLink link={'/portfolio'}>Portfolio</NavLink>
        </li>
        <li>
          <NavLink link={'/team'}>Team</NavLink>
        </li>
        <li>
          <NavLink link={'/career'}>career</NavLink>
        </li>
        <li>
          <NavLink link={'/partnership'}>partnership</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavList;
