import Image from 'next/image';

const HeroBackground = () => {
  return (
    <div
      className="absolute top-31 left-[50%] w-screen h-[48vh]
       md:top-20 md:w-[70vw] md:h-[76vh] max-w-190 max-h-173.5
    translate-x-[-50%] backdrop-blur-[10px] -z-10"
    >
      <div className="relative w-full h-full ">
        <Image
          src={'/UI/backgrounds/hero-bg.png'}
          alt="bg"
          priority
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default HeroBackground;
