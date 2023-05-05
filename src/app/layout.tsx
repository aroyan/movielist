import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Movie App',
  description: 'movie app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link
            href="/"
            className={inter.className}
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Hello
          </Link>
          <Link
            href="/nothing"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Nothing
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
