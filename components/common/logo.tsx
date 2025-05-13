import Link from 'next/link';
import { globalSiteStrings } from '@/app/translations'; // Import translations

// Peach color (e.g., a lighter, softer peach)
const PEACH_COLOR = '#FFE5B4';

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-block text-3xl font-sans group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded py-3"
      aria-label={globalSiteStrings.logoAriaLabel} // Use translated string
    >
      <span className="font-semibold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors duration-200">
        Incontri
      </span>
      <span 
        className="font-bold tracking-tight group-hover:opacity-85 transition-opacity duration-200"
        style={{ color: PEACH_COLOR }}
      >
        Italia
      </span>
    </Link>
  );
} 