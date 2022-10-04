import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetailMovie from './pages/DetailMovie';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:media/:id" element={<DetailMovie />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
