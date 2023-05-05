'use client';

import { useState } from 'react';

export default function Navbar() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <div>
        <h1>MOVIELIST</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search?q=${query}`);
          }}
        >
          <div>
            <input
              placeholder="Search movie/ tv show ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </div>
        </form>
      </div>

      {/* {isOpen ? (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search?q=${query}`);
            }}
          >
              <input
                placeholder="Search movie/ tv show ..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
          </form>
        </div>
      ) : null} */}
    </div>
  );
}
