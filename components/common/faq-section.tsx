import React from 'react';

interface FaqSectionProps {
  categoryDisplayName: string;
  cityDisplayName: string;
  subCategoryType: 'gratis' | 'sesso' | 'seri' | 'incontri';
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ categoryDisplayName, cityDisplayName, subCategoryType }: FaqSectionProps) {
  let faqItems: FaqItem[];

  const gratisFaqItems: FaqItem[] = [
    {
      question: `Come funzionano gli annunci gratuiti per incontri {category} a {city}?`,
      answer: `Gli annunci gratuiti per incontri {category} a {city} ti permettono di accedere a una piattaforma partner senza costi iniziali. Potrai creare un profilo, vedere altri utenti e iniziare a interagire. La registrazione è semplice e richiede solo la tua email. Ricorda di controllare la cartella spam per l'email di conferma.`,
    },
    {
      question: `Sono davvero gratuiti questi annunci {category} a {city} o ci sono costi nascosti?`,
      answer: `La registrazione e l'accesso base alla piattaforma per visualizzare gli annunci {category} gratuiti a {city} sono senza alcun costo. Alcune funzionalità avanzate o servizi premium potrebbero essere a pagamento, ma l'utilizzo principale per cercare e farsi un'idea è totalmente gratuito.`,
    },
    {
      question: `Cosa si intende per "annunci gratis" per {category} a {city}?`,
      answer: `Per "annunci gratis" si intende la possibilità di iscriversi e navigare tra i profili di {category} a {city} senza dover pagare una tariffa d'ingresso. Questo ti dà l'opportunità di vedere chi c'è e se la piattaforma fa per te prima di decidere eventualmente di accedere a funzioni extra.`,
    },
    {
      question: `È possibile trovare solo annunci {category} gratuiti nella zona di {city}?`,
      answer: `Sì, la piattaforma è ottimizzata per mostrarti annunci {category} pertinenti alla tua ricerca gratuita per {city} e dintorni. Potrai filtrare e cercare specificamente per la tua area geografica.`,
    },
    {
      question: `Quali sono i vantaggi degli annunci gratuiti {category} a {city}?`,
      answer: `Il vantaggio principale è l'assenza di barriere economiche all'ingresso. Puoi esplorare, conoscere la piattaforma e vedere i profili {category} a {city} senza impegno finanziario, rendendo la ricerca di incontri più accessibile.`,
    },
  ];

  const sessoFaqItems: FaqItem[] = [
    {
      question: `Come funzionano gli annunci per incontri di sesso {category} a {city}?`,
      answer: `Gli annunci per incontri di sesso {category} a {city} ti mettono in contatto con una piattaforma specializzata in incontri occasionali e avventure. Dopo una registrazione gratuita, potrai esplorare profili di persone con interessi simili nella tua zona. È importante essere chiari sulle proprie intenzioni e rispettare quelle altrui.`,
    },
    {
      question: `Questi annunci per sesso {category} a {city} sono discreti e sicuri?`,
      answer: `La piattaforma partner pone attenzione alla discrezione e alla sicurezza degli utenti. Tuttavia, la natura degli incontri richiede sempre prudenza. Utilizza le funzionalità di messaggistica interna e scegli luoghi pubblici per i primi incontri.`,
    },
    {
      question: `Cosa devo aspettarmi dagli annunci di sesso {category} a {city}?`,
      answer: `Aspettati di trovare persone interessate a incontri {category} a {city} senza impegno, focalizzati sull'aspetto fisico e sull'avventura. La comunicazione diretta e onesta è fondamentale per un'esperienza positiva per tutti.`,
    },
    {
      question: `È possibile trovare annunci per sesso {category} specifici per {city}?`,
      answer: `Certamente. La piattaforma ti permette di cercare e filtrare annunci per incontri di sesso {category} localizzati a {city}, facilitando la ricerca di partner vicini a te.`,
    },
    {
      question: `Ci sono regole o etichetta da seguire per gli annunci di sesso {category} a {city}?`,
      answer: `Sì, il rispetto reciproco, il consenso e l'onestà sono cruciali. Sii chiaro/a riguardo alle tue aspettative e rispetta quelle degli altri. La sicurezza personale dovrebbe essere sempre la priorità.`,
    },
  ];

  const seriFaqItems: FaqItem[] = [
    {
      question: `Come funzionano gli annunci per incontri seri {category} a {city}?`,
      answer: `Gli annunci per incontri seri {category} a {city} ti collegano a una piattaforma dedicata a chi cerca relazioni stabili e significative. Dopo la registrazione gratuita, potrai creare un profilo dettagliato e cercare persone compatibili con i tuoi valori e interessi a {city}.`,
    },
    {
      question: `È possibile trovare partner per relazioni serie tramite annunci {category} a {city}?`,
      answer: `Molte persone trovano relazioni durature attraverso piattaforme di incontri seri. Il segreto è essere onesti nel proprio profilo, chiari riguardo alle proprie intenzioni di cercare un rapporto {category} serio a {city}, e dedicare tempo a conoscere gli altri.`,
    },
    {
      question: `Cosa differenzia gli annunci "seri" {category} da altri tipi di annunci a {city}?`,
      answer: `Gli annunci "seri" {category} a {city} si rivolgono a utenti che desiderano costruire qualcosa di più profondo di un incontro occasionale. Le piattaforme spesso offrono funzionalità per evidenziare compatibilità di interessi e valori, piuttosto che solo l'attrazione fisica.`,
    },
    {
      question: `Come posso aumentare le mie possibilità di trovare un incontro serio {category} a {city}?`,
      answer: `Crea un profilo completo e sincero, carica foto recenti e di buona qualità, e sii proattivo/a nel contattare persone che ti sembrano interessanti per un rapporto {category} serio a {city}. La pazienza e la perseveranza sono importanti.`,
    },
    {
      question: `La privacy è tutelata quando si cercano incontri seri {category} a {city}?`,
      answer: `Le piattaforme per incontri seri generalmente adottano misure rigorose per proteggere la privacy dei loro utenti. È comunque buona norma leggere l'informativa sulla privacy e utilizzare le impostazioni disponibili per controllare la visibilità del proprio profilo.`,
    },
  ];

  const incontriFaqItems: FaqItem[] = [
    {
      question: `Come funzionano gli annunci per incontri generici {category} a {city}?`,
      answer: `Gli annunci per incontri {category} a {city} su questa piattaforma ti connettono a un servizio partner dove, dopo una registrazione gratuita, puoi esplorare profili verificati. L'obiettivo è facilitare connessioni di vario tipo, dall'amicizia a qualcosa di più, in base alle tue preferenze.`,
    },
    {
      question: `È sicuro usare il sito per annunci di incontri {category} a {city}?`,
      answer: `La piattaforma partner implementa misure di sicurezza e verifica dei profili per creare un ambiente affidabile. Tuttavia, la prudenza online è sempre consigliata: usa la messaggistica interna e scegli luoghi pubblici per i primi appuntamenti.`,
    },
    {
      question: `Cosa devo specificare per trovare annunci di incontri {category} a {city} adatti a me?`,
      answer: `Sii chiaro/a nel tuo profilo riguardo al tipo di incontro {category} che cerchi a {city} e alle tue aspettative. Questo aiuterà l'algoritmo della piattaforma partner a mostrarti persone con interessi compatibili.`,
    },
    {
      question: `Posso fidarmi dei profili che vedo negli annunci di incontri {category} a {city}?`,
      answer: `La piattaforma partner si impegna a mantenere una community con profili autentici, ma è sempre bene usare discernimento. Cerca profili completi e con foto recenti. In caso di dubbi, puoi segnalare attività sospette.`,
    },
    {
      question: `Ci sono consigli per un primo incontro {category} organizzato tramite annunci a {city}?`,
      answer: `Per il primo incontro {category} a {city}, scegli un luogo pubblico e informa un amico/a. Mantieni la conversazione leggera e rispetta i limiti dell'altra persona. La sicurezza prima di tutto.`,
    },
  ];

  if (subCategoryType === 'gratis') {
    faqItems = gratisFaqItems;
  } else if (subCategoryType === 'sesso') {
    faqItems = sessoFaqItems;
  } else if (subCategoryType === 'seri') {
    faqItems = seriFaqItems;
  } else {
    faqItems = incontriFaqItems;
  }

  // Generate JSON-LD for FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question.replace('{category}', categoryDisplayName).replace('{city}', cityDisplayName),
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer.replace('{category}', categoryDisplayName).replace('{city}', cityDisplayName),
      },
    })),
  };

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 sm:mb-10">
          Domande Frequenti - Annunci {categoryDisplayName} {subCategoryType === 'gratis' ? 'Gratis' : subCategoryType === 'sesso' ? 'di Sesso' : subCategoryType === 'seri' ? 'Seri' : 'Incontri'} a {cityDisplayName}
        </h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <details key={index} className="group rounded-lg bg-gray-50 dark:bg-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400">
                {item.question.replace('{category}', categoryDisplayName).replace('{city}', cityDisplayName)}
                <span className="ml-4 flex-shrink-0 transform transition-transform duration-200 group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </summary>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {item.answer.replace('{category}', categoryDisplayName).replace('{city}', cityDisplayName)}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
} 