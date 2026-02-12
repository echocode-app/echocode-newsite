'use client';

import { useState } from 'react';

type ContactInputProps = {
  label: string;
  name: string;
};

export default function ContactInput({ label, name }: ContactInputProps) {
  const [value, setValue] = useState('');

  return (
    <div className="relative w-full">
      {!value && (
        <span
          className="
            pointer-events-none
            absolute left-4 top-1/2 -translate-y-1/2  text-white text-[10px] font-title
          "
        >
          {label}
        </span>
      )}

      <input
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full h-14
          px-4
           hover:border-accent focus:border-accent duration-main transition-colors
          border border-white rounded-secondary
          bg-transparent
          text-white text-[10px] font-title
          outline-none
        "
      />
    </div>
  );
}
