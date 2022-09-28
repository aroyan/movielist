import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailMovie from './pages/DetailMovie';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<DetailMovie />} />
    </Routes>
  );
}

export default App;
