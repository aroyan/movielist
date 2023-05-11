async function getDetailMovie(url: any) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${url}?api_key=eea6cf8e79673e103a0a449bc11cf5ef`);

  if (!res.ok) {
    throw new Error('Movie not found');
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getDetailMovie(params.id);

  const {genres, overview, poster_path: posterPath, production_companies : productionCompanies, release_date: releaseDate, runtime, title, tagline} = data;

  return <div>Detail movie

    {genres.map((x: any) => <p>{x.name}</p>)}

    <p>{overview}</p>

    {productionCompanies.map((x: any) => <p>{x.name}</p>)}

    <p>{releaseDate}</p>

    <p>{runtime}</p>

    <p>{title}</p>

    <p>{tagline}</p>
  </div>;
}
