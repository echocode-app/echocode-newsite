import Image from 'next/image';

interface ServiceItemProps {
  image: string;
  desc: string;
}

const ServiceItem = ({ image, desc }: ServiceItemProps) => {
  return (
    <li className="w-33 px-5 py-4 mr-4 bg-gray7 rounded-secondary ">
      <div className="relative w-23 h-12">
        <Image src={image} fill alt={desc} sizes="92px" className="object-contain" />
      </div>
    </li>
  );
};

export default ServiceItem;
