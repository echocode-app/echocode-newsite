import PartnerItem from './PartnerItem';

interface PartnerListProps {
  list: { image: string; desc: string; scale: string }[];
}

const PartnerList = ({ list }: PartnerListProps) => {
  const double = [...list, ...list];

  return (
    <div className="relative overflow-hidden group">
      <ul
        className="flex items-center h-28 w-max animate-[marquee_40s_linear_infinite]
       group-hover:[animation-play-state:paused]"
      >
        {double.map((items, i) => (
          <PartnerItem key={i} {...items} />
        ))}
      </ul>
    </div>
  );
};

export default PartnerList;
