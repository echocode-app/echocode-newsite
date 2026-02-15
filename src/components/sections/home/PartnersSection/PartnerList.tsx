'use client';

import { motion } from 'framer-motion';

import PartnerItem from './PartnerItem';

const PartnerList = () => {
  return (
    <motion.ul
      animate={{ x: ['0%', '-50%'] }}
      transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
      className="flex items-center gap-10"
    >
      {[...Array(16), ...Array(16)].map((_, i) => (
        <PartnerItem key={i} />
      ))}
    </motion.ul>
  );
};

export default PartnerList;
