'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';

import styles from './HeroCarousel.module.css';

export default function EmblaCarousel({ data }: any) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        {data.results.slice(0, 5).map((x: any) => (
          <Link
            href={`/movie/${x.id}`}
            key={x.id}
            style={{
              position: 'relative',
            }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w1280${x.backdrop_path}`}
              alt={x.title}
              className={styles.embla__slide}
              width="1280"
              height="720"
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                objectFit: 'cover',
              }}
            />
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
          </Link>
        ))}
      </div>
    </div>
  );
}

// w720 for backdrop is posible too if 1280 still too high
