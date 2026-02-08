import Image from 'next/image';

const Arrow = () => {
  return (
    <div className="relative w-4.5 h-2.5">
      <Image src="/UI/right-arrow.svg" fill alt="Right Arrow" />
    </div>
  );
};

export default Arrow;
