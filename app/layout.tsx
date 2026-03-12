import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SupNum assistance - Chatbot intelligent',
  description: 'AI-powered assistance for Institut Supérieur du Numérique (SupNum). Get help with registration, courses, and more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-blue-100 selection:text-blue-900 bg-zinc-50 dark:bg-zinc-950 font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
