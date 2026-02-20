'use client';

import { useEffect, useState } from 'react';

import FoundationItem from './FoundationItem';

const items = ['Global Scaling', '24／7 Resilience', 'Data-Centric', 'Asset Growth'];

const FoundationList = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <ul className="flex flex-wrap justify-between gap-y-7 gap-x-6">
      {items.map((title, index) => (
        <FoundationItem key={title} title={title} active={index === activeIndex} />
      ))}
    </ul>
  );
};

export default FoundationList;
