'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

const ContactFile = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFileName(file ? file.name : null);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
         flex items-center gap-1 py-4 pl-4 pr-6 w-full text-left border rounded-secondary leading-3.5 
         hover:border-accent focus:border-accent duration-main transition-colors
       outline-0 text-[10px] font-title text-white placeholder:text-white 
        border-white cursor-pointer
        "
      >
        <div className="relative w-4.5 h-4.5">
          <Image src={'/UI/clip.svg'} alt="Clip" fill />
        </div>
        <span className="text-white truncate">{fileName ?? 'Attach your file'}</span>
      </button>
    </div>
  );
};

export default ContactFile;
