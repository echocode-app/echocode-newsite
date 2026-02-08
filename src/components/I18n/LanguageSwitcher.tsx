import Image from 'next/image';

const LanguageSwitcher = () => {
  return (
    <button
      className="flex items-center gap-2 xl:ml-14.25 px-3 py-1.5 shadow-main
       border-accent border-2 rounded-primary cursor-pointer"
    >
      <div className="relative w-6 h-5">
        <Image src="/UI/globe.svg" alt="Globe" fill />
      </div>
      <p className="font-title text-[10px] sm:text-title-xs">EN</p>
    </button>
  );
};

export default LanguageSwitcher;
