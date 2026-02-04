import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
}

const SectionContainer = ({ children }: SectionContainerProps) => {
  return <div className="mx-auto px-4 max-w-[1064] sm:px-8">{children}</div>;
};

export default SectionContainer;
