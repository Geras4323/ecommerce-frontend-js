import React from 'react';

import { MarqueeImage } from './MarqueeImage';


export function VerticalImageMarquee({ urls, speed }) {

  return (
    <section className='w-1/2 h-full overflow-hidden'>

      <ul className={`
        ${
          speed === 'slow'
          ? 'animate-marqueeSlow'
          : speed === 'medium'
            ? 'animate-marqueeMed'
            : 'animate-marqueeFast'
        }
        flex flex-col justify-around gap-3 mb-3 min-w-full`}
      >
        {urls.map(url => (
          <li><MarqueeImage src={url} /></li>
        ))}
      </ul>

      <ul className={`
        ${
          speed === 'slow'
          ? 'animate-marqueeSlow'
          : speed === 'medium'
            ? 'animate-marqueeMed'
            : 'animate-marqueeFast'
        }
        flex flex-col justify-around gap-3 mb-3 min-w-full`}
      >
        {urls.map(url => (
          <li><MarqueeImage src={url} /></li>
        ))}
      </ul>

    </section>
  )
}