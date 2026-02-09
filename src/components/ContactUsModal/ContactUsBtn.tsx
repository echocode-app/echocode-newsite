'use client';

import Image from 'next/image';
import { useState } from 'react';

const ContactUsBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);

  return (
    <div className="fixed top-192.5 right-0 w-full flex justify-end mx-auto px-4 max-w-[1064] md:px-8">
      <button
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 flex items-center justify-center rounded-full bg-accent cursor-pointer"
      >
        <Image src={'/UI/contact.svg'} alt="Contact Us" width={26} height={22} />
      </button>
    </div>
  );
};

export default ContactUsBtn;
