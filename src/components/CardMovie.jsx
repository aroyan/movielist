import React from 'react';
import { Image, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import slugGenerator from '@/utils/slugGenerator';

function CardMovie({ data, mediaType }) {
  const title = mediaType === 'tv' ? data.name ?? data.original_name : data.title ?? data.original_title;

  const slug = slugGenerator(title);

  return (
    <Link to={`/${mediaType}/${data.id}-${slug}`} as={NavLink}>
      <Image
        rounded="lg"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        fallbackSrc="https://res.cloudinary.com/dmgrxm78p/image/upload/v1665148820/poster_not_found.png"
        alt={data.title ?? data.name ?? data.original_name ?? data.original_title}
        objectFit="cover"
        width="200"
      />
      <Text>{data.title ?? data.name ?? data.original_name ?? data.original_title}</Text>
    </Link>
  );
}

export default CardMovie;
