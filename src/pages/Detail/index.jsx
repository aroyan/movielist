import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Badge,
  Heading,
  HStack,
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
import { TriangleDownIcon, StarIcon } from '@chakra-ui/icons';

import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import { getTrailer, getDetailData } from '@/features/movie/movie.actions';

function Detail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { media, id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.movie.detail);
  const trailerData = useSelector((state) => state.movie.trailer);

  useEffect(() => {
    dispatch(getDetailData(media, id));
    dispatch(getTrailer(media, id));
  }, []);

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
    <Layout>
      {data ? (
        <Box
          backgroundImage={`url(https://image.tmdb.org/t/p/original/${backdropPath})`}
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
              <Heading>
                {title ?? originalName}{' '}
                <Badge colorScheme="green">{Number.isNaN(releaseYear) ? firstAirYear : releaseYear}</Badge>
              </Heading>
              <HStack wrap="wrap" gap="1">
                {genres?.map((genre) => (
                  <Badge key={genre.id} colorScheme="cyan">
                    {genre.name}
                  </Badge>
                ))}
              </HStack>
              <Text>{overview}</Text>
              <HStack>
                <StarIcon />
                <Text>{voteAverage ? voteAverage.toFixed(1) : 0} / 10</Text>
              </HStack>
              <Button
                onClick={(e) => {
                  e.preventDefault();
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
              </Modal>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}

export default Detail;
