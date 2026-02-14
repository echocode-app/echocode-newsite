import PortfolioItem from './PortfolioItem';

interface PortfolioListProps {
  list: { link: string; image: string; title: string }[];
}

const PortfolioList = ({ list }: PortfolioListProps) => {
  return (
    <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-10">
      {list.map((item, i) => (
        <PortfolioItem key={i} {...item} />
      ))}
    </ul>
  );
};

export default PortfolioList;
