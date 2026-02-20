import Image from 'next/image';

const SolutionsImage = () => {
  return (
    <div className="hidden lg:block relative w-96.5 h-130 overflow-hidden">
      <Image
        src={'/images/directions/igaming/igaming.png'}
        alt="IGaming"
        fill
        className="object-contain scale-160 translate-x-28"
      />
    </div>
  );
};

export default SolutionsImage;
