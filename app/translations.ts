// app/translations.ts

export const globalSiteStrings = {
  siteName: "Incontri Italia",
  logoAriaLabel: "Incontri Italia - Pagina principale",
  defaultCityFallback: "Italia"
};

export const siteHeaderCtasStrings = {
  penisEnlargementText: "Più Centimetri? 🍆",
  penisEnlargementAria: "Scopri di più sull'aumento delle dimensioni",
  penisEnlargementImageAlt: "Prodotto per l'ingrandimento del pene",
  strongerErectionText: "Erezione Forte? 💪",
  strongerErectionAria: "Scopri di più sul miglioramento dell'erezione",
  strongerErectionImageAlt: "Prodotto per il miglioramento dell'erezione",
  discount: "-40%"
};

export const interstitialModalStrings = {
  defaultTitle: "Conferma Accesso! ✅",
  defaultDescription: (categoryName: string, cityName: string) =>
    `Stai per scoprire profili di ${categoryName} 100% reali e verificati a ${cityName}!\n\nLa registrazione è gratuita, richiede solo la tua email e meno di 1 minuto. Accettiamo solo profili autentici.`,
  warningPrefix: "Importante:",
  warningMainText: "Dopo la registrazione, controlla la tua casella di posta elettronica (anche la cartella SPAM!) per l'email di conferma.",
  confirmButtonText: "Conferma e Scopri i Profili",
  cancelButtonText: "Annulla",
  secureConnectionText: "Connessione Sicura e Discreta",
  secureConnectionImageAlt: "Icona connessione sicura",
  freeRegistrationText: "La registrazione è 100% GRATUITA.",
  takes30SecondsText: "Richiede solo 30 secondi del tuo tempo.",
  closeButtonAria: "Chiudi modale"
};

export const rootLayoutStrings = {
  chatLiveText: "Chat Live",
  chatLiveInCity: (cityName: string) => `Chat Live a ${cityName}`,
  chatLiveInCategoryInCity: (categoryName: string, cityName: string) => `Chat Live ${categoryName} a ${cityName}`,
  // Add other layout-specific strings here if any
};

export const countdownTimerStrings = {
  offerExpiredText: "Offerta Scaduta!"
};

export const homePageStrings = {
  categoryDisplayNames: {
    'incontri': 'Incontri',
    'trans': 'Trans',
    'milf': 'Milf',
    'gay': 'Gay',
    'donne': 'Donne',
    'ragazze': 'Ragazze',
    'trav': 'Trav',
  } as { [key: string]: string },
  mainHeading: "Trova quello che cerchi nella tua città!",
  subHeading: "Seleziona la categoria di tuo interesse per iniziare.",
  highlightText: "✨ È Gratis, Senza Numero di Telefono, Registrazione in 30 Secondi! ✨",
  categoryButtonPrefix: "Sto cercando ",
  categoryButtonSuffix: " 👉",
  exploreByCityHeading: "Oppure, esplora per città:"
};

export const chatPageStrings = {
  metadataTitle: 'Chat Incontri Italia - Cerca Chat Room Locali per Città e Categoria',
  metadataDescription: 'Trova la chat room per incontri nella tua città. Cerca per città e seleziona la categoria (gay, donne, milf, trans, etc.) per iniziare a chattare.',
  metadataKeywords: ['cerca chat italia', 'chat italia', 'chat incontri', 'chat room locali', 'chat per città', 'chat per categoria', 'incontri online'],
  mainHeading: "Cerca la Tua Chat Room",
  subHeading: "Digita il nome della tua città per trovare le chat room disponibili e iniziare subito!"
};

export const citySlugPageStrings = {
  notFoundTitle: 'Città Non Trovata',
  notFoundDescription: 'La città che stai cercando non esiste.',
  generateMetadataTitle: (cityName: string) => `Incontri a ${cityName} - Annunci per Adulti`,
  generateMetadataDescription: (cityName: string) => `Esplora categorie come gay, milf, donne, trans, escort a ${cityName}. Trova i migliori annunci.`,
  breadcrumbHome: "Home",
  headerTitle: (cityName: string) => `Incontri a ${cityName}`,
  headerDescription: (cityName: string) => `Esplora le categorie disponibili per ${cityName} e trova quello che cerchi.`,
  popularCategoriesTitle: (cityName: string) => `Categorie Popolari a ${cityName}`,
  categoryImageAlt: (categoryName: string) => `${categoryName} background`,
  categoryCardTitle: (categoryName: string) => `Incontri ${categoryName}`,
  categoryCardDiscoverMore: "Scopri di più",
  categoryEmojis: {
    'incontri': '💖',
    'trans': '⚧️',
    'milf': '🔥',
    'gay': '🏳️‍🌈',
    'donne': '💃',
    'ragazze': '💄',
    'trav': '💅',
    'escort': '💋',
    // Add more as needed for other category slugs from getAllCategories()
  } as { [key: string]: string; },
  ctaArrowText: "Vai"
};

export const cityCategoryPageStrings = {
  untitledArticle: "Articolo Senza Titolo",
  pageTitle: (city: string, category: string) => `${category} a ${city}`,
  ctaTitle: (category: string, city: string) => `Cerchi ${category} a ${city}?`,
  ctaSubtitle: "Trova subito quello che cerchi!",
  readMoreButtonText: "✨ Leggi di più &rarr;",
  viewAllAdsLink: (category: string, city: string) => `Vedi Annunci ${category} a ${city}`,
  noArticlesFound: "Nessun articolo trovato per questa categoria e città. Torna presto per nuovi contenuti!",
  ctaSectionDescription: "Non aspettare, la tua prossima avventura potrebbe essere a un clic di distanza.",
  ctaSectionButtonText: "💕 Inizia Subito!",
  defaultFallbackLink: "https://www.example.com/default-fallback", // For affiliate link fallback
  articleCardImageAltText: (categoryName: string) => `Immagine rappresentativa per articoli su ${categoryName}`
};

export const annunciChooserPageStrings = {
  affiliateLinkTemplate: 'https://affiliate.example.com/register?campaign={categorySlug}&location={citySlug}&tracking_id=your_id',
  metadataTitle: (categoryName: string, cityName: string) => `Annunci ${categoryName} a ${cityName}: Scegli la Tipologia`,
  metadataDescription: (categoryName: string, cityName: string) => `Scegli tra annunci gratuiti, annunci per sesso, o annunci per incontri seri ${categoryName} a ${cityName}. Trova subito quello che cerchi!`,
  keywordsPart1: "annunci", // for `annunci ${categoryName} ${cityName}`
  keywordsPart2: "scegli annunci", // for `scegli annunci ${categoryName} ${cityName}`
  backLinkText: (categoryName: string, cityName: string) => `Torna a ${categoryName} a ${cityName}`,
  mainHeading: (categoryName: string, cityName: string) => `Annunci ${categoryName} a ${cityName}: Scegli la Categoria Giusta per Te`,
  sectionHeading: (categoryName: string, cityName: string) => `Che tipo di annunci ${categoryName} stai cercando a ${cityName}?`,
  linkButtonGratisText: "Gratis 🆓",
  linkButtonGratisSubtext: "Senza impegno, per curiosare",
  linkButtonSessoText: "Sesso 🔥",
  linkButtonSessoSubtext: "Avventure piccanti e senza tabù",
  linkButtonSeriText: "Seri ❤️",
  linkButtonSeriSubtext: "Per chi cerca l&rsquo;anima gemella", // Using &rsquo; for the apostrophe
  linkButtonIncontriText: "Incontri 🤝",
  linkButtonIncontriSubtext: "Connessioni generiche, amicizie"
};

export const annunciGratisPageStrings = {
  subCategoryDisplayName: "Gratis",
  metadataTitleSuffix: "Incontri Esclusivi",
  metadataDescriptionPart1: "Scopri i migliori annunci", // for `Scopri i migliori annunci ${SUB_CATEGORY_DISPLAY_NAME} per incontri ${categoryName} a ${cityName}.`
  metadataDescriptionPart2: "Profili verificati, registrazione veloce. Trova subito!", // for `Profili verificati, registrazione veloce. Trova subito!`
  keywordsPart1: "annunci", // for `annunci ${SUB_CATEGORY_DISPLAY_NAME} ${categoryName} ${cityName}`
  keywordsPart2: "incontri", // for `incontri ${SUB_CATEGORY_DISPLAY_NAME} ${categoryName} ${cityName}`
  backToChooserLinkText: (categoryName: string, cityName: string) => `Torna alla scelta annunci ${categoryName} a ${cityName}`
};

export const annunciIncontriPageStrings = {
  subCategoryDisplayName: "Incontri",
  categoryDisplayNames: {
    gay: 'Gay',
    milf: 'MILF',
    donne: 'Donne',
    ragazze: 'Ragazze',
    trans: 'Trans',
    trav: 'Trav',
    escort: 'Escort',
    studentessa: 'Studentesse',
    adulti: 'Adulti',
  } as { [key: string]: string },
  generateMetadataTitle: (subCategoryDisplayName: string, categoryName: string, cityName: string) => `Annunci ${subCategoryDisplayName} ${categoryName} a ${cityName} - Trova Subito!`,
  generateMetadataDescription: (subCategoryDisplayName: string, categoryName: string, cityName: string) => `Scopri annunci per ${subCategoryDisplayName} ${categoryName} a ${cityName}. Connessioni autentiche e profili verificati.`,
  generateMetadataKeywords: (subCategoryDisplayName: string, categoryName: string, cityName: string) => [`annunci ${subCategoryDisplayName} ${categoryName} ${cityName}`, `incontri ${categoryName} ${cityName}`],
  backLinkText: (categoryDisplayName: string, cityName: string) => `Torna alla scelta annunci ${categoryDisplayName} a ${cityName}`,
};

export const annunciSessoPageStrings = {
  subCategoryDisplayName: "Sesso",
  metadataTitleSuffix: "Incontri Piccanti",
  generateMetadataTitle: (subCategoryDisplayName: string, categoryName: string, cityName: string, titleSuffix: string) => `Annunci ${subCategoryDisplayName} ${categoryName} a ${cityName} - ${titleSuffix}`,
  generateMetadataDescription: (subCategoryDisplayName: string, categoryName: string, cityName: string) => `Esplora annunci ${subCategoryDisplayName} ${categoryName} a ${cityName}. Incontri passionali e discreti. Registrati subito!`,
  generateMetadataKeywords: (subCategoryDisplayName: string, categoryName: string, cityName: string) => [
    `annunci ${subCategoryDisplayName} ${categoryName} ${cityName}`,
    `incontri ${subCategoryDisplayName} ${categoryName} ${cityName}`,
    `sesso ${categoryName} ${cityName}`
  ],
  backLinkText: (categoryDisplayName: string, cityName: string) => `Torna a ${categoryDisplayName} a ${cityName}`,
};

export const annunciSeriPageStrings = {
  subCategoryDisplayName: "Seri",
  generateMetadataTitle: (subCategoryDisplayName: string, categoryName: string, cityName: string) => `Annunci Incontri ${subCategoryDisplayName} ${categoryName} a ${cityName}`,
  generateMetadataDescription: (subCategoryDisplayName: string, categoryName: string, cityName: string) => `Trova annunci per incontri ${subCategoryDisplayName} ${categoryName} a ${cityName}. Relazioni stabili e persone interessanti. Iscriviti ora!`,
  generateMetadataKeywords: (subCategoryDisplayName: string, categoryName: string, cityName: string) => [
    `annunci ${subCategoryDisplayName} ${categoryName} ${cityName}`,
    `incontri ${subCategoryDisplayName} ${categoryName} ${cityName}`,
    `relazioni ${subCategoryDisplayName} ${categoryName} ${cityName}`
  ],
  // Using the same backLinkText structure as annunciSesso for now, can be customized if needed
  backLinkText: (categoryDisplayName: string, cityName: string) => `Torna a ${categoryDisplayName} a ${cityName}`,
};

export const footerStrings = {
  regionalCitiesHeadingArticle: (regionName: string) => `Leggi questo articolo in altre città del ${regionName}:`,
  regionalCitiesHeadingGeneric: (regionName: string) => `Altre città in ${regionName}:`,
  copyrightPrefix: "©",
  copyrightSuffix: "Tutti i diritti riservati.",
  contactCommercialText: "Per contatti commerciali:",
  madeByText: "Realizzato da"
};

export const announcesGridStrings = {
  subCategoryTitleTemplates: {
    default: [
      "Incontri {category} a {city}: Nuovi Annunci!",
      "Passione e Divertimento a {city} - Annunci {category}",
      "{category} a {city}: Scopri i Profili Più Caldi!",
    ],
    gratis: [
      "Annunci {category} Gratis a {city}: Inizia Subito!",
      "{city}: {category} Gratuiti da Non Perdere!",
      "Accesso Gratuito: Annunci {category} a {city}",
    ],
    sesso: [
      "Annunci Sesso {category} a {city}: Passione Garantita!",
      "{city} Hot: Incontri Sesso {category} Esplosivi!",
      "Desideri {category} Sesso a {city}? Ecco gli Annunci!",
    ],
    seri: [
      "Incontri Seri {category} a {city}: Trova l'Anima Gemella!",
      "{city}: Relazioni Serie con {category} Speciali.",
      "Cerchi Amore Vero? Annunci {category} Seri a {city}",
    ],
    incontri: [
      "Annunci Incontri {category} a {city}: Connessioni Autentiche!",
      "{city}: Scopri Nuovi Incontri {category} Oggi Stesso!",
      "Incontri {category} a {city}: Profili Verificati Ti Aspettano!",
    ],
  },
  subCategoryDescriptionTemplates: {
    default: [
      "Profili verificati e pronti a connettersi. La tua prossima avventura {category} a {city} inizia qui.",
      "Discrezione e divertimento assicurati. Esplora i migliori annunci {category} di {city}.",
    ],
    gratis: [
      "Registrazione 100% gratuita per annunci {category} a {city}. Inizia a chattare senza costi!",
      "Scopri profili {category} a {city} con accesso totalmente gratuito. Facile e veloce!",
    ],
    sesso: [
      "Vivi momenti di pura passione con gli annunci sesso {category} a {city}. Massima discrezione.",
      "Incontri piccanti e senza impegno. Esplora gli annunci sesso {category} più hot di {city}.",
    ],
    seri: [
      "Trova una relazione stabile e significativa. Annunci per incontri seri {category} a {city}. Profili autentici.",
      "Se cerchi l'amore vero e incontri {category} seri a {city}, sei nel posto giusto. Iscriviti ora.",
    ],
    incontri: [ // Added missing incontri descriptions for consistency
      "Connettiti con profili {category} autentici e verificati a {city}. L'avventura ti aspetta!",
      "Nuovi incontri {category} ti aspettano a {city}. Scopri chi c'è online ora!",
    ],
  },
  registrationTimeMinutesAgo: (minutes: number) => `${minutes} minut${minutes === 1 ? 'o' : 'i'} fa`,
  registrationTimeHoursAgo: (hours: number) => `${hours} or${hours === 1 ? 'a' : 'e'} fa`,
  gridTitleDefault: (categoryDisplayName: string, cityDisplayName: string) => `Annunci ${categoryDisplayName} a ${cityDisplayName}`,
  gridTitleGratis: (categoryDisplayName: string, cityDisplayName: string) => `Annunci Gratis ${categoryDisplayName} a ${cityDisplayName}`,
  gridTitleSesso: (categoryDisplayName: string, cityDisplayName: string) => `Annunci Sesso ${categoryDisplayName} a ${cityDisplayName}`,
  gridTitleSeri: (categoryDisplayName: string, cityDisplayName: string) => `Annunci Incontri Seri ${categoryDisplayName} a ${cityDisplayName}`,
  gridTitleIncontri: (categoryDisplayName: string, cityDisplayName: string) => `Annunci Incontri ${categoryDisplayName} a ${cityDisplayName}`,
  announceCardCtaText: "Scopri Profilo e Chatta",
  announceCardAltText: (title: string, index: number) => `${title} - Annuncio ${index + 1}`,
};

export const faqSectionStrings = {
  sectionTitle: (categoryDisplayName: string, cityDisplayName: string, subCategoryType?: string) => {
    let typeText = "Incontri"; // Default
    if (subCategoryType === 'gratis') typeText = "Gratis";
    else if (subCategoryType === 'sesso') typeText = "di Sesso";
    else if (subCategoryType === 'seri') typeText = "Seri";
    else if (subCategoryType === 'chat') return `Domande Frequenti - Chat ${categoryDisplayName} a ${cityDisplayName}`;
    else if (subCategoryType === 'cityGeneral') return `Domande Frequenti su Incontri e Annunci a ${cityDisplayName}`; // New case
    // 'incontri' type will use the default "Incontri"
    return `Domande Frequenti - Annunci ${categoryDisplayName} ${typeText} a ${cityDisplayName}`;
  },
  gratisFaqItems: [
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
  ],
  sessoFaqItems: [
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
  ],
  seriFaqItems: [
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
  ],
  incontriFaqItems: [
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
  ],
  chatFaqItems: [
    {
      question: `Come funziona la chat {category} a {city}?`,
      answer: `La chat {category} a {city} ti permette di entrare in contatto diretto con altri utenti interessati. Dopo un breve accesso, potrai vedere chi è online e iniziare a scambiare messaggi in tempo reale.`,
    },
    {
      question: `La registrazione alla chat {category} a {city} è gratuita?`,
      answer: `Sì, l'accesso base alla chat {category} a {city} per vedere i profili e iniziare a interagire è gratuito. Alcune funzionalità avanzate potrebbero essere disponibili tramite servizi premium offerti dalla piattaforma partner.`,
    },
    {
      question: `È sicuro utilizzare la chat {category} a {city}?`,
      answer: `La piattaforma partner si impegna per garantire un ambiente sicuro. Tuttavia, ti consigliamo sempre prudenza: non condividere informazioni troppo personali immediatamente e diffida da richieste insolite. Utilizza le funzioni di segnalazione se necessario.`,
    },
    {
      question: `Posso usare la chat {category} a {city} da mobile?`,
      answer: `Certamente! La piattaforma di chat {category} a {city} è accessibile da smartphone e tablet, permettendoti di chattare comodamente ovunque tu sia.`,
    },
    {
      question: `Cosa devo fare se incontro problemi tecnici o utenti molesti nella chat {category} a {city}?`,
      answer: `Se riscontri problemi tecnici, prova a ricaricare la pagina o a controllare la tua connessione. Per utenti molesti, utilizza le opzioni di blocco o segnalazione utente fornite dalla piattaforma di chat {category} a {city}.`,
    },
  ],
  cityGeneralFaqItems: [ // New FAQ items for general city pages
    {
      question: `Quali tipi di incontri posso trovare a {city}?`,
      answer: `A {city} puoi trovare una vasta gamma di opportunità di incontri, da relazioni serie ad avventure casuali, amicizie e chat. Esplora le diverse categorie sul nostro sito per scoprire quella più adatta a te.`
    },
    {
      question: `Come posso iniziare a cercare annunci o profili a {city}?`,
      answer: `È semplice! Seleziona una delle categorie di tuo interesse per {city} dalla nostra homepage o dalle sezioni dedicate. Potrai quindi navigare tra gli annunci e profili disponibili per iniziare la tua ricerca.`
    },
    {
      question: `È sicuro utilizzare questo sito per incontri a {city}?`,
      answer: `La sicurezza dei nostri utenti è una priorità. Collaboriamo con piattaforme partner che adottano misure per la verifica dei profili. Tuttavia, consigliamo sempre prudenza: leggi i nostri consigli sulla sicurezza online e per i primi appuntamenti.`
    },
    {
      question: `Ci sono consigli specifici per gli incontri a {city}?`,
      answer: `Ogni città ha la sua atmosfera unica! A {city}, ti consigliamo di essere aperto/a a nuove esperienze, comunicare chiaramente le tue intenzioni e, per i primi incontri, scegliere luoghi pubblici e conosciuti. Sfrutta le peculiarità di {city} per rendere i tuoi appuntamenti speciali.`
    },
    {
      question: `Posso trovare annunci per diverse fasce d'età o interessi specifici a {city}?`,
      answer: `Assolutamente. Le nostre categorie coprono un'ampia varietà di interessi e fasce d'età. Ti invitiamo a esplorare le sezioni dedicate (es. MILF, Gay, Studentesse, etc.) per trovare annunci più mirati per {city}.`
    }
  ]
};

export const seoTextSectionStrings = {
  gratis: {
    title: `Annunci {category} Gratis a {city}: Incontri Senza Impegno Economico`,
    p1: `Sei alla ricerca di incontri {category} a {city} senza dover mettere mano al portafoglio? Sei nel posto giusto! La nostra selezione di annunci gratuiti ti permette di esplorare un mondo di possibilità per conoscere persone affini a {city} in modo semplice e accessibile. Scopri come iniziare la tua avventura {category} senza costi iniziali.`,
    p2: `Navigare tra gli annunci {category} gratuiti a {city} è facile. Accedi alla piattaforma partner, registrati in pochi istanti (basta un'email!) e inizia subito a vedere i profili. Non dimenticare di confermare la tua email (controlla la cartella SPAM!) per sbloccare tutte le funzionalità gratuite e non perdere l'opportunità di fare incontri {category} a {city} realmente gratuiti.`,
    h3: `Perché Scegliere Annunci {category} Gratuiti a {city}?`,
    li1: `<strong>Zero Costi Iniziali:</strong> Esplora gli annunci {category} a {city} senza alcun impegno finanziario.`,
    li2: `<strong>Registrazione Semplice e Veloce:</strong> Inizia la tua ricerca in meno di un minuto.`,
    li3: `<strong>Ampia Scelta di Profili:</strong> Trova persone interessate a incontri {category} gratuiti.`,
    li4: `<strong>Accesso Immediato:</strong> Visualizza subito gli annunci {category} a {city} dopo l'iscrizione.`,
    li5: `<strong>Piattaforma Intuitiva:</strong> Cerca e connettiti facilmente con altri utenti a {city}.`,
    p3: `Non aspettare! Se cerchi incontri {category} a {city} senza spendere, questa è la tua occasione. Inizia subito a navigare tra gli annunci gratuiti!`,
  },
  sesso: {
    title: `Annunci Sesso {category} a {city}: Avventure Piccanti e Discrete`,
    p1: `Desideri incontri {category} a {city} all'insegna della passione e del divertimento senza legami? La nostra sezione dedicata agli annunci di sesso {category} a {city} è quello che fa per te. Connettiti con persone dalla mentalità aperta, pronte a esplorare nuove avventure in un ambiente discreto e stimolante.`,
    p2: `Trovare annunci per sesso {category} a {city} è più semplice di quanto pensi. Registrati gratuitamente sulla piattaforma partner, completa il tuo profilo sottolineando i tuoi desideri e inizia a scoprire chi cerca le tue stesse emozioni a {city}. La discrezione è garantita, ma ricorda sempre di agire con rispetto e cautela. Conferma la tua email (verifica anche lo SPAM!) per un accesso completo.`,
    h3: `Perché Cercare Annunci di Sesso {category} a {city} Qui?`,
    li1: `<strong>Massima Discrezione:</strong> Incontri {category} a {city} con un focus sulla privacy.`,
    li2: `<strong>Comunità Aperta:</strong> Persone che cercano avventure di sesso {category} senza giudizi.`,
    li3: `<strong>Registrazione Gratuita:</strong> Accedi e valuta senza impegno iniziale.`,
    li4: `<strong>Ricerca Localizzata:</strong> Trova partner per sesso {category} vicini a te, a {city}.`,
    li5: `<strong>Esperienze Elettrizzanti:</strong> Dai sfogo alla tua passione con incontri {category} indimenticabili.`,
    p3: `Non rimandare il piacere! Se gli incontri di sesso {category} a {city} sono ciò che cerchi, iscriviti ora e preparati a vivere momenti intensi.`,
  },
  seri: {
    title: `Annunci Seri {category} a {city}: Trova l'Anima Gemella`,
    p1: `Sei stanco/a di incontri fugaci e cerchi una relazione {category} seria e duratura a {city}? La nostra sezione di annunci seri è pensata per chi, come te, desidera costruire un legame profondo e significativo. Qui puoi trovare persone con valori e obiettivi simili, pronte a impegnarsi in una storia importante a {city}.`,
    p2: `Iniziare la ricerca di annunci seri {category} a {city} è un passo verso il futuro che desideri. Registrati gratuitamente sulla piattaforma partner, crea un profilo dettagliato che racconti chi sei e cosa cerchi in un partner {category} a {city}, e inizia a interagire con persone che condividono la tua visione. Non dimenticare di confermare la tua email (controlla la cartella SPAM!) per accedere a tutte le funzionalità.`,
    h3: `Perché Affidarsi ai Nostri Annunci Seri {category} a {city}?`,
    li1: `<strong>Focus sulle Relazioni Durature:</strong> Utenti interessati a incontri {category} seri e stabili a {city}.`,
    li2: `<strong>Profili Dettagliati:</strong> Conosci meglio le persone prima di contattarle.`,
    li3: `<strong>Ricerca per Affinità:</strong> Trova partner {category} compatibili con i tuoi interessi e valori a {city}.`,
    li4: `<strong>Ambiente Sicuro e Rispettoso:</strong> Interagisci con serenità.`,
    li5: `<strong>Opportunità Reali:</strong> Molte coppie {category} a {city} si sono formate qui.`,
    p3: `Non lasciare che il destino decida per te. Se vuoi un incontro {category} serio a {city}, fai il primo passo: iscriviti e scopri chi ti sta aspettando.`,
  },
  incontri: {
    title: `Annunci Incontri {category} a {city}: Trova la Tua Connessione Ideale`,
    p1: `Cerchi incontri {category} a {city} per ampliare la tua cerchia sociale o trovare qualcuno di speciale? Questa sezione di annunci è dedicata a chi cerca connessioni autentiche, che sia un'amicizia, una compagnia per eventi o l'inizio di qualcosa di più. Scopri profili verificati a {city} e inizia a chattare!`,
    p2: `Esplorare gli annunci di incontri {category} a {city} è un modo moderno e efficace per conoscere nuove persone. Con la registrazione gratuita sulla piattaforma partner, potrai creare il tuo profilo, specificare cosa cerchi in un incontro {category} a {city} e sfogliare le proposte. Ricorda di confermare la tua email (controlla SPAM!) per un'esperienza completa.`,
    h3: `Perché Utilizzare Questi Annunci per Incontri {category} a {city}?`,
    li1: `<strong>Varietà di Profili:</strong> Persone interessate a diversi tipi di incontri {category} a {city}.`,
    li2: `<strong>Facilità d'Uso:</strong> Piattaforma intuitiva per cercare e connetterti a {city}.`,
    li3: `<strong>Registrazione Gratuita:</strong> Inizia senza impegno a scoprire gli annunci {category}.`,
    li4: `<strong>Sicurezza e Riservatezza:</strong> Ambiente controllato per i tuoi incontri {category} a {city}.`,
    li5: `<strong>Opportunità Reali:</strong> Trova compagnia, amicizia o amore a {city}.`,
    p3: `Non aspettare il caso! Dai una svolta alla tua vita sociale con gli annunci di incontri {category} a {city}. Iscriviti e vedi chi c'è là fuori!`,
  },
  chat: {
    title: `Chat {category} a {city}: Conversazioni Live e Incontri Immediati`,
    p1: `Entra nel vivo dell'azione con la nostra chat {category} a {city}! Se cerchi un modo diretto e immediato per conoscere persone nuove con i tuoi stessi interessi, la chat è la soluzione perfetta. Dimentica lunghe attese e messaggi senza risposta: qui trovi utenti {category} pronti a dialogare e a fare nuove conoscenze a {city} in tempo reale.`,
    p2: `La nostra piattaforma di chat {category} a {city} è pensata per essere facile, divertente e soprattutto efficace. Con una semplice registrazione gratuita, avrai accesso a un mondo di conversazioni stimolanti. Che tu stia cercando un'avventura, un'amicizia o l'anima gemella {category} a {city}, la chat ti offre l'opportunità di scoprirlo subito. Non perdere tempo, la tua prossima grande conoscenza potrebbe essere a un clic di distanza!`,
    h3: `Perché Scegliere la Chat {category} a {city}?`,
    li1: `<strong>Interazione Immediata:</strong> Parla subito con utenti {category} online a {city}.`,
    li2: `<strong>Accesso Gratuito:</strong> Registrati e inizia a chattare senza costi iniziali.`,
    li3: `<strong>Profili Verificati:</strong> Connettiti con persone reali e interessate a incontri {category} a {city}.`,
    li4: `<strong>Comodità Mobile:</strong> Chatta ovunque ti trovi, da qualsiasi dispositivo.`,
    li5: `<strong>Divertimento Assicurato:</strong> Un modo frizzante e moderno per socializzare e trovare incontri {category} a {city}.`,
    p3: `Non aspettare oltre! Tuffati nelle conversazioni della chat {category} a {city} e scopri un universo di possibilità. La registrazione è veloce e gratuita. Inizia ora!`,
  },
  cityGeneral: { // New SEO text for general city pages
    title: `Incontri e Annunci a {city}: La Tua Guida Completa`,
    p1: `Scopri il vibrante mondo degli incontri a {city}! Che tu stia cercando l'anima gemella, nuove amicizie, avventure eccitanti o semplicemente qualcuno con cui chattare, {city} offre innumerevoli possibilità. Questa guida ti aiuterà a navigare le opzioni e a trovare ciò che fa per te.`,
    p2: `Utilizzare il nostro portale per {city} è il primo passo per connetterti con persone interessanti e profili verificati. Dalle chat room tematiche agli annunci specifici per categoria, la nostra piattaforma ti mette a disposizione tutti gli strumenti per iniziare la tua ricerca in modo facile e sicuro. Ricorda di esplorare tutte le categorie disponibili per {city}!`,
    h3: `Perché Cercare Incontri e Annunci a {city} con Noi?`,
    li1: `<strong>Vasta Scelta:</strong> Accesso a diverse categorie di incontri e annunci specifici per {city}.`,
    li2: `<strong>Facilità d'Uso:</strong> Interfaccia intuitiva per trovare rapidamente quello che cerchi a {city}.`,
    li3: `<strong>Profili Verificati:</strong> Ci impegniamo a offrire una community con profili autentici per la tua sicurezza a {city}.`,
    li4: `<strong>Specificità Locale:</strong> Contenuti e suggerimenti pensati per la scena degli incontri di {city}.`,
    li5: `<strong>Privacy e Discrezione:</strong> La tua privacy è importante per noi in tutte le interazioni a {city}.`,
    p3: `Non aspettare oltre! Immergiti nelle opportunità di incontri che {city} ha da offrire. Registrati, esplora e connettiti oggi stesso!`
  }
};

export const webcamCtaButtonStrings = {
  buttonText: (categoryDisplayName: string, cityDisplayName: string) => `Live Webcam ${categoryDisplayName} a ${cityDisplayName} 🔞`,
  modalTitle: `🔞 Webcam HOT Live! 🔥`,
  modalDescription: (categoryDisplayName: string, cityDisplayName: string) => `Stai per vedere webcam ${categoryDisplayName} dal vivo a ${cityDisplayName}! 💖 L\'accesso è 100% GRATUITO e richiede solo un istante.\n\nEntra e scopri performance ESCLUSIVE e piccanti! 🌶️✨`,
  modalConfirmButtonText: "Live Webcam Ora! 🚀",
  modalWarningText: "Assicurati di avere una buona connessione e che la tua webcam (se vuoi interagire) sia configurata."
};

export const directEncounterCtaStrings = {
  headingTextDefault: "Incontri gratuiti in tutta Italia.",
  headingTextWithCity: (cityName: string) => `Incontri gratuiti in tutta ${cityName}.`,
  benefitVerifiedProfiles: "Profili Verificati",
  benefitFreeAccess: "Accesso Gratuito",
  benefitEmailOnly: "Solo la tua Email",
  buttonCtaText: "Clicca",
  buttonSubtextDefault: "Profili Verificati ✅",
  buttonSubtextWithCity: (cityName: string) => `Profili Verificati da ${cityName} ✅`,
  fallbackEmoji: "➡️",
  cityNameFallbackForModal: "Italia",

  encounterButtons: [
    {
      id: 'gay',
      label: "Incontri Gay 18+",
      imageSrc: '/buttons/gays.webp',
      // Affiliate URLs are constants, not typically translated text, so they remain in the component or lib/constants.ts
    },
    {
      id: 'donne',
      label: "Incontri Donne 25+",
      imageSrc: '/buttons/donne.webp',
    },
    {
      id: 'trans',
      label: "Incontri Trans 18+",
      imageSrc: '/buttons/trans.webp',
    },
    {
      id: 'trav',
      label: "Incontri Trav 18+",
      imageSrc: '/buttons/trans.webp', 
    },
    {
      id: 'milf',
      label: "Incontri MILF 40+",
      imageSrc: '/buttons/milf.webp',
    },
    {
      id: 'ragazze',
      label: "Incontri Ragazze 18+",
      imageSrc: '/buttons/ragazze.webp',
    },
    {
      id: 'studentesse',
      label: "Incontri Studentesse 18+",
      imageSrc: '/buttons/studentessa.webp',
    },
  ],
  // Emojis for the buttons inside the component
  categoryEmojis: {
    gay: '🏳️‍🌈',
    donne: '💃',
    trans: '⚧️',
    trav: '👗',
    milf: '💋',
    ragazze: '✨',
    studentesse: '🎓',
  } as { [key: string]: string },

  // Display names for the modal confirmation title
  modalCategoryDisplayNames: {
    gay: 'Gay',
    donne: 'Donne',
    trans: 'Trans',
    trav: 'Trav',
    milf: 'MILF',
    ragazze: 'Ragazze',
    studentesse: 'Studentesse',
  } as { [key: string]: string },
};

export const fakeChatInterfaceStrings = {
  defaultCtaButtonText: "Entra e Chatta Subito!",
  modalTitle: "Conferma Accesso Chat! 💖",
  modalDescription: (categoryName: string, cityName: string) => 
    `Stai per entrare nella chat ${categoryName} di ${cityName}! L'iscrizione è rapida e GRATUITA. Preparati a conoscere persone fantastiche!`,
  modalConfirmButton: "Sì, Entra Ora!",
  modalWarningAdult: "Attenzione: Stai per accedere a contenuti per adulti. Prosegui solo se maggiorenne.",
  assistantNamePrefix: "Assistente", // e.g., Assistente Gay
  statusOnline: "Online",
  usersOnlineSuffix: "utenti online", // e.g., 345 utenti online
};

export const categoryChatPageStrings = {
  metadataNotFoundTitle: "Chat non trovata",
  metadataNotFoundDescription: "Pagina chat non disponibile.",
  generateMetadataTitle: (categoryName: string, cityName: string) => `Chat ${categoryName} a ${cityName} - Entra Subito!`,
  generateMetadataDescription: (categoryName: string, cityName: string) => `Partecipa alla chat live per incontri ${categoryName} a ${cityName}. Iscrizione gratuita e veloce. Profili reali ti aspettano.`,
  // Keywords are usually fine as they are, but can be translated if needed.
  headerTitle: (categoryName: string, cityName: string) => `Chat ${categoryName} a ${cityName}`,
  headerDescription: "Entra nella nostra chat room esclusiva e inizia a conoscere persone fantastiche ora!",
  whyJoinTitle: "Perché unirti alla nostra chat?",
  whyJoinDescription: (categoryName: string, cityName: string) => 
    `La nostra piattaforma di chat ${categoryName} a ${cityName} è sicura, discreta e piena di profili verificati. Trova esattamente ciò che cerchi, che sia un&apos;amicizia, una relazione seria o puro divertimento.`,
  
  chatCtaButtonTextTemplate: `Entra nella Chat {categoryName}!`, // Template for the button in FakeChatInterface

  defaultMessagesConfig: [
    { sender: 'bot' as const, textTemplate: 'Ciao! Benvenuto/a nella chat {categoryName} di {cityName}. Pronto/a per iniziare? 😉', avatar: '👋', delay: 1000 },
    { sender: 'bot' as const, textTemplate: 'Qui troverai tanti profili interessanti di {categoryName} proprio da {cityName}!', avatar: '✨', delay: 2000 },
    { sender: 'bot' as const, textTemplate: 'L\'iscrizione è gratuita e veloce. Bastano pochi istanti.', avatar: '🚀', delay: 1500 },
    { sender: 'bot' as const, textTemplate: 'Cosa aspetti? Clicca qui sotto per unirti alla conversazione! 👇', avatar: '💬', delay: 2000 },
  ],
};

export const relatedContentStrings = {
  sectionTitle: "Potrebbe interessarti anche:",
  articlesColumnTitle: "Altri articoli in questa categoria:",
  navigationColumnTitle: "Naviga:",
  linkTextCategoryAndCity: (categoryName: string, cityName: string) => 
    `Altri annunci e articoli per ${categoryName} in ${cityName}`,
  linkTextAllCategoriesInCity: (cityName: string) => 
    `Tutte le categorie per ${cityName}`,
};

export const postTableOfContentsStrings = {
  title: "Sommario",
};

export const chooserPageCtaStrings = {
  modalTitleTemplate: (categoryName: string, cityName: string) => 
    `Accesso Esclusivo Incontri ${categoryName} a ${cityName}!`,
  modalDescriptionPart1: (categoryName: string, cityName: string) => 
    `Stai per accedere alla piattaforma N.1 per incontri ${categoryName} a ${cityName} con profili 100% reali e verificati!`,
  modalDescriptionPart2: "L'iscrizione è GRATUITA, richiede solo la tua email e meno di 1 minuto.",
  modalDescriptionPart3: "Ricorda di CONFERMARE la tua EMAIL (controlla anche la cartella SPAM) per attivare il tuo profilo e iniziare subito.",
  modalWarning: "NB: Su questa piattaforma troverai solo profili autentici. Non è tollerato spam o profili falsi.",
  ctaSectionDescription: "Profili 100% Veri e Iscrizione GRATUITA in 1 Minuto! Solo Email Richiesta. La piattaforma partner n.1 in Italia per incontri ti aspetta. Registrati gratuitamente e scopri migliaia di profili autentici e verificati.",
  ctaButtonText: "🚀 VAI AI PROFILI ORA!",
  // For the InterstitialModal used within this component
  interstitialTitle: "Conferma l'Accesso! ✅",
  interstitialConfirmButton: "Sì, Accedi Ora!",
  interstitialCancelButton: "No, Resta Qui",
};

export const topArticleCtaStrings = {
  titleTemplate: (categoryName: string, cityName: string) => 
    `Cerchi Incontri ${categoryName} a ${cityName}? 🤔`,
  description: "Registrazione <span class=\"font-semibold text-green-600 dark:text-green-400\">Gratuita</span> ✅ con <span class=\"font-semibold\">Profili Veri</span> ✅. <br class=\"hidden sm:inline\"/>Conferma la tua email per iniziare subito!",
  question: "Cosa cerchi?",
  seriousButtonText: "💍 Qualcosa di Serio",
  sexButtonText: "🔥 Solo Sesso",
};

export const ctaSectionStrings = {
  defaultTitle: "Ready to Dive In?",
  defaultDescription: "Explore more articles and find exactly what you're looking for in your city.",
  defaultButtonText: "Explore Now",
};

export const sectionCtaStrings = {
  mainTextTemplate: (categoryName: string, cityName: string) => 
    `🔥 Incontri ${categoryName} a ${cityName}? Profili Verificati 18+`,
  buttonText: "VEDI ORA! 👀",
};

export const cityPaginationStrings = {
  noCitiesMessage: "Nessuna città da mostrare.",
  previousButtonText: "Precedente",
  pageIndicatorText: (currentPage: number, totalPages: number) => 
    `Pagina ${currentPage} di ${totalPages}`,
  nextButtonText: "Successiva",
};

export const citySearchDisplayStrings = {
  searchInputPlaceholder: "Cerca la tua città... (es. Roma, Milano, Napoli)",
};

// Add other component-specific string objects below as needed
// export const someOtherComponentStrings = { ... }; 