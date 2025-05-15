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
    'telegram': 'Telegram', // Main category for Telegram chooser page
    'telegram-canali': 'Canali Telegram 📺', // Specific for homepage link
    'telegram-gruppi': 'Gruppi Telegram 💬', // Specific for homepage link
  } as { [key: string]: string },
  mainHeading: "Trova quello che cerchi nella tua città!",
  subHeading: "Seleziona la categoria di tuo interesse per iniziare.",
  highlightText: "✨ È Gratis, Senza Numero di Telefono, Registrazione in 30 Secondi! ✨",
  categoryButtonPrefix: "Sto cercando ",
  categoryButtonSuffix: " 👉",
  exploreByCityHeading: "Oppure, esplora per città:",
  exploreByInfluencerHeading: "Cerca per Influencer",
  searchInfluencerPlaceholder: "Cerca un influencer...",
  viewAllInfluencersButton: "Vedi Tutti gli Influencer"
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
  generateMetadataTitle: (cityName: string) => `Incontri a ${cityName} - Annunci e Articoli per Adulti`,
  generateMetadataDescription: (cityName: string) => `Esplora categorie come gay, milf, donne, trans, escort a ${cityName}. Trova i migliori annunci e articoli.`,
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
  pageTitle: (city: string, category: string) => `Articoli e Guide: ${category} a ${city}`,
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
  
  ],
  // Emojis for the buttons inside the component
  categoryEmojis: {
    gay: '🏳️‍🌈',
    donne: '💃',
    trans: '⚧️',
    trav: '👗',
    milf: '💋',
    ragazze: '✨',
   
  } as { [key: string]: string },

  // Display names for the modal confirmation title
  modalCategoryDisplayNames: {
    gay: 'Gay',
    donne: 'Donne',
    trans: 'Trans',
    trav: 'Trav',
    milf: 'MILF',
    ragazze: 'Ragazze',
   
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

export const telegramChooserPageStrings = {
  metadataTitle: "Telegram Italia: Scopri Canali e Gruppi Esclusivi",
  metadataDescription: "Esplora i migliori canali e gruppi Telegram in Italia. Trova contenuti unici, community e molto altro. Accesso diretto alle risorse Telegram più richieste.",
  metadataKeywords: ["telegram italia", "canali telegram", "gruppi telegram", "telegram links", "community telegram"],
  mainHeading: "Esplora il Mondo di Telegram",
  subHeading: "Scegli se vuoi scoprire i migliori Canali o Gruppi Telegram.",
  canaliLinkText: "Canali Telegram 📺",
  canaliLinkSubtext: "Scopri liste di canali tematici, notizie, intrattenimento e altro.",
  gruppiLinkText: "Gruppi Telegram 💬",
  gruppiLinkSubtext: "Unisciti a community, discussioni, gruppi di supporto e interesse.",
  pageTitle: "Telegram: Canali e Gruppi",
  breadcrumbHome: "Home",
};

export const telegramCanaliPageStrings = {
  metadataTitle: "Canali Telegram Italia - Liste Aggiornate e Link Diretti",
  metadataDescription: "Trova i migliori canali Telegram italiani divisi per categoria. Notizie, intrattenimento, xxx, offerte e molto altro. Link diretti per unirti subito.",
  metadataKeywords: ["canali telegram", "lista canali telegram", "migliori canali telegram", "telegram channels italia"],
  mainHeading: "Canali Telegram Selezionati per Te",
  subHeading: "Esplora le categorie e trova i canali Telegram più adatti ai tuoi interessi.",
  breadcrumbTelegram: "Telegram",
  breadcrumbHome: "Home",
  // Add more as needed
};

export const telegramGruppiPageStrings = {
  metadataTitle: "Gruppi Telegram Italia - Community e Discussioni",
  metadataDescription: "Scopri e unisciti ai migliori gruppi Telegram italiani. Trova community, gruppi di discussione, supporto e molto altro. Link diretti per partecipare.",
  metadataKeywords: ["gruppi telegram", "lista gruppi telegram", "migliori gruppi telegram", "telegram groups italia"],
  mainHeading: "Gruppi Telegram per Ogni Interesse",
  subHeading: "Connettiti con persone che condividono le tue passioni. Sfoglia i gruppi.",
  breadcrumbTelegram: "Telegram",
  breadcrumbHome: "Home",
  // Add more as needed
};

// Add other component-specific string objects below as needed
// export const someOtherComponentStrings = { ... }; 

// Add translations for article page
export const articlePageStrings = {
  backLinkText: (categoryDisplayName: string, cityName: string) => `Torna a ${categoryDisplayName} a ${cityName}`,
};

export const influencerSeoTextStrings: { [key: string]: string } = {
  nudes: "🍑 Scopri i nudi INTEGRALI di {influencerName}! Foto e video esclusivi che non lasciano nulla all'immaginazione. Preparati a vedere {influencerName} come non l'hai mai vista prima... completamente SENZA VELI! 🔥 Questo è il posto giusto per ammirare ogni curva e dettaglio del suo corpo da urlo. Non perderti i set più bollenti! 💦",
  leaks: "💣 Contenuti LEAKED di {influencerName} FINITI ONLINE! 🕵️‍♀️ Abbiamo raccolto tutto il materiale più SCOTTANTE e proibito che {influencerName} non voleva farvi vedere. Video privati, foto rubate, chat segrete... tutto qui, senza censure! 🔞 Preparati a uno scandalo HOT che ti lascerà senza fiato! 💥",
  onlyfans: "💖 Accesso ESCLUSIVO all'OnlyFans di {influencerName}! 🌶️ Scopri i video POV, le performance di sesso estremo, richieste personalizzate e molto altro. {influencerName} si spinge OLTRE OGNI LIMITE per i suoi fan più fedeli. Abbonati per non perdere nemmeno un gemito! 🤤 Include sessioni di SODOMIA SELVAGGIA e posizioni estreme mai viste prima! 💦",
  porno: "🎬 {influencerName} nella sua versione PIÙ HARDCORE! 😈 Esplora la sua filmografia porno completa, con scene di GRUPPO, GANGBANG, SODOMIA VIOLENTA e tutte le pratiche più estreme. Guarda {influencerName} mentre si scatena in performance indimenticabili. Non adatto ai deboli di cuore! 💔➡️❤️‍🔥",
  xxx: "🔥 Contenuti XXX ESPLICITI di {influencerName}! 🌡️ Preparati per il materiale più SPINTO e VIETATO che tu abbia mai visto. Video integrali di SESSO ESTREMO, senza tagli, con dettagli ravvicinati di ogni azione. {influencerName} si mostra in tutta la sua lussuria selvaggia con SODOMIA PROFONDA e molto altro! 🔑 Sblocca ora il piacere PROIBITO! 💦",
  video: "📹 Tutti i VIDEO più CALDI di {influencerName}! 💦 Dai clip privati ai dietro le quinte bollenti dei suoi set, fino ai video amatoriali di SESSO SFRENATO che ti faranno impazzire. Guarda {influencerName} in azione, mentre riceve e dà piacere in OGNI POSIZIONE immaginabile! 🍌🍑 Clicca e goditi lo spettacolo più piccante del web!",
  telegram: "🤫 Il canale Telegram SEGRETO di {influencerName}! 📲 Link esclusivi a contenuti INEDITI e PROIBITI, foto e video di SESSO SFRENATO che non troverai da nessun'altra parte. Unisciti per chat HOT 💬, anteprime di SODOMIA e per scoprire come {influencerName} adora farsi PENETRARE! Accesso immediato ai suoi segreti più nascosti e perversi! 🔥",
  sesso: "🫦 Tutto sul SESSO SELVAGGIO con {influencerName}! 💦 Esplora le sue pratiche preferite, le posizioni che la fanno IMPAZZIRE (inclusa la SODOMIA DOLOROSA!), i racconti delle sue ORGE più spinte e i consigli per un piacere ANALE estremo. {influencerName} si confessa SENZA TABÙ e mostra come ama essere DOMINATA! 🔥 Preparati a imparare cose che non immaginavi nemmeno fossero possibili! 🍆",
  default: "🔞 Esplora il lato più PROIBITO e PERVERSO di {influencerName} nella categoria {subcategoryName}! 😈 Contenuti ESCLUSIVI di SESSO ESTREMO, video di SODOMIA PROFONDA, foto senza censure e molto altro ti aspettano. Preparati a scoprire i segreti più PICCANTI e VIETATI di {influencerName} e a soddisfare le tue FANTASIE più nascoste! 🔥💦"
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const influencerFaqStrings: { [key: string]: FaqItem[] } = {
  nudes: [
    {
      question: "I nudi di {influencerName} sono davvero integrali? 🙈",
      answer: "Assolutamente SÌ! 🍑 {influencerName} non si risparmia e mostra TUTTO. Preparati per primi piani mozzafiato e pose che esaltano ogni centimetro del suo corpo. Nessuna censura, solo puro piacere visivo. 🔥"
    },
    {
      question: "Posso trovare video nuda di {influencerName} qui? 💦",
      answer: "Certo! Oltre alle foto, ci sono clip esclusive di {influencerName} completamente nuda, mentre gioca e si diverte. Non vorrai perderteli! 😈"
    },
    {
      question: "Quali sono le pose più esplicite di {influencerName} nei suoi nudi? 🍑",
      answer: "Oh, {influencerName} adora mostrare TUTTO! 🔥 La troverai in pose A GAMBE APERTE, con CLOSE-UP INTIMI, mentre si TOCCA in modo provocante e si mette in posizioni che evidenziano il suo FONDOSCHIENA e ogni altra parte del corpo. Le sue foto più PICCANTI ti mostreranno angolazioni che non avresti mai immaginato! 💦"
    },
    {
      question: "Le foto nude di {influencerName} sono recenti? 📸",
      answer: "Assolutamente SÌ! 🕒 Aggiorniamo continuamente la galleria con i suoi ULTIMI SCATTI più provocanti, comprese NUOVE SERIE fotografiche e video dove si mostra completamente NUDA in situazioni sempre più AUDACI! {influencerName} ama superare i limiti della sensualità e noi ti portiamo tutto in tempo reale! 🔥"
    }
  ],
  leaks: [
    {
      question: "Questi leaks di {influencerName} sono autentici? 🕵️‍♀️",
      answer: "ASSOLUTAMENTE SÌ! 💣 Abbiamo fatto una minuziosa verifica per assicurarci di offrirti solo contenuti AUTENTICI e SCOTTANTI. Si tratta di materiale PRIVATO che è finito online senza il suo consenso, mostrandola come MAI avresti immaginato! 🔞 Guarda tu stesso e giudica quanto sono piccanti!"
    },
    {
      question: "Cosa includono esattamente i leaks di {influencerName}? 💥",
      answer: "I leaks contengono di TUTTO! 🔥 Foto intime mentre è COMPLETAMENTE NUDA, video privati di SESSO SFRENATO, chat dove descrive le sue FANTASIE più perverse, e persino registrazioni di VIDEOCHIAMATE HOT dove si soddisfa in diretta! 💦 {influencerName} è stata ESPOSTA completamente, senza alcun filtro. Aspettati l'INIMMAGINABILE! 😉"
    }
  ],
  onlyfans: [
    {
      question: "Cosa rende l'OnlyFans di {influencerName} così speciale? 💖",
      answer: "L'OnlyFans di {influencerName} è il suo regno privato del piacere! 🌶️ Troverai contenuti esclusivi che non pubblica altrove, interazioni dirette, e la possibilità di fare richieste personalizzate per vederla in pose e situazioni da urlo, inclusa la sodomia esplicita! 🤤"
    },
    {
      question: "Posso vedere scene di sesso estremo sull'OnlyFans di {influencerName}? 🔥",
      answer: "Assolutamente! {influencerName} adora spingersi oltre i limiti per i suoi fan. Preparati a performance bollenti, giochi erotici e molto altro che ti lascerà senza fiato. 💦"
    },
    {
      question: "Quanto costa sbloccare i contenuti più HARD di {influencerName} su OnlyFans? 💰",
      answer: "I prezzi variano ma ti garantiamo che ogni centesimo VALE LA PENA! 🤑 {influencerName} offre abbonamenti mensili a prezzi competitivi, ma i contenuti più ESTREMI e PROIBITI (comprese le sue sessioni di SODOMIA e GANGBANG) sono disponibili come pay-per-view, permettendoti di scegliere esattamente ciò che ti eccita di più! 💦 Con i nostri link d'accesso rapido, puoi sbloccare l'esperienza COMPLETA!"
    },
    {
      question: "Si può chattare privatamente con {influencerName} su OnlyFans? 💬",
      answer: "Assolutamente SÌ! 🔥 {influencerName} è famosa per rispondere PERSONALMENTE ai messaggi privati dei suoi fan più generosi! 🫦 Puoi chiederle FOTO PERSONALIZZATE, video dove pronuncia il TUO NOME mentre si TOCCA, e persino discutere le tue FANTASIE più segrete con lei! Molti fan riportano di aver ricevuto contenuti ESCLUSIVI tramite chat che non sono mai stati pubblicati altrove! 😈"
    }
  ],
  porno: [
    {
      question: "Che tipo di scene porno ha girato {influencerName}? 🎬",
      answer: "{influencerName} non si è tirata indietro! 😈 Ha partecipato a scene di gruppo, gangbang, e ha esplorato pratiche come la sodomia e il BDSM. La sua versatilità ti sorprenderà! ❤️‍🔥"
    },
    {
      question: "I video porno di {influencerName} sono senza censure? 🔞",
      answer: "Sì! Qui trovi le versioni integrali e non censurate delle sue performance più hardcore. Nessun dettaglio è lasciato all'immaginazione. Preparati a godere! 💦"
    },
    {
      question: "{influencerName} ha mai fatto DOPPIA PENETRAZIONE nei suoi video? 🍆🍆",
      answer: "Oh, ASSOLUTAMENTE SÌ! 😈 {influencerName} è famosa per le sue INCREDIBILI scene di DOPPIA PENETRAZIONE! 💥 Le sue espressioni di PURO PIACERE mentre viene PENETRATA contemporaneamente sono semplicemente INDIMENTICABILI! La sua capacità di gestire situazioni estreme ha fatto impazzire i fan di tutto il mondo! 🔥"
    },
    {
      question: "Con quanti uomini ha girato scene {influencerName} contemporaneamente? 👨‍👨‍👦‍👦",
      answer: "Il suo RECORD è di 5 uomini IN UNA SOLA SCENA! 🤯 {influencerName} ha dimostrato una RESISTENZA INCREDIBILE, soddisfacendo tutti contemporaneamente in una performance che è diventata LEGGENDARIA nel mondo del porno! 💦 Nei video puoi vedere come gestisce ogni situazione con maestria, anche nelle GANGBANG più estreme dove viene RIEMPITA in ogni apertura! 🔥"
    }
  ],
  xxx: [
    {
      question: "Quanto sono espliciti i contenuti XXX di {influencerName}? 🔥",
      answer: "Livello MASSIMO di esplicitezza! 🌡️ I contenuti XXX di {influencerName} sono quanto di più hardcore tu possa trovare. Primi piani dettagliati, azioni spinte e nessuna censura. Puro materiale per adulti! 🔑 Si parla anche di sodomia estrema."
    },
    {
      question: "Ci sono video XXX completi di {influencerName}? 🍌",
      answer: "Certamente! Troverai video XXX integrali, senza tagli, per un'esperienza totalmente immersiva nel mondo del piacere di {influencerName}. 🍑"
    },
    {
      question: "Le scene XXX di {influencerName} includono pratiche estreme come il BDSM? 🔗",
      answer: "SÌ, e che scene! 🔥 {influencerName} adora essere DOMINATA e SOTTOMESSA, con SCULACCIATE, LEGATURE e molto altro! 😈 I suoi video BDSM sono tra i più INTENSI che tu possa trovare, con lei che IMPLORA per avere di più mentre viene portata all'ESTREMO del piacere e del dolore! 💦 Le sue prestazioni con FRUSTINI, MANETTE e altri giocattoli ti lasceranno a bocca aperta!"
    },
    {
      question: "Ci sono primi piani ravvicinati negli atti sessuali di {influencerName}? 👁️",
      answer: "ASSOLUTAMENTE! 🔍 I video XXX di {influencerName} sono famosi per i CLOSE-UP ESTREMI di ogni PENETRAZIONE, con dettagli così NITIDI che ti sembrerà di essere LÌ! 🤤 Ogni espressione del viso, ogni GOCCIA di sudore e lubrificazione, ogni CENTIMETRO della sua anatomia durante l'atto è catturato in HD per il tuo piacere visivo! 💦"
    }
  ],
  video: [
    {
      question: "Che generi di video hot di {influencerName} posso trovare? 📹",
      answer: "Una vasta gamma! 💦 Dai video amatoriali girati da lei, ai dietro le quinte dei suoi set fotografici più sexy, fino a clip esclusive create apposta per farti eccitare. {influencerName} sa come usare la telecamera! 😉"
    },
    {
      question: "I video di {influencerName} sono disponibili in alta qualità? 💎",
      answer: "Facciamo del nostro meglio per offrirti i video nella migliore qualità possibile, per non farti perdere nemmeno un dettaglio delle sue performance bollenti! 🔥"
    },
    {
      question: "Quanto durano i video più HOT di {influencerName}? ⏱️",
      answer: "Abbiamo di TUTTO! 🔥 Dalle clip TEASER di 2-3 minuti che ti lasceranno con l'acquolina in bocca, fino ai video COMPLETI che durano oltre 45 MINUTI di puro PIACERE VISIVO! 😈 Le sue sessioni di SESSO ANALE e SODOMIA più intense sono documentate dall'inizio alla fine, senza tagli, per farti godere ogni SINGOLO MOMENTO! 💦"
    },
    {
      question: "I video di {influencerName} hanno l'audio originale? 🔊",
      answer: "ASSOLUTAMENTE SÌ! 🎧 E questo è uno dei motivi per cui sono così PICCANTI! 🔥 Potrai ascoltare ogni GEMITO, URLO e PAROLA SPORCA che {influencerName} pronuncia durante le sue performance più intense! 💦 La sua voce mentre implora di essere PENETRATA più FORTE o mentre raggiunge l'ORGASMO ti ecciterà come non mai! 😈"
    }
  ],
  telegram: [
    {
      question: "Cosa trovo nel canale Telegram segreto di {influencerName}? 🤫",
      answer: "Segreti INCONFESSABILI! 📲 Nel suo canale Telegram, {influencerName} condivide contenuti esclusivi, foto e video MAI VISTI PRIMA, link diretti e forse anche chat HOT con lei! 💬 È il suo angolino privato per i fan più scatenati."
    },
    {
      question: "È facile accedere al Telegram di {influencerName}? 🚀",
      answer: "Con i nostri link, l'accesso è IMMEDIATO! Preparati a entrare nel mondo più intimo e senza filtri di {influencerName}. Non te ne pentirai! 😉"
    },
    {
      question: "Nel canale Telegram di {influencerName} ci sono contenuti che non si trovano altrove? 💎",
      answer: "CERTO CHE SÌ! 🔥 Il suo canale Telegram è il luogo dove {influencerName} pubblica i contenuti TROPPO ESPLICITI per le altre piattaforme! 🙊 Video di MASTURBAZIONE INTENSA, SESSO NON SIMULATO, e persino DIRETTE PRIVATE dove si spoglia e si TOCCA mentre chatta con i fan! 💦 Contenuti così HOT che potrebbero essere rimossi da altre piattaforme vengono condivisi QUI, senza censure!"
    },
    {
      question: "Quanto spesso {influencerName} aggiorna il suo canale Telegram? 🕒",
      answer: "QUOTIDIANAMENTE! 🔥 {influencerName} è SUPER ATTIVA sul suo canale Telegram e condivide nuovi contenuti PICCANTI quasi ogni giorno! 💦 Dal buongiorno provocante con una foto appena sveglia e completamente NUDA, fino alla buonanotte bollente con un video mentre si SODDISFA prima di dormire! 😈 Il canale è in costante aggiornamento con materiale sempre nuovo e sempre più ESTREMO!"
    }
  ],
  sesso: [
    {
      question: "Si parla di pratiche sessuali specifiche come la sodomia con {influencerName}? 🫦",
      answer: "Assolutamente SÌ! 🔥 {influencerName} non ha tabù quando si parla di sesso. Qui scoprirai le sue preferenze, le posizioni che la fanno urlare di piacere (sodomia inclusa!), e i suoi racconti più bollenti. 💦"
    },
    {
      question: "Posso trovare consigli sessuali da {influencerName}? 💡",
      answer: "Certo! {influencerName} condivide anche i suoi trucchi e consigli per un sesso indimenticabile. Preparati a prendere appunti e a mettere in pratica le sue dritte più piccanti! 😈"
    },
    {
      question: "Qual è la pratica sessuale preferita di {influencerName}? 🫦",
      answer: "Indubbiamente la SODOMIA PROFONDA! 🍑 {influencerName} ha rivelato in diverse occasioni di IMPAZZIRE letteralmente per la PENETRAZIONE ANALE intensa! 🔥 Ha raccontato nei minimi dettagli come ama essere presa da dietro, con FORZA e PASSIONE, e come questa pratica la porti agli ORGASMI più POTENTI e MULTIPLI della sua vita! 💦 Le sue descrizioni esplicite di queste esperienze ti lasceranno senza fiato!"
    },
    {
      question: "{influencerName} ha mai avuto esperienze sessuali con altre donne? 👩‍❤️‍💋‍👩",
      answer: "Assolutamente SÌ, e le ADORA! 🔥 {influencerName} ha raccontato dettagliatamente le sue AVVENTURE LESBO più intense, descrivendo come le piaccia sia DOMINARE che essere SOTTOMESSA con altre donne! 💋 Le sue storie di THREESOME e orge al femminile sono tra le più PICCANTI che potrai leggere, con descrizioni esplicite di ogni TOCCO, LECCATA e gioco con sex toys! 💦"
    }
  ],
  default: [
    {
      question: "Cosa mi aspetta nella sezione {subcategoryName} di {influencerName}? 😈",
      answer: "Preparati a un'esperienza ESPLOSIVA! 💥 Nella sezione {subcategoryName}, {influencerName} si mostra SENZA VELI e SENZA CENSURE. Troverai contenuti ESCLUSIVI e BOLLENTI, foto di NUDO INTEGRALE e video di SESSO HARDCORE che ti faranno sognare ad occhi aperti e desiderare sempre di più! 💦 Pratiche ESTREME come la SODOMIA PROFONDA e oltre! 🔥"
    },
    {
      question: "Questo contenuto è adatto solo agli adulti? 🔞",
      answer: "Decisamente SÌ! 🚫 I contenuti dedicati a {influencerName} in {subcategoryName} sono ESPLICITAMENTE VIETATI AI MINORI e pensati per un pubblico adulto alla ricerca di EMOZIONI FORTI. Procedi solo se sei maggiorenne e pronto per scene di SESSO ESTREMO e SODOMIA che ti faranno impazzire! 💦"
    }
  ]
}; 