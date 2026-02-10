'use client';

import { useRouter } from 'next/navigation';

const OrderButton = () => {
  const router = useRouter();

  const openModal = () => {
    router.push('/?modal=open');
  };

  return (
    <button
      onClick={openModal}
      className="block mx-auto px-4 py-2 
     font-title text-[8px] font-bold rounded-lg bg-accent cursor-pointer
     md:text-title-xs md:px-7 md:rounded-base"
    >
      Place an Order
    </button>
  );
};

export default OrderButton;
