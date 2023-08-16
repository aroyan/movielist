import React from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  Detail,
  Home,
  Login,
  Register,
  Movie,
  NotFound,
  SearchResult,
  Tv
} from '@/pages';

function App() {
  return (
    <>
      <noscript>
        <p>Please enable your JavaScript</p>
      </noscript>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:media/:id" element={(<Detail />)} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
