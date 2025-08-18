import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AlbumRater',
  description: 'Rate songs on Spotify albums',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
