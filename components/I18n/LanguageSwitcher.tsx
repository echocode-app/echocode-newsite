import Image from 'next/image';

import globe from '@/public/UI/globe.svg';

const LanguageSwitcher = () => {
  return (
    <button
      className="flex items-center gap-2 xl:ml-14.25 px-3 py-1.5 shadow-main
       border-accent border-2 rounded-button-main cursor-pointer"
    >
      <div className="relative w-6 h-5">
        <Image src={globe} alt="Globe" fill />
      </div>
      <p className="font-title text-[10px] sm:text-title-xs">EN</p>
    </button>
  );
};

export default LanguageSwitcher;
