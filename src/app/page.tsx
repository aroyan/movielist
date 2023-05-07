import HeroCarousel from './HeroCarousel';

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
        <HeroCarousel data={data} />
      </article>
      <article>
        <div>
          <h2>Popular TV</h2>
        </div>
      </article>
    </>
  );
}
