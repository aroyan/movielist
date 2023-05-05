import CardMovie from '@/components/CardMovie';

export default function Tv() {
  return (
    <>
      <section>
        <h1>Popular TV Series</h1>
        <div>
          {data
            ? data?.results?.map((tv) => (
                <div key={tv.id} width={{ base: '150px', md: '200px' }} boxShadow="md" rounded="lg">
                  <CardMovie data={tv} mediaType="tv" />
                </div>
              ))
            : ''}
        </div>
      </section>
    </>
  );
}