import Link from 'next/link';

export default function HeroCarousel({ data }: any) {
  return (
    <div>
      <div>
        {data.results.slice(0, 5).map((x: any) => (
          <Link
            href={`/movie/${x.id}`}
            key={x.id}
            style={{
              position: 'relative',
            }}
          >
           <p>{x.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// w720 for backdrop is posible too if 1280 still too high
