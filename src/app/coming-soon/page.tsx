'use client';

import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { InstagramIcon, LinkedinIcon, TelegramIcon } from '@/components/icons/coming-soon';

interface SocialLink {
  name: string;
  url: string;
  Icon: ComponentType<{ className?: string }>;
}

const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', Icon: LinkedinIcon, url: 'http://linkedin.com/company/echocode' },
  { name: 'Instagram', Icon: InstagramIcon, url: 'http://instagram.com/echocode.app' },
  { name: 'Telegram', Icon: TelegramIcon, url: 'https://t.me/+o2Y3QS_y_Hs3ZjNi' },
];

export default function ComingSoon() {
  const [displayedText, setDisplayedText] = useState('');
  const [pageReady, setPageReady] = useState(false);

  const fullText = 'THERE WILL BE\nMAGIC SOON...';

  /* Typewriter */
  useEffect(() => {
    const startDelay = setTimeout(() => setPageReady(true), 250);

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(startDelay);
    };
  }, []);

  const year = new Date().getFullYear();

  return (
      <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
        {/* VIDEO BACKGROUND */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden lg:items-end lg:justify-center">
        <div
          className="
            relative
            h-full
            w-full
            max-w-screen
            flex
            items-center
            justify-center
            lg:items-end
            lg:justify-center
          "
        >
          <div className="relative mx-auto w-full max-w-300">
            <video
              className="h-auto max-h-screen w-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
            >
              <source src="/videos/coming-soon.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* GLOBAL RADIAL SHADOW (fixed for full coverage) */}
      <div className="fixed inset-0 z-10 pointer-events-none hidden lg:block radial-shadow" />

      {/* BLUR ELLIPSE */}
      <div className="ellipse-blur fixed z-20 hidden md:block pointer-events-none" />

      {/* CONTENT */}
      <div
        className={`
          relative z-30
          mx-auto flex min-h-screen w-full max-w-350 flex-col
          justify-start 
          px-6 md:px-8
          pt-16 md:pt-20
          lg:px-20 
          transition-opacity duration-700
          ${pageReady ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="w-full text-center md:text-left">
          <h1 className="title-gradient whitespace-pre-line text-[clamp(36px,6vw,70px)] leading-[1.1]">
            {displayedText}
          </h1>
        </div>
      </div>

      {/* FOOTER */}
      <footer
        className={`
          fixed bottom-10 left-0 right-0 z-40
          flex flex-col items-center gap-6
          transition-opacity duration-700
          ${pageReady ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <ul className="flex items-center gap-6">
          {socialLinks.map(({ name, Icon, url }) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                title={name}
                className="
                  inline-flex items-center justify-center origin-center text-white
                  transform-gpu will-change-transform
                  transition-[transform,color] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
                  md:hover:scale-115
                  md:hover:text-accent
                  md:focus-visible:scale-115
                  md:focus-visible:text-accent
                "
              >
                <Icon className="w-6 h-6" />
              </a>
            </li>
          ))}
        </ul>

        <p className="font-main text-[18px] leading-7 uppercase text-gray-400">
          ECHOCODE.APP © {year}
        </p>
      </footer>
    </main>
  );
}
