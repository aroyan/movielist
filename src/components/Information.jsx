import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  AspectRatio,
} from '@chakra-ui/react';

function Information({ movie }) {
  return (
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
  );
}

export default Information;
