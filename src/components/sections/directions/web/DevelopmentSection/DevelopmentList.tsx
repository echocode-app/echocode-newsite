import CycleCard from '../../components/CycleCard';

const DevelopmentList = () => {
  return (
    <ul className="flex justify-center flex-wrap gap-6">
      <li className="max-w-58">
        <CycleCard
          title={'01. ANALYSIS'}
          subTitle={'DISCOVERY'}
          desc={'Deep analysis of business logic, market landscape, and technical feasibility.'}
        />
      </li>
      <li className="max-w-58">
        <CycleCard
          title={'02. VISION'}
          subTitle={'DESIGN'}
          desc={'Architectural blueprinting, technical documentation, and UX prototyping.'}
        />
      </li>
      <li className="max-w-58">
        <CycleCard
          title={'03. BUILD'}
          subTitle={'CODING'}
          desc={'Modular code development using best practices and automated testing suites.'}
        />
      </li>
      <li className="max-w-58">
        <CycleCard
          title={'04. OPTIMIZATION'}
          subTitle={'SCALE'}
          desc={'Deployment, load monitoring, and continuous performance fine-tuning.'}
        />
      </li>
    </ul>
  );
};

export default DevelopmentList;
