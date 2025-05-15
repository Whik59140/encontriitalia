import { Metadata } from 'next';
import Link from 'next/link';
import { telegramCategoriesData, TelegramMainCategory } from '@/lib/telegram-categories'; // Import your categories

export const metadata: Metadata = {
  title: '🥵 Esplora Gruppi Telegram HOT | Chat e Community Piccanti 🔥',
  description: '🌶️ Unisciti ai migliori Gruppi Telegram per adulti: chat porno, incontri hot, scambisti, sexting e community senza censure. Trova il tuo gruppo e divertiti! 😈',
  openGraph: {
    title: '🥵 Esplora Gruppi Telegram HOT | Chat e Community Piccanti 🔥',
    description: '🌶️ Unisciti ai migliori Gruppi Telegram per adulti: chat porno, incontri hot, scambisti, sexting e community senza censure. Trova il tuo gruppo e divertiti! 😈',
    type: 'website',
    // Consider adding a relevant OG image here
  },
};

export default function GruppiTelegramAdultIndexPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl dark:prose-invert max-w-none">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">🥵 Gruppi Telegram HOT: Connettiti Senza Filtri 🔥</h1>
          <p className="text-xl mt-2 text-gray-600 dark:text-gray-300">Tuffati in un mondo di gruppi Telegram per adulti. Chat, discussioni, incontri e community per esplorare ogni tua fantasia.</p>
        </header>

        <section>
          <h2>Perché i Gruppi Telegram per Adulti?</h2>
          <p>I gruppi Telegram offrono uno spazio dinamico e interattivo per chi cerca contenuti e connessioni per adulti. Ecco i vantaggi:</p>
          <ul>
            <li>💬 <strong>Chat Dirette e Coinvolgenti:</strong> Partecipa a discussioni in tempo reale, conosci persone nuove e condividi le tue esperienze.</li>
            <li>💞 <strong>Community Tematiche:</strong> Trova gruppi dedicati a specifici interessi, feticismi, o tipi di incontri.</li>
            <li>🔞 <strong>Contenuti Generati dagli Utenti:</strong> Molti gruppi prosperano grazie alla condivisione di foto, video e storie da parte dei membri.</li>
            <li>🔗 <strong>Networking e Incontri:</strong> Alcuni gruppi sono focalizzati su incontri hot, scambisti o appuntamenti.</li>
            <li>🤫 <strong>Maggiore Riservatezza:</strong> Rispetto ai social network tradizionali, Telegram può offrire un ambiente più discreto per queste interazioni.</li>
          </ul>
          <p>Esplora le nostre categorie per trovare i gruppi che più ti intrigano. Partecipa attivamente, rispetta le regole dei gruppi e, soprattutto, divertiti in sicurezza!</p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Esplora le Categorie dei Gruppi HOT 🌶️</h2>
          {telegramCategoriesData.map((mainCategory: TelegramMainCategory) => (
            <div key={mainCategory.slug} className="mb-8 p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">{mainCategory.emoji} {mainCategory.name.replace(/\s*\(.*\)\s*/g, '')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {mainCategory.subcategories.map(subCategory => (
                  <Link 
                    href={`/telegram/gruppi/${subCategory.slug}`}
                    key={subCategory.slug}
                    className="block p-3 bg-gray-700 rounded-md hover:bg-blue-600 hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 text-center text-sm font-medium text-gray-200 hover:text-white"
                  >
                    {subCategory.name.replace(/\s*\(.*\)\s*/g, '')}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Domande Frequenti (FAQ) sui Gruppi Telegram Adult</h2>
          <div className="space-y-4">
            <details className="p-4 border border-gray-700 rounded-lg bg-gray-800">
              <summary className="font-medium cursor-pointer">🔞 L&apos;accesso a questi gruppi è per soli maggiorenni?</summary>
              <p className="mt-2 text-gray-300">Sì, categoricamente. Tutti i gruppi elencati e i temi trattati sono intesi per un pubblico adulto e consenziente. È vietato l&apos;accesso ai minori.</p>
            </details>
            <details className="p-4 border border-gray-700 rounded-lg bg-gray-800">
              <summary className="font-medium cursor-pointer">💬 Come funzionano le chat di gruppo?</summary>
              <p className="mt-2 text-gray-300">Nei gruppi, tutti i membri possono scrivere messaggi, inviare media (foto, video, audio), rispondere ai messaggi altrui e partecipare attivamente alle discussioni, a seconda delle regole impostate dagli amministratori.</p>
            </details>
            <details className="p-4 border border-gray-700 rounded-lg bg-gray-800">
              <summary className="font-medium cursor-pointer">🛡️ Questi gruppi sono moderati?</summary>
              <p className="mt-2 text-gray-300">La moderazione dipende interamente dagli amministratori di ciascun gruppo. Alcuni gruppi sono strettamente moderati, altri meno. Rispetta sempre le regole del gruppo e segnala comportamenti inappropriati agli admin.</p>
            </details>
            <details className="p-4 border border-gray-700 rounded-lg bg-gray-800">
              <summary className="font-medium cursor-pointer">❓Posso essere bannato da un gruppo?</summary>
              <p className="mt-2 text-gray-300">Sì, gli amministratori hanno il potere di rimuovere (bannare) membri che non rispettano le regole del gruppo, spammano, o tengono comportamenti offensivi.</p>
            </details>
          </div>
        </section>
      </article>
    </div>
  );
} 