const PageTitle = ({ children }: { children: string }) => {
  return (
    <h1 className="text-title-3xl md:text-title-5xl lg:text-title-6xl font-title text-center md:text-left">
      {children}
    </h1>
  );
};

export default PageTitle;
