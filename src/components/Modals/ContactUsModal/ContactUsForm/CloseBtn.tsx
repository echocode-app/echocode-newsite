import Image from 'next/image';

interface CloseBtnProps {
  onClose: () => void;
}

const CloseBtn = ({ onClose }: CloseBtnProps) => {
  return (
    <button
      onClick={onClose}
      className="relative flex justify-center items-center w-8.5 h-11 cursor-pointer"
    >
      <Image src={'/UI/close.svg'} alt="Close" fill />
    </button>
  );
};

export default CloseBtn;
