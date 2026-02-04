import Image from "next/image";

import heroBg from "@/public/UI/hero-bg.png";

const HeroBackground = () => {
  return (
    <Image
      src={heroBg}
      alt="bg"
      className="block absolute top-0 left-[50%] translate-x-[-50%] z-[-1]"
      width={500}
      height={500}
    />
  );
};

export default HeroBackground;
