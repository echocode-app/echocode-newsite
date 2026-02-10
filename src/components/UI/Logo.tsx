import Image from 'next/image';

const Logo = () => {
  return (
    <div className="relative w-11.5 h-10">
      <Image src="/UI/logo.png" alt="Logo" fill />
    </div>
  );
};

export default Logo;
