import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home'
import { Detail } from './pages/Detail'
import { Login } from './pages/Login'
import { Movie } from './pages/Movie'
import { NotFound } from './pages/NotFound'
import { Register } from './pages/Register'
import { SearchResult } from './pages/SearchResult'
import { Tv } from './pages/Tv'

function App() {
  return (
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
  );
}

export default App;
