import Link from "next/link";
import { ReactNode } from "react";

interface NavLinkProps {
  children: ReactNode;
  link: string;
}

const NavLink = ({ children, link }: NavLinkProps) => {
  return (
    <Link
      href={link}
      data-text={children}
      className="relative font-main uppercase text-main-base-link
      bg-main-gradient bg-clip-text bg-transparent
    transition-all duration-300
    hover:text-transparent hover:bg-clip-text 
    after:absolute after:left-0 after:-bottom-[-2px] after:h-px after:w-full 
    after:bg-main-gradient after:opacity-0  after:transition-opacity 
    after:duration-300 hover:after:opacity-100"
    >
      {children}
    </Link>
  );
};

export default NavLink;
