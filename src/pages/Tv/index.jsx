import Layout from '@/components/Layout';
import CardMovie from '@/components/CardMovie';

export function Tv() {
  return (
    <Layout>
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
    </Layout>
  );
}
