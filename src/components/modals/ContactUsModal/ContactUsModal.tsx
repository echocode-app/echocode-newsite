'use client';

import Link from 'next/link';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import ContactUsForm from './ContactUsForm';
import CloseBtn from './ContactUsForm/CloseBtn';
import SectionTitle from '@/components/UI/SectionTitle';

const ContactUsModal = () => {
  const router = useRouter();
  const closeModal = () => router.back();

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <motion.div
      onClick={closeModal}
      className="fixed inset-0 z-200 flex items-center justify-center
         bg-black/50 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-4 md:px-8 max-w-280 w-full">
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative  w-full flex flex-col mx-auto p-5 pt-15 pb-15 md:px-5 lg:p-15 
           rounded-secondary border bg-[rgba(0,0,0,0.8)] border-white backdrop-blur-[26px]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute top-4 right-4">
            <CloseBtn onClose={closeModal} />
          </div>
          <SectionTitle>GOT A PROJECT IN MIND?</SectionTitle>
          <div className="flex flex-wrap gap-1 text-main-sm mb-4 md:mb-8">
            <p className="text-white">
              Get professional advice. Use the form or write us an email:
            </p>
            <Link href={'mailto:hello@echocode.com'} className="font-semibold text-accent">
              hello@echocode.com
            </Link>
          </div>
          <ContactUsForm />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUsModal;
