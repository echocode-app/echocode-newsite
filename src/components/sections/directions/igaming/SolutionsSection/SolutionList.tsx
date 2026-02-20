import SolutionItem from '../../components/SolutionItem';

import solutions from '@/data/directions/solutions.json';

const SolutionList = () => {
  return (
    <ul className="max-w-141 flex flex-col gap-6">
      <li className="flex flex-col gap-3 py-3">
        <h3 className="font-title">􀇻 Technology Stack</h3>
        <p className="text-main-sm text-gray75">
          Development and maintenance of systems of any complexity. We create infrastructure that
          withstands peak loads and ensures seamless{' '}
          <span className="underline">operation of your assets globally.</span>
        </p>
        <ul className="flex gap-3 text-accent text-main-sm justify-end">
          {['#Native', '#PWA / Web.js'].map((item, i) => (
            <li key={i} className="px-2">
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </li>
      {solutions.map((items, i) => (
        <SolutionItem key={i} {...items} />
      ))}
    </ul>
  );
};

export default SolutionList;
