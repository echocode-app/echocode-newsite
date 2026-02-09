import NavLink from '../NavLink';

interface MobileDropdownListProps {
  onClose: () => void;
  onCloseDropdown: () => void;
  isOpenDropdown: boolean;
}

const mobileDashItem = `
    relative pl-5
    before:absolute
    before:left-0
    before:top-1/2
    before:-translate-y-1/2
    before:w-3
    before:h-px
    before:bg-current
    before:opacity-50

    md:pl-0
    md:before:hidden
  `;

const MobileDropdownList = ({
  onClose,
  onCloseDropdown,
  isOpenDropdown,
}: MobileDropdownListProps) => {
  const handleClose = () => {
    onCloseDropdown();
    onClose();
  };

  return (
    <div
      className={`
        overflow-hidden
        transition-all duration-300 ease-out
        ${isOpenDropdown ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      <ul className="flex flex-col pt-8 gap-8 min-w-44 text-primary-gray md:text-current">
        <li onClick={handleClose} className={mobileDashItem}>
          <NavLink link="/service-direction/mobile-development">Mobile Development</NavLink>
        </li>

        <li onClick={handleClose} className={mobileDashItem}>
          <NavLink link="/service-direction/web-development">Web Development</NavLink>
        </li>

        <li onClick={handleClose} className={mobileDashItem}>
          <NavLink link="/service-direction/game-development">Game Development</NavLink>
        </li>

        <li onClick={handleClose} className={mobileDashItem}>
          <NavLink link="/service-direction/igaming">iGaming</NavLink>
        </li>

        <li onClick={handleClose} className={mobileDashItem}>
          <NavLink link="/service-direction/design">Design</NavLink>
        </li>

        <li onClick={handleClose} className={mobileDashItem}>
          <NavLink link="/service-direction/qa">QA</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MobileDropdownList;
