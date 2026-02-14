const SubmitBtn = () => {
  return (
    <div>
      <button
        type="submit"
        className=" block w-full py-3 md:py-4 font-title text-white text-title-base
          bg-main-gradient rounded-secondary shadow-button cursor-pointer"
      >
        Send message
      </button>
    </div>
  );
};

export default SubmitBtn;
