async function getDetailMovie(url: any) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${url}?api_key=eea6cf8e79673e103a0a449bc11cf5ef`);

  if (!res.ok) {
    throw new Error('Movie not found');
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getDetailMovie(params.id);

  return <div>Detail movie {JSON.stringify(data)}</div>;
}
