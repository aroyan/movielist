import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Detail from '@/pages/Detail';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Movie from '@/pages/Movie';
import NotFound from '@/pages/NotFound';
import SearchResult from '@/pages/SearchResult';
import Tv from '@/pages/Tv';
import Protected from '@/components/Routes/Protected';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/:media/:id"
        // prettier-ignore
        element={(
          <Protected>
            <Detail />
          </Protected>
      )}
      />
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
