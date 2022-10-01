import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailMovie from './pages/DetailMovie';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:media/:id" element={<DetailMovie />} />
      <Route path="/search/:query" element={<SearchResult />} />
    </Routes>
  );
}

export default App;
