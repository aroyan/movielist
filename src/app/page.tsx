import styles from './page.module.css';

async function getTrending() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=eea6cf8e79673e103a0a449bc11cf5ef&page=1');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const data = await getTrending();

  return (
    <>
      <article>
        <div>
          {data.results.map((x: any) => (
            <div
              className={styles.slide}
              key={x.id}
              style={{
                background: `url("https://image.tmdb.org/t/p/original${x.backdrop_path}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                objectFit: 'cover',
                height: '100vh',
                position: 'relative',
              }}
            >
              <div>
                <p
                  style={{
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {x.title}
                </p>
                <p>{x.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
      <article>
        <div>
          <h2>Popular TV</h2>
        </div>
      </article>
    </>
  );
}
