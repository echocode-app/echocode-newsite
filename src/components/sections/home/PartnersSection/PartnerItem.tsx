'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const PartnerItem = () => {
  return (
    <li
      className="
      shrink-0
      w-33 h-20 
      flex items-center justify-center
      "
    >
      <motion.div
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.4 }}
        viewport={{
          once: false,
          margin: '0px -50% 0px -50%',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-full h-full bg-gray7 rounded-secondary flex items-center justify-center"
      >
        <div className="relative h-6 w-30">
          <Image src="/images/partners/keen.svg" alt="Keen Ethics" fill />
        </div>
      </motion.div>
    </li>
  );
};

export default PartnerItem;
