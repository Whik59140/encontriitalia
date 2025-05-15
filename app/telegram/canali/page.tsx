import { Metadata } from 'next';
import Link from 'next/link';
import { telegramCategoriesData, TelegramMainCategory } from '@/lib/telegram-categories'; // Import your categories

export const metadata: Metadata = {
  title: '🔞 Esplora Canali Telegram HOT | Contenuti Adulti Esclusivi 🌶️',
  description: '🔥 Trova i migliori Canali Telegram per adulti: porno, xxx, nudo, incontri hot e molto altro. Link aggiornati e categorie piccanti. Entra nel divertimento! 😈',
  openGraph: {
    title: '🔞 Esplora Canali Telegram HOT | Contenuti Adulti Esclusivi 🌶️',
    description: '🔥 Trova i migliori Canali Telegram per adulti: porno, xxx, nudo, incontri hot e molto altro. Link aggiornati e categorie piccanti. Entra nel divertimento! 😈',
    type: 'website',
    // Consider adding a relevant OG image here
  },
};

export default function CanaliTelegramAdultIndexPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl dark:prose-invert max-w-none">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold">🔞 Canali Telegram HOT: Il Tuo Accesso al Piacere 🌶️</h1>
          <p className="text-xl mt-2 text-gray-600 dark:text-gray-300">Scopri un universo di canali Telegram dedicati ai contenuti per adulti. Trova esattamente quello che cerchi, dalla A alla XXX!</p>
        </header>

        <section>
          <h2>Perché i Canali Telegram per Adulti?</h2>
          <p>I canali Telegram sono diventati un hub primario per la condivisione discreta e diretta di contenuti per adulti. Ecco perché sono così popolari:</p>
          <ul>
            <li>🤫 <strong>Privacy e Anonimato:</strong> Goditi i contenuti con un maggiore livello di discrezione rispetto ad altre piattaforme.</li>
            <li>⚡ <strong>Accesso Istantaneo:</strong> Ricevi video, foto, link e aggiornamenti direttamente sul tuo dispositivo.</li>
            <li>💎 <strong>Contenuti Esclusivi:</strong> Molti canali offrono materiale raro, amatoriale o di nicchia non facilmente reperibile altrove.</li>
            <li>🔄 <strong>Aggiornamenti Costanti:</strong> I migliori canali vengono aggiornati frequentemente con nuovi contenuti freschi.</li>
            <li>🎯 <strong>Nicchie Specifiche:</strong> Dalle categorie più generali a quelle più particolari, c'è un canale per ogni fantasia.</li>
          </ul>
          <p>Esplora le nostre categorie per trovare i canali che accenderanno la tua curiosità. Ricorda di accedere a questi contenuti in modo responsabile e nel rispetto delle normative vigenti.</p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Esplora le Categorie dei Canali HOT 🔥</h2>
          {telegramCategoriesData.map((mainCategory: TelegramMainCategory) => (
            <div key={mainCategory.slug} className="mb-8 p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
              <h3 className="text-2xl font-semibold text-pink-400 mb-4">{mainCategory.emoji} {mainCategory.name.replace(/\s*\(.*\)\s*/g, '')}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {mainCategory.subcategories.map(subCategory => (
                  <Link 
                    href={`/telegram/canali/${subCategory.slug}`}
                    key={subCategory.slug}
                    className="block p-3 bg-gray-700 rounded-md hover:bg-pink-600 hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 text-center text-sm font-medium text-gray-200 hover:text-white"
                  >
                    {subCategory.name.replace(/\s*\(.*\)\s*/g, '')} 
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Domande Frequenti (FAQ) sui Canali Telegram Adult</h2>
          <div className="space-y-4">
            <details className="p-4 border border-gray-700 rounded-lg bg-gray-800">
              <summary className="font-medium cursor-pointer">🔞 Questi canali sono solo per maggiorenni?</summary>
              <p className="mt-2 text-gray-300">Assolutamente sì. I contenuti presenti nei canali elencati sono esplicitamente per un pubblico adulto e maggiorenne. L'accesso è vietato ai minori.</p>
            </details>
            <details className="p-4 border border-gray-700 rounded-lg bg-gray-800">
              <summary className="font-medium cursor-pointer">💸 L'accesso ai canali è gratuito?</summary>
              <p className="mt-2 text-gray-300">Molti canali offrono contenuti gratuiti. Alcuni potrebbero avere sezioni VIP, richiedere un abbonamento, o vendere pacchetti di contenuti. Verifica sempre le condizioni specifiche del canale.</p>
            </details>
            <details className="p-4 border border-gray-700 rounded-lg bg-gray-800">
              <summary className="font-medium cursor-pointer">❓ Come mi unisco a un canale?</summary>
              <p className="mt-2 text-gray-300">Clicca sul link del canale che ti interessa. Se hai Telegram installato, si aprirà direttamente l'app e potrai cliccare su "Unisciti".</p>
            </details>
             <details className="p-4 border border-gray-700 rounded-lg bg-gray-800">
              <summary className="font-medium cursor-pointer">⚠️ È sicuro navigare e scaricare da questi canali?</summary>
              <p className="mt-2 text-gray-300">Mentre Telegram offre un certo livello di privacy, la sicurezza dei contenuti (link esterni, file) dipende dagli amministratori del canale. Usa sempre buonsenso, un antivirus aggiornato e fai attenzione a ciò che scarichi o ai siti esterni che visiti.</p>
            </details>
          </div>
        </section>
      </article>
    </div>
  );
} 