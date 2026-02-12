import Counter from './Counter';
import MetricsItem from './MetricsItem';

const MetricsList = () => {
  return (
    <ul className="hidden md:flex justify-center md:flex-col lg:flex-row gap-16 lg:gap-4 xl:gap-8">
      <div className="flex justify-center items-center gap-16  lg:gap-4 xl:gap-8 ">
        <MetricsItem>
          <div className="flex items-end gap-0.5 font-title text-title-2xl mb-3 text-white">
            <div className="w-16.5">
              <Counter to={250} />
            </div>
            <span>+</span>
          </div>
          <p>Custom products delivered worldwide</p>
        </MetricsItem>
        <MetricsItem>
          <div className="flex items-baseline-last gap-px font-title text-title-2xl mb-3 text-white">
            <div className="w-19">
              <Counter to={99.9} decimals={1} />
            </div>
            <span className="flex items-center text-[12px] align-text-top leading-5.5">%</span>
          </div>
          <p>Senior and Middle Level IT Experts</p>
        </MetricsItem>
      </div>
      <div className="flex justify-center items-center gap-16 lg:gap-4 xl:gap-8 ">
        <MetricsItem>
          <div className="flex items-center gap-3 font-title text-title-2xl mb-3 text-white">
            <div className="w-8.75">
              <Counter to={14} />
            </div>
            <span className="block font-title text-title-2xl text-white">days</span>
          </div>
          <p>Average time from idea to a clickable prototype</p>
        </MetricsItem>
        <MetricsItem>
          <div className="flex items-baseline-last gap-px font-title text-title-2xl mb-3 text-white">
            <div className="w-11.5">
              <Counter to={95} />
            </div>
            <span className="flex items-center text-[12px] leading-5.5">%</span>
          </div>
          <p>Client return bringing next big ideas to life</p>
        </MetricsItem>
      </div>
    </ul>
  );
};

export default MetricsList;
