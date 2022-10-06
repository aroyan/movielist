import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  AspectRatio,
  ModalHeader,
  Flex,
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

function HeroMovie({ movie }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [videos, setVideos] = useState(null);
  const [movieId, setMovieId] = useState('');
  const [mediaType, setMediaType] = useState('');

  const videoUrl = videos?.filter(
    (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
  )[0].key;

  const getVideo = async (_movieId, _mediaType) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${_mediaType}/${_movieId}/videos?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`
    );
    const result = await response.json();
    setVideos(result?.results);
  };

  useEffect(() => {
    if (movieId && mediaType) getVideo(movieId, mediaType);
  }, [movieId, mediaType]);

  return (
    // Add Slug at the end of this endpoint
    <Link to={`/${movie.media_type}/${movie.id}`}>
      <Box
        backgroundImage={`url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        width="100vw"
        height="100vh"
      >
        <Box
          color="white"
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          background="rgba(0,0,0,0.5)"
        >
          <Flex maxW="xl" m="2rem" flexDir="column" gap="1rem">
            <Heading>{movie.name ?? movie.title}</Heading>
            <Text>{movie.overview}</Text>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setMovieId(movie.id);
                setMediaType(movie.media_type);
                onOpen();
              }}
              colorScheme="red"
              width="48"
              rightIcon={<TriangleDownIcon transform="rotate(-90deg)" />}
            >
              WATCH TRAILER
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="4xl">
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
            </Modal>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
}

export default HeroMovie;
