import { ReactNode } from 'react';
import Link from 'next/link';

interface FooterSocialLinkProps {
  children: ReactNode;
  link: string;
}

const FooterSocialLink = ({ children, link }: FooterSocialLinkProps) => {
  return (
    <Link
      href={link}
      target="blank"
      className="block w-full text-main-base text-base-gray hover:text-accent duration-main"
    >
      {children}
    </Link>
  );
};

export default FooterSocialLink;
