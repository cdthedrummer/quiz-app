import './globals.css';

export const metadata = {
  title: 'Character Stats Quiz',
  description: 'Discover your character attributes'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}