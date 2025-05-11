import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p className="mb-2">
          &copy; {currentYear} Incontri Italia. Tutti i diritti riservati.
        </p>
        <p>
          Realizzato da{' '}
          <Link 
            href="https://dolcedigital.xyz"
            target="_blank" 
            rel="noopener noreferrer follow"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Dolce Digital
          </Link>
        </p>
      </div>
    </footer>
  );
} 