'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import ContactUsModal from './ContactUsModal';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

export default function ModalPortal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isShowModal = searchParams.get('modal') === 'open';
  useLockBodyScroll(isShowModal);

  const closeModal = () => router.back();

  if (!isShowModal) return null;

  return <ContactUsModal onClose={closeModal} />;
}
