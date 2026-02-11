'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ContactUsBtn() {
  const router = useRouter();

  const openModal = () => {
    router.push('/?modal=open');
  };

  return (
    <div className="pointer-events-none relative md:absolute inset-0 z-50">
      <div
        className="fixed md:sticky top-96.25 md:top-165.25 md:translate-y-27.25
       lg:top-168 lg:translate-y-24.5 flex justify-end px-4 md:px-8 w-full md:max-w-318.5 mx-auto"
      >
        <div className="max-w-310.5 flex justify-end items-end">
          <button
            onClick={openModal}
            className="pointer-events-auto w-14.5 h-14.5 rounded-full bg-accent 
          shadow-lg flex items-center justify-center cursor-pointer"
          >
            <div className="relative w-6.5 h-5.5">
              <Image src="/UI/contact.svg" alt="Contact Us" fill />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
