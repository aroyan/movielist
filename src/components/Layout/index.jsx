import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default Layout;
