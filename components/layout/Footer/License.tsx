const License = () => {
  const START_YEAR = 2024;
  const CURRENT_YEAR = String(new Date().getFullYear());

  return (
    <div className="flex flex-col md:flex-row md:justify-between  font-extra text-[10px] ">
      <p className="mb-3 md:mb-0 text-center">
        ©{' '}
        <time dateTime={`${START_YEAR}-${CURRENT_YEAR}`}>
          {START_YEAR}-{CURRENT_YEAR}
        </time>{' '}
        ECHOCODE. ALL RIGHTS RESERVED.
      </p>
      <p className="text-center">KYIV | BERLIN</p>
    </div>
  );
};

export default License;
