/**
 * Content Generator Library
 * 
 * This module provides spinning content generation functionality to avoid
 * duplicate content penalties across thousands of influencer subcategory pages.
 */

/**
 * Deterministic random number generator using a string seed
 * This ensures consistent but varied selections for the same influencer+category
 */
export function seedRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Simple random generator with seed
  return () => {
    hash = (hash * 9301 + 49297) % 233280;
    return hash / 233280;
  };
}

/**
 * Select a deterministic random item from an array based on a seed
 */
function selectWithSeed(array: string[], seed: string, offset: number = 0): string {
  if (!array || array.length === 0) {
    console.warn(`Empty or undefined array provided to selectWithSeed with seed ${seed}-${offset}`);
    return "content not available"; // Default value
  }
  
  const random = seedRandom(`${seed}-${offset}`);
  const index = Math.floor(random() * array.length);
  
  // Safety check for array bounds
  if (index < 0 || index >= array.length) {
    console.warn(`Invalid index ${index} for array of length ${array.length}`);
    return array[0] || "content not available";
  }
  
  return array[index] || "content not available";
}

// ==== CONTENT SPINNING COMPONENTS ====

// Introductions for all categories
const introductions = [
  "🔥 Scopri l'universo proibito di {influencerName} nella categoria {subcategoryName}",
  "⚠️ Contenuti ESCLUSIVI e VIETATI di {influencerName} in {subcategoryName}",
  "💦 Esplora il lato NASCOSTO e PICCANTE di {influencerName} in {subcategoryName}",
  "🚫 ATTENZIONE: Qui trovi {influencerName} come non l'hai MAI vista prima",
  "💣 Il materiale più BOLLENTE e SCANDALOSO di {influencerName}",
  "🔞 Preparati a vedere {influencerName} SENZA LIMITI e CENSURE",
  "😈 {influencerName} si mostra in tutta la sua LUSSURIA in questa sezione {subcategoryName}",
  "💋 Benvenuto nel regno proibito di {influencerName}: {subcategoryName}",
  "👁️ Sbircia nei contenuti PRIVATI e INTIMI di {influencerName}",
  "🌶️ {influencerName} si spinge OLTRE OGNI IMMAGINAZIONE in questa collezione {subcategoryName}",
  "🔐 Accesso SBLOCCATO ai segreti più SCOTTANTI di {influencerName}",
  "💥 Rivelazioni SCIOCCANTI di {influencerName} nella sezione {subcategoryName}",
  "🤫 Shhhh! I contenuti SEGRETI di {influencerName} che non dovrebbero essere pubblici",
  "🎭 {influencerName} mostra il suo vero IO in questi contenuti {subcategoryName} ESTREMI",
  "🧨 ESPLOSIVO: {influencerName} si mette a NUDO completamente",
  "👀 Da non credere: {influencerName} nei suoi momenti più ESPLICITI e PRIVATI"
];

// Body descriptions for all categories
const bodyDescriptions = [
  "Video e foto dove mostra OGNI CENTIMETRO del suo corpo senza censure, inclusi PRIMI PIANI INCREDIBILI dei suoi orifizi DILATATI e bagnati.",
  "Immagini ESPLICITE che rivelano ogni curva e dettaglio intimo, fino alle GOCCE di piacere che colano lente.",
  "Contenuti VISIVI che ti lasceranno senza fiato e con il cuore in gola, testimonianze della sua INSANA voglia di CAZZO.",
  "Una collezione COMPLETA di momenti INTIMI catturati per il tuo piacere, dove la sua LUSSURIA è palpabile.",
  "TESTIMONIANZE VISIVE della sua natura SELVAGGIA e INSAZIABILE, mentre viene SOTTOMESSA e USATA come un oggetto.",
  "Un archivio di contenuti che mostrano il suo lato più EROTICO e NASCOSTO, inclusi video di GRUPPO e DOPPIE PENETRAZIONI.",
  "Materiale HARD raccolto da fonti ESCLUSIVE e PRIVATE, dove sperimenta pratiche ESTREME e DOLOROSE per puro piacere.",
  "Un'esperienza VISIVA che ti farà ECCITARE all'istante, con dettagli MACROSCOPICI di ogni sua PARTE INTIMA.",
  "Gallerie PROIBITE che mostrano quanto lei ami essere GUARDATA mentre GODE senza ritegno.",
  "Una documentazione COMPLETA delle sue attività più SPINTE e TABÙ, inclusi FETISH e giochi di RUOLO perversi.",
  "Prove INCONFUTABILI delle sue PRATICHE più ESTREME, con INGOIATE profonde e scene di UMILIAZIONE.",
  "Un viaggio VISIVO attraverso le sue PERVERSIONI più nascoste, dove ogni LIMITE viene SUPERATO.",
  "Una selezione curata dei suoi momenti più CALDI e SCANDALOSI, con SQUIRTING abbondanti e ORGASMI multipli.",
  "Le immagini più COMPROMETTENTI che sono trapelate online, dove la sua DEPRAVAZIONE non conosce confini.",
  "Performance VISIVE che dimostrano la sua MAESTRIA nell'arte della seduzione e della SOTTOMISSIONE più estrema.",
  "Un'esplorazione SENZA CENSURE della sua SESSUALITÀ più sfrenata, dove OGNI BUCO è un invito al piacere.",
  "VEDI come si SPALANCA per accogliere CAZZI ENORMI, GEMENDO di piacere e dolore.",
  "Assisti a sessioni di AUTOPIACERE con oggetti INSOLITI e GIGANTI, che la portano all'ESTASI.",
  "Contenuti che la ritraggono mentre IMPLORA di essere PENETRATA più a FONDO, più FORTE.",
  "La sua sottomissione TOTALE davanti alla telecamera, pronta a soddisfare OGNI FANTASIA perversa.",
  "FILMATI ESCLUSIVI che la immortalano mentre viene POSSEDUTA da più uomini contemporaneamente, senza tregua.",
  "Un catalogo DETTAGLIATO di tutte le sue perversioni, illustrate con foto e video SENZA VELI.",
  "SCOPRI il suo repertorio di tecniche di GODIMENTO, dalle più dolci alle più BRUTALI e UMILIANTI.",
  "ACCESSO ILLIMITATO a ore e ore di registrazioni HARD che la vedono protagonista di atti INQUALIFICABILI.",
  "La sua trasformazione da ragazza della porta accanto a MACCHINA DEL SESSO insaziabile, documentata passo dopo passo.",
  "Un'analisi APPROFONDITA della sua ANATOMIA più intima, con zoom e rallenty su ogni dettaglio PROIBITO.",
  "Guarda come si CONTORCE e URLA sotto l'effetto di orgasmi DEVASTANTI, provocati nei modi più INASPETTATI.",
  "Sessioni di TORTURA SESSUALE consensuale dove il dolore si mescola al piacere più ESTREMO.",
  "Un inventario completo dei suoi SEX TOYS preferiti, con dimostrazioni PRATICHE del loro utilizzo più HARDCORE.",
  "Vivi l'esperienza di essere il suo SCHIAVO SESSUALE PERSONALE attraverso video POV ultra-realistici."
];

// Category-specific descriptions
const categorySpecificContent = {
  nudes: [
    "completamente NUDA in pose provocanti che mostrano OGNI dettaglio del suo corpo PERFETTO, con un focus sulle sue LABBRA CARNOSE e BAGNATE.",
    "si SPOGLIA lentamente davanti alla telecamera, rivelando curve MOZZAFIATO e dettagli INTIMI, fino a mostrare il suo ANO ROSA e INVITANTE.",
    "SELFIE allo specchio dove si mostra TOTALMENTE SENZA VELI, senza lasciare NULLA all'immaginazione, con le GAMBE APERTE per te.",
    "in pose APERTE che mettono in evidenza le sue parti più INTIME con PRIMI PIANI ESTREMI del suo CLITORIDE GIOIOSO.",
    "fotografata da ANGOLAZIONI strategiche che catturano ogni CENTIMETRO della sua PELLE nuda, con zoom sui suoi CAPEZZOLI ERRETTI.",
    "si ACCAREZZA sensualmente mentre la camera zooma sui dettagli più PRIVATI e NASCOSTI, GEMENDO il tuo nome.",
    "NUDA in ambienti quotidiani, rendendo l'esperienza ancora più VOYEURISTICA e REALE, mentre si TOCCA pensando a te.",
    "si ESIBISCE in un servizio fotografico ARTISTICO che celebra la sua NUDITÀ più pura, lasciando gocciolare i suoi SUCCHI.",
    "GIOCA con la luce e le ombre per creare immagini NUDE di rara BELLEZZA ed EROTISMO, con il suo corpo UMIDO e PRONTO.",
    "CLOSE-UP ESTREMI del suo pube perfettamente RASATO (o selvaggiamente PELOSO, a seconda del suo stile) mentre si DIVARICA per te.",
    "FOTO DETTAGLIATE dei suoi PIEDI nudi e curati, per gli amanti del genere, mentre li usa per MASTURBARSI.",
    "SCATTI RUBATI mentre prende il sole NUDA, mostrando ogni piega segreta del suo corpo ABBRONZATO."
  ],
  leaks: [
    "contenuti PRIVATI trapelati dal suo telefono personale, mostrando momenti di INTIMITÀ mai destinati al pubblico, inclusi VIDEO con il suo EX.",
    "video AMATORIALI girati in camera da letto che mostrano la sua VERA natura SESSUALE, con AUDIO ORIGINALE dei suoi GEMITI.",
    "CHAT PRIVATE dove rivela FANTASIE e DESIDERI che non confesserebbe mai pubblicamente, implorando di essere SODOMIZZATA.",
    "SELFIE INTIMI mandati ai suoi amanti che ora sono DISPONIBILI per i tuoi occhi, dove si SPALMA di CREMA.",
    "REGISTRAZIONI di VIDEOCHIAMATE private dove si SPOGLIA e si TOCCA pensando di essere vista solo dal destinatario, SQUIRTANDO in diretta.",
    "SCREENSHOT di conversazioni ESPLICITE dove organizza incontri SESSUALI e descrive cosa le piace, promettendo di INGOIARE TUTTO.",
    "FOTO scattate da ex partner in momenti di PASSIONE, ora accessibili a tutti, che la ritraggono SOTTOMESSA e LEGATA.",
    "contenuti trapelati dal suo CLOUD personale dopo un HACK che ha rivelato i suoi SEGRETI più intimi, come la sua passione per il BDSM.",
    "VIDEO ESPLICITI girati con il suo VIBRATORE preferito, con primi piani della sua VAGINA PULSANTE.",
    "MESSAGGI VOCALI trapelati dove SUSSURRA fantasie PROIBITE e chiede di essere PUNITA.",
    "FILMATI di nascosto mentre FA SESSO con sconosciuti, catturando la sua REALE похоть."
  ],
  onlyfans: [
    "contenuti ESCLUSIVI del suo OnlyFans dove si spinge ben OLTRE i limiti di Instagram e TikTok, con DOPPIE PENETRAZIONI da urlo.",
    "video di SODOMIA INTENSA dove urla di PIACERE mentre viene PENETRATA profondamente da OGGETTI ENORMI.",
    "sessioni PRIVATE con fan fortunati che pagano EXTRA per vedere contenuti PERSONALIZZATI, come essere INSULTATI da lei.",
    "performance di SESSO ESPLICITO che mostra solo ai suoi abbonati più FEDELI e GENEROSI, inclusi CUMSHOTS sul VISO.",
    "prove della sua predilezione per GIOCATTOLI di dimensioni IMPRESSIONANTI che usa con maestria, spingendoli fino in FONDO.",
    "videomessaggi PERSONALIZZATI dove pronuncia il TUO nome mentre si TOCCA e raggiunge l'ORGASMO, dedicandolo a TE.",
    "DIRETTE ESCLUSIVE dove risponde alle richieste più PERVERSE dei suoi abbonati in tempo reale, come PISCIARE davanti alla telecamera.",
    "il dietro le quinte della produzione dei suoi contenuti ESPLICITI con dettagli SORPRENDENTI, mostrando i suoi LIMITI ESTREMI.",
    "VIDEO POV (Point Of View) dove ti SEMBRERÀ di essere TU a SCOPARLA senza pietà.",
    "COLLABORAZIONI ESCLUSIVE con altre star di OnlyFans in scene LESBO o di GRUPPO DEVASTANTI.",
    "SFIDE ESTREME proposte dai fan, come resistere a VIBRAZIONI POTENTISSIME per ore."
  ],
  porno: [
    "scene PORNO PROFESSIONALI dove dimostra le sue incredibili ABILITÀ con partner multipli, dominando CAZZI NERI GIGANTI.",
    "performance in GANGBANG dove soddisfa fino a 7 uomini CONTEMPORANEAMENTE in tutte le posizioni, INGOIANDO TUTTO alla fine.",
    "video di DOPPIE PENETRAZIONI (VAGINALE e ANALE) che la fanno URLARE di un mix di DOLORE e PIACERE intenso.",
    "scene di SESSO ANALE BRUTALE dove viene DOMINATA e portata al limite della resistenza, con il suo BUCO SPALANCATO.",
    "riprese in HD delle sue ESPRESSIONI di PIACERE PURO durante atti di ESTREMA INTENSITÀ, con LACRIME agli occhi.",
    "la sua evoluzione nel mondo del PORNO, dai primi video SOFT fino alle HARDCORE performance attuali, inclusi FISTING ANALE.",
    "dietro le quinte dei suoi set PORNO dove si prepara mentalmente e fisicamente per scene ESTREME, mostrandosi VULNERABILE.",
    "le sue scene più VENDUTE e PREMIATE nell'industria del cinema per adulti, dove viene TRATTATA come una vera PUTTANA.",
    "INTERVISTE ESCLUSIVE dove racconta i suoi SEGRETI più INTIMI del set e le sue ESPERIENZE più folli.",
    "SCENE BUKKAKE dove viene RICOPERTA di SPERMA da decine di uomini.",
    "RUOLI da SOTTOMESSA in scenari BDSM ESTREMI, con FRUSTATE e GAG ball."
  ],
  xxx: [
    "contenuti XXX troppo ESTREMI per essere pubblicati persino sui siti di pornografia mainstream, con pratiche come il WATERSports.",
    "pratiche TABÙ che sfidano i limiti della resistenza fisica e mentale, come il NEEDLE PLAY o il FIRE PLAY (con supervisione!).",
    "CLOSE-UP in HD di OGNI azione, penetrazione e reazione del suo corpo durante atti ESTREMI, con dettagli di SANGUE e LACRIME.",
    "scene di FISTING COMPLETO (vaginale e anale) e STRETCHING ANALE che mostrano quanto possa ALLARGARSI, fino a introdurre OGGETTI INIMMAGINABILI.",
    "sessioni di BONDAGE ESTREMO dove viene completamente IMMOBILIZZATA e usata come OGGETTO di piacere per ore, con sospensioni SHIBARI.",
    "esperimenti SESSUALI ai limiti della legalità che solo i più ESPERTI possono apprezzare, coinvolgendo FLUIDI CORPOREI in modi INASPETTATI.",
    "performance di SQUIRTING MULTIPLO che creano vere e proprie FONTANE di piacere, INZUPPANDO tutto intorno a lei.",
    "l'esplorazione di FETISH OSCURI che raramente vengono mostrati anche nei contenuti per adulti, come la COPROFILIA simulata o il VORARE.",
    "VIDEO di GRUPPO con SCAMBIO di COPPIA e ORGE SFRENATE con decine di partecipanti.",
    "RIPRESE NASCOSTE di atti SESSUALI in luoghi PUBBLICI ESTREMI, rischiando di essere SCOPERTA.",
    "UTILIZZO di STRUMENTI MEDICI o veterinari per esplorare i suoi ORIFIZI in modi INCONSUETI."
  ],
  video: [
    "una collezione COMPLETA di video che spaziano dal SOFTCORE all'HARDCORE più spinto, con scene di UMILIAZIONE VERBALE e FISICA.",
    "SELFIE-VIDEO amatoriali girati mentre si MASTURBA in luoghi pubblici rischiando di essere scoperta, come in un BAGNO PUBBLICO.",
    "riprese mentre fa la DOCCIA, con l'acqua che scorre sul suo corpo NUDO e le sue mani che lo esplorano, INSAPONANDOSI il CLITORIDE.",
    "video RUBATI dalle sue vacanze dove fa SESSO sulla spiaggia pensando di non essere vista, con la SABBIA che si mischia ai suoi fluidi.",
    "filmati con l'AUDIO ORIGINALE dove puoi sentire ogni suo GEMITO e PAROLA SPORCA, mentre IMPLORA di essere SCOPATA più forte.",
    "video-diari INTIMI dove confessa i suoi DESIDERI più PROFONDI guardando direttamente in camera, rivelando di volere un GANGBANG.",
    "riprese di INCONTRI CASUALI che si sono trasformati in momenti di PASSIONE IMPROVVISA, con SCONOSCIUTI che la USANO.",
    "video in SOGGETTIVA (POV) che ti fanno sentire come se fossi TU a toccarla e possederla, sentendo il suo RESPIRO affannoso.",
    "COMPILATION dei suoi ORGASMI più INTENSI, con primi piani del suo viso SCONVOLTO dal piacere.",
    "VIDEO ISTRUTTIVI dove insegna TECNICHE SESSUALI AVANZATE, come il deepthroat o lo squirting a comando.",
    "PARODIE PORNO di film o serie TV famose, con lei come PROTAGONISTA HARD."
  ],
  telegram: [
    "contenuti ESCLUSIVI condivisi solo sul suo canale Telegram SEGRETO con accesso limitato, dove posta FOTO e VIDEO NON CENSURATI ogni ora.",
    "DIRETTE improvvise dove si SPOGLIA e si TOCCA seguendo le richieste dei membri del canale, arrivando a ORGASMI MULTIPLI in live.",
    "link a videochiamate PRIVATE a cui solo i più fortunati possono accedere, per sessioni di CAM2CAM INTERATTIVE.",
    "AUDIO CONFESSIONI dove descrive nei minimi dettagli le sue ESPERIENZE SESSUALI più ESTREME, con la sua VOCE ECCITANTE.",
    "foto e video TROPPO ESPLICITI per qualsiasi altra piattaforma, anche OnlyFans, inclusi contenuti BDSM e fetish.",
    "aggiornamenti QUOTIDIANI sulla sua vita sessuale PRIVATA con dettagli che non condivide altrove, come FOTO del DOPO-SESSO.",
    "conversazioni di GRUPPO dove interagisce direttamente con i fan rispondendo a domande INTIME e inviando contenuti SU RICHIESTA.",
    "anteprime ESCLUSIVE dei suoi prossimi contenuti HARD prima che vengano pubblicati altrove, con SCONTI per i membri del canale.",
    "SONDAGGI PICCANTI per decidere i suoi prossimi VIDEO o le sue prossime SFIDE estreme.",
    "REGALI ESCLUSIVI per i membri più ATTIVI, come MUTANDINE USATE o oggetti personali.",
    "ACCESSO a gruppi Telegram secondari ancora più ESCLUSIVI e NASCOSTI, per veri VIP."
  ],
  sesso: [
    "CONFESSIONI INTIME sulle sue preferenze sessuali più NASCOSTE e PERVERSE, come il desiderio di essere LEGATA e FRUSTATA.",
    "racconti dettagliati della sua prima esperienza di SODOMIA e come sia diventata la sua PASSIONE, descrivendo il DOLORE e il PIACERE.",
    "descrizioni ESPLICITE delle posizioni che la fanno raggiungere ORGASMI MULTIPLI, come la PECORELLA PROFONDA o l'AMAZZONE INVERTITA.",
    "rivelazioni su come ama essere DOMINATA e SOTTOMESSA durante i suoi incontri più INTENSI, con dettagli su COLLARI e GUINZAGLI.",
    "storie delle sue AVVENTURE LESBO con altre influencer famose nel settore, con descrizioni di BACI APPASSIONATI e SESSO ORALE selvaggio.",
    "consigli pratici su come performare una FELLATIO PERFETTA basati sulla sua vasta ESPERIENZA, inclusa la tecnica del DEEPTHROAT.",
    "dettagli su come sia diventata esperta in tecniche di SQUIRTING e come insegnarle alla tua partner, con VIDEO DIMOSTRATIVI.",
    "racconti delle ORGE più MEMORABILI a cui ha partecipato, con numeri e dettagli SCIOCCANTI, come il numero di CAZZI che ha preso INSIEME.",
    "LEZIONI di SEDUZIONE e SPOGLIARELLO per far IMPAZZIRE il tuo partner.",
    "GUIDE DETTAGLIATE all'uso di SEX TOYS di ogni tipo, dai vibratori ai dildo ENORMI.",
    "DISCUSSINI APERTE sulla LIBERAZIONE SESSUALE e sull'importanza di esplorare i propri DESIDERI più PROIBITI."
  ]
};

// Call-to-action statements
const ctaStatements = [
  "Non perdere l'opportunità di vedere questi contenuti ESCLUSIVI prima che vengano rimossi!",
  "Sblocca l'accesso COMPLETO ora e preparati a restare SENZA FIATO!",
  "Cosa aspetti? Questi contenuti PROIBITI ti stanno aspettando!",
  "Entra subito per scoprire fino a che punto {influencerName} si spinge oltre ogni limite!",
  "Clicca e accedi immediatamente a questo universo di piacere VIETATO AI MINORI!",
  "Scopri ora perché migliaia di fan impazziscono per i contenuti di {influencerName}!",
  "AFFRETTATI - questi contenuti potrebbero essere RIMOSSI in qualsiasi momento!",
  "Un solo click ti separa dal mondo SEGRETO di {influencerName}...",
  "Unisciti agli altri fortunati che hanno già sboccato questi contenuti ESCLUSIVI!",
  "Non accontentarti di immaginare - VEDI con i tuoi occhi quanto è ESTREMA {influencerName}!"
];

// Content structures
const contentStructures = [
  // Structure 1: Intro → Body1 → Category1 → Body2 → Category2 → CTA
  (intro: string, body1: string, body2: string, category1: string, category2: string, cta: string): string => 
    `${intro}! 📸 ${body1}. Specifico per {subcategoryName}: ${category1}. Ma non solo, ${body2}. Infatti, troverai anche ${category2}. ${cta} 🔥💦`,
  
  // Structure 2: Intro → Category1 → Body1 → Deeper Dive with Category2 & Body2 → CTA
  (intro: string, body1: string, body2: string, category1: string, category2: string, cta: string): string => 
    `${intro}! 🔞 Per la categoria {subcategoryName}, {category1}. Questo significa ${body1}. Per andare ancora più a fondo: ${category2}, che si traduce in ${body2}. ${cta} 💯`,
  
  // Structure 3: Bold question → Intro → Body1 + Category1 → Further details with Body2 + Category2 → CTA
  (intro: string, body1: string, body2: string, category1: string, category2: string, cta: string): string => {
    const questions = [
      "Vuoi vedere DAVVERO {influencerName} in {subcategoryName}?",
      "Cosa nasconde {influencerName} nei suoi contenuti {subcategoryName} più ESPLICITI?",
      "Pronto per un'immersione TOTALE in {influencerName} e i suoi segreti di {subcategoryName}?",
      "La VERITÀ su {influencerName} in {subcategoryName} è QUI!"
    ];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    return `${randomQuestion} 👀 ${intro}! ${body1}, in particolare ${category1}. E per i veri intenditori: ${body2}, che culmina in ${category2}. ${cta} 💦`;
  },
  
  // Structure 4: Warning → Intro → Detailed Body (1&2) → Detailed Category (1&2) → CTA
  (intro: string, body1: string, body2: string, category1: string, category2: string, cta: string): string => {
    const warnings = [
      "⚠️ ATTENZIONE MASSIMA: Contenuti ESTREMAMENTE INTENSI per la sezione {subcategoryName}!",
      "🚫 SOLO ADULTI CONSAPEVOLI: Materiali ESPLICITI che superano ogni immaginazione per {influencerName}!",
      "⛔ PERICOLO PIACERE ESTREMO: Ciò che vedrai di {influencerName} in {subcategoryName} ti cambierà!",
      "🔞 VIETATO AI DEBOLI DI CUORE: {influencerName} si spinge OLTRE OGNI LIMITE qui!"
    ];
    const randomWarning = warnings[Math.floor(Math.random() * warnings.length)];
    return `${randomWarning}

${intro} ${body1}. E ancora più nel dettaglio, ${body2}. Specificamente per {subcategoryName}: ${category1}, che include anche ${category2}. ${cta} 💯🔞`;
  }
];

// Type definition for content structure functions
type ContentStructureFunction = (intro: string, body1: string, body2: string, category1: string, category2: string, cta: string) => string;

// Unique attributes for special cases
// Would be expanded with real influencer data
const uniqueAttributes: Record<string, Record<string, string[]>> = {
  appearance: {
    default: ["curve mozzafiato", "fisico scolpito", "bellezza naturale", "sensualità innata"]
  },
  style: {
    default: ["ama guardare in camera", "si muove con grazia felina", "sa come provocare"]
  }
};

/**
 * Generate unique SEO content for influencer subcategory pages
 */
export function generateInfluencerSubcategoryContent(
  influencerSlug: string,
  influencerName: string,
  subcategorySlug: string,
  subcategoryDisplayName: string
): string {
  try {
    // Validate inputs
    if (!influencerSlug || !influencerName || !subcategorySlug || !subcategoryDisplayName) {
      console.error("Missing required parameters for content generation:", 
                   { influencerSlug, influencerName, subcategorySlug, subcategoryDisplayName });
      return `Contenuti esclusivi di ${influencerName || "questa influencer"} per ${subcategoryDisplayName || "questa categoria"}! 🔥`;
    }
    
    // Create a unique seed for this combination
    const seed = `${influencerSlug}-${subcategorySlug}`;
    
    // Debug log
    console.log(`Generating content for ${influencerName} - ${subcategoryDisplayName} with seed ${seed}`);
    
    // Select content components based on seed with logging
    const intro = selectWithSeed(introductions, seed, 0);
    console.log(`Selected intro: ${intro}`);
    
    const bodyPart1 = selectWithSeed(bodyDescriptions, seed, 1);
    console.log(`Selected bodyPart1: ${bodyPart1}`);
    
    // Get category-specific content or use default
    let categoryContent = categorySpecificContent[subcategorySlug as keyof typeof categorySpecificContent];
    if (!categoryContent || categoryContent.length === 0) {
      console.warn(`No category content found for ${subcategorySlug}, using fallback`);
      categoryContent = categorySpecificContent.sesso || [];
    }
    
    const categoryPart1 = selectWithSeed(categoryContent, seed, 2);
    console.log(`Selected categoryPart1: ${categoryPart1}`);
    
    const cta = selectWithSeed(ctaStatements, seed, 3);
    console.log(`Selected CTA: ${cta}`);
    
    // Get unique attributes for this influencer or use default
    const appearance = uniqueAttributes.appearance[influencerSlug] || uniqueAttributes.appearance.default || [];
    const style = uniqueAttributes.style[influencerSlug] || uniqueAttributes.style.default || [];
    
    // Select additional body and category parts
    const bodyPart2 = selectWithSeed(bodyDescriptions, seed, 6); // New offset
    console.log(`Selected bodyPart2: ${bodyPart2}`);
    
    const categoryPart2 = selectWithSeed(categoryContent, seed, 7); // New offset
    console.log(`Selected categoryPart2: ${categoryPart2}`);

    // Select a content structure based on seed with proper error handling
    const randomValue = seedRandom(`${seed}-structure`)();
    const structureIndex = Math.floor(randomValue * contentStructures.length);
    
    // Safety check to ensure index is within bounds
    const safeIndex = Math.min(Math.max(0, structureIndex), contentStructures.length - 1);
    const structureFunction = contentStructures[safeIndex] as ContentStructureFunction;
    
    // Generate the content using the selected structure with fallback
    let content;
    try {
      if (typeof structureFunction !== 'function') {
        throw new Error(`Invalid structure function at index ${safeIndex}`);
      }
      content = structureFunction(
        intro || "", 
        bodyPart1 || "", 
        bodyPart2 || "", 
        categoryPart1 || "", 
        categoryPart2 || "", 
        cta || ""
      );
    } catch (error) {
      console.error(`Error generating content with structure ${safeIndex}:`, error);
      // Fallback to simple structure if there's an error
      content = `${intro || "Contenuti esclusivi"}! 📸 ${bodyPart1 || "Materiale privato."} ${bodyPart2 || "Dettagli incredibili."} Specifico: ${categoryPart1 || "Contenuti per adulti."} ${categoryPart2 || "Altro ancora."} ${cta || "Scopri ora"} 🔥💦`;
    }
    
    // Replace placeholders
    content = content
      .replace(/{influencerName}/g, influencerName)
      .replace(/{subcategoryName}/g, subcategoryDisplayName)
      .replace(/{appearance}/g, selectWithSeed(appearance, seed, 4) || "sensuale") // Original offset 4
      .replace(/{style}/g, selectWithSeed(style, seed, 5) || "provocante"); // Original offset 5
    
    return content;
  } catch (error) {
    console.error("Error in content generation:", error);
    return `Contenuti esclusivi di ${influencerName || "questa influencer"} per ${subcategoryDisplayName || "questa categoria"}! 🔥`;
  }
}

/**
 * Generate a collection of FAQ items for an influencer subcategory
 */
export function generateInfluencerSubcategoryFAQs(
  influencerSlug: string,
  influencerName: string,
  subcategorySlug: string
): { question: string; answer: string }[] {
  const seed = `${influencerSlug}-${subcategorySlug}-faq`;

  const faqTemplates: Record<string, Array<{ question: string; answer: string }>> = {
    nudes: [
      {
        question: "I nudi di {influencerName} sono davvero INTEGRALI e SENZA CENSURE? 🙈🍑",
        answer: "Assolutamente SÌ! 💯 {influencerName} non lascia NULLA all'immaginazione. Vedrai OGNI centimetro della sua pelle, primi piani ESPLOSIVI 💥 dei suoi genitali, e pose che ti faranno IMPAZZIRE. Preparati a un'esperienza VOYEURISTICA ESTREMA! 🔥"
      },
      {
        question: "Con che frequenza vengono aggiunti nuovi nudi di {influencerName}? 📆💦",
        answer: "Nuovi set di nudi ESCLUSIVI di {influencerName} vengono caricati CONTINUAMENTE! 🔄 Ci impegniamo a tenere i contenuti FRESCHI e BOLLENTI, con {influencerName} che si spinge SEMPRE OLTRE ogni limite. Non perderti NIENTE! 🌶️"
      },
      {
        question: "Posso trovare foto dei PIEDI NUDI 👣 di {influencerName} in questa sezione?",
        answer: "Certamente! 🦶 Per gli amanti del genere, {influencerName} regala scatti DETTAGLIATI dei suoi piedi PERFETTI, spesso usati in modi PROVOCANTI e SESSUALI. Fetish soddisfatto! ✅"
      },
      {
        question: "{influencerName} mostra anche il suo VISO 😋 nei video e nelle foto di nudo?",
        answer: "Sì, {influencerName} ama mostrare il suo viso ECCITATO e PIENO di LUSSURIA mentre si esibisce! 😈 Vedrai le sue ESPRESSIONI di piacere mentre si tocca e gioca per te. Super COINVOLGENTE!"
      },
      {
        question: "Le foto di nudo di {influencerName} sono artistiche o più amatoriali e 'sporche'? 🎨😈",
        answer: "{influencerName} ama variare! 🎭 Troverai sia scatti più ARTISTICI che esaltano la sua bellezza, sia selfie e video AMATORIALI super CANDID e SPORCHI, come se fosse lì con te! Pura VERSATILITÀ! ✨"
      },
      {
        question: "Ci sono primi piani ESTREMI dei suoi genitali (vagina, ano) nei nudi? 🔬🍑🍩",
        answer: "Assolutamente SÌ! 🔎 {influencerName} non ha paura di mostrare OGNI DETTAGLIO. Preparati a primi piani MACROSCOPICI della sua vagina BAGNATA e invitante, e del suo ano STUZZICANTE. Per veri intenditori del DETTAGLIO! 🧐"
      },
      {
        question: "{influencerName} usa oggetti o sex toys nei suoi contenuti di nudo? 🧸🍆",
        answer: "A volte sì! 😈 Anche se la categoria 'nudes' si concentra sul suo corpo al naturale, {influencerName} ogni tanto si diverte a usare vibratori, dildo o altri oggetti per rendere i suoi nudi ancora più ECCITANTI e INTERATTIVI! Sorpresa! 🎉"
      },
      {
        question: "Nei nudi di {influencerName} si vede anche il suo seno DA VICINO e in DETTAGLIO?🍈🍈👀",
        answer: "Ma certo! {influencerName} adora esporre il suo SENO magnifico! 🤩 Aspettati primi piani dei suoi capezzoli TोनICI e pronti per essere SUCCHIATI, e riprese che esaltano ogni forma e morbidezza. Un vero spettacolo! 🌟"
      }
    ],
    leaks: [
      {
        question: "I 'leaks' di {influencerName} sono VERI o messinscene? 🤔💧",
        answer: "Questi sono contenuti AUTENTICI e PRIVATI 🕵️‍♀️ di {influencerName} che NON erano destinati al pubblico! Video AMATORIALI, chat ESPLICITE, e momenti RUBATI che rivelano la sua vera natura SELVAGGIA. 🤫"
      },
      {
        question: "Cosa includono esattamente i 'leaks' di {influencerName}? Contenuti SCONVOLGENTI? 🤯",
        answer: "I leaks includono di TUTTO: dai SELFIE più INTIMI 🤳 alle registrazioni di videochiamate ROVENTI 🥵, fino a conversazioni SEGRETE dove organizza incontri SESSUALI e rivela fantasie PROIBITE. Preparati allo SHOCK! 💣"
      },
      {
        question: "Ci sono video di {influencerName} che fa sesso con EX o AMANTI OCCASIONALI?💔🍆",
        answer: "Sì, tra i leaks potresti trovare video ESPLICITI di {influencerName} in momenti di PASSIONE SFRENATA con partner passati o incontri casuali. 😈 Momenti CRUDI e REALI della sua vita sessuale PRIVATA!"
      },
      {
        question: "Questi leaks mostrano {influencerName} in situazioni COMPROMETTENTI o UMILIANTI? 😳",
        answer: "Alcuni leaks potrebbero mostrare {influencerName} in situazioni particolarmente PRIVATE e VULNERABILI, spingendosi oltre i limiti della normale esibizione. Contenuti FORTI solo per VERI intenditori! 🔥"
      },
      {
        question: "Come sono stati ottenuti questi 'leaks' di {influencerName}? È roba rubata? 🏴‍☠️📱",
        answer: "I 'leaks' provengono da varie fonti: ex fidanzati vendicativi 💔, hackeraggi 💻, o semplicemente errori di condivisione. Sono contenuti PRIVATI che {influencerName} non avrebbe MAI voluto rendere pubblici! Materiale SCOTTANTE! 🔥"
      },
      {
        question: "Nei leaks, {influencerName} è consapevole di essere registrata/fotografata? 🕵️‍♀️📹",
        answer: "Spesso NO! 🤫 Molti leaks sono momenti RUBATI dove {influencerName} pensa di essere in PRIVATO. Questo rende i contenuti ancora più AUTENTICI e CRUDI. Vedrai la sua vera essenza senza filtri! 😳"
      },
      {
        question: "Questi leaks potrebbero mettere {influencerName} nei guai legali o personali? ⚖️😥",
        answer: "È possibile. 😬 La natura non autorizzata dei leaks significa che potrebbero avere conseguenze. Noi ci limitiamo a raccogliere ciò che è già pubblico, ma la situazione per lei è DELICATA. Contenuti ad ALTO RISCHIO! 💣"
      },
      {
        question: "I leaks includono anche MESSAGGI VOCALI 🎤 o TESTUALI 💬 compromettenti di {influencerName}?",
        answer: "Sì, assolutamente!  dokumen Oltre a foto e video, i leaks spesso contengono SCREENSHOT di chat PICCANTI 😈 e messaggi vocali SUSSURRATI 🌬️ dove {influencerName} rivela i suoi desideri più SEGRETI o organizza incontri. Materiale INTIMO! 🔥"
      }
    ],
    onlyfans: [
      {
        question: "Il contenuto OnlyFans di {influencerName} è molto più SPINTI di quello pubblico? 🌶️🔥",
        answer: "ASSOLUTAMENTE! 🚀 Su OnlyFans, {influencerName} si scatena SENZA LIMITI! Troverai video di sesso ESPLICITO, pratiche HARDCORE, e interazioni DIRETTE che non vedrai MAI da nessun'altra parte. Contenuti PREMIUM per veri FAN! 🌟"
      },
      {
        question: "{influencerName} fa richieste PERSONALIZZATE su OnlyFans? ✍️😏",
        answer: "Sì! {influencerName} è nota per esaudire le fantasie dei suoi fan più FEDELI e GENEROSI su OnlyFans. 💰 Immagina videomessaggi dove dice il TUO nome mentre si TOCCA, o scene create APPOSTA per te! Un sogno che diventa REALTÀ! ✨"
      },
      {
        question: "Posso vedere {influencerName} fare DOPPIE PENETRAZIONI 😮 o usare SEX TOYS GIGANTI 🧸 su OnlyFans?",
        answer: "Certamente! OnlyFans è il regno delle FANTASIE ESTREME di {influencerName}. 🏰 Preparati a vederla affrontare CAZZI ENORMI, doppie penetrazioni MOZZAFIATO, e l'uso creativo di sex toys di ogni forma e dimensione! 😈💦"
      },
      {
        question: "Ci sono DIRETTE LIVE 🔥 di {influencerName} su OnlyFans dove interagisce con gli utenti?",
        answer: "Sì! {influencerName} ama andare IN DIRETTA 🔴 su OnlyFans per sessioni di Q&A PICCANTI, show INTERATTIVI e talvolta anche performance SESSUALI in tempo REALE basate sulle richieste dei suoi abbonati! Non perderti l'AZIONE! 🎬"
      },
      {
        question: "Quanto costa abbonarsi all'OnlyFans di {influencerName} e cosa include l'abbonamento base? 💳💸",
        answer: "I prezzi variano, ma l'abbonamento base all'OnlyFans di {influencerName} 🤑 sblocca già TONNELLATE di contenuti ESCLUSIVI non disponibili altrove! Foto, video, e un assaggio delle sue perversioni. Contenuti EXTRA sono spesso disponibili come PPV (Pay-Per-View)! 🍬"
      },
      {
        question: "{influencerName} interagisce direttamente con i fan su OnlyFans tramite messaggi privati (DM)? 💬🥰",
        answer: "Sì! {influencerName} ama chattare 💌 con i suoi fan più fedeli su OnlyFans! Risponde ai DM, accetta richieste speciali (a volte con un extra tip 💸), e crea un legame più INTIMO. Un'esperienza ESCLUSIVA!💖"
      },
      {
        question: "Ci sono SCONTI o PROMOZIONI per l'OnlyFans di {influencerName}? 🏷️🎉",
        answer: "Spesso sì! {influencerName} lancia PROMOZIONI speciali 🎁, sconti sull'abbonamento per periodi limitati, o bundle di contenuti a prezzi vantaggiosi. Tieni d'occhio il suo profilo per non perdere le OFFERTE! 😉"
      },
      {
        question: "Su OnlyFans {influencerName} mostra anche scene di SQUIRTING ⛲ o eiaculazioni femminili?",
        answer: "Oh sì! 💦 {influencerName} è una REGINA dello squirting! 👑 Su OnlyFans troverai video ESCLUSIVI dove raggiunge orgasmi ESPLOSIVI con fontane di piacere. Preparati ad essere INZUPPATO! 🌊"
      }
    ],
    porno: [
      {
        question: "{influencerName} gira scene PORNO PROFESSIONALI? 🎬🌟 Con chi ha lavorato?",
        answer: "Sì, {influencerName} è una VERA ATTRICE HARDCORE! 🌟 Ha girato scene da URLO con i nomi più GRANDI dell'industria, mostrando le sue incredibili ABILITÀ in produzioni di ALTISSIMA QUALITÀ. Preparati a performance INDIMENTICABILI! 🏆"
      },
      {
        question: "Quanto sono ESTREME 🔞 le scene porno di {influencerName}? Fa GANGBANG o BUKKAKE? 💦🥵",
        answer: "Le scene di {influencerName} sono ESTREMAMENTE HARDCORE! 💣 Aspettati GANGBANG selvaggi dove soddisfa DECINE di uomini, BUKKAKE che la ricoprono completamente, e DOPPIE PENETRAZIONI da far girare la testa. Niente è troppo per lei! 😈"
      },
      {
        question: "Posso trovare video di {influencerName} che fa SESSO ANALE BRUTALE 🍑🔨 nei suoi film?",
        answer: "Assolutamente SÌ! {influencerName} è una REGINA del sesso anale! 👑 Nelle sue scene porno, la vedrai affrontare penetrazioni anali PROFONDE e INTENSE, spingendo il suo corpo al LIMITE per il massimo piacere (suo e tuo!). 🔥"
      },
      {
        question: "{influencerName} mostra il suo viso ed ESPRIME il suo piacere durante le scene porno? 😩😍",
        answer: "Oh, sì! {influencerName} non si trattiene! 🤤 Vedrai il suo viso SCONVOLTO dal piacere, sentirai i suoi GEMITI e le sue URLA mentre viene travolta dall'ORGIA. Le sue ESPRESSIONI sono parte integrante dello spettacolo! 🎭"
      },
      {
        question: "{influencerName} fa anche scene LESBO 🏳️‍🌈💋 nei suoi film porno?",
        answer: "Certamente! {influencerName} è un'amante del piacere in TUTTE le sue forme! 🔥 La vedrai in scene lesbiche APPASSIONATE con altre attrici famose, esplorando la sensualità femminile con BACI, CAREZZE e SESSO ORALE da urlo! 👭💦"
      },
      {
        question: "Nei suoi video porno, {influencerName} sembra divertirsi davvero o sta solo recitando? 🤔🎭",
        answer: "Guarda i suoi OCCHI e ascolta i suoi GEMITI! 😍 {influencerName} si IMMERGE totalmente nelle sue performance! Certo, è un lavoro, ma la sua PASSIONE e il suo PIACERE sono CONTAGIOSI e AUTENTICI! Te ne accorgerai subito! 😉"
      },
      {
        question: "È possibile trovare i FULL SCENES (scene complete) dei film porno di {influencerName}?",
        answer: "Assolutamente! 🌟 Cerchiamo di offrirti l'esperienza COMPLETA! Qui troverai link e accessi alle scene INTEGRALI dei film porno di {influencerName}, senza tagli o censure. Preparati per la MARATONA! 🍿🔞"
      },
      {
        question: "{influencerName} pratica il DEEPTHROAT 😮🍆 o altre tecniche di POMPINO ESTREME nelle sue scene?",
        answer: "Senza dubbio! {influencerName} è una MAESTRA della fellatio! 🏆 Aspettati deepthroat da far venire i BRIVIDI, tecniche di pompino aggressive e creative, e INGOIATE abbondanti. Ti lascerà a bocca aperta! 👄💦"
      }
    ],
    xxx: [
      {
        question: "Quanto sono ESTREMI i contenuti XXX di {influencerName}? Cosa posso aspettarmi? 🤯🔥",
        answer: "Preparati all'INCREDIBILE! 💥 I contenuti XXX di {influencerName} vanno OLTRE ogni immaginazione. Parliamo di FISTING completo, STRETCHING anale con oggetti ENORMI, pratiche BDSM ESTREME e fetish RARI e PROIBITI. Solo per stomaci FORTI! 🤘"
      },
      {
        question: "{influencerName} pratica WATERSports 💦 o altri FETISH particolari nella sezione XXX?",
        answer: "Sì! Nella sezione XXX, {influencerName} esplora TUTTI i suoi desideri più OSCURI, inclusi watersports (pipi dorata 🚽), COPROFILIA simulata 💩 (non reale, tranquillo!), e altre pratiche che sfidano ogni TABÙ. Curioso? Entra e SCOPRI! 🧐"
      },
      {
        question: "Ci sono scene con SANGUE 🩸, LACRIME 😭 o DOLORE REALE nei contenuti XXX?",
        answer: "I contenuti XXX possono includere elementi di ROUGH SEX e BDSM che simulano dolore o situazioni estreme, ma la SICUREZZA e il CONSENSO sono sempre al primo posto. L'obiettivo è l'ECCITAZIONE, non il danno REALE. Expect INTENSITY! ⚡"
      },
      {
        question: "{influencerName} usa OGGETTI INSOLITI 🧸🔧 o strumenti MEDICI/VETERINARI nei suoi video XXX?",
        answer: "Nella sua esplorazione XXX, {influencerName} non si pone limiti all'immaginazione! 😈 Potresti vederla usare oggetti INASPETTATI per il piacere, o esplorare i suoi orifizi con strumenti che ti lasceranno a BOCCA APERTA. Creatività ESTREMA! 🎨"
      },
      {
        question: "I contenuti XXX di {influencerName} sono prodotti professionalmente o sono più amatoriali/casalinghi? 🎬🏠",
        answer: "Entrambi! 🎭 Troverai sia produzioni XXX più strutturate e quasi cinematografiche 🌟, sia contenuti più GREZZI e AMATORIALI girati da {influencerName} stessa o da partner, per un feeling più intimo e REALISTICO. Il meglio dei due mondi ESTREMI! 😈"
      },
      {
        question: "{influencerName} collabora con altri performer maschili/femminili nei suoi video XXX? 🚻🤔",
        answer: "Sì! Le collaborazioni sono frequenti nel mondo XXX di {influencerName}! 🤝 Aspettati di vederla interagire con una varietà di partner, sia maschili che femminili, in scenari di gruppo, threesome, e altre combinazioni ESTREME e FANTASIOSE! 💥"
      },
      {
        question: "C'è un limite a quello che {influencerName} è disposta a fare nei suoi contenuti XXX? O è TUTTO possibile? 🚫🤔",
        answer: "{influencerName} è nota per spingersi MOLTO OLTRE, ma anche nel XXX esistono limiti dettati dalla sicurezza, dal consenso e dal benessere. 🛡️ Esplora i limiti dell'erotismo estremo, ma sempre in un contesto CONTROLLATO. La sua audacia ti sorprenderà! 😮"
      },
      {
        question: "Nei video XXX di {influencerName} ci sono scene di UMILIAZIONE VERBALE o FISICA? 🗣️🙇‍♀️",
        answer: "Per gli amanti del genere, SÌ! 🔥 {influencerName} a volte si cimenta in scene di UMILIAZIONE controllata, sia verbale (insulti, ordini 😈) che fisica (leggera sottomissione, schiaffi consensuali 👋). Sempre con CONSENSO e LIMITI chiari. Intrigante, vero? 😉"
      }
    ],
    video: [
      {
        question: "Che tipo di VIDEO ESPLICITI 📹 di {influencerName} troverò qui?",
        answer: "Una VASTA gamma! 🌊 Dai selfie-video AMATORIALI super HOT 🔥, a riprese RUBATE 🤫, video-diari INTIMI e confessionali 🎤, POV che ti faranno sentire PROTAGONISTA 🤩, e COMPILATION dei suoi orgasmi più DEVASTANTI! 💦"
      },
      {
        question: "I video di {influencerName} hanno AUDIO ORIGINALE con gemiti e parole sporche? 🔊😏",
        answer: "Assolutamente SÌ! 🎧 L'audio è FONDAMENTALE per un'esperienza IMMERSIVA! Sentirai ogni GEMITO, ogni SUSSULTO, e tutte le PAROLE SPORCHE che {influencerName} ama dire mentre si diverte. Alza il volume! 📢"
      },
      {
        question: "Ci sono video di {influencerName} che fa sesso in PUBBLICO 🏞️ o in situazioni RISCHIOSE?",
        answer: "{influencerName} ama l'ADRENALINA! 😈 Troverai video dove si esibisce o fa sesso in luoghi INASPETTATI e PUBBLICI, rischiando di essere scoperta! Emozione e PERVERSIONE allo stato puro! 🚨"
      },
      {
        question: "Posso trovare PARODIE PORNO 🎭 con {influencerName} o video ISTRUTTIVI su tecniche sessuali? 🤓",
        answer: "Sì a entrambi! 😂 {influencerName} non è solo una pornostar, ma anche un'intrattenitrice! Aspettati PARODIE HARD di film famosi e video dove INSEGNA 📚 le sue TECNICHE SESSUALI più EFFICACI. Imparare non è mai stato così DIVERTENTE!"
      },
      {
        question: "I video di {influencerName} sono disponibili in alta definizione (HD/4K)? 🎞️✨",
        answer: "Molti dei video di {influencerName}, specialmente quelli più recenti o prodotti professionalmente, sono disponibili in ALTA DEFINIZIONE (HD o anche 4K) 💎 per godere di ogni MINIMO DETTAGLIO del suo corpo e delle sue performance. Qualità SUPERIORE! 🖼️"
      },
      {
        question: "Posso scaricare 💾 i video di {influencerName} o sono solo in streaming?",
        answer: "A seconda della piattaforma e del tipo di contenuto, alcuni video potrebbero essere disponibili per il DOWNLOAD DIRETTO (spesso quelli premium o da canali Telegram esclusivi) 📲, mentre altri sono principalmente per lo STREAMING. Controlla le opzioni disponibili! 👇"
      },
      {
        question: "{influencerName} fa video POV (Point Of View) in cui sembra che IO sia il protagonista? 👀🎬",
        answer: "Sì, {influencerName} adora i video POV! 🤩 Ti faranno sentire come se fossi TU a interagire direttamente con lei, a toccarla, a baciarla... Un'esperienza IMMERSIVA e INCREDIBILMENTE ECCITANTE! Preparati a entrare NELL'AZIONE! 🚀"
      },
      {
        question: "Ci sono video di {influencerName} mentre si MASTURBA con OGGETTI INSOLITI o GIOCATTOLI ENORMI? 🧸🍆💦",
        answer: "Certo! {influencerName} è molto CREATIVA quando si tratta di auto-piacere! 🎨 Aspettati di vederla usare una vasta gamma di sex toys, dai vibratori classici a dildo di dimensioni IMPRESSIONANTI, e persino oggetti di casa trasformati in strumenti di godimento! 😈🔥"
      }
    ],
    telegram: [
      {
        question: "Cosa rende ESCLUSIVO il canale Telegram 💬 di {influencerName}? Vale la pena entrare?",
        answer: "Il canale Telegram di {influencerName} è un TESORO NASCOSTO! 💎 Troverai contenuti NON CENSURATI che non posta da nessun'altra parte, dirette ESCLUSIVE, interazioni DIRETTE, e ANTEPRIME dei suoi lavori futuri. Un MUST per i veri fan! 🤫✨"
      },
      {
        question: "{influencerName} fa dirette LIVE 🔥 e sessioni CAM2CAM 💻 sul suo Telegram?",
        answer: "Sì! {influencerName} adora connettersi con i suoi fan più intimi su Telegram! 📱 Aspettati dirette improvvise dove si SPOGLIA e si TOCCA su richiesta, e link ESCLUSIVI a sessioni CAM2CAM private per un'esperienza DAVVERO personale! 😉"
      },
      {
        question: "Posso ricevere FOTO e VIDEO PERSONALIZZATI 🎁 o addirittura oggetti da {influencerName} tramite Telegram?",
        answer: "Per i membri più ATTIVI e SPECIALI del suo canale Telegram, {influencerName} a volte offre REGALI ESCLUSIVI! 💝 Potrebbe trattarsi di contenuti personalizzati, messaggi vocali, o persino oggetti PERSONALI come lingerie usata! Più sei vicino, più ottieni! 🥰"
      },
      {
        question: "Su Telegram si parla anche di INCONTRI REALI 🤝 con {influencerName}?",
        answer: "Mentre Telegram è un luogo per contenuti ESCLUSIVI e interazioni online, qualsiasi discussione su incontri reali deve essere gestita con ESTREMA cautela e rispetto delle normative. La priorità è la PRIVACY e la SICUREZZA di {influencerName}. 🙏"
      },
      {
        question: "Il canale Telegram di {influencerName} è gratuito o a pagamento? 💰💬",
        answer: "Dipende! {influencerName} potrebbe avere sia canali Telegram GRATUITI 🆓 con anteprime e contenuti più soft, sia canali VIP a PAGAMENTO 💳 con accesso a materiale ESCLUSIVO, dirette e interazioni più intime. Esplora le sue offerte! 🔎"
      },
      {
        question: "Quanto spesso {influencerName} posta nuovi contenuti sul suo canale Telegram? 📲📆",
        answer: "{influencerName} è solitamente MOLTO ATTIVA 🏃‍♀️ sui suoi canali Telegram ESCLUSIVI, postando aggiornamenti, foto, video e messaggi vocali QUOTIDIANAMENTE o più volte al giorno! Contenuti sempre FRESCHI e BOLLENTI! 🔥"
      },
      {
        question: "È sicuro unirsi ai canali Telegram di {influencerName}? La mia privacy è protetta? 🔒🤫",
        answer: "Telegram offre un buon livello di privacy di base (es. i numeri di telefono non sono visibili nei gruppi/canali di default). Tuttavia, usa sempre cautela online. I canali ufficiali di {influencerName} sono generalmente sicuri, ma attenzione a truffe o imitazioni! ✅"
      },
      {
        question: "Ci sono SONDAGGI 📊 o GIOCHI INTERATTIVI 🎲 sul Telegram di {influencerName} per decidere i prossimi contenuti?",
        answer: "Assolutamente! {influencerName} ama coinvolgere i suoi fan! 🥰 Spesso lancia SONDAGGI PICCANTI 🌶️ per scegliere il tema del prossimo video o la lingerie da indossare, e a volte organizza GIOCHI INTERATTIVI con premi ESCLUSIVI! Partecipa e DIVERTITI! 🎉"
      }
    ],
    sesso: [
      {
        question: "{influencerName} parla delle sue FANTASIE SESSUALI più PROIBITE 😈 e delle sue esperienze?",
        answer: "Senza FILTRI! 🚫 {influencerName} si apre COMPLETAMENTE riguardo alle sue perversioni, ai suoi desideri più OSCURI, e racconta dettagliatamente le sue esperienze SESSUALI più MEMORABILI e SCANDALOSE! Preparati a confessioni BOLLENTI! 🔥💬"
      },
      {
        question: "Posso imparare TECNICHE SESSUALI 💦 da {influencerName} in questa sezione? Tipo come fare un POMPINO PERFETTO? 👄",
        answer: "Assolutamente! {influencerName} è un'ESPERTA e adora condividere la sua conoscenza! 🤓 Troverai consigli PRATICI, guide DETTAGLIATE, e forse anche VIDEO DIMOSTRATIVI su come migliorare le tue abilità a letto, dal deepthroat allo squirting! 🏆"
      },
      {
        question: "{influencerName} racconta di ORGE 👯‍♀️👯‍♂️ o esperienze di GRUPPO ESTREME?",
        answer: "Oh sì! {influencerName} ha un debole per le esperienze di GRUPPO e non si tira indietro dal raccontare i dettagli più PICCANTI! 🌶️ Storie di orge INDIMENTICABILI, scambi di coppia, e avventure con PIÙ PARTNER contemporaneamente! 🤯"
      },
      {
        question: "Si parla anche di BDSM ⛓️, DOMINAZIONE 👑 e SOTTOMISSIONE 🙇‍♀️ in questa sezione?",
        answer: "Certamente! {influencerName} esplora tutti gli aspetti della SESSUALITÀ, incluso il mondo del BDSM. 😈 Scopri le sue preferenze tra dominare o essere sottomessa, i suoi giochi preferiti con fruste e corde, e come integra queste pratiche nella sua vita SESSUALE!"
      },
      {
        question: "{influencerName} dà consigli su come migliorare la propria vita sessuale o esplorare nuove pratiche? 💡🌶️",
        answer: "Assolutamente! {influencerName} non è solo performance, ma anche CONDIVISIONE! 🤝 Troverai suoi pensieri, consigli e guide su come vivere una sessualità più appagante, sperimentare nuove pratiche (dal BDSM ai sex toys) e comunicare meglio con il partner. Vera GURU del sesso! 🧘‍♀️"
      },
      {
        question: "Quali sono i SEX TOYS preferiti di {influencerName} e come li usa? 🧸🎀",
        answer: "{influencerName} ha una collezione INVIDIABILE di sex toys! 😈 Dai vibratori potentissimi ai dildo realistici di dimensioni generose, fino a plug anali e strumenti per il BDSM. Ti mostrerà (e racconterà!) come li usa per raggiungere l'ESTASI! ✨"
      },
      {
        question: "{influencerName} ha mai parlato delle sue peggiori esperienze sessuali o di qualche 'fail' divertente? 😂🤦‍♀️",
        answer: "Anche le dee del sesso hanno i loro momenti NO! 😉 {influencerName} a volte condivide storie DIVERTENTI o imbarazzanti legate al sesso, rendendola ancora più UMANA e VICINA. Risate e realismo non mancano! 😄"
      },
      {
        question: "{influencerName} discute di SESSO SICURO 🛡️ e dell'importanza del CONSENSO ✅ nei suoi contenuti?",
        answer: "Sì, e questo è FONDAMENTALE! 🙏 {influencerName} promuove attivamente il SESSO SICURO e l'importanza del CONSENSO esplicito in ogni interazione. Anche nel mondo dell'hard, il rispetto e la sicurezza vengono PRIMA di TUTTO! Educazione e piacere! 📚💖"
      }
    ],
    default: [
      {
        question: "Cosa posso aspettarmi dai contenuti '{subcategorySlug}' di {influencerName}? Sarà INTENSO? 🌶️💥",
        answer: "Preparati per un'esperienza ESPLOSIVA e SENZA CENSURE! 💣 Nella sezione '{subcategorySlug}', {influencerName} si mostra come non l'hai MAI VISTA PRIMA. Contenuti BOLLENTI, ESCLUSIVI e IPER-ESPLICITI ti aspettano! 💦👅"
      },
      {
        question: "I contenuti di {influencerName} per '{subcategorySlug}' sono adatti a un pubblico SENSIBILE? 🔞😳",
        answer: "ASSOLUTAMENTE NO! 🚫 I contenuti di {influencerName} in questa sezione sono ESTREMAMENTE ESPLICITI e pensati per un pubblico ADULTO e CONSAPEVOLE che cerca emozioni FORTI. Se sei facilmente impressionabile, procedi con CAUTELA! 🚧"
      },
      {
        question: "Con che frequenza vengono aggiornati i contenuti '{subcategorySlug}' di {influencerName}? 🤔🔄",
        answer: "Cerchiamo di aggiornare i contenuti '{subcategorySlug}' di {influencerName} il più REGOLARMENTE possibile! ✅ L'obiettivo è offrirti sempre materiale FRESCO e INEDITO per soddisfare la tua CURIOSITÀ INSANEBILE! Continua a seguirci! 🧐"
      },
      {
        question: "I contenuti di {influencerName} in '{subcategorySlug}' sono LEGALI e CONSENSUALI? ⚖️✅",
        answer: "La LEGALITÀ e il CONSENSO sono FONDAMENTALI. ✅ Tutti i contenuti presentati come performance di {influencerName} sono prodotti nel rispetto delle normative e con il consenso degli adulti coinvolti. Ci teniamo alla trasparenza e all'etica, anche nel mondo dell'hard! 🛡️"
      },
      {
        question: "Come posso richiedere contenuti SPECIFICI a {influencerName} per la categoria '{subcategorySlug}'? ✍️💡",
        answer: "Il modo migliore per richieste specifiche è interagire con {influencerName} sui suoi canali ufficiali a pagamento come OnlyFans o Telegram VIP 💸, dove spesso offre opzioni per contenuti PERSONALIZZATI o prende spunto dai desideri dei fan per nuove produzioni! Fatti sentire! 📣"
      },
      {
        question: "Oltre a {influencerName}, ci sono altre influencer simili che potrei scoprire qui con contenuti '{subcategorySlug}'? 🤔👯‍♀️",
        answer: "Assolutamente! Il nostro sito è un UNIVERSO di piacere! 🌌 Oltre a {influencerName}, esplora le sezioni dedicate ad ALTRE INFLUENCER che offrono contenuti ESPLOSIVI nella categoria '{subcategorySlug}' e non solo! La scoperta non finisce MAI! 🚀"
      },
      {
        question: "Posso condividere i contenuti '{subcategorySlug}' di {influencerName} trovati qui? 📲🚫",
        answer: "Generalmente NO. 🛑 Molti contenuti ESCLUSIVI sono protetti da copyright e destinati al consumo PERSONALE sulla piattaforma dove li trovi. La condivisione non autorizzata può avere conseguenze legali e danneggia {influencerName}. Rispetta il suo lavoro! 🙏"
      },
      {
        question: "C'è un modo per lasciare FEEDBACK o COMMENTI sui contenuti '{subcategorySlug}' di {influencerName}? 🗣️📝",
        answer: "Dipende dalla piattaforma! Su OnlyFans o Telegram, {influencerName} spesso ha sezioni per COMMENTI o interagisce direttamente. 💬 Altrimenti, cerca i suoi social media UFFICIALI. Il feedback COSTRUTTIVO è solitamente apprezzato! 👍"
      }
    ]
  };

  const selectedFAQs = faqTemplates[subcategorySlug] || faqTemplates.default;
  
  const numFaqsToSelect = 7; // Display up to 7 FAQs
  const availableFaqs = selectedFAQs.length;
  const faqsToShow: { question: string; answer: string }[] = [];

  const random = seedRandom(seed);

  if (availableFaqs === 0) { // Handle case with no FAQs for a category
    return [];
  }
  
  if (availableFaqs <= numFaqsToSelect) {
    faqsToShow.push(...selectedFAQs.sort(() => 0.5 - random())); // Shuffle even if taking all
  } else {
    const shuffledFAQs = [...selectedFAQs].sort(() => 0.5 - random());
    faqsToShow.push(...shuffledFAQs.slice(0, numFaqsToSelect));
  }

  return faqsToShow.map(faq => ({
    question: (faq.question || "Domanda non disponibile")
      .replace(/{influencerName}/g, influencerName)
      .replace(/{subcategorySlug}/g, subcategorySlug),
    answer: (faq.answer || "Risposta non disponibile")
      .replace(/{influencerName}/g, influencerName)
      .replace(/{subcategorySlug}/g, subcategorySlug)
  }));
} 