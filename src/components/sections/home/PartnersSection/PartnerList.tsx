import PartnerItem from './PartnerItem';

const patrners = [
  {
    image: '/images/partners/light.png',
    desc: 'Light Apps',
    scale: '2',
  },
  {
    image: '/images/partners/keen.svg',
    desc: 'Keen Ethics',
    scale: '1',
  },
  {
    image: '/images/partners/solutions.svg',
    desc: 'Solutions',
    scale: '1.5',
  },
  {
    image: '/images/partners/omisoft.svg',
    desc: 'Omisoft',
    scale: '0.8',
  },
  {
    image: '/images/partners/rock.svg',
    desc: 'Rock',
    scale: '1',
  },
  {
    image: '/images/partners/royal.svg',
    desc: 'Royal',
    scale: '2',
  },
  {
    image: '/images/partners/sousa.png',
    desc: 'Sousa Soft',
    scale: '1.8',
  },
  {
    image: '/images/partners/amo.png',
    desc: 'Amo Apps',
    scale: '1.4',
  },
  {
    image: '/images/partners/cat.png',
    desc: 'Cat',
    scale: '2.4',
  },
];

const PartnerList = () => {
  const double = [...patrners, ...patrners];

  return (
    <div className="relative overflow-hidden group">
      <ul
        className="flex items-center h-28 w-max animate-[marquee_40s_linear_infinite]
       group-hover:[animation-play-state:paused]"
      >
        {double.map((items, i) => (
          <PartnerItem key={i} {...items} />
        ))}
      </ul>
    </div>
  );
};

export default PartnerList;
