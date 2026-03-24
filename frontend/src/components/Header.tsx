import Link from 'next/link';
import { LanguageToggle } from './LanguageToggle';
import { SearchBar } from './SearchBar';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/customer', label: 'Customer' },
  { href: '/seller', label: 'Seller' },
  { href: '/admin', label: 'Admin' }
];

export function Header() {
  return (
    <header className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-pink-600">ResellHub</h1>
          <LanguageToggle />
        </div>
        <SearchBar />
        <nav className="flex flex-wrap gap-2 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-1.5 hover:bg-pink-50">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
