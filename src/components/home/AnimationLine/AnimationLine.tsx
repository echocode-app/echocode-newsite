import AnimationItem from './AnimationItem';

const items = [
  'MOBILE APPS',
  'WEB SOLUTIONS',
  'IGAMING PRODUCTS',
  'QA TESTING',
  'animation',
  'UI／UX DESIGN',
  'MOBILE APPS',
  'WEB SOLUTIONS',
  'IGAMING PRODUCTS',
  'QA TESTING',
  'animation',
  'UI／UX DESIGN',
];

const AnimationLine = () => {
  return (
    <div
      className="max-w-322.5 mx-auto py-2 md:py-4  px-8  bg-invert-main-gradient overflow-hidden
     md:mask-[linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]"
    >
      <div className="flex w-max animate-[marquee_50s_linear_infinite]">
        <ul className="flex gap-2 md:gap-4 pr-2 md:pr-4">
          {items.map((item, index) => (
            <li key={index}>
              <AnimationItem>{item}</AnimationItem>
            </li>
          ))}
        </ul>

        <ul className="flex gap-2 md:gap-4 pr-2 md:pr-4">
          {items.map((item, index) => (
            <li key={`copy-${index}`}>
              <AnimationItem>{item}</AnimationItem>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnimationLine;
