import React from 'react';
import { useParams } from 'react-router-dom';

function SearchResult() {
  const { query } = useParams();

  return <div>SearchResult {query}</div>;
}

export default SearchResult;
