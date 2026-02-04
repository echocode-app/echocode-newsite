import Image from 'next/image';

import logo from '@/public/UI/logo.svg';

const Logo = () => {
  return <Image src={logo} alt="Logo" width={46} height={40} />;
};

export default Logo;
