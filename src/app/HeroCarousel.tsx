'use client';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import styles from './HeroCarousel.module.css';

export default function EmblaCarousel({ data }: any) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        {data.results.slice(0, 5).map((x: any) => (
          <div
            className={styles.embla__slide}
            key={x.id}
            style={{
              background: `url("https://image.tmdb.org/t/p/original${x.backdrop_path}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              objectFit: 'cover',
              position: 'relative',
            }}
          >
            <div className={styles.show_information}>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                {x.title}
              </p>
              <p
                style={{
                  fontWeight: 'normal',
                }}
              >
                {x.overview}
              </p>
              <button>Watch trailer</button>
              <button>Add to watch later</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
