import './globals.css';
import Navigation from '@/components/layout/Navigation';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Jeremy Clegg (ChefQ) – Web Developer & Designer',
  description: 'Personal portfolio of Jeremy Clegg (ChefQ).',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[rgb(var(--background-rgb))] text-[rgb(var(--foreground-rgb))]">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
