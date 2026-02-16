interface CycleCardProps {
  title: string;
  subTitle: string;
  desc: string;
}

const CycleCard = ({ title, subTitle, desc }: CycleCardProps) => {
  return (
    <article className="group flex flex-col gap-3 ">
      <p
        className="font-title text-title-xs leading-2.5 text-accent text-center sm:text-left
      group-hover:text-accent-hover duration-main pointer-events-none"
      >
        {title}
      </p>
      <h3 className="font-title text-title-base pointer-events-none">{subTitle}</h3>
      <p className="text-main-sm text-gray75 pointer-events-none">{desc}</p>
    </article>
  );
};

export default CycleCard;
