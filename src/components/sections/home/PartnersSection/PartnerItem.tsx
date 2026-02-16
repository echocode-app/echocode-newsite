'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMobile } from '@/hooks/useMobile';

interface PartnerItemProps {
  image: string;
  desc: string;
  scale: string;
}

const PartnerItem = ({ image, desc, scale }: PartnerItemProps) => {
  const isMobile = useMobile();

  return (
    <motion.li
      initial={{ scale: 1 }}
      whileInView={{ scale: isMobile ? 1.2 : 1.4 }}
      viewport={{ once: false, margin: '0px -49% 0px -51%' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="shrink-0 w-33  md:w-33 h-20 mr-10 rounded-secondary flex items-center justify-center
             bg-gray7 backdrop-blur-[6px] relative"
    >
      <div className="relative h-6 w-30">
        <Image
          src={image}
          alt={desc}
          fill
          className="object-contain"
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </motion.li>
  );
};

export default PartnerItem;
