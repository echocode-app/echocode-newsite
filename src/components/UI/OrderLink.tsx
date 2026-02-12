import Link from 'next/link';

const OrderLink = () => {
  return (
    <Link
      href="/contact"
      scroll={false}
      className="block mx-auto max-w-32.5 md:max-w-48.5 px-4 py-2 
     font-title text-[8px] font-bold rounded-lg bg-accent cursor-pointer
     md:text-title-xs md:px-6 md:rounded-base"
    >
      Place an Order
    </Link>
  );
};

export default OrderLink;
