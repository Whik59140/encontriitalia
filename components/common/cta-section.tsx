import Link from 'next/link';
import { ctaSectionStrings } from '@/app/translations'; // Import translations

interface CtaSectionProps {
  title?: string;
  subtitle?: string; // New prop for the tagline
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  isExternalLink?: boolean; // To differentiate between internal Next.js Link and external <a> tag
  linkTarget?: string; // For target attributes like _blank
}

export function CtaSection({
  title = ctaSectionStrings.defaultTitle, // Use translated default
  subtitle,
  description = ctaSectionStrings.defaultDescription, // Use translated default
  buttonText = ctaSectionStrings.defaultButtonText, // Use translated default
  buttonLink = "/",
  isExternalLink = false,
  linkTarget = '_self',
}: CtaSectionProps) {
  return (
    <section className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-12 px-4 my-10 rounded-xl shadow-2xl">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-3 tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-xl font-medium mb-6 max-w-2xl mx-auto whitespace-pre-line">
            {subtitle}
          </p>
        )}
        <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">{description}</p>
        {buttonLink && buttonText && (
          isExternalLink ? (
            <a
              href={buttonLink}
              target={linkTarget}
              rel={linkTarget === '_blank' ? 'noopener noreferrer' : undefined}
              className="bg-white text-pink-600 font-bold py-4 px-10 rounded-lg hover:bg-gray-100 transition duration-300 text-xl shadow-md hover:shadow-lg transform hover:scale-105 inline-block"
            >
              {buttonText}
            </a>
          ) : (
            <Link
              href={buttonLink}
              target={linkTarget}
              className="bg-white text-pink-600 font-bold py-4 px-10 rounded-lg hover:bg-gray-100 transition duration-300 text-xl shadow-md hover:shadow-lg transform hover:scale-105 inline-block"
            >
              {buttonText}
            </Link>
          )
        )}
      </div>
    </section>
  );
} 