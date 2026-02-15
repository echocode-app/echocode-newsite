import Image from 'next/image';

interface CarouselItemProps {
  image: string;
  desc: string;
}

const CarouselItem = ({ image, desc }: CarouselItemProps) => {
  return (
    <li className="w-34.5 px-6.5 py-3 mr-3 bg-accent rounded-secondary">
      <div className="relative w-22 h-full">
        <Image src={image} fill alt={desc} className="object-contain" />
      </div>
    </li>
  );
};

export default CarouselItem;
