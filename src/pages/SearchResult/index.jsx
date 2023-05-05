import Layout from '@/components/Layout';
import CardMovie from '@/components/CardMovie';

export function SearchResult() {
  return (
    <Layout>
      <section>
        <h1>Search result for {query}</h1>

        <div>
          {filteredData?.map((res) => (
            <div key={res.id} width={{ base: '150px', md: '200px' }} boxShadow="md" rounded="lg">
              <CardMovie data={res} mediaType={res.media_type} />
            </div>
          ))}
        </div>
        {filteredData?.length > 0 ? (
          <div>
            <p>Page : {page}</p>
            <div>
              <button>{+page === 1 ? '' : +page - 1}</button>
              <button disabled>{page}</button>
              <button disabled={page >= totalPages} onClick={handleIncrementPage}>
                {+page === totalPages ? '' : +page + 1}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Sorry, {query} not found</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
