'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import ContactUsModal from './ContactUsModal';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';

export default function ModalPortal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isShowModal = searchParams?.get('modal') === 'open';
  useLockBodyScroll(isShowModal);

  const closeModal = () => {
    if (!searchParams || !pathname) return;

    const params = new URLSearchParams(searchParams.toString());
    params.delete('modal');
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (!isShowModal) return null;

  return <ContactUsModal onClose={closeModal} />;
}
