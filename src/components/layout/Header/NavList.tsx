import DropdownList from './DropdownList';
import NavLink, { navLinkBaseClass } from './NavLink';

const NavList = () => {
  return (
    <nav>
      <ul className="flex gap-4 xl:gap-8">
        <li className="relative group z-100">
          <button
            type="button"
            data-text="Service Directions"
            aria-haspopup="menu"
            className={navLinkBaseClass}
          >
            Service Directions
          </button>
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
