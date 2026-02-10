import { ReactNode } from 'react';

interface SectionTitleProps {
  children: ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <h2 className=" mb-2.5 block text-title-2xl md:text-title-4xl font-title text-white">
      {children}
    </h2>
  );
};

export default SectionTitle;
