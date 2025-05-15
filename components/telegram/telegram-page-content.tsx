'use client';

// We will define a more specific interface for the page data later
interface TelegramPageData {
  title: string;
  description: string;
  longDescription?: string; // Example: more detailed content
  faq?: Array<{ question: string; answer: string }>;
  // other fields like image URLs, related links, etc.
}

interface TelegramPageContentProps {
  data: TelegramPageData;
}

export default function TelegramPageContent({ data }: TelegramPageContentProps) {
  if (!data) {
    return <p>Impossibile caricare il contenuto della pagina.</p>;
  }

  return (
    <article className="prose lg:prose-xl dark:prose-invert max-w-none">
      <h1>{data.title}</h1>
      <p className="lead">{data.description}</p>

      {data.longDescription && (
        <div dangerouslySetInnerHTML={{ __html: data.longDescription }} />
      )}

      {data.faq && data.faq.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Domande Frequenti (FAQ)</h2>
          <div className="space-y-4">
            {data.faq.map((item, index) => (
              <details key={index} className="p-4 border rounded-lg">
                <summary className="font-medium cursor-pointer">{item.question}</summary>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      {/* We can add more sections here for other data points */}
    </article>
  );
} 