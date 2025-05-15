import Link from 'next/link';
import { ChevronRight } from 'lucide-react'; // Optional: for an arrow separator

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600 dark:text-gray-400">
      <ol className="flex flex-wrap items-center space-x-1 md:space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight size={16} className="mx-1 text-gray-400 dark:text-gray-500" />
            )}
            {item.href ? (
              <Link href={item.href} className="hover:text-pink-600 dark:hover:text-pink-400 hover:underline">
                  {item.label}
              </Link>
            ) : (
              <span className="text-gray-500 dark:text-gray-300">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 