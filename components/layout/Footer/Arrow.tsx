import Image from 'next/image';

import arrow from '@/public/UI/right-arrow.svg';

const Arrow = () => {
  return (
    <div className="relative w-4.5 h-2.5">
      <Image src={arrow} fill alt="Right Arrow" />
    </div>
  );
};

export default Arrow;
