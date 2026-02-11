import Image from 'next/image';

interface ErrorPageProps {
  code: string;
  title: string;
  description: string;
}

const ErrorPage = ({ code, title, description }: ErrorPageProps) => {
  return (
    <section className="relative pt-57 pb-25 lg:pt-27.5 lg:pb-0 overflow-hidden">
      <div
        className="hidden lg:block absolute top-50% left-1/2
           -translate-x-22.5 -translate-y-17.5 w-209 h-161.25 
            -z-10 pointer-events-none"
      >
        <Image
          src="/UI/backgrounds/error-bg.svg"
          alt="Error"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="max-w-270.5 w-full mx-auto px-8 flex items-center ">
        <div>
          <h1
            className="mb-3 text-[28px] sm:text-[50px] md:text-[80px]
             font-bold tracking-[6px] md:tracking-[10px]"
          >
            {code}-error
          </h1>
          <p
            className="mb-6 max-w-[320px] md:max-w-137.5 lg:max-w-full
             text-[18px] sm:text-[22px] md:text-[40px] font-semibold tracking-[2px] uppercase"
          >
            {title}
          </p>
          <p
            className="max-w-[320px] lg:max-w-142.5 text-[14px]
             md:text-[18px] text-[#A1A1AA]"
          >
            {description}
          </p>
        </div>
        <div className="relative hidden lg:block z-10 w-lg h-149.5">
          <Image
            src={'/images/rabbits/error.png'}
            alt="Rabbit"
            fill
            className="z-100 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
