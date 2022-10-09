import React from 'react';
import { Image, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function CardMovie({ data, mediaType }) {
  return (
    <Link to={`/${mediaType}/${data.id}`} as={NavLink}>
      <Image
        rounded="lg"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        fallbackSrc="https://res.cloudinary.com/dmgrxm78p/image/upload/v1665148820/poster_not_found.png"
        alt={data.title ?? data.name}
        objectFit="cover"
        width="200"
      />
    </Link>
  );
}

export default CardMovie;
