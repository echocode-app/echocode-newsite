'use client';

import { useState } from 'react';

import VideoLoader from '@/components/UI/loaders/VideoLoader';

const BasedOnVideo = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative md:mb-12.5 h-40.5 sm:h-50.5  md:h-99 max-w-250 max-h-145.5 lg:min-w-244 lg:h-145.5
     bg-black overflow-hidden"
    >
      {!loaded && <VideoLoader />}
      <video
        loop
        autoPlay
        muted
        preload="auto"
        className={`w-full h-full duration-main transition-opacity
          ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onCanPlay={() => setLoaded(true)}
      >
        <source src="/videos/based-on.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BasedOnVideo;
