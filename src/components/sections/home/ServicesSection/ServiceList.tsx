import ServiceItem from './ServiceItem';

interface ServiceListProps {
  list: { image: string; desc: string }[];
  directionReverse?: boolean;
}

const ServiceList = ({ list, directionReverse }: ServiceListProps) => {
  const doubled = [...list, ...list];

  return (
    <div className="overflow-hidden group mask-[linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]">
      <ul
        className={`flex w-max ${
          directionReverse
            ? 'animate-[marquee-reverse_30s_linear_infinite]'
            : 'animate-[marquee_30s_linear_infinite]'
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map(({ image, desc }, i) => (
          <ServiceItem key={i} image={image} desc={desc} />
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
