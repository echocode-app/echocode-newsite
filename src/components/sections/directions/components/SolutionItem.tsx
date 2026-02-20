interface SolutionItemProps {
  title: string;
  desc: string;
  technologies: string[];
}

const SolutionItem = ({ title, desc, technologies }: SolutionItemProps) => {
  return (
    <li className="flex flex-col gap-3 py-3">
      <h3 className="font-title">{title}</h3>
      <p className="text-main-sm text-gray75">{desc}</p>
      <ul className="flex gap-3 text-accent text-main-sm justify-end">
        {technologies.map((item, i) => (
          <li key={i} className="px-2">
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SolutionItem;
