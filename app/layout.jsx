import "./globals.css";

export const metadata = {
  title: "ITZ FIZZ — Sparkling Reimagined",
  description:
    "A premium scroll-driven landing experience for ITZ FIZZ sparkling drink. Smooth GSAP ScrollTrigger motion, letter-spaced typography and impact stats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-cream font-body antialiased">
        {children}
      </body>
    </html>
  );
}
