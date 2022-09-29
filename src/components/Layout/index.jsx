import React from 'react';

function Layout({ children }) {
  return (
    <main>
      <nav className="fixed top-0 left-0 text-orange-600 z-10 flex justify-between w-full px-6 pt-2 text-2xl">
        This is navbar
        <input type="search" name="search" id="search" placeholder="search" />
        <button type="button">Register</button>
      </nav>
      {children}
    </main>
  );
}

export default Layout;
