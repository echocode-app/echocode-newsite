import Image from 'next/image';
import Link from 'next/link';

const ContactUsBtn = () => {
  return (
    <div className="pointer-events-none relative md:absolute inset-0 z-50">
      <div
        className="fixed md:sticky top-96.25 md:top-165 md:translate-y-27.5
       lg:top-167.75 lg:translate-y-24.75 flex justify-end px-4 md:px-8 w-full md:max-w-318.5 mx-auto"
      >
        <div className="max-w-310.5 flex justify-end items-end">
          <Link
            href="/contact"
            className="pointer-events-auto w-14.5 h-14.5 rounded-full bg-accent 
          shadow-lg flex items-center justify-center cursor-pointer"
          >
            <div className="relative w-6.5 h-5.5">
              <Image src="/UI/contact.svg" alt="Contact Us" fill />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactUsBtn;
