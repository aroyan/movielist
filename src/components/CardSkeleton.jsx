import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';

function CardSkeleton() {
  return (
    <Flex gap="1rem" wrap="wrap">
      <Skeleton
        width={{ base: '100px', lg: '200px' }}
        height={{ base: '155px', lg: '300px' }}
      />
      <Skeleton
        width={{ base: '100px', lg: '200px' }}
        height={{ base: '155px', lg: '300px' }}
      />
      <Skeleton
        width={{ base: '100px', lg: '200px' }}
        height={{ base: '155px', lg: '300px' }}
      />
      <Skeleton
        width={{ base: '100px', lg: '200px' }}
        height={{ base: '155px', lg: '300px' }}
      />
      <Skeleton
        width={{ base: '100px', lg: '200px' }}
        height={{ base: '155px', lg: '300px' }}
      />
      <Skeleton
        width={{ base: '100px', lg: '200px' }}
        height={{ base: '155px', lg: '300px' }}
      />
    </Flex>
  );
}

export default CardSkeleton;
