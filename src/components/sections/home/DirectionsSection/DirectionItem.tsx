import Image from 'next/image';

interface DirectionItemProps {
  position: string;
  image: string;
  title: string;
  description: string;
}

const DirectionItem = ({ position, image, title, description }: DirectionItemProps) => {
  return (
    <div
      className="relative flex flex-col sm:flex-row gap-4 
    md:before:content-[''] 
    md:before:absolute md:before:top-0 md:before:right-0
    md:before:bg-gray75 md:before:h-px md:before:w-6"
    >
      <div className="relative min-w-43 min-h-45 md:min-w-100 md:min-h-45 max-w-full">
        <Image
          src={image}
          fill
          alt={title}
          style={{ objectPosition: position }}
          className="object-cover rounded-secondary"
        />
      </div>
      <div>
        <h3 className="mb-2.5 font-title font-bold text-title-base md:text-title-2xl">{title}</h3>
        <p className="text-main-sm text-gray75">{description}</p>
      </div>
    </div>
  );
};

export default DirectionItem;
