const MarketingList = () => {
  return (
    <ul className="flex flex-wrap justify-center gap-6">
      <li className="p-3 max-w-122 rounded-lg border-l-2 border-accent">
        <h3 className="font-title mb-3">ASO Optimization</h3>
        <p className="text-main-sm text-gray75">
          Scaling to the TOP for targeted keywords in the App Store and Google Play to gain stable
          organic traffic and lower acquisition costs.
        </p>
      </li>
      <li className="p-3 max-w-122 rounded-lg border-l-2 border-accent">
        <h3 className="font-title mb-3">Algorithmic Promotion</h3>
        <p className="text-main-sm text-gray75">
          Leveraging recommendation algorithms and trending mechanics for explosive user base growth
          through viral loops and social proof.
        </p>
      </li>
    </ul>
  );
};

export default MarketingList;
