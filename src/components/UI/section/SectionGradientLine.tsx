interface SectionGradientLineProps {
  height: string;
}

const SectionGradientLine = ({ height }: SectionGradientLineProps) => {
  return (
    <div className="md:px-8 mb-6">
      <div
        className={`bg-main-gradient w-full max-w-250 mx-auto`}
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

export default SectionGradientLine;
