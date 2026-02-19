const EngineeringList = () => {
  return (
    <ul className="flex flex-col md:flex-row lg:flex-col gap-6">
      <li
        className="p-3 max-w-87.5 rounded-secondary border border-[#343434] 
      hover:border-accent duration-main"
      >
        <h3 className="mb-3 font-title text-white pointer-events-none">HARDENED SECURITY</h3>
        <ul className="px-2 text-main-sm text-gray75 pointer-events-none">
          <li className="flex gap-2 items-center">
            <div className="w-0.75 h-0.75 bg-gray75 rounded-full" />
            <p>OWASP Top 10 Compliance</p>
          </li>
          <li className="flex gap-2 items-center">
            <div className="w-0.75 h-0.75 bg-gray75 rounded-full" />
            <p>Data Encryption (AES-256 standard)</p>
          </li>
          <li className="flex gap-2 items-center">
            <div className="w-0.75 h-0.75 bg-gray75 rounded-full" />
            <p>Advanced Identity Management (OIDC)</p>
          </li>
        </ul>
      </li>
      <li
        className="p-3 max-w-87.5 lg:w-87.5 rounded-secondary border border-[#343434] 
        hover:border-accent duration-main"
      >
        <h3 className="mb-3 font-title text-white pointer-events-none">INFINITE SCALABILITY</h3>
        <ul className="px-2 text-main-sm text-gray75 pointer-events-none">
          <li className="flex gap-2 items-center">
            <div className="w-0.75 h-0.75 bg-gray75 rounded-full" />
            <p>Microservices Architecture (Service Mesh)</p>
          </li>
          <li className="flex gap-2 items-center">
            <div className="w-0.75 h-0.75 bg-gray75 rounded-full" />
            <p>Auto-scaling Kubernetes Clusters</p>
          </li>
          <li className="flex gap-2 items-center">
            <div className="w-0.75 h-0.75 bg-gray75 rounded-full" />
            <p>Multi-region Database Replication</p>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default EngineeringList;
