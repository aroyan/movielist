'use client';
import React, { useEffect, useState } from 'react';

import slugGenerator from '@/utils/slugGenerator';

function HeroMovie({ movie }) {
  const [videos, setVideos] = useState(null);
  const [movieId, setMovieId] = useState('');
  const [mediaType, setMediaType] = useState('');

  const title = movie.name ?? movie.title ?? movie.original_name ?? movie.original_title;

  const slug = slugGenerator(title);

  const videoUrl = videos?.filter((vid) => vid.type === 'Trailer' && vid.site === 'YouTube')[0].key;

  const getVideo = async (_movieId, _mediaType) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${_mediaType}/${_movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
    );
    const result = await response.json();
    setVideos(result?.results);
  };

  useEffect(() => {
    if (movieId && mediaType) getVideo(movieId, mediaType);
  }, [movieId, mediaType]);

  return (
    <a href={`/${movie.media_type}/${movie.id}-${slug}`}>
      <div
        style={{ background: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}
        width="100vw"
        height="100vh"
      >
        <div>
          <div>
            <h1>{movie.name ?? movie.title}</h1>
            <p>{movie.overview}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMovieId(movie.id);
                setMediaType(movie.media_type);
                onOpen();
              }}
            >
              WATCH TRAILER
            </button>
            {/* <Modal isOpen={isOpen} onClose={onClose} size="4xl">
              <ModalOverlay />
              <ModalContent background="rgba(0,0,0, 0.8)" pb="4">
                <Box color="white">
                  <ModalCloseButton />
                  <ModalHeader>Play Trailer</ModalHeader>
                </Box>
                <ModalBody>
                  <AspectRatio maxW="720px" ratio={16 / 9} margin="0 auto">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoUrl}`}
                      title={movie.title ?? movie.name}
                      allow="autoplay; fullscreen;"
                    />
                  </AspectRatio>
                </ModalBody>
              </ModalContent>
            </Modal> */}
          </div>
        </div>
      </div>
    </a>
  );
}

export default HeroMovie;
