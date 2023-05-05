import Loading from '@/components/Loading';

export default function Detail() {
  const videoUrl = trailerData?.results?.filter((vid) => vid.type === 'Trailer' && vid.site === 'YouTube')[0]?.key;

  const {
    backdrop_path: backdropPath,
    title,
    original_name: originalName,
    overview,
    first_air_date: firstAirDate,
    release_date: releaseDate,
    vote_average: voteAverage,
    genres,
  } = data ?? {};

  const releaseYear = new Date(releaseDate).getFullYear();
  const firstAirYear = new Date(firstAirDate).getFullYear();

  return (
    <>
      {data ? (
        <div backgroundImage={`url(https://image.tmdb.org/t/p/original/${backdropPath})`}>
          <div>
            <div>
              <h1>
                {title ?? originalName} <div>{Number.isNaN(releaseYear) ? firstAirYear : releaseYear}</div>
              </h1>
              <div wrap="wrap" gap="1">
                {genres?.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </div>
              <p>{overview}</p>
              <div>
                <p>{voteAverage ? voteAverage.toFixed(1) : 0} / 10</p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onOpen();
                }}
              >
                WATCH TRAILER
              </button>
              {/* <Modal isOpen={isOpen} onClose={onClose} size="4xl">
                <ModalOverlay />
                <ModalContent background="rgba(0,0,0, 0.8)" pb="4">
                  <div color="white">
                    <ModalCloseButton />
                    <ModalHeader>Play Trailer</ModalHeader>
                  </div>
                  <ModalBody>
                    {videoUrl ? (
                      <AspectRatio maxW="720px" ratio={16 / 9} margin="0 auto">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoUrl}`}
                          title={data.title ?? data.name}
                          allow="autoplay; fullscreen;"
                        />
                      </AspectRatio>
                    ) : (
                      <Text color="white">
                        Sorry, we cannot find trailer for this {media === 'tv' ? 'TV Series' : 'Movie'}
                      </Text>
                    )}
                  </ModalBody>
                </ModalContent>
              </Modal> */}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
