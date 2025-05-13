import React from 'react';

interface SeoTextSectionProps {
  categoryDisplayName: string;
  cityDisplayName: string;
  subCategoryType: 'gratis' | 'sesso' | 'seri' | 'incontri';
}

export function SeoTextSection({ categoryDisplayName, cityDisplayName, subCategoryType }: SeoTextSectionProps) {
  let title: string;
  let p1: string;
  let p2: string;
  let h3: string;
  let li1: string;
  let li2: string;
  let li3: string;
  let li4: string;
  let li5: string;
  let p3: string;

  const categoryTextPlaceholder = '{category}'; 
  const cityTextPlaceholder = '{city}';

  // Helper function to escape regex special characters
  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  const categoryRegex = new RegExp(escapeRegExp(categoryTextPlaceholder), 'g');
  const cityRegex = new RegExp(escapeRegExp(cityTextPlaceholder), 'g');

  if (subCategoryType === 'gratis') {
    title = `Annunci ${categoryTextPlaceholder} Gratis a ${cityTextPlaceholder}: Incontri Senza Impegno Economico`;
    p1 = `Sei alla ricerca di incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder} senza dover mettere mano al portafoglio? Sei nel posto giusto! La nostra selezione di annunci gratuiti ti permette di esplorare un mondo di possibilità per conoscere persone affini a ${cityTextPlaceholder} in modo semplice e accessibile. Scopri come iniziare la tua avventura ${categoryTextPlaceholder} senza costi iniziali.`;
    p2 = `Navigare tra gli annunci ${categoryTextPlaceholder} gratuiti a ${cityTextPlaceholder} è facile. Accedi alla piattaforma partner, registrati in pochi istanti (basta un'email!) e inizia subito a vedere i profili. Non dimenticare di confermare la tua email (controlla la cartella SPAM!) per sbloccare tutte le funzionalità gratuite e non perdere l'opportunità di fare incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder} realmente gratuiti.`;
    h3 = `Perché Scegliere Annunci ${categoryTextPlaceholder} Gratuiti a ${cityTextPlaceholder}?`;
    li1 = `<strong>Zero Costi Iniziali:</strong> Esplora gli annunci ${categoryTextPlaceholder} a ${cityTextPlaceholder} senza alcun impegno finanziario.`;
    li2 = `<strong>Registrazione Semplice e Veloce:</strong> Inizia la tua ricerca in meno di un minuto.`;
    li3 = `<strong>Ampia Scelta di Profili:</strong> Trova persone interessate a incontri ${categoryTextPlaceholder} gratuiti.`;
    li4 = `<strong>Accesso Immediato:</strong> Visualizza subito gli annunci ${categoryTextPlaceholder} a ${cityTextPlaceholder} dopo l'iscrizione.`;
    li5 = `<strong>Piattaforma Intuitiva:</strong> Cerca e connettiti facilmente con altri utenti a ${cityTextPlaceholder}.`;
    p3 = `Non aspettare! Se cerchi incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder} senza spendere, questa è la tua occasione. Inizia subito a navigare tra gli annunci gratuiti!`;
  } else if (subCategoryType === 'sesso') {
    title = `Annunci Sesso ${categoryTextPlaceholder} a ${cityTextPlaceholder}: Avventure Piccanti e Discrete`;
    p1 = `Desideri incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder} all'insegna della passione e del divertimento senza legami? La nostra sezione dedicata agli annunci di sesso ${categoryTextPlaceholder} a ${cityTextPlaceholder} è quello che fa per te. Connettiti con persone dalla mentalità aperta, pronte a esplorare nuove avventure in un ambiente discreto e stimolante.`;
    p2 = `Trovare annunci per sesso ${categoryTextPlaceholder} a ${cityTextPlaceholder} è più semplice di quanto pensi. Registrati gratuitamente sulla piattaforma partner, completa il tuo profilo sottolineando i tuoi desideri e inizia a scoprire chi cerca le tue stesse emozioni a ${cityTextPlaceholder}. La discrezione è garantita, ma ricorda sempre di agire con rispetto e cautela. Conferma la tua email (verifica anche lo SPAM!) per un accesso completo.`;
    h3 = `Perché Cercare Annunci di Sesso ${categoryTextPlaceholder} a ${cityTextPlaceholder} Qui?`;
    li1 = `<strong>Massima Discrezione:</strong> Incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder} con un focus sulla privacy.`;
    li2 = `<strong>Comunità Aperta:</strong> Persone che cercano avventure di sesso ${categoryTextPlaceholder} senza giudizi.`;
    li3 = `<strong>Registrazione Gratuita:</strong> Accedi e valuta senza impegno iniziale.`;
    li4 = `<strong>Ricerca Localizzata:</strong> Trova partner per sesso ${categoryTextPlaceholder} vicini a te, a ${cityTextPlaceholder}.`;
    li5 = `<strong>Esperienze Elettrizzanti:</strong> Dai sfogo alla tua passione con incontri ${categoryTextPlaceholder} indimenticabili.`;
    p3 = `Non rimandare il piacere! Se gli incontri di sesso ${categoryTextPlaceholder} a ${cityTextPlaceholder} sono ciò che cerchi, iscriviti ora e preparati a vivere momenti intensi.`;
  } else if (subCategoryType === 'seri') {
    title = `Annunci Seri ${categoryTextPlaceholder} a ${cityTextPlaceholder}: Trova l'Anima Gemella`;
    p1 = `Sei stanco/a di incontri fugaci e cerchi una relazione ${categoryTextPlaceholder} seria e duratura a ${cityTextPlaceholder}? La nostra sezione di annunci seri è pensata per chi, come te, desidera costruire un legame profondo e significativo. Qui puoi trovare persone con valori e obiettivi simili, pronte a impegnarsi in una storia importante a ${cityTextPlaceholder}.`;
    p2 = `Iniziare la ricerca di annunci seri ${categoryTextPlaceholder} a ${cityTextPlaceholder} è un passo verso il futuro che desideri. Registrati gratuitamente sulla piattaforma partner, crea un profilo dettagliato che racconti chi sei e cosa cerchi in un partner ${categoryTextPlaceholder} a ${cityTextPlaceholder}, e inizia a interagire con persone che condividono la tua visione. Non dimenticare di confermare la tua email (controlla la cartella SPAM!) per accedere a tutte le funzionalità.`;
    h3 = `Perché Affidarsi ai Nostri Annunci Seri ${categoryTextPlaceholder} a ${cityTextPlaceholder}?`;
    li1 = `<strong>Focus sulle Relazioni Durature:</strong> Utenti interessati a incontri ${categoryTextPlaceholder} seri e stabili a ${cityTextPlaceholder}.`;
    li2 = `<strong>Profili Dettagliati:</strong> Conosci meglio le persone prima di contattarle.`;
    li3 = `<strong>Ricerca per Affinità:</strong> Trova partner ${categoryTextPlaceholder} compatibili con i tuoi interessi e valori a ${cityTextPlaceholder}.`;
    li4 = `<strong>Ambiente Sicuro e Rispettoso:</strong> Interagisci con serenità.`;
    li5 = `<strong>Opportunità Reali:</strong> Molte coppie ${categoryTextPlaceholder} a ${cityTextPlaceholder} si sono formate qui.`;
    p3 = `Non lasciare che il destino decida per te. Se vuoi un incontro ${categoryTextPlaceholder} serio a ${cityTextPlaceholder}, fai il primo passo: iscriviti e scopri chi ti sta aspettando.`;
  } else { // incontri
    title = `Annunci Incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder}: Trova la Tua Connessione Ideale`;
    p1 = `Cerchi incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder} per ampliare la tua cerchia sociale o trovare qualcuno di speciale? Questa sezione di annunci è dedicata a chi cerca connessioni autentiche, che sia un'amicizia, una compagnia per eventi o l'inizio di qualcosa di più. Scopri profili verificati a ${cityTextPlaceholder} e inizia a chattare!`;
    p2 = `Esplorare gli annunci di incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder} è un modo moderno e efficace per conoscere nuove persone. Con la registrazione gratuita sulla piattaforma partner, potrai creare il tuo profilo, specificare cosa cerchi in un incontro ${categoryTextPlaceholder} a ${cityTextPlaceholder} e sfogliare le proposte. Ricorda di confermare la tua email (controlla SPAM!) per un'esperienza completa.`;
    h3 = `Perché Utilizzare Questi Annunci per Incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder}?`;
    li1 = `<strong>Varietà di Profili:</strong> Persone interessate a diversi tipi di incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder}.`;
    li2 = `<strong>Facilità d'Uso:</strong> Piattaforma intuitiva per cercare e connetterti a ${cityTextPlaceholder}.`;
    li3 = `<strong>Registrazione Gratuita:</strong> Inizia senza impegno a scoprire gli annunci ${categoryTextPlaceholder}.`;
    li4 = `<strong>Sicurezza e Riservatezza:</strong> Ambiente controllato per i tuoi incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder}.`;
    li5 = `<strong>Opportunità Reali:</strong> Trova compagnia, amicizia o amore a ${cityTextPlaceholder}.`;
    p3 = `Non aspettare il caso! Dai una svolta alla tua vita sociale con gli annunci di incontri ${categoryTextPlaceholder} a ${cityTextPlaceholder}. Iscriviti e vedi chi c'è là fuori!`;
  }

  return (
    <section className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose prose-sm sm:prose dark:prose-invert">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
            {title.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </h2>
          <p>
            {p1.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </p>
          <p>
            {p2.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2">
            {h3.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </h3>
          <ul>
            <li dangerouslySetInnerHTML={{ __html: li1.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
            <li dangerouslySetInnerHTML={{ __html: li2.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
            <li dangerouslySetInnerHTML={{ __html: li3.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
            <li dangerouslySetInnerHTML={{ __html: li4.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
            <li dangerouslySetInnerHTML={{ __html: li5.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName) }} />
          </ul>
          <p>
            {p3.replace(categoryRegex, categoryDisplayName).replace(cityRegex, cityDisplayName)}
          </p>
        </div>
      </div>
    </section>
  );
} 