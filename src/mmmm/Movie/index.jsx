import CardMovie from '@/components/CardMovie';

export default function Movie() {
  return (
    <>
      <section>
        <h1>Popular Movies</h1>
        <div>
          {movies
            ? movies?.results?.map((movie) => (
                <div key={movie.id} width={{ base: '150px', md: '200px' }} boxShadow="md" rounded="lg">
                  <CardMovie data={movie} mediaType="movie" />
                </div>
              ))
            : ''}
          <br />
        </div>
      </section>
    </>
  );
}
