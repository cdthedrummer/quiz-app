import '@/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Your Character',
  description: 'Discover your strengths and find ways to level up!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}