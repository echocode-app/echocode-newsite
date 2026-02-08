'use client';

import { motion } from 'framer-motion';

const container = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letter = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const PageTitle = ({ children }: { children: string }) => {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-title-4xl font-title text-center"
    >
      {children.split('').map((char, i) => (
        <motion.span key={i} variants={letter} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default PageTitle;
