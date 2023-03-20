import React from 'react';

export function MarqueeImage({ src }) {
  return (
    <img
      src={src}
      className='w-full aspect-square rounded-3xl border border-border shadow-sm'
      alt="marquee image"
    />
  )
}