import CycleCard from '../../components/CycleCard';

interface SpecializationListProps {
  list: { title: string; subTitle: string; desc: string }[];
}

const SpecializationList = ({ list }: SpecializationListProps) => {
  return (
    <ul className="flex flex-wrap gap-6 min-w-120">
      {list.map((item, i) => (
        <li key={i} className="max-w-57 p-3">
          <CycleCard {...item} />
        </li>
      ))}
    </ul>
  );
};

export default SpecializationList;
