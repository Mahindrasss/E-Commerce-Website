import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ResellHub - Meesho Style Marketplace',
  description: 'Indian reselling marketplace with admin, seller and customer panels.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-7xl p-4">{children}</main>
      </body>
    </html>
  );
}
