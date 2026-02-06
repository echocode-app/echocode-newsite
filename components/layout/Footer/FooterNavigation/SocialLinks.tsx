import Image from 'next/image';
import Link from 'next/link';

import telegramIcon from '@/public/UI/social-icons/telegram.svg';
import instaIcon from '@/public/UI/social-icons/insta.svg';

const SocailLinks = () => {
  return (
    <ul className="flex justify-center gap-2 lg:justify-end">
      <li>
        <Link
          href={'https://t.me/echocode_app'}
          target="blank"
          className="flex justify-center items-center w-10 h-10 bg-base-gray rounded-full"
        >
          <div className="relative w-4.5 h-3.5">
            <Image src={telegramIcon} fill alt="Telegram" />
          </div>
        </Link>
      </li>
      <li>
        <Link
          href={'http://instagram.com/echocode.app'}
          target="blank"
          className="flex justify-center items-center w-10 h-10 bg-base-gray rounded-full"
        >
          <div className="relative w-4.5 h-4.5">
            <Image src={instaIcon} fill alt="Instagram" />
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default SocailLinks;
