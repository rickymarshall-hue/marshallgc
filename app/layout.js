import './globals.css';

export const metadata = {
  title: 'Marshall GC - Legal and Strategic Advisory for Scaling Consumer Brands',
  description: 'Fractional general counsel and strategic advisory for e-commerce and consumer brands navigating international growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}