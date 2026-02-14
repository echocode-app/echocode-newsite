'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const PartnerItem = () => {
  return (
    <li
      className="
      shrink-0
      w-33 h-20 mx-6
      flex items-center justify-center
      "
    >
      <motion.div
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.54 }}
        viewport={{
          once: false,
          margin: '-46% -56%',
        }}
        transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
        className="
        w-full h-full
        bg-gray7 rounded-secondary
        backdrop-blur-[6px]
        flex items-center justify-center
        transform-gpu
        "
      >
        <div className="relative h-6 w-30">
          <Image src="/images/partners/keen.svg" alt="Keen Ethics" fill />
        </div>
      </motion.div>
    </li>
  );
};

export default PartnerItem;
