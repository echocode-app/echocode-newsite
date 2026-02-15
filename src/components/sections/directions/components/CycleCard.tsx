interface CycleCardProps {
  title: string;
  subTitle: string;
  desc: string;
}

const CycleCard = ({ title, subTitle, desc }: CycleCardProps) => {
  return (
    <article className="flex flex-col gap-3 ">
      <p className="font-title text-title-xs leading-2.5 text-accent text-center sm:text-left">
        {title}
      </p>
      <h3 className="font-title text-title-base">{subTitle}</h3>
      <p className="text-main-sm text-gray75">{desc}</p>
    </article>
  );
};

export default CycleCard;
