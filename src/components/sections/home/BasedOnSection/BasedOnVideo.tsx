'use client';

import { useState } from 'react';

import VideoLoader from '@/components/UI/loaders/VideoLoader';

const BasedOnVideo = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative 
     w-full h-full mb-12.5 overflow-hidden bg-black rounded-secondary"
    >
      {!loaded && <VideoLoader />}

      <video
        loop
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-main ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/videos/based-on.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 bg-video-gradient pointer-events-none " />
    </div>
  );
};

export default BasedOnVideo;
