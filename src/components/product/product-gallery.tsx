'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  alt: string;
  certifiedLabel: string;
}

export default function ProductGallery({ images, alt, certifiedLabel }: Props) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-[16px] bg-[#F5F5F5]">
        <Image
          key={activeImg}
          src={images[activeImg]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
        />
        {/* Certified badge */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1A1A1A] shadow backdrop-blur-sm">
          <svg className="h-3.5 w-3.5 text-[#ED5082]" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {certifiedLabel}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={activeImg === i}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#ED5082] ${
                activeImg === i
                  ? 'border-[#ED5082]'
                  : 'border-transparent hover:border-[#ED5082]/50'
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
