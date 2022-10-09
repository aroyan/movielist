/* eslint-disable no-nested-ternary */
import React from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

function CircularRating({ data }) {
  return (
    <CircularProgress
      mt="-76px"
      value={data * 10}
      color={
        data * 10 > 70 ? 'green.400' : data * 10 > 50 ? 'yellow.400' : 'red.400'
      }
      bg="gray.600"
      rounded="full"
      p="1px"
      size="48px"
    >
      <CircularProgressLabel color="white">{data * 10}%</CircularProgressLabel>
    </CircularProgress>
  );
}

export default CircularRating;
