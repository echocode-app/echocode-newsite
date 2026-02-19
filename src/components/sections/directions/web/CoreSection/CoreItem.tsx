interface CoreItemProps {
  title: string;
  desc: string;
}

const CoreItem = ({ title, desc }: CoreItemProps) => {
  return (
    <li className="p-3 max-w-79 h-40 rounded-secondary border border-[#343434] hover:border-accent duration-main">
      <h3 className="font-title mb-3 pointer-events-none">{title}</h3>
      <p className="text-main-sm text-gray75 pointer-events-none">{desc}</p>
    </li>
  );
};

export default CoreItem;
