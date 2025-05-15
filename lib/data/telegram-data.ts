import { telegramCategoriesData, TelegramSubcategory, getTelegramSubcategoryBySlug } from '@/lib/telegram-categories';

// This will be the shape of the data for each dynamic page
export interface TelegramPageData {
  type: 'canali' | 'gruppi';
  slug: string;
  name: string; // Original name from subcategory
  title: string; // SEO Title
  description: string; // Meta description
  longDescription?: string; // Main content for the page (can be HTML)
  faq?: Array<{ question: string; answer: string }>;
  // Potentially: relatedLinks, images, etc.
}

// Placeholder for fetching actual data from a DB or CMS
// For now, we'll generate some mock data based on the slug

async function generateMockData(type: 'canali' | 'gruppi', subcategory: TelegramSubcategory): Promise<TelegramPageData> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async call
  
    const typeName = type === 'canali' ? 'Canale' : 'Gruppo';
    const typeNamePlural = type === 'canali' ? 'Canali' : 'Gruppi';
    const subcategoryName = subcategory.name.replace(/\s*\(.*\)\s*/g, '').trim(); // Cleaned name
  
    let longDescription: string;
    let faq: Array<{ question: string; answer: string }>;
  
    // SEO Title (remains somewhat generic but includes subcategory name)
    const pageTitle = `🏆 Migliori ${typeNamePlural} Telegram ${subcategoryName} | Contenuti HOT Esclusivi 🔞`;
    // Meta Description
    const metaDescription = `🚀 Esplora i migliori ${typeNamePlural.toLowerCase()} Telegram dedicati a ${subcategoryName}. Link aggiornati, video, foto e community piccanti. Unisciti ora per il massimo divertimento! 😈`;
  
    switch (subcategory.slug) {
      case 'sesso':
        if (type === 'canali') {
          longDescription = `
            <h2>🔞 ${typeName} Telegram ${subcategoryName}: Video, Foto e Link Espliciti 📺</h2>
            <p>Benvenuto nella sezione dedicata ai <strong>canali Telegram sul ${subcategoryName.toLowerCase()}</strong>! Qui troverai una selezione curata di canali che offrono contenuti espliciti, video hot, foto audaci, e link a materiale per adulti. 😈</p>
            <p>Cosa aspettarti:</p>
            <ul>
              <li>🎬 Accesso diretto a video XXX, clip amatoriali, e scene da film porno.</li>
              <li>📸 Gallerie di foto piccanti, nudi artistici e selfie bollenti.</li>
              <li>🔗 Link a siti esterni, blog e altre risorse a tema ${subcategoryName.toLowerCase()}.</li>
              <li>🔄 Contenuti aggiornati regolarmente per non perderti nulla.</li>
            </ul>
            <p>Questi canali sono la tua porta d'accesso a un mondo di piacere visivo. Sfoglia, unisciti e goditi lo spettacolo. Ricorda: solo per maggiorenni! 🔥</p>
          `;
          faq = [
            { question: `Cosa trovo nei canali Telegram sul ${subcategoryName.toLowerCase()}? 🤔`, answer: `Principalmente video espliciti, foto di nudo, link a contenuti porno e materiale per adulti. I contenuti variano da canale a canale, spaziando tra diversi generi e preferenze. Alcuni canali possono essere più generalisti, altri focalizzati su nicchie specifiche.` },
            { question: `L'iscrizione a questi canali ${subcategoryName.toLowerCase()} è gratuita? 💰`, answer: `Molti canali offrono accesso gratuito a una vasta gamma di contenuti. Alcuni potrebbero avere opzioni premium, contenuti esclusivi a pagamento o link a servizi in abbonamento. Controlla sempre le informazioni del singolo canale.` },
            { question: `I contenuti sono verificati e sicuri? 🛡️`, answer: `Noi elenchiamo i canali, ma non controlliamo direttamente i contenuti specifici pubblicati, che sono gestiti dagli amministratori dei canali. Raccomandiamo sempre cautela quando si clicca su link esterni o si scaricano file. Utilizza un buon antivirus e naviga responsabilmente.` },
            { question: `Posso richiedere contenuti specifici nei canali ${subcategoryName.toLowerCase()}? 🗣️`, answer: `Generalmente i canali sono unidirezionali (l'admin pubblica, tu visualizzi). Per richieste o interazioni, i gruppi Telegram dedicati al ${subcategoryName.toLowerCase()} sono più indicati, se disponibili e collegati al canale.` },
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Chat, Discussioni e Incontri HOT 🌶️</h2>
            <p>Entra nei <strong>gruppi Telegram dedicati al ${subcategoryName.toLowerCase()}</strong>! Questi sono spazi di discussione e condivisione per chi vuole parlare apertamente di sessualità, scambiare esperienze, foto, video e magari organizzare incontri piccanti. 😉</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>🗨️ Partecipare a chat esplicite e senza censure.</li>
              <li>📸 Condividere foto e video amatoriali (nel rispetto delle regole del gruppo!).</li>
              <li>❓ Chiedere consigli, condividere fantasie o raccontare esperienze.</li>
              <li>💞 Conoscere persone con i tuoi stessi interessi per sexting o incontri reali.</li>
              <li>🎉 Trovare community aperte e pronte a esplorare la sessualità.</li>
            </ul>
            <p>Se cerchi un ambiente interattivo per esplorare il ${subcategoryName.toLowerCase()} in tutte le sue forme, questi gruppi sono il posto giusto. Unisciti, presentati (se vuoi!) e partecipa. Ricorda: rispetto e consenso prima di tutto! 🔞</p>
          `;
          faq = [
            { question: `Di cosa si parla nei gruppi Telegram sul ${subcategoryName.toLowerCase()}? 🔥`, answer: `Le discussioni possono variare da consigli sessuali, racconti di esperienze, condivisione di fantasie, a organizzazione di incontri (se il gruppo lo permette). Molti gruppi sono anche per la condivisione di foto e video amatoriali.` },
            { question: `Posso unirmi anonimamente a questi gruppi ${subcategoryName.toLowerCase()}? 🤫`, answer: `Telegram permette un certo grado di anonimato (puoi usare un username e nascondere il tuo numero). Tuttavia, le tue interazioni nel gruppo saranno visibili agli altri membri. Leggi le regole del gruppo riguardo privacy e condivisione di informazioni personali.` },
            { question: `Ci sono regole da seguire in questi gruppi? 📜`, answer: `Assolutamente sì. Ogni gruppo ha le sue regole stabilite dagli amministratori (es. no spam, rispetto per gli altri membri, tipi di contenuti permessi/vietati). Leggile attentamente e rispettale per evitare di essere bannato.` },
            { question: `È possibile organizzare incontri reali tramite questi gruppi ${subcategoryName.toLowerCase()}? 🤝`, answer: `Alcuni gruppi sono esplicitamente creati per facilitare incontri, altri no. Verifica sempre lo scopo e le regole del gruppo. Se decidi di incontrare qualcuno, fallo sempre con la massima cautela, in luoghi pubblici e informando una persona di fiducia.` },
          ];
        }
        break;

      case 'amatoriale':
        if (type === 'canali') {
          longDescription = `
            <h2>🏠 ${typeName} Telegram ${subcategoryName}: Video e Foto Casalinghi Veri! 🌶️</h2>
            <p>Scopri il fascino genuino dei <strong>canali Telegram ${subcategoryName.toLowerCase()}</strong>. Qui trovi video e foto realizzati da persone comuni, coppie vere e dilettanti che amano condividere i loro momenti più intimi e piccanti. Niente produzioni patinate, solo pura passione casalinga! 🔥</p>
            <p>Cosa aspettarti:</p>
            <ul>
              <li>🎬 Clip e video amatoriali autentici, scene di sesso reale e spaccati di vita privata.</li>
              <li>📸 Selfie hot, foto di coppia, nudi casalinghi e momenti rubati.</li>
              <li>👩‍❤️‍👨 Contenuti da ragazze e ragazzi della porta accanto, coppie reali che si divertono.</li>
              <li>🔄 Nuovi post frequenti con materiale sempre fresco e genuino.</li>
            </ul>
            <p>Se ami l'autenticità e la spontaneità del sesso ${subcategoryName.toLowerCase()}, questi canali sono un tesoro. Unisciti e spia dal buco della serratura! Ricorda: solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Cosa significa ${subcategoryName.toLowerCase()} in questo contesto? 🤔`, answer: `Significa contenuti (video, foto) realizzati da persone non professioniste del settore porno, spesso in contesti casalinghi o privati. L'enfasi è sull'autenticità e la spontaneità.` },
            { question: `I video e le foto ${subcategoryName.toLowerCase()} sono reali? 😲`, answer: `L'obiettivo dei canali ${subcategoryName.toLowerCase()} è condividere materiale il più possibile genuino e non recitato. Tuttavia, la verifica assoluta dell'autenticità è difficile. Goditi i contenuti per quello che sono.` },
            { question: `Posso trovare diversi tipi di contenuti ${subcategoryName.toLowerCase()}?`, answer: `Sì, la varietà è ampia: da singoli/e che si mostrano, a coppie che filmano i loro rapporti, a scene di vita quotidiana con un tocco piccante. Ogni canale ha il suo stile.` },
            { question: `È possibile interagire con chi produce i contenuti ${subcategoryName.toLowerCase()}? 🗣️`, answer: `Nei canali, generalmente no, essendo unidirezionali. Alcuni creatori ${subcategoryName.toLowerCase()} potrebbero avere gruppi associati o profili social dove è possibile interagire, ma non è la norma per i canali stessi.` },
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Condividi le Tue Esperienze Casalinghe! 🏡</h2>
            <p>Entra nei <strong>gruppi Telegram ${subcategoryName.toLowerCase()}</strong>! Qui puoi condividere i tuoi video e le tue foto casalinghe, chattare con altre persone a cui piace l'autenticità, scambiare esperienze e magari trovare partner per nuove avventure amatoriali. 😉</p>
            <p>Cosa puoi fare:</p>
            <ul>
              <li>📸 Caricare e condividere i tuoi scatti e video ${subcategoryName.toLowerCase()} (sempre nel rispetto delle regole!).</li>
              <li>🗣️ Discutere di sesso ${subcategoryName.toLowerCase()}, raccontare le tue esperienze più piccanti.</li>
              <li>👀 Guardare e commentare i contenuti condivisi dagli altri membri.</li>
              <li>💞 Connetterti con persone che apprezzano il sesso genuino e non artefatto.</li>
            </ul>
            <p>Se hai materiale ${subcategoryName.toLowerCase()} da condividere o semplicemente ami questo genere, questi gruppi sono il luogo ideale per te. Unisciti alla community! Riservato ai maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Posso postare i miei video/foto ${subcategoryName.toLowerCase()} in questi gruppi? 🤳`, answer: `Generalmente sì, molti gruppi ${subcategoryName.toLowerCase()} sono creati proprio per questo scopo. Leggi sempre attentamente il regolamento del gruppo per capire cosa è permesso e cosa no (es. limiti di età, tipi di contenuti, ecc.).` },
            { question: `Come proteggo la mia privacy se condivido materiale ${subcategoryName.toLowerCase()}? 🔒`, answer: `Sii consapevole che ciò che condividi in un gruppo può essere visto da tutti i membri. Considera di non mostrare il viso o dettagli identificativi se desideri maggiore anonimato. Alcuni gruppi potrebbero avere regole specifiche sulla privacy.` },
            { question: `Questi gruppi sono per scambisti o solo per guardare? 🧐`, answer: `Lo scopo può variare. Alcuni gruppi ${subcategoryName.toLowerCase()} potrebbero essere orientati anche a incontri o scambi, altri solo alla condivisione e discussione di materiale. Controlla la descrizione e le regole del gruppo.` },
            { question: `Cosa succede se qualcuno condivide i miei contenuti ${subcategoryName.toLowerCase()} fuori dal gruppo? 😡`, answer: `Purtroppo, questo è un rischio quando si condivide materiale online. Gli amministratori del gruppo possono bannare chi viola le regole, ma hanno un controllo limitato su ciò che accade fuori dal gruppo. Condividi con consapevolezza.` },
          ];
        }
        break;

      case 'calda':
        if (type === 'canali') {
          longDescription = `
            <h2>🔥 ${typeName} Telegram ${subcategoryName}: Ragazze e Donne Ardenti! 🌡️</h2>
            <p>Preparati a scottarti con i <strong>canali Telegram ${subcategoryName.toLowerCase()}</strong>! Dedicati a donne e ragazze che emanano sensualità, passione e un calore irresistibile. Troverai foto, video e clip di bellezze che sanno come accendere il desiderio. 💋</p>
            <p>Cosa ti aspetta:</p>
            <ul>
              <li>💄 Immagini e video di donne incredibilmente sexy e provocanti.</li>
              <li>💃 Performance sensuali, balli erotici, spogliarelli e pose da capogiro.</li>
              <li>🌡️ Atmosfere bollenti e contenuti che alzano la temperatura.</li>
              <li>🔄 Nuovi post con ragazze sempre diverse e pronte a sedurre.</li>
            </ul>
            <p>Se cerchi ispirazione o semplicemente vuoi ammirare la femminilità nella sua espressione più ${subcategoryName.toLowerCase()} e ardente, questi canali sono perfetti. Solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Cosa si intende per ${subcategoryName.toLowerCase()} in questi canali? 🤔`, answer: `Si riferisce a donne e ragazze particolarmente attraenti, sensuali, provocanti e che esprimono una forte carica erotica. L'enfasi è sull'aspetto seducente e passionale.` },
            { question: `Sono modelle professioniste o ragazze comuni? 🤷‍♀️`, answer: `Puoi trovare entrambe. Alcuni canali potrebbero focalizzarsi su modelle o influencer note per la loro sensualità, altri su ragazze comuni che amano mostrarsi nel loro lato più ${subcategoryName.toLowerCase()}.` },
            { question: `Ci sono solo foto o anche video nei canali ${subcategoryName.toLowerCase()}? 📹`, answer: `Entrambi! Molti canali offrono un mix di fotografie ad alta risoluzione, brevi clip video, gif e talvolta anche performance più lunghe.` },
            { question: `Questi canali ${subcategoryName.toLowerCase()} presentano nudo esplicito? 🔞`, answer: `Spesso sì. La natura "${subcategoryName.toLowerCase()}" implica generalmente contenuti che possono variare dal sensuale al nudo esplicito. Verifica la descrizione del singolo canale per dettagli specifici.` },
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Chat con Persone Passionali e Ardenti! 🔥</h2>
            <p>Entra nei <strong>gruppi Telegram ${subcategoryName.toLowerCase()}</strong> se ti senti una persona passionale, se cerchi partner di chat altrettanto ardenti, o se semplicemente vuoi discutere di sensualità e attrazione in un ambiente vivace. 💋</p>
            <p>Cosa puoi fare qui:</p>
            <ul>
              <li>🗣️ Partecipare a discussioni sulla seduzione, l'attrazione e la passione.</li>
              <li>📸 Condividere foto o selfie che esprimono il tuo lato più ${subcategoryName.toLowerCase()} (se le regole lo consentono).</li>
              <li>💞 Connetterti con uomini e donne che apprezzano la sensualità e l'erotismo.</li>
              <li>🔥 Trovare ispirazione o semplicemente chattare con persone stimolanti.</li>
            </ul>
            <p>Questi gruppi sono per chi vuole esplorare e condividere la propria natura ${subcategoryName.toLowerCase()} in un contesto di community. Unisciti e scalda l'atmosfera! Riservato ai maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Chi trovo in questi gruppi Telegram ${subcategoryName.toLowerCase()}? 🤔`, answer: `Persone (uomini e donne) che si identificano come passionali, sensuali, o che sono attratte da queste caratteristiche. L'obiettivo è creare una community che apprezzi e discuta di sensualità.` },
            { question: `Si possono scambiare foto e video ${subcategoryName.toLowerCase()} nei gruppi? 🌶️`, answer: `Dipende dal gruppo. Alcuni incoraggiano la condivisione di foto e video sensuali (non necessariamente espliciti), altri sono più focalizzati sulla chat. Controlla sempre il regolamento.` },
            { question: `È possibile trovare persone per incontri ${subcategoryName.toLowerCase()} in questi gruppi? 💑`, answer: `Alcuni gruppi potrebbero avere un focus sugli incontri, ma non è garantito. Sii chiaro sulle tue intenzioni e rispetta quelle altrui. La sicurezza prima di tutto.` },
            { question: `Come mi comporto per essere un membro ${subcategoryName.toLowerCase()} e rispettoso? 😊`, answer: `Sii te stesso/a ma sempre con rispetto per gli altri. Evita commenti volgari non richiesti, apprezza la diversità e contribuisci a creare un ambiente positivo e stimolante.` },
          ];
        }
        break;

      case 'cam':
        if (type === 'canali') {
          longDescription = `
            <h2>📹 ${typeName} Telegram ${subcategoryName}: Show Esclusivi da Web${subcategoryName.toLowerCase()}! 🌟</h2>
            <p>Esplora i <strong>canali Telegram ${subcategoryName.toLowerCase()}</strong> per accedere a contenuti esclusivi, registrazioni di show e link diretti alle performance live delle tue ${subcategoryName.toLowerCase()}girl e ${subcategoryName.toLowerCase()}boy preferiti! 💻</p>
            <p>Cosa troverai:</p>
            <ul>
              <li>🎬 Clip e registrazioni da sessioni di webcam hot.</li>
              <li>🔗 Link a profili di ${subcategoryName.toLowerCase()} model su piattaforme esterne.</li>
              <li>🎁 Contenuti bonus, foto dietro le quinte e anteprime.</li>
              <li>🗓️ Aggiornamenti su quando le tue modelle preferite vanno live.</li>
            </ul>
            <p>Questi canali sono la tua scorciatoia per non perderti il meglio del mondo ${subcategoryName.toLowerCase()}. Unisciti per rimanere sempre aggiornato sulle performance più piccanti! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa offrono i canali Telegram dedicati alle ${subcategoryName.toLowerCase()}? 🤔`, answer: `Solitamente condividono clip da show passati, foto promozionali, link ai profili delle ${subcategoryName.toLowerCase()} model su piattaforme di webcam, e talvolta orari degli show live o codici sconto.` },
            { question: `Posso vedere show ${subcategoryName.toLowerCase()} completi e live tramite Telegram? 🔴`, answer: `Generalmente no. Telegram è usato più come piattaforma per promuovere e condividere estratti. Gli show live avvengono su siti di webcam specializzati, ai quali i canali Telegram possono fornire link.` },
            { question: `Questi canali sono gestiti dalle ${subcategoryName.toLowerCase()} model stesse? 🤷‍♀️`, answer: `Alcuni sì, altri da fan o affiliati. I canali ufficiali sono solitamente i più affidabili per informazioni dirette dalla modella.` },
            { question: `È sicuro cliccare sui link condivisi in questi canali ${subcategoryName.toLowerCase()}? 💻`, answer: `Presta attenzione e clicca solo su link che sembrano affidabili, preferibilmente quelli che portano a piattaforme di webcam note. Evita link sospetti o che richiedono download non richiesti.` },
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Parla delle Tue Modelle Preferite e Show! 🌟</h2>
            <p>Unisciti ai <strong>gruppi Telegram ${subcategoryName.toLowerCase()}</strong> per discutere delle tue ${subcategoryName.toLowerCase()}girl e ${subcategoryName.toLowerCase()}boy preferiti, scambiare opinioni sugli show, condividere link (se permesso) e connetterti con altri fan del mondo webcam! 💻</p>
            <p>Cosa puoi fare qui:</p>
            <ul>
              <li>🗣️ Parlare dei performer di ${subcategoryName.toLowerCase()} più hot e delle loro performance.</li>
              <li>🔗 Condividere link a profili o video interessanti (rispettando le regole del gruppo).</li>
              <li>⭐ Scoprire nuove modelle e modelli emergenti.</li>
              <li>💬 Interagire con una community di appassionati di show in ${subcategoryName.toLowerCase()}.</li>
            </ul>
            <p>Se ami il mondo delle webcam e vuoi un posto per parlarne con altri fan, questi gruppi sono l'ideale. Riservato ai maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa si discute nei gruppi Telegram sulle ${subcategoryName.toLowerCase()}? 🤔`, answer: `Si parla di modelle e modelli di webcam, dei loro show, si scambiano opinioni, si consigliano performer e talvolta si condividono link a clip o profili (se le regole del gruppo lo consentono).` },
            { question: `Posso trovare link diretti a show ${subcategoryName.toLowerCase()} gratuiti nei gruppi? 🆓`, answer: `È possibile che i membri condividano link a piattaforme che offrono show gratuiti o token per vederli. Tuttavia, molti show di qualità sono a pagamento.` },
            { question: `Le ${subcategoryName.toLowerCase()} model partecipano a questi gruppi? 🤷‍♂️`, answer: `Raramente. Questi gruppi sono solitamente creati e frequentati da fan. Le modelle interagiscono principalmente sulle piattaforme di webcam stesse o sui loro social ufficiali.` },
            { question: `È possibile richiedere show privati o contenuti personalizzati tramite questi gruppi? 🚫`, answer: `Generalmente no. I gruppi sono per discussione tra fan. Per richieste dirette alle modelle, devi utilizzare le funzionalità delle piattaforme di webcam (chat privata, richieste di show, ecc.).` },
          ];
        }
        break;

      case 'diretta-hot':
        if (type === 'canali') {
          longDescription = `
            <h2>🔴 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Streaming Live Piccanti! 🔥</h2>
            <p>Non perderti un istante di azione con i <strong>canali Telegram di ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>! Qui trovi link e notifiche per sessioni di sesso live, spogliarelli in diretta, e performance erotiche in tempo reale. 🎥</p>
            <p>Cosa offrono questi canali:</p>
            <ul>
              <li>🔗 Link diretti a streaming di sesso live su varie piattaforme.</li>
              <li>⏰ Notifiche quando modelle o performer iniziano una ${subcategoryName.toUpperCase().replace('-', ' ')}.</li>
              <li>🎬 Anteprime o brevi clip da sessioni live in corso o recenti.</li>
              <li>⭐ Focus su interazioni in tempo reale e contenuti esclusivi trasmessi live.</li>
            </ul>
            <p>Se ami l'emozione del live e l'interazione (quando possibile), questi canali ti terranno aggiornato sulle migliori dirette hot del momento. Solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Cosa significa ${subcategoryName.toUpperCase().replace('-', ' ')} in questo contesto? 🤔`, answer: `Si riferisce a trasmissioni video in tempo reale (live streaming) di contenuti erotici o sessualmente espliciti, come show di sesso, spogliarelli, sessioni di masturbazione, ecc.` },
            { question: `Dove avvengono queste ${subcategoryName.toUpperCase().replace('-', ' ')}? Su Telegram?  플랫폼`, answer: `Le dirette vere e proprie avvengono su piattaforme specializzate in live streaming per adulti (es. siti di webcam, OnlyFans Live, etc.). I canali Telegram servono principalmente a condividere i link a queste dirette e a notificarne l'inizio.` },
            { question: `Posso interagire durante una ${subcategoryName.toUpperCase().replace('-', ' ')}? 💬`, answer: `Dipende dalla piattaforma su cui avviene la diretta. Molte piattaforme di webcam permettono l'interazione tramite chat, invio di token o richieste specifiche alla modella/modello.` },
            { question: `Queste dirette hot sono gratuite o a pagamento? 💸`, answer: `Varia molto. Alcune dirette possono avere una parte gratuita di anteprima, altre richiedono token, un abbonamento o un pagamento per l'accesso completo allo show privato o esplicito.` },
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Segnala e Commenta gli Show Live! 🔴</h2>
            <p>Unisciti ai <strong>gruppi Telegram sulla ${subcategoryName.toUpperCase().replace('-', ' ')}</strong> per segnalare quando trovi streaming hot, commentare le performance in diretta, e condividere i tuoi performer preferiti che fanno show live! 🔥</p>
            <p>In questi gruppi potrai:</p>
            <ul>
              <li>🔗 Condividere link a dirette hot che hai scovato (rispettando le regole del gruppo).</li>
              <li>🗣️ Discutere in tempo reale degli show in corso o appena terminati.</li>
              <li>⭐ Segnalare le modelle o i modelli che stanno per andare in ${subcategoryName.toUpperCase().replace('-', ' ')}.</li>
              <li>💬 Connetterti con altri appassionati di contenuti live per adulti.</li>
            </ul>
            <p>Se sei sempre a caccia della prossima ${subcategoryName.toUpperCase().replace('-', ' ')} da non perdere, questi gruppi ti aiuteranno a rimanere sul pezzo. Riservato ai maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Posso condividere link a ${subcategoryName.toUpperCase().replace('-', ' ')} che trovo online? 🤔`, answer: `Sì, molti di questi gruppi sono creati proprio per permettere ai membri di segnalare e condividere link a dirette hot interessanti. Verifica sempre le regole del gruppo sulla condivisione di link.` },
            { question: `Si commentano le dirette mentre sono in corso? 🗣️`, answer: `Assolutamente! È uno degli scopi principali: creare un 'second screen' dove i membri del gruppo possono commentare e discutere ciò che stanno vedendo in una ${subcategoryName.toUpperCase().replace('-', ' ')}.` },
            { question: `Questi gruppi sono affiliati a specifiche piattaforme di ${subcategoryName.toUpperCase().replace('-', ' ')}? 🔗`, answer: `Alcuni potrebbero esserlo, ma molti sono indipendenti e creati dai fan. L'obiettivo è aggregare informazioni su dirette da diverse fonti.` },
            { question: `Cosa faccio se un link a una ${subcategoryName.toUpperCase().replace('-', ' ')} non funziona o è scaduto? 🤷`, answer: `Puoi segnalarlo nel gruppo. Le dirette sono per natura temporanee, quindi i link hanno una validità limitata. La collaborazione tra membri aiuta a mantenere le informazioni aggiornate.` },
          ];
        }
        break;

      case 'esibizionista':
        if (type === 'canali') {
          longDescription = `
            <h2>👀 ${typeName} Telegram ${subcategoryName}: Mostrarsi Senza Inibizioni! 🌍</h2>
            <p>Entra nel mondo dei <strong>canali Telegram ${subcategoryName.toLowerCase()}</strong>, dedicati a chi ama mostrarsi e a chi adora guardare persone che si esibiscono con audacia in pubblico o in contesti inaspettati! 📸</p>
            <p>Cosa troverai:</p>
            <ul>
              <li>🏞️ Foto e video di nudo all'aperto (upskirt, flashing, public nudity).</li>
              <li>🚗 Contenuti audaci in auto, luoghi pubblici, o situazioni rischiose.</li>
              <li>🤫 Momenti di esibizionismo spontaneo catturati in video o foto.</li>
              <li>🔄 Aggiornamenti con nuove avventure esibizioniste.</li>
            </ul>
            <p>Questi canali celebrano la libertà di mostrarsi e il brivido dell'esibizionismo. Se ti eccita l'idea del rischio e dell'audacia, qui troverai pane per i tuoi denti. Solo per maggiorenni e amanti del genere! 🔞</p>
          `;
          faq = [
            { question: `Che tipo di contenuti ${subcategoryName.toLowerCase()} sono presenti? 🤔`, answer: `Variano da flashing (mostrare velocemente parti intime), upskirt/downblouse, a nudo completo in luoghi pubblici o semi-pubblici, a masturbazione all'aperto. L'enfasi è sull'atto di mostrarsi in contesti non convenzionali.` },
            { question: `I contenuti sono reali o recitati?  authenticity`, answer: `Come per molti contenuti amatoriali, può essere un mix. Alcuni canali si focalizzano su presunti atti spontanei, altri potrebbero presentare scene più costruite. L'importante è l'emozione che trasmettono.` },
            { question: `È legale l'esibizionismo? ⚖️`, answer: `Le leggi sull'esibizionismo variano enormemente da paese a paese e sono spesso severe. Questi canali mostrano contenuti a scopo di intrattenimento per adulti; la pratica reale dell'esibizionismo può avere conseguenze legali.` },
            { question: `Ci sono rischi nel guardare questi canali ${subcategoryName.toLowerCase()}? 🚫`, answer: `Il rischio principale è legato all'età (contenuti per adulti). Assicurati che la visualizzazione di tale materiale sia legale nella tua giurisdizione. I contenuti stessi sono generalmente video e foto, quindi i rischi sono simili ad altri canali per adulti.` },
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Condividi le Tue Prodezze Audaci! 🌍</h2>
            <p>Unisciti ai <strong>gruppi Telegram ${subcategoryName.toLowerCase()}</strong> per condividere le tue foto e video di esibizioni audaci, raccontare le tue esperienze, e connetterti con altri amanti del brivido di mostrarsi! 📸</p>
            <p>In questi gruppi puoi:</p>
            <ul>
              <li>🎬 Condividere i tuoi atti di esibizionismo (nel rispetto delle regole e della legalità!).</li>
              <li>🗣️ Discutere di fantasie esibizioniste, luoghi e idee per nuove \"imprese\".</li>
              <li>👀 Ammirare e commentare le audacie degli altri membri.</li>
              <li>🤝 Trovare una community che comprende e apprezza questa particolare forma di espressione erotica.</li>
            </ul>
            <p>Se l'esibizionismo è la tua passione o curiosità, questi gruppi offrono uno spazio (relativamente) sicuro per parlarne e condividere. Ricorda sempre la legalità e il consenso. Solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Posso condividere le mie esperienze ${subcategoryName.toLowerCase()} nei gruppi? 🤔`, answer: `Sì, molti gruppi sono creati per questo. Puoi raccontare storie, condividere foto/video (se le regole lo permettono e sono tuoi/consenso). Sii sempre consapevole delle implicazioni legali dell'esibizionismo reale.` },
            { question: `È sicuro condividere materiale ${subcategoryName.toLowerCase()} personale? 🔒`, answer: `Condividere materiale intimo online, specialmente se legato ad attività potenzialmente illegali come l'esibizionismo in alcuni contesti, comporta rischi significativi. Considera l'anonimato e le possibili conseguenze.` },
            { question: `Questi gruppi incoraggiano atti illegali? 🚫`, answer: `I gruppi responsabili dovrebbero focalizzarsi sulla fantasia, sulla condivisione di contenuti consensuali e sull'aspetto erotico, non sull'incoraggiare atti illegali. Tuttavia, la moderazione varia. Presta attenzione.` },
            { question: `Posso trovare partner per esibizioni ${subcategoryName.toLowerCase()} di coppia? 💞`, answer: `Alcuni membri potrebbero essere interessati. Comunica chiaramente le tue intenzioni e assicurati sempre del consenso e della sicurezza. Molti gruppi sono più per la condivisione di esperienze passate o fantasie.` },
          ];
        }
        break;

      case 'porno':
        if (type === 'canali') {
          longDescription = `
            <h2>🎬 ${typeName} Telegram ${subcategoryName}: Accesso Illimitato al Piacere Estremo! 🌟</h2>
            <p>Benvenuto nel paradiso dei <strong>canali Telegram ${subcategoryName.toUpperCase()}</strong>! La tua destinazione definitiva per un flusso ininterrotto di video XXX, film hard completi, clip da tutte le categorie e generi che puoi immaginare. Preparati a un'esperienza visiva senza censure. 🔥</p>
            <p>Cosa ti offrono questi canali:</p>
            <ul>
              <li>🎞️ Una vasta libreria di film porno completi, dai classici alle ultime uscite.</li>
              <li>🔞 Video XXX con le tue pornostar preferite e nuove scoperte eccitanti.</li>
              <li>🔄 Contenuti aggiornati quotidianamente: nuove scene, nuovi film, nuove categorie.</li>
              <li>🌍 Accesso a generi specifici: dal porno amatoriale all'hardcore, dal BDSM al fetish più estremo.</li>
            </ul>
            <p>Se il porno è la tua passione, questi canali Telegram sono la risorsa più completa e diretta per soddisfare ogni tua fantasia. Unisciti ora per non perderti neanche un minuto di azione! 🔞</p>
          `;
          faq = [
            { question: `Che tipo di contenuti ${subcategoryName.toLowerCase()} trovo in questi canali? 🤔`, answer: `Una vastissima gamma: film porno completi, video XXX di varie durate, clip da siti famosi, compilation tematiche, porno amatoriale, professionale, e tutti i generi possibili (hentai, milf, gangbang, ecc.).` },
            { question: `I video sono in alta qualità? 📀`, answer: `La qualità può variare da canale a canale e da video a video. Molti canali si sforzano di offrire contenuti in HD o comunque di buona qualità visiva e sonora.` },
            { question: `È sicuro scaricare video ${subcategoryName.toLowerCase()} da Telegram? 💻`, answer: `Come per qualsiasi download da internet, usa cautela. Assicurati di avere un buon antivirus. I canali stessi di solito si limitano a condividere file video o link, la sicurezza del tuo dispositivo è tua responsabilità.` },
            { question: `Posso richiedere film o generi specifici? 🗣️`, answer: `Generalmente i canali sono broadcast (solo gli admin postano). Alcuni potrebbero avere gruppi collegati per richieste o discussioni, ma non è la norma per i canali ${subcategoryName.toLowerCase()} principali.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Discuti, Scambia e Scopri Nuovo Materiale! 🌟</h2>
            <p>Entra nei <strong>gruppi Telegram dedicati al ${subcategoryName.toUpperCase()}</strong>! Qui puoi discutere dei tuoi film e attori preferiti, scambiare opinioni, condividere link a video hot (se le regole lo permettono), e scoprire nuove gemme nel vasto universo del ${subcategoryName.toLowerCase()}. 😉</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>🗨️ Chattare con altri appassionati di ${subcategoryName.toLowerCase()}, commentare scene e performance.</li>
              <li>🔗 Condividere link a video, siti o canali ${subcategoryName.toLowerCase()} interessanti.</li>
              <li>⭐ Consigliare e farti consigliare i migliori film e le migliori pornostar.</li>
              <li>🔞 Partecipare a discussioni su generi specifici, novità e tendenze del mondo XXX.</li>
            </ul>
            <p>Se vuoi unirti a una community di amanti del ${subcategoryName.toLowerCase()} per condividere la tua passione e rimanere sempre aggiornato, questi gruppi sono il posto perfetto. Unisciti e partecipa alla conversazione! 🔞</p>
          `;
          faq = [
            { question: `Si possono condividere link a video ${subcategoryName.toLowerCase()} nei gruppi? 🔗`, answer: `Dipende dalle regole specifiche di ogni gruppo. Molti gruppi di discussione sul ${subcategoryName.toLowerCase()} permettono la condivisione di link a contenuti esterni o altri canali Telegram, ma sempre nel rispetto delle policy di Telegram.` },
            { question: `Si parla solo di ${subcategoryName.toLowerCase()} mainstream o anche di nicchie? niche`, answer: `Spesso si trova spazio per entrambi. Ci sono appassionati di ogni genere, quindi le discussioni possono spaziare dal ${subcategoryName.toLowerCase()} più popolare a feticismi e categorie di nicchia. Puoi anche cercare gruppi specifici per i tuoi interessi.` },
            { question: `Posso trovare recensioni o consigli su film ${subcategoryName.toLowerCase()}? 🎬`, answer: `Sì, uno degli scopi di questi gruppi è proprio scambiarsi opinioni, recensioni e consigli su film, attrici/attori, e case di produzione. È un ottimo modo per scoprire nuovo materiale.` },
            { question: `Ci sono regole sulla condivisione di materiale piratato? 🏴‍☠️`, answer: `La condivisione di materiale protetto da copyright è generalmente contro le policy di Telegram e di molti gruppi. Cerca di condividere link a fonti legittime o contenuti amatoriali/indipendenti, se permesso.` }
          ];
        }
        break;

      case 'nudo':
        if (type === 'canali') {
          longDescription = `
            <h2>🖼️ ${typeName} Telegram ${subcategoryName}: Arte, Bellezza e Sensualità al Naturale! ✨</h2>
            <p>Esplora i <strong>canali Telegram dedicati al ${subcategoryName.toUpperCase()}</strong>. Qui troverai una celebrazione del corpo umano nella sua forma più pura e autentica: foto artistiche, nudi amatoriali, modelle e modelli che si mostrano senza veli, in contesti naturali o creativi. 💖</p>
            <p>Cosa ti attende:</p>
            <ul>
              <li>📸 Gallerie di foto di ${subcategoryName.toLowerCase()} artistico e scatti amatoriali di alta qualità.</li>
              <li>🧍‍♀️🧍‍♂️ Modelle e modelli che posano nudi, esaltando la bellezza naturale del corpo.</li>
              <li>🌿 ${subcategoryName.toUpperCase()} in contesti naturali, urbani o intimi, per un'estetica varia e affascinante.</li>
              <li>🔄 Nuovi contenuti regolarmente, per un flusso costante di ispirazione e piacere visivo.</li>
            </ul>
            <p>Se apprezzi l'estetica del ${subcategoryName.toLowerCase()}, la sensualità non volgare e la bellezza del corpo umano, questi canali sono una fonte inesauribile. Unisciti e lasciati incantare! Riservato ai maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Che tipo di ${subcategoryName.toLowerCase()} è presente in questi canali? Artistico o amatoriale? 🤔`, answer: `Entrambi. Molti canali offrono un mix: alcuni si concentrano sul ${subcategoryName.toLowerCase()} artistico con modelli professionisti e fotografia curata, altri presentano nudi amatoriali più spontanei e naturali.` },
            { question: `I contenuti sono espliciti o più soft? 🌶️`, answer: `Generalmente '${subcategoryName.toLowerCase()}' implica l'assenza di abiti, quindi i genitali possono essere visibili. Tuttavia, l'enfasi è spesso più sulla bellezza e la forma che sull'atto sessuale esplicito, distinguendosi da canali 'porno'. Alcuni possono essere più erotici, altri puramente estetici.` },
            { question: `Posso trovare sia uomini che donne nudi? 🚻`, answer: `Sì, molti canali dedicati al ${subcategoryName.toLowerCase()} presentano corpi sia maschili che femminili, o si specializzano in uno dei due. Controlla la descrizione del canale per i dettagli.` },
            { question: `È possibile usare queste foto come ispirazione artistica? 🎨`, answer: `Assolutamente. Molti fotografi, pittori e artisti trovano ispirazione nei canali di ${subcategoryName.toLowerCase()} artistico per i loro lavori. Ricorda sempre di rispettare il copyright se presente.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Condividi la Tua Arte e Discuti di Bellezza! ✨</h2>
            <p>Unisciti ai <strong>gruppi Telegram sul ${subcategoryName.toUpperCase()}</strong>! Spazi dedicati alla condivisione di fotografie di ${subcategoryName.toLowerCase()} (proprie o altrui, con consenso), discussioni sull'arte del ${subcategoryName.toLowerCase()}, la fotografia, e la bellezza del corpo umano in tutte le sue forme. 💖</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>📸 Condividere le tue foto di ${subcategoryName.toLowerCase()} artistico o amatoriale (se sei il soggetto o hai il consenso).</li>
              <li>🗣️ Discutere di tecniche fotografiche, modelli, estetica e significato del ${subcategoryName.toLowerCase()} nell'arte.</li>
              <li>🖼️ Ammirare e commentare i lavori condivisi da altri membri della community.</li>
              <li>🤝 Connetterti con fotografi, modelle/i e appassionati di ${subcategoryName.toLowerCase()} artistico.</li>
            </ul>
            <p>Se il ${subcategoryName.toLowerCase()} è una tua passione, un interesse artistico o un modo per esprimerti, questi gruppi offrono una piattaforma per condividere e discutere. Riservato ai maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Posso postare le mie foto di ${subcategoryName.toLowerCase()} in questi gruppi? 🤳`, answer: `Molti gruppi dedicati al ${subcategoryName.toLowerCase()}, specialmente quelli amatoriali o artistici, permettono ai membri di condividere le proprie foto, purché siano in linea con il tema del gruppo e rispettino le regole (es. consenso, no minori).` },
            { question: `Si parla solo di fotografia o anche di altri aspetti del ${subcategoryName.toLowerCase()}? 🖼️`, answer: `Le discussioni possono essere ampie: dalla fotografia e l'arte, alla filosofia del naturismo, alla body positivity, all'accettazione di sé. Dipende dal focus specifico del gruppo.` },
            { question: `Come posso proteggere la mia privacy se condivido nudi personali? 🔒`, answer: `Sii molto consapevole. Considera di non mostrare il viso o dettagli identificativi. Comprendi che una volta online, il controllo sulla diffusione è limitato. Scegli gruppi con moderazione attiva e regole chiare sulla privacy.` },
            { question: `Questi gruppi sono per incontri o solo per discussione/condivisione? 🧐`, answer: `La maggior parte dei gruppi focalizzati sul '${subcategoryName.toLowerCase()}' sono per la discussione artistica o la condivisione di immagini, non specificamente per incontri. Per quello, cerca gruppi con focus su 'incontri' o 'scambisti'.` }
          ];
        }
        break;

      case 'video-xxx':
        if (type === 'canali') {
          longDescription = `
            <h2>🎞️ ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Azione Hardcore Senza Limiti! 🔞</h2>
            <p>Preparati per un'ondata di adrenalina con i <strong>canali Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>. Qui trovi solo il meglio dell'azione hardcore: clip intense, scene bollenti, e video espliciti che non lasciano nulla all'immaginazione. 💥</p>
            <p>Cosa ti offrono questi canali:</p>
            <ul>
              <li>🔥 Accesso diretto a migliaia di ${subcategoryName.toLowerCase().replace('-', ' ')} gratuiti, aggiornati costantemente.</li>
              <li>🎬 Scene da film porno, produzioni amatoriali, webcam e altro materiale esplicito.</li>
              <li>🌟 Le pornostar più famose e talenti emergenti in performance indimenticabili.</li>
              <li>🔄 Nuovi ${subcategoryName.toLowerCase().replace('-', ' ')} aggiunti ogni giorno per non farti mai annoiare.</li>
            </ul>
            <p>Se cerchi video sessualmente espliciti, senza filtri e pronti da guardare, questi canali Telegram sono la tua fonte primaria. Unisciti ora e che lo spettacolo abbia inizio! Solo per maggiorenni. 😈</p>
          `;
          faq = [
            { question: `Cosa differenzia '${subcategoryName.toUpperCase().replace('-', ' ')}' da 'Porno' o 'Film Porno'? 🤔`, answer: `'${subcategoryName.toUpperCase().replace('-', ' ')}' è un termine generico che si concentra su clip e video sessualmente espliciti di varia durata e provenienza. 'Porno' è più ampio e include film, mentre 'Film Porno' si riferisce specificamente a lungometraggi. I canali '${subcategoryName.toUpperCase().replace('-', ' ')}' sono ottimi per un consumo rapido di contenuti hard.` },
            { question: `La qualità dei ${subcategoryName.toUpperCase().replace('-', ' ')} è buona? 💎`, answer: `Varia. Alcuni canali si specializzano in HD, altri potrebbero avere un mix. Data la quantità, potresti trovare di tutto. Molti canali cercano comunque di offrire la migliore qualità possibile.` },
            { question: `Posso trovare tutti i generi di ${subcategoryName.toUpperCase().replace('-', ' ')}? 🌈`, answer: `Sì, la categoria '${subcategoryName.toUpperCase().replace('-', ' ')}' è molto inclusiva e può comprendere tutti i generi e le nicchie del porno: etero, gay, lesbo, trans, fetish, amatoriale, professionale, ecc.` },
            { question: `Questi canali ${subcategoryName.toUpperCase().replace('-', ' ')} hanno pubblicità invadente? 📢`, answer: `Alcuni canali potrebbero avere pubblicità per sostenersi. Cerca canali con una buona reputazione o quelli che specificano 'no ads' se la pubblicità ti disturba.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Condividi i Tuoi Preferiti e Scoprine di Nuovi! 🔞</h2>
            <p>Entra nei <strong>gruppi Telegram dedicati ai ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>! Il luogo ideale per condividere i link ai tuoi video hard preferiti (nel rispetto delle regole), scoprire nuove clip bollenti segnalate da altri utenti, e discutere delle scene più calde. 💥</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>🔗 Condividere link a ${subcategoryName.toLowerCase().replace('-', ' ')} che hai trovato online o su altri canali.</li>
              <li>🗣️ Discutere delle tue attrici, attori o scene XXX preferite.</li>
              <li>🔥 Ricevere segnalazioni di nuovi video hot dalla community.</li>
              <li>🌟 Chiedere consigli su dove trovare specifici tipi di ${subcategoryName.toLowerCase().replace('-', ' ')}.</li>
            </ul>
            <p>Se sei un avido consumatore di ${subcategoryName.toUpperCase().replace('-', ' ')} e vuoi essere parte di una community che condivide questa passione, questi gruppi sono fatti per te. Unisciti, condividi e divertiti! Solo per maggiorenni. 😈</p>
          `;
          faq = [
            { question: `È permesso condividere link diretti a ${subcategoryName.toUpperCase().replace('-', ' ')} nei gruppi? 🔗`, answer: `Molti gruppi dedicati ai ${subcategoryName.toUpperCase().replace('-', ' ')} nascono proprio per questo scopo. Tuttavia, è fondamentale leggere e rispettare le regole specifiche di ogni gruppo e le policy di Telegram, specialmente riguardo al copyright e ai contenuti illegali.` },
            { question: `Posso richiedere specifici ${subcategoryName.toUpperCase().replace('-', ' ')} o generi? 🙏`, answer: `Sì, spesso i membri dei gruppi sono disponibili ad aiutare a trovare video specifici o a consigliare contenuti basati sui tuoi gusti. La community è lì per condividere!` },
            { question: `Come si evitano link a virus o malware? 🛡️`, answer: `Sii cauto. Preferisci link da fonti conosciute o utenti affidabili nel gruppo. Evita di cliccare su link abbreviati sospetti o che richiedono download di eseguibili. Un buon antivirus è sempre consigliato.` },
            { question: `Ci sono discussioni oltre alla semplice condivisione di link? 🗨️`, answer: `Sì, molti gruppi offrono anche spazio per discutere dei video, commentare le performance, parlare di attori/attrici, e in generale socializzare con altri appassionati di contenuti XXX.` }
          ];
        }
        break;

      case 'film-porno':
        if (type === 'canali') {
          longDescription = `
            <h2>🍿 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Intere Pellicole Hard a Portata di Click! 🎬</h2>
            <p>Immergiti nelle trame più audaci con i <strong>canali Telegram dedicati ai ${subcategoryName.toUpperCase().replace('-', ' ')} completi</strong>. Qui puoi trovare e guardare intere produzioni cinematografiche a luci rosse, dai classici intramontabili alle novità più piccanti del settore. 🎞️</p>
            <p>Cosa troverai in questi canali:</p>
            <ul>
              <li>🎥 Una vasta selezione di ${subcategoryName.toLowerCase().replace('-', ' ')} completi, pronti per lo streaming o il download.</li>
              <li>🌟 Pellicole con le più grandi stelle del cinema hard e nuove promettenti leve.</li>
              <li>🎭 Vari generi e trame: parodie porno, film con una narrativa sviluppata, produzioni ad alto budget.</li>
              <li>🔄 Nuovi film aggiunti regolarmente per arricchire la tua collezione.</li>
            </ul>
            <p>Se preferisci un'esperienza porno più strutturata e cinematografica, questi canali sono la tua cineteca hard personale. Unisciti e goditi lo spettacolo, dall'inizio alla fine! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Che differenza c'è tra canali '${subcategoryName.toUpperCase().replace('-', ' ')}' e canali 'Video XXX'? 🤔`, answer: `I canali '${subcategoryName.toUpperCase().replace('-', ' ')}' si concentrano sulla condivisione di pellicole complete, con una trama (più o meno sviluppata) e una durata cinematografica. I canali 'Video XXX' offrono principalmente clip e scene più brevi, senza necessarily una struttura narrativa.` },
            { question: `I ${subcategoryName.toLowerCase().replace('-', ' ')} sono in lingua italiana o sottotitolati? 🇮🇹`, answer: `Dipende dal canale e dalla provenienza del film. Puoi trovare film in lingua originale (spesso inglese), doppiati in italiano, o con sottotitoli. Alcuni canali si specializzano in contenuti italiani o tradotti.` },
            { question: `La qualità dei film è buona (HD, streaming fluido)? 🎞️`, answer: `Molti canali cercano di offrire film in buona qualità, spesso HD. La fluidità dello streaming può dipendere dalla tua connessione e dal server da cui il file è ospitato o condiviso su Telegram.` },
            { question: `È legale guardare ${subcategoryName.toLowerCase().replace('-', ' ')} da questi canali Telegram? ⚖️`, answer: `Guardare porno è legale per i maggiorenni nella maggior parte dei paesi. Tuttavia, scaricare o distribuire materiale protetto da copyright senza autorizzazione può essere illegale. Sii consapevole delle leggi del tuo paese.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Recensioni, Consigli e Dibattiti Cinematografici! 🎬</h2>
            <p>Unisciti ai <strong>gruppi Telegram dedicati ai ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>! Lo spazio ideale per cinefili a luci rosse: discuti delle tue pellicole hard preferite, scrivi recensioni, chiedi consigli, e scopri i capolavori (o i trash) del cinema porno. 🍿</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>🗣️ Discutere di trame, attori, registi e case di produzione del cinema porno.</li>
              <li>⭐ Scrivere e leggere recensioni di ${subcategoryName.toLowerCase().replace('-', ' ')}.</li>
              <li>🤔 Chiedere consigli su quali film vedere in base ai tuoi gusti.</li>
              <li>🔗 Condividere link a trailer, interviste o articoli sul mondo del cinema hard (se permesso).</li>
            </ul>
            <p>Se per te il porno non è solo azione ma anche un'esperienza cinematografica, unisciti a questi gruppi per condividere la tua passione con altri intenditori. Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Si possono trovare link per scaricare ${subcategoryName.toLowerCase().replace('-', ' ')} completi nei gruppi? 🔗`, answer: `Alcuni gruppi potrebbero permettere la condivisione di link a film (spesso ospitati su altri canali o piattaforme), ma fai sempre attenzione alle regole del gruppo e alle implicazioni del copyright.` },
            { question: `Le discussioni sono serie o più goliardiche? 🧐`, answer: `Può esserci un mix! Alcuni gruppi sono più focalizzati su analisi quasi 'critiche', altri sono più per commenti divertenti e scambi di battute. Trova il gruppo che si adatta al tuo stile.` },
            { question: `Posso trovare informazioni su festival o premi del cinema porno? 🏆`, answer: `Sì, i membri più appassionati spesso condividono notizie su eventi del settore, premiazioni (come gli AVN Awards), e le ultime tendenze del cinema per adulti.` },
            { question: `Come scopro nuovi ${subcategoryName.toLowerCase().replace('-', ' ')} da vedere tramite questi gruppi? 🕵️‍♂️`, answer: `Chiedi consigli! Specifica i tuoi generi o attori/attrici preferiti e la community sarà felice di suggerirti titoli che potrebbero piacerti. Molti utenti condividono anche le loro scoperte recenti.` }
          ];
        }
        break;

      case 'live-sesso':
        if (type === 'canali') {
          longDescription = `
            <h2>🔴 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Streaming Erotici in Tempo Reale! 섹스</h2>
            <p>Non perderti un istante di passione con i <strong>canali Telegram dedicati al ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>! Qui troverai link, notifiche e anteprime di sessioni di sesso in diretta, performance interattive e spettacoli erotici trasmessi in tempo reale da performer da tutto il mondo. 🌶️</p>
            <p>Cosa ti offrono questi canali:</p>
            <ul>
              <li>📡 Link diretti a piattaforme di streaming per adulti con show di sesso live.</li>
              <li>🔔 Notifiche push quando i tuoi performer preferiti o nuove scoperte iniziano una sessione live.</li>
              <li>🎬 Brevi clip o anteprime da dirette recenti o in corso, per darti un assaggio dell'azione.</li>
              <li>⭐ Un focus sull'esperienza del sesso dal vivo, con l'emozione dell'interazione in tempo reale (ove possibile).</li>
            </ul>
            <p>Se ami il brivido dell'imprevisto e la connessione diretta con i performer, questi canali ti terranno costantemente aggiornato sulle migliori opportunità di ${subcategoryName.toLowerCase().replace('-', ' ')}. Preparati a un'esperienza immersiva! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa si intende esattamente per '${subcategoryName.toUpperCase().replace('-', ' ')}'? 🤔`, answer: "Si riferisce a trasmissioni video in streaming e in tempo reale di atti sessuali, performance erotiche, spogliarelli, o sessioni di masturbazione. L'elemento chiave è che sta accadendo 'adesso'." },
            { question: `Dove avvengono effettivamente queste sessioni di ${subcategoryName.toUpperCase().replace('-', ' ')}? Su Telegram? 📍`, answer: "No, Telegram è principalmente un aggregatore di link e notifiche. Le sessioni di live sesso avvengono su piattaforme di webcam specializzate, siti per adulti con funzionalità live, o app di streaming che lo consentono." },
            { question: `Posso interagire con i performer durante il ${subcategoryName.toUpperCase().replace('-', ' ')}? 💬`, answer: "Dipende dalla piattaforma ospitante. Molte piattaforme di webcam permettono l'interazione tramite chat testuale, invio di 'mance' o token per richieste speciali, o addirittura sessioni private a due vie." },
            { question: `Il ${subcategoryName.toUpperCase().replace('-', ' ')} è gratuito o a pagamento? 💸`, answer: "Esiste un'ampia varietà. Alcuni performer offrono anteprime gratuite per attirare spettatori, mentre per accedere allo show completo, a contenuti più espliciti, o a interazioni private è solitamente richiesto un pagamento (token, abbonamento, tariffa al minuto)." }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Segnalazioni, Commenti e Community! 🗣️</h2>
            <p>Unisciti ai <strong>gruppi Telegram dedicati al ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>! Condividi i link alle dirette più calde che trovi, commenta le performance in tempo reale con altri appassionati, e scopri nuovi performer e piattaforme per non perderti neanche uno show. 🔥</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>🔗 Segnalare e condividere link a sessioni di sesso live (rispettando le regole del gruppo).</li>
              <li>🗣️ Discutere in diretta degli show, commentare le azioni dei performer e le interazioni.</li>
              <li>⭐ Consigliare o chiedere informazioni su specifici modelli/modelle o piattaforme di ${subcategoryName.toLowerCase().replace('-', ' ')}.</li>
              <li>🔔 Ricevere avvisi dalla community su dirette imperdibili o performer che stanno per andare online.</li>
            </ul>
            <p>Se sei un cacciatore di emozioni live e vuoi essere sempre aggiornato sulle ultime sessioni di sesso in diretta, questi gruppi sono la tua risorsa collaborativa. Unisciti alla discussione! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Posso postare link a sessioni di ${subcategoryName.toUpperCase().replace('-', ' ')} che scopro? 📡`, answer: "Sì, questo è spesso lo scopo principale di tali gruppi. Assicurati di rispettare le regole del gruppo (es. no spam, link solo a piattaforme legittime) e le policy di Telegram." },
            { question: `Si commentano gli show di ${subcategoryName.toUpperCase().replace('-', ' ')} mentre sono in onda? 📢`, answer: "Certamente! Molti utenti usano questi gruppi come 'second screen' per commentare in tempo reale, condividere screenshot (se permesso) e discutere con altri spettatori." },
            { question: `Come faccio a sapere se un link a un ${subcategoryName.toUpperCase().replace('-', ' ')} è affidabile? ✅`, answer: "Presta attenzione ai link condivisi da utenti noti o moderatori. Sii cauto con link da fonti sconosciute o che sembrano sospetti. Le piattaforme di webcam più famose sono generalmente più sicure." },
            { question: `Questi gruppi aiutano a trovare anche ${subcategoryName.toUpperCase().replace('-', ' ')} gratuiti? 🆓`, answer: "Sì, i membri spesso segnalano anche sessioni gratuite, anteprime o offerte speciali. Tuttavia, per contenuti esclusivi o interazioni private, è probabile che sia richiesto un pagamento sulla piattaforma di streaming." }
          ];
        }
        break;

      case 'leaks':
        if (type === 'canali') {
          longDescription = `
            <h2>💧 ${typeName} Telegram ${subcategoryName.toUpperCase()}: Contenuti Esclusivi Trapelati! 🤫</h2>
            <p>Esplora il mondo controverso dei <strong>canali Telegram ${subcategoryName.toUpperCase()}</strong>. Qui potresti trovare contenuti privati, foto e video intimi, materiale da OnlyFans o altre piattaforme a pagamento, che sono stati resi pubblici senza il consenso originale o trapelati online. 🌊</p>
            <p>Cosa potresti trovare (con cautela):</p>
            <ul>
              <li>📸 Foto e video privati di celebrità, influencer o persone comuni, trapelati online.</li>
              <li>💦 Contenuti esclusivi da piattaforme come OnlyFans, Patreon, resi accessibili gratuitamente.</li>
              <li>📂 Archivi di materiale "rubato" o condiviso senza permesso.</li>
              <li>🔄 Aggiornamenti frequenti con nuovo materiale leakato.</li>
            </ul>
            <p><strong>Attenzione:</strong> La natura di questi canali è spesso eticamente discutibile e può comportare la visualizzazione di materiale condiviso senza consenso. Naviga con consapevolezza e rispetto per la privacy altrui. Solo per maggiorenni e con estrema cautela. ⚖️</p>
          `;
          faq = [
            { question: `Cosa sono esattamente i '${subcategoryName.toUpperCase()}' in questo contesto? 🤔`, answer: "Si riferisce a contenuti intimi (foto, video, messaggi) originariamente privati o destinati a un pubblico pagante (es. OnlyFans), che vengono diffusi pubblicamente senza il consenso della persona coinvolta o del creatore." },
            { question: `È legale visualizzare contenuti '${subcategoryName.toUpperCase()}'? ⚖️`, answer: "Le leggi variano. Visualizzare potrebbe non essere illegale ovunque, ma distribuire o possedere certi tipi di 'leaks' (es. revenge porn, materiale di minori) è severamente illegale e dannoso. La produzione e diffusione iniziale di leaks non consensuali è quasi sempre illegale ed eticamente sbagliata." },
            { question: `Il materiale nei canali ${subcategoryName.toUpperCase()} è verificato? Authenticity`, answer: "Spesso no. C'è molta disinformazione, fake, o materiale decontestualizzato. Non tutto ciò che viene etichettato come 'leak' è autentico o realmente esclusivo." },
            { question: `Quali sono i rischi nel frequentare canali ${subcategoryName.toUpperCase()}? 🚫`, answer: "Oltre alle questioni etiche e legali, potresti esporti a malware se scarichi file, o essere coinvolto in attività di cyberbullismo o violazione della privacy. Rifletti attentamente prima di accedere a tali contenuti." }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase()}: Discussioni su Contenuti Trapelati (CON CAUTELA!) 🤫</h2>
            <p>Unisciti ai <strong>gruppi Telegram dedicati ai ${subcategoryName.toUpperCase()}</strong> (se scegli di farlo con consapevolezza dei rischi e delle implicazioni etiche). Questi spazi sono spesso usati per discutere di contenuti trapelati, condividere link a canali leaks, o richiedere materiale specifico. 🌊</p>
            <p>Cosa avviene in questi gruppi (spesso controverso):</p>
            <ul>
              <li>🔗 Condivisione di link a canali Telegram che pubblicano ${subcategoryName.toLowerCase()}.</li>
              <li>🗣️ Discussioni su celebrità o influencer i cui contenuti privati sono stati diffusi.</li>
              <li>❓ Richieste di specifici ${subcategoryName.toLowerCase()} o materiale "esclusivo".</li>
              <li>💬 Scambio di opinioni sull'autenticità e la provenienza dei ${subcategoryName.toLowerCase()}.</li>
            </ul>
            <p><strong>Disclaimer:</strong> La partecipazione a questi gruppi può avere implicazioni etiche e legali. Condividere o richiedere materiale non consensuale è sbagliato e può essere illegale. Procedi con estrema cautela e responsabilità. 🔞</p>
          `;
          faq = [
            { question: `Si possono condividere link a materiale leakato nei gruppi? 🔗`, answer: "Spesso sì, è uno degli scopi principali di questi gruppi. Tuttavia, Telegram sta diventando più severo contro la diffusione di materiale non consensuale e illegale. Molti di questi gruppi vengono chiusi." },
            { question: `È possibile richiedere ${subcategoryName.toLowerCase()} specifici di persone? 🙏`, answer: "Sì, le richieste sono comuni in questi gruppi, ma ciò solleva serie questioni etiche sulla violazione della privacy e sul potenziale danno alle persone coinvolte. È una pratica altamente sconsigliata." },
            { question: `Come si verifica se un ${subcategoryName.toLowerCase()} è autentico prima di condividerlo o cercarlo? ✅`, answer: "È molto difficile. La disinformazione è rampante. Molti 'leaks' sono falsi, vecchi, o decontestualizzati. Non fidarti ciecamente di ciò che trovi." },
            { question: `Quali sono le alternative etiche alla ricerca di ${subcategoryName.toLowerCase()}? 🤔`, answer: "Supporta i creatori di contenuti direttamente sulle loro piattaforme ufficiali (OnlyFans, Patreon, ecc.). Rispetta la privacy delle persone e non partecipare alla diffusione di materiale non consensuale. Ci sono molti contenuti per adulti prodotti eticamente." }
          ];
        }
        break;

      case 'nudi': // Plurale
        if (type === 'canali') {
          longDescription = `
            <h2>🧑‍🤝‍🧑 ${typeName} Telegram ${subcategoryName.toUpperCase()}: Gallerie Infinite di Corpi al Naturale! 🍑🍆</h2>
            <p>Tuffati nei <strong>canali Telegram ${subcategoryName.toUpperCase()}</strong>, dove troverai una moltitudine di foto e video di persone comuni, ragazze e ragazzi della porta accanto, che si mostrano senza veli. Un flusso continuo di corpi autentici in tutta la loro diversità. 📸</p>
            <p>Cosa ti aspetta:</p>
            <ul>
              <li>🖼️ Vaste raccolte di foto e brevi video di ${subcategoryName.toLowerCase()} amatoriali e selfie.</li>
              <li>👩‍🦰👨‍🦱 Persone di ogni tipo: giovani, maturi, curvy, magri, tatuati, naturali.</li>
              <li>🌍 Contenuti da utenti di tutto il mondo che condividono la loro nudità.</li>
              <li>🔄 Aggiornamenti costanti con sempre nuovi ${subcategoryName.toLowerCase()} da scoprire.</li>
            </ul>
            <p>Se ti piace vedere corpi reali e apprezzi la varietà della bellezza umana senza filtri, questi canali di ${subcategoryName.toLowerCase()} sono una miniera d'oro. Unisciti per una dose quotidiana di autenticità! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Che differenza c'è tra '${subcategoryName.toUpperCase()}' (plurale) e 'Nudo' (singolare)? 🤔`, answer: `I canali '${subcategoryName.toUpperCase()}' (plurale) tendono a offrire una grande quantità e varietà di foto/video di molte persone diverse, spesso amatoriali e selfie. 'Nudo' (singolare) può avere un focus più artistico o su singole modelle/modelli, con una maggiore cura estetica.` },
            { question: `I contenuti sono principalmente foto o anche video? 📹`, answer: "Solitamente un mix, con una prevalenza di fotografie e brevi clip video o GIF. L'obiettivo è mostrare rapidamente e in quantità." },
            { question: `Le persone nei canali '${subcategoryName.toUpperCase()}' sono consapevoli di essere lì? ✅`, answer: "Si spera di sì. Molti canali aggregano contenuti che le persone hanno condiviso volontariamente online (es. su Reddit, Twitter, ecc.). Tuttavia, il rischio di materiale non consensuale esiste sempre, specialmente con contenuti amatoriali." },
            { question: `Posso trovare ${subcategoryName.toLowerCase()} di specifici tipi di corpo o etnie? 🎯`, answer: "Data la grande quantità, è probabile trovare una vasta diversità. Alcuni canali '${subcategoryName.toUpperCase()}' potrebbero anche avere tag o specializzazioni per aiutare a trovare ciò che cerchi, ma spesso sono raccolte generaliste." }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase()}: Condividi i Tuoi Scatti e Ammira gli Altri! 📸</h2>
            <p>Entra nei <strong>gruppi Telegram ${subcategoryName.toUpperCase()}</strong>! Spazi dedicati alla condivisione libera e consensuale di foto e video di nudo amatoriale. Mostra te stesso/a (se ti va e nel rispetto delle regole) o semplicemente ammira e chatta con altri membri che apprezzano la nudità. 🧑‍🤝‍🧑</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>🤳 Condividere le tue foto o video di nudo (consenso e regole del gruppo sono fondamentali!).</li>
              <li>👀 Guardare e commentare i ${subcategoryName.toLowerCase()} condivisi dagli altri membri.</li>
              <li>🗣️ Chattare con persone a cui piace mostrarsi o ammirare la nudità in un ambiente rilassato.</li>
              <li>👍 Dare e ricevere apprezzamenti per i contenuti condivisi.</li>
            </ul>
            <p>Se ti senti a tuo agio con la tua nudità o ti piace vedere quella altrui in un contesto di community e condivisione, questi gruppi sono per te. Ricorda: consenso, rispetto e solo maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Posso postare i miei ${subcategoryName.toLowerCase()} in questi gruppi? E quelli di amici/partner? 🤔`, answer: "Puoi postare i tuoi nudi se ti senti a tuo agio e il gruppo lo permette. Per nudi di altre persone (amici, partner), DEVI avere il loro esplicito consenso prima di condividere. La condivisione non consensuale è una violazione grave." },
            { question: `Questi gruppi sono sicuri per la privacy? 🔒`, answer: "Condividere nudi online comporta sempre dei rischi per la privacy. Scegli gruppi con moderazione attiva e regole chiare. Considera di non mostrare il viso o dettagli identificativi se vuoi più anonimato. Ciò che condividi può essere salvato e ridistribuito da altri." },
            { question: `Ci sono solo ${subcategoryName.toLowerCase()} amatoriali o anche professionisti? 🤷`, answer: `I gruppi '${subcategoryName.toUpperCase()}' sono prevalentemente focalizzati su contenuti amatoriali e selfie di utenti comuni. Per nudi professionali o artistici, cerca gruppi specifici per 'nudo artistico' o 'modelle/i'.` },
            { question: `Si possono organizzare scambi di ${subcategoryName.toLowerCase()} privati o incontri? 💌`, answer: "Alcuni gruppi potrebbero tollerarlo o incoraggiarlo, altri no. Controlla le regole. Se interagisci privatamente, fallo con cautela e rispetto, assicurandoti sempre del consenso reciproco per qualsiasi scambio o incontro." }
          ];
        }
        break;

      case 'troia':
        if (type === 'canali') {
          longDescription = `
            <h2>🫦 ${typeName} Telegram ${subcategoryName.toUpperCase()}: Donne Audaci e Senza Inibizioni! 👠</h2>
            <p>Esplora i <strong>canali Telegram ${subcategoryName.toUpperCase()}</strong>, dedicati a donne che esprimono la loro sessualità in modo sfacciato, provocante e totalmente disinibito. Qui troverai contenuti che celebrano la figura della donna audace, che gode del sesso e non ha paura di mostrarlo. 🔥</p>
            <p>Cosa ti aspetta:</p>
            <ul>
              <li>🎬 Video e foto di donne che si definiscono o vengono percepite come '${subcategoryName.toLowerCase()}', in atteggiamenti provocanti ed espliciti.</li>
              <li>💋 Contenuti che sfidano i tabù e celebrano una sessualità femminile libera e aggressiva.</li>
              <li>😈 Performance audaci, auto-filmati, e scene che esaltano il piacere femminile senza filtri.</li>
              <li>🔄 Nuovi post con donne sempre pronte a scandalizzare e sedurre.</li>
            </ul>
            <p>Questi canali sono per chi apprezza una femminilità forte, sfrontata e sessualmente emancipata. Se ti eccita questo tipo di attitudine, preparati a contenuti intensi. Solo per maggiorenni e per un pubblico consapevole. 🔞</p>
          `;
          faq = [
            { question: `Cosa si intende con il termine '${subcategoryName.toUpperCase()}' in questi canali? 🤔`, answer: "Il termine, spesso usato in modo dispregiativo, in questo contesto viene riappropriato per descrivere donne sessualmente libere, audaci, provocanti, che godono della propria sessualità e non temono il giudizio. L'enfasi è sulla sfrontatezza e la disinibizione." },
            { question: `Il contenuto è reale o recitato? 🎭`, answer: "Può essere un mix. Alcuni canali presentano contenuti amatoriali di donne che si identificano con questa etichetta, altri materiale da produzioni professionali o semi-professionali che interpretano questo 'ruolo'." },
            { question: `Questi canali promuovono il rispetto per le donne? 🧐`, answer: "È un tema complesso. Alcuni vedono questi canali come una forma di emancipazione sessuale femminile, altri potrebbero trovarli degradanti. L'importante è che il contenuto sia consensuale e che gli spettatori mantengano un atteggiamento di rispetto, al di là delle etichette." },
            { question: `Si trovano solo donne o anche altri generi? 🚻`, answer: "Generalmente, i canali con questa etichetta si concentrano su donne cisgender. Tuttavia, il panorama di Telegram è vasto e potrebbero esistere variazioni." }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase()}: Discussioni Libere e Audaci sulla Sessualità! 👠</h2>
            <p>Entra nei <strong>gruppi Telegram ${subcategoryName.toUpperCase()}</strong>, spazi di discussione dove si parla di sessualità femminile libera, sfrontatezza, e dove le donne (e chi le apprezza) possono esprimersi senza filtri e senza timore del giudizio. 🔥</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>🗣️ Discutere apertamente di sesso, fantasie, e del ruolo della donna '${subcategoryName.toLowerCase()}' nella società e nell'immaginario erotico.</li>
              <li>💋 Condividere storie, esperienze o contenuti (foto/video, se permesso dalle regole e consensuali) che incarnano questa attitudine.</li>
              <li>😈 Connetterti con donne che si sentono sessualmente libere e uomini che le ammirano.</li>
              <li>🔥 Esplorare la sessualità senza tabù in una community che apprezza l'audacia.</li>
            </ul>
            <p>Questi gruppi sono per chi cerca un confronto aperto sulla sessualità femminile più disinibita e per chi vuole celebrare questo aspetto senza pregiudizi. Rispetto e consenso sono fondamentali. Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Chi frequenta i gruppi Telegram '${subcategoryName.toUpperCase()}'? Donne, uomini, entrambi? 🚻`, answer: "Solitamente entrambi. Donne che si identificano con una sessualità libera e audace, e uomini che sono attratti da questo tipo di donna o che vogliono partecipare a discussioni aperte sul sesso." },
            { question: `Si possono condividere foto/video personali in questi gruppi? 🤳`, answer: "Dipende strettamente dalle regole del singolo gruppo. Alcuni potrebbero permetterlo se i contenuti sono consensuali e in tema, altri potrebbero essere solo per discussione. Leggi sempre il regolamento." },
            { question: `Le discussioni sono rispettose o c'è rischio di slut-shaming? 🧐`, answer: "Idealmente, questi gruppi dovrebbero essere spazi sicuri per l'espressione sessuale. Tuttavia, la qualità della moderazione varia. Scegli gruppi con una buona reputazione e non esitare a lasciare quelli dove non ti senti a tuo agio o rispettato/a." },
            { question: `Questi gruppi sono per incontri o solo per chat? 💌`, answer: "Possono essere per entrambi, o nessuno dei due. Alcuni membri potrebbero essere interessati a incontri, altri solo a chattare e discutere. Comunica chiaramente le tue intenzioni e assicurati del consenso altrui." }
          ];
        }
        break;

      case 'scopata':
        if (type === 'canali') {
          longDescription = `
            <h2>💞 ${typeName} Telegram ${subcategoryName.toUpperCase()}: Azione Intensa e Momenti di Passione! 🔥</h2>
            <p>Benvenuto nei <strong>canali Telegram dedicati alla ${subcategoryName.toUpperCase()}</strong>! Qui troverai video e clip che celebrano l'atto sessuale nella sua forma più diretta e passionale. Scene di sesso intenso, coppie che si godono il momento, e puro piacere carnale. 💦</p>
            <p>Cosa ti offrono questi canali:</p>
            <ul>
              <li>🎬 Video espliciti di ${subcategoryName.toLowerCase()} reali o simulate con grande realismo.</li>
              <li>👩‍❤️‍💋‍👨 Coppie amatoriali e professionisti in momenti di intimità e passione travolgente.</li>
              <li>🌶️ Diverse posizioni, intensità e contesti per soddisfare ogni curiosità.</li>
              <li>🔄 Nuovi contenuti aggiunti regolarmente per non farti mancare l'azione.</li>
            </ul>
            <p>Se cerchi l'essenza pura dell'atto sessuale, senza troppi fronzoli ma con tanta passione, questi canali sono la tua destinazione. Preparati a scene che scaldano l'atmosfera! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa si intende esattamente con '${subcategoryName.toUpperCase()}' in questi canali? 🤔`, answer: "Si riferisce a contenuti video focalizzati sull'atto sessuale (penetrazione), mostrando l'azione in modo esplicito e diretto. L'enfasi è sulla passione, l'intensità e il piacere fisico del rapporto." },
            { question: `I video sono amatoriali o professionali? amateur vs pro`, answer: "Puoi trovare entrambi. Alcuni canali si concentrano su ${subcategoryName.toLowerCase()} amatoriali, che offrono un senso di realismo e spontaneità, altri presentano scene da produzioni porno professionali con attori e attrici." },
            { question: `Che tipo di coppie o persone sono presenti? 💑`, answer: "Una grande varietà: coppie eterosessuali, omosessuali, giovani, mature, di diverse etnie e tipi di corpo. L'obiettivo è mostrare la diversità dell'esperienza sessuale." },
            { question: `I contenuti sono molto espliciti? 🌶️`, answer: `Sì, per definizione i canali '${subcategoryName.toUpperCase()}' presentano contenuti sessualmente espliciti, con nudo integrale e atti sessuali dettagliati. Sono destinati a un pubblico adulto e consapevole.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase()}: Racconti, Consigli e Fantasie Bollenti! 🔥</h2>
            <p>Entra nei <strong>gruppi Telegram dedicati alla ${subcategoryName.toUpperCase()}</strong>! Qui puoi condividere racconti delle tue esperienze sessuali più memorabili, scambiare consigli su come migliorare l'intesa a letto, discutere di fantasie e, se il gruppo lo permette, conoscere persone per avventure piccanti. 💦</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>✍️ Raccontare le tue storie di sesso, le ${subcategoryName.toLowerCase()} più eccitanti o divertenti.</li>
              <li>💡 Scambiare consigli su tecniche, posizioni, o come accendere la passione.</li>
              <li>💭 Discutere di fantasie sessuali in un ambiente aperto e senza giudizi.</li>
              <li>💞 Connetterti con persone che hanno i tuoi stessi interessi (per chat o incontri, seguendo le regole).</li>
            </ul>
            <p>Se il sesso e le ${subcategoryName.toLowerCase()} sono un argomento che ti appassiona e di cui vuoi parlare liberamente, questi gruppi offrono la piattaforma ideale. Rispetto e consenso prima di tutto! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Posso raccontare le mie esperienze di ${subcategoryName.toLowerCase()} in questi gruppi? 📝`, answer: "Assolutamente! Molti di questi gruppi sono creati apposta per permettere ai membri di condividere anonimamente (o meno) i loro racconti erotici e le loro esperienze sessuali più intense." },
            { question: `Si possono scambiare foto o video di ${subcategoryName.toLowerCase()} amatoriali? 📸`, answer: "Dipende dalle regole del gruppo. Alcuni gruppi lo permettono, specialmente se il materiale è proprio e consensuale, altri sono più focalizzati sui racconti e le discussioni. Leggi sempre il regolamento." },
            { question: `Questi gruppi sono utili per trovare partner per una ${subcategoryName.toLowerCase()}? 💑`, answer: "Alcuni gruppi potrebbero avere un orientamento agli incontri, ma non è sempre così. Sii chiaro/a sulle tue intenzioni e rispetta quelle altrui. Cerca gruppi specifici per 'incontri' o 'scopamici' se quello è il tuo obiettivo primario." },
            { question: `Come si mantiene un ambiente rispettoso in questi gruppi? ✅`, answer: "Evita giudizi, commenti volgari non richiesti e rispetta le esperienze e le fantasie altrui. Il consenso è fondamentale in ogni interazione, anche solo testuale. Contribuisci a creare uno spazio sicuro per tutti." }
          ];
        }
        break;

      case 'incontro-hot':
        if (type === 'canali') {
          longDescription = `
            <h2>🥂 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-',' ')}: Annunci e Opportunità Piccanti! 🔥</h2>
            <p>Esplora i <strong>canali Telegram per ${subcategoryName.toUpperCase().replace('-',' ')}</strong>! Questi canali sono bacheche di annunci e proposte per chi cerca compagnia per momenti di passione, avventure occasionali o relazioni più spinte. Trova persone nella tua zona o disposte a viaggiare per un ${subcategoryName.toLowerCase().replace('-',' ')} indimenticabile. 💌</p>
            <p>Cosa potresti trovare:</p>
            <ul>
              <li>🗣️ Annunci di uomini, donne e coppie in cerca di partner per ${subcategoryName.toLowerCase().replace('-',' ')}.</li>
              <li>📍 Filtri per regione o città per facilitare la ricerca di ${subcategoryName.toLowerCase().replace('-',' ')} locali.</li>
              <li>💌 Proposte per serate piccanti, scambi di coppia, sesso occasionale e altro.</li>
              <li>🔄 Nuovi annunci pubblicati regolarmente da utenti verificati (si spera) o dalla community.</li>
            </ul>
            <p>Se sei alla ricerca di emozioni reali e vuoi trasformare le fantasie in realtà, questi canali possono essere un punto di partenza. <strong>Procedi sempre con la massima cautela e sicurezza negli incontri reali.</strong> Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Come funzionano i canali Telegram per ${subcategoryName.toUpperCase().replace('-',' ')}? 🤔`, answer: "Solitamente fungono da bacheche: gli utenti (o gli admin per loro conto) pubblicano annunci con descrizioni, preferenze, e talvolta foto (spesso coperte o generiche). Chi è interessato contatta privatamente." },
            { question: `Questi canali sono sicuri per organizzare incontri? 🛡️`, answer: "NESSUN canale può garantire la sicurezza al 100%. La responsabilità finale è TUA. Sii ESTREMAMENTE cauto/a. Verifica l'identità, incontra in luoghi pubblici la prima volta, informa qualcuno di fiducia. Non fidarti ciecamente." },
            { question: `Gli annunci sono verificati? O ci sono profili falsi? authentic`, answer: "È molto difficile verificare tutti gli annunci. Il rischio di profili falsi, truffatori o persone con cattive intenzioni è SEMPRE presente. Usa il buon senso e non condividere informazioni troppo personali o denaro." },
            { question: `Posso pubblicare il mio annuncio per un ${subcategoryName.toLowerCase().replace('-',' ')}? 📢`, answer: "Dipende dal canale. Alcuni permettono agli utenti di inviare annunci agli admin per la pubblicazione, altri sono gestiti in modo più chiuso. Controlla le regole specifiche del canale." }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-',' ')}: Chatta, Conosci e Organizza! 🔥</h2>
            <p>Unisciti ai <strong>gruppi Telegram per ${subcategoryName.toUpperCase().replace('-',' ')}</strong>! Qui puoi chattare con persone interessate a incontri piccanti, discutere di preferenze, scambiare contatti (con cautela!) e magari organizzare uscite o serate bollenti. 🥂</p>
            <p>Cosa puoi fare in questi gruppi:</p>
            <ul>
              <li>💬 Chattare con altri single o coppie in cerca di avventure.</li>
              <li>💌 Scambiare messaggi privati per conoscersi meglio prima di un eventuale incontro.</li>
              <li>🗣️ Discutere di luoghi, idee per appuntamenti hot, o precauzioni da prendere.</li>
              <li>🎉 Partecipare a discussioni di gruppo per rompere il ghiaccio e trovare persone affini.</li>
            </ul>
            <p>Questi gruppi possono facilitare la conoscenza di persone con i tuoi stessi desideri. Ricorda sempre: <strong>la sicurezza prima di tutto! Incontra persone nuove con estrema prudenza.</strong> Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `È più sicuro cercare ${subcategoryName.toLowerCase().replace('-',' ')} tramite gruppi o canali? 🤔`, answer: "Entrambi presentano rischi. Nei gruppi puoi interagire di più prima di scambiare contatti privati, il che potrebbe darti un'idea migliore della persona. Ma la cautela è d'obbligo in ogni caso." },
            { question: `Come posso verificare l'identità di una persona prima di un incontro? ✅`, answer: "Chiedi una videochiamata breve, cerca i loro profili social (se li condividono), fai domande specifiche. Se qualcosa non ti convince, NON PROCEDERE. Fidati del tuo istinto." },
            { question: `Quali precauzioni dovrei prendere per un ${subcategoryName.toLowerCase().replace('-',' ')} organizzato online? 🛡️`, answer: "Informa un amico/a fidato/a su dove vai, con chi, e quando prevedi di tornare. Incontra in un luogo pubblico e affollato la prima volta. Non andare a casa di sconosciuti subito. Porta il cellulare carico. Non bere troppo e non lasciare incustodito il tuo drink." },
            { question: `Cosa faccio se un incontro va male o mi sento a disagio? 🆘`, answer: "Allontanati immediatamente. Se ti senti minacciato/a, vai in un luogo sicuro e contatta amici o le autorità se necessario. La tua sicurezza è la priorità assoluta. Non sentirti in obbligo di fare nulla che non vuoi." }
          ];
        }
        break;

    

      case 'masturbazione':
        if (type === 'canali') {
          longDescription = `
            <h2>💦 ${typeName} Telegram ${subcategoryName}: Esplorazioni Solitarie e Contenuti Intensamente Personali! 🍌</h2>
            <p>Benvenuto nel reame dei <strong>canali Telegram dedicati alla ${subcategoryName.toUpperCase()}</strong>. Qui il piacere solitario diventa protagonista: video, foto, e gif di uomini e donne che esplorano il proprio corpo e condividono i loro momenti di autoerotismo più intensi. 🔥</p>
            <p>Cosa ti aspetta in questi canali dedicati all'autoerotismo:</p>
            <ul>
              <li>♀️ Contenuti di ${subcategoryName.toLowerCase()} femminile: orgasmi intensi, dita abili e sex toys in azione.</li>
              <li>♂️ Contenuti di ${subcategoryName.toLowerCase()} maschile: seghe potenti, eiaculazioni abbondanti e primi piani eccitanti.</li>
              <li>🤳 Storie POV, video amatoriali e performance artistiche di auto-piacere.</li>
              <li>✨ Un'infinità di tecniche e ispirazioni per il tuo piacere personale.</li>
            </ul>
            <p>Questi canali sono un inno all'auto-esplorazione e al piacere che solo tu puoi darti. Unisciti per una dose quotidiana di ispirazione e per scoprire quanto può essere eccitante la ${subcategoryName.toLowerCase()}. Solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Cosa trovo esattamente nei canali Telegram sulla ${subcategoryName.toLowerCase()}? 🤔`, answer: `Video, foto e gif di persone che si masturbano. Troverai contenuti sia maschili che femminili, amatoriali e talvolta professionali, con un focus sull'atto dell'autoerotismo e sull'orgasmo.` },
            { question: `I contenuti di ${subcategoryName.toLowerCase()} sono reali o simulati? 😲`, answer: `Spesso si tratta di contenuti reali e amatoriali, dove le persone condividono autentici momenti di piacere. Alcuni canali potrebbero includere anche performance più costruite o scene da film.` },
            { question: `Ci sono diversi stili o tecniche di ${subcategoryName.toLowerCase()} mostrati? 🍌💦`, answer: `Assolutamente! La bellezza di questi canali è la varietà: vedrai tantissime tecniche diverse, l'uso di sex toys, e approcci unici all'auto-piacere sia per uomini che per donne.` },
            { question: `Posso trovare ispirazione per la mia ${subcategoryName.toLowerCase()} in questi canali? ✨`, answer: `Sì, molti utenti trovano questi canali stimolanti e utili per scoprire nuove idee, tecniche o semplicemente per aumentare l'eccitazione. È un modo per esplorare la sessualità in modo sicuro e privato.` },
            { question: `Questi canali sulla ${subcategoryName.toLowerCase()} sono adatti a tutti? 🚻`, answer: `Sono per un pubblico adulto e consapevole, interessato all'autoerotismo. Se ti senti a disagio con questo tema, potrebbero non fare per te. L'importante è sentirsi liberi di esplorare i propri gusti.` },
            { question: `Come viene gestita la privacy dei creator in questi canali di ${subcategoryName.toLowerCase()}? 🤫`, answer: `Dipende. Molti creator amatoriali scelgono di rimanere anonimi o di mostrare solo parzialmente il viso. I canali stessi dovrebbero rispettare la privacy, ma è sempre bene essere consapevoli dei rischi della condivisione di contenuti intimi online.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Storie, Consigli e Chat sull'Autoerotismo! 🍌</h2>
            <p>Entra nei <strong>gruppi Telegram dedicati alla ${subcategoryName.toUpperCase()}</strong>! Spazi sicuri e aperti per discutere di autoerotismo, condividere esperienze personali (in modo anonimo o meno), scambiare consigli su tecniche e sex toys, e chattare con persone che apprezzano il piacere solitario. 🔥</p>
            <p>Cosa puoi fare in questi gruppi sull'autoerotismo:</p>
            <ul>
              <li>🗣️ Parlare apertamente delle tue esperienze con la ${subcategoryName.toLowerCase()}, senza giudizi.</li>
              <li>✍️ Condividere racconti erotici o fantasie legate all'auto-piacere.</li>
              <li>🧸 Chiedere e dare consigli su sex toys, lubrificanti e tecniche per intensificare l'orgasmo.</li>
              <li>🤫 Trovare una community che normalizza e celebra la ${subcategoryName.toLowerCase()} come parte sana della sessualità.</li>
            </ul>
            <p>Se la ${subcategoryName.toLowerCase()} è un argomento che ti interessa o se vuoi semplicemente saperne di più in un ambiente rispettoso, questi gruppi sono il posto giusto. Unisciti e partecipa alla conversazione! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Si può parlare liberamente di ${subcategoryName.toLowerCase()} in questi gruppi? 😊`, answer: `Sì, l'obiettivo è creare uno spazio aperto e senza tabù dove le persone possano discutere di autoerotismo, condividere esperienze, chiedere consigli e sentirsi a proprio agio.` },
            { question: `Posso chiedere consigli su sex toys o tecniche di ${subcategoryName.toLowerCase()}? 🧸💡`, answer: `Assolutamente! Molti membri sono felici di condividere le loro conoscenze ed esperienze con diversi tipi di sex toys, lubrificanti, o tecniche specifiche per aumentare il piacere durante la ${subcategoryName.toLowerCase()}.` },
            { question: `Le discussioni sulla ${subcategoryName.toLowerCase()} sono solo per single o anche per persone in coppia? 🤷‍♀️🤷‍♂️`, answer: `Per tutti! La ${subcategoryName.toLowerCase()} è una pratica personale che riguarda sia i single sia le persone in coppia. Anzi, può essere un modo per conoscersi meglio e portare nuova energia anche nella vita sessuale di coppia.` },
            { question: `È possibile condividere foto o video di ${subcategoryName.toLowerCase()} nei gruppi? 📸`, answer: `Dipende dalle regole specifiche del gruppo. Alcuni potrebbero permetterlo (con consenso e moderazione), altri sono strettamente per discussioni testuali. Leggi sempre il regolamento del gruppo.` },
            { question: `Come viene affrontato il tema del consenso e del rispetto in questi gruppi sulla ${subcategoryName.toLowerCase()}? 🙏`, answer: `Il rispetto reciproco e il consenso sono fondamentali. Non sono tollerati commenti giudicanti, pressioni o la condivisione non consensuale di materiale. L'obiettivo è creare un ambiente di supporto.` },
            { question: `Questi gruppi sulla ${subcategoryName.toLowerCase()} aiutano a sentirsi meno soli/e con le proprie pratiche? ❤️`, answer: `Sì, per molte persone questi gruppi sono un modo per capire che la ${subcategoryName.toLowerCase()} è una pratica comune e sana, aiutando a superare eventuali sensi di colpa o vergogna e a sentirsi parte di una community.` }
          ];
        }
        break;

      case 'cazzo-grosso':
        if (type === 'canali') {
          longDescription = `
            <h2>🍆 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Dimensioni Generose e Performance da Urlo! 💪</h2>
            <p>Benvenuto nell'Olimpo dei <strong>canali Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>! Una celebrazione di membri maschili di dimensioni impressionanti, dove la grandezza è protagonista. Video, foto e gif di uomini dotati che sanno come usare il loro... talento. 🏆</p>
            <p>Cosa ti aspetta in questi canali dedicati ai superdotati:</p>
            <ul>
              <li>📏 Primissimi piani e dettagli di peni enormi, per ammirarne ogni centimetro.</li>
              <li>🎬 Scene di sesso dove un ${subcategoryName.toLowerCase().replace('-', ' ')} è il protagonista indiscusso dell'azione.</li>
              <li>💪 Dimostrazioni di potenza, orgasmi esplosivi e partner pienamente soddisfatte (o sbalordite!).</li>
              <li>🌍 Uomini da tutto il mondo che mostrano con orgoglio le loro doti naturali.</li>
            </ul>
            <p>Se sei un ammiratore/ammiratrice delle grandi dimensioni o semplicemente curioso/a di vedere cosa significa avere un ${subcategoryName.toLowerCase().replace('-', ' ')}, questi canali ti lasceranno a bocca aperta. Letteralmente. Solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Cosa si intende esattamente per '${subcategoryName.toUpperCase().replace('-', ' ')}' in questi canali? 📏`, answer: `Si riferisce a contenuti che mostrano uomini con peni considerati significativamente più grandi della media, sia in lunghezza che in circonferenza. L'enfasi è sull'attributo fisico e sulle sue... capacità.` },
            { question: `I contenuti sono solo di uomini o anche di coppie con un partner dal ${subcategoryName.toLowerCase().replace('-', ' ')}? 👫`, answer: `Entrambi! Troverai sia contenuti di uomini singoli che mostrano le loro doti, sia scene di sesso (etero o gay) dove un ${subcategoryName.toLowerCase().replace('-', ' ')} è in azione con un partner.` },
            { question: `La dimensione è l'unico focus o c'è anche attenzione alla performance e al piacere? 🔥`, answer: `Sebbene la dimensione sia chiaramente il tema centrale, molti canali cercano anche di mostrare performance eccitanti e il piacere che un ${subcategoryName.toLowerCase().replace('-', ' ')} può dare (o ricevere). L'obiettivo è l'eccitazione a 360 gradi.` },
            { question: `Posso trovare diversi tipi etnici o fisici di uomini con ${subcategoryName.toLowerCase().replace('-', ' ')}? 🌍`, answer: `Sì, la varietà è spesso presente. Molti canali cercano di mostrare uomini di diverse etnie e corporature, tutti accomunati da un attributo... generoso. C'è bellezza e desiderio in ogni forma!` },
            { question: `Questi canali sul ${subcategoryName.toLowerCase().replace('-', ' ')} sono solo per un pubblico femminile/gay? 🤔`, answer: `No, sono apprezzati da un pubblico vasto e eterogeneo, inclusi uomini eterosessuali curiosi, donne, uomini gay e bisessuali. L'ammirazione per un ${subcategoryName.toLowerCase().replace('-', ' ')} è trasversale!` },
            { question: `Come viene trattato il tema del consenso e del rispetto verso i performer? 🙏`, answer: `Idealmente, i canali dovrebbero condividere solo materiale consensuale. È importante ricordare che dietro ogni ${subcategoryName.toLowerCase().replace('-', ' ')} c'è una persona. Apprezza il contenuto, ma evita commenti irrispettosi o oggettivanti.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName.toUpperCase().replace('-', ' ')}: Discussioni, Ammirazione e Storie di Grandi... Emozioni! 💪</h2>
            <p>Entra nei <strong>gruppi Telegram dedicati al ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>! Spazi per ammiratori/ammiratrici, per chi è dotato, o semplicemente per chi è curioso/a di parlare di dimensioni maschili, scambiare storie, e apprezzare la generosità della natura. 🏆</p>
            <p>Cosa puoi fare in questi gruppi dedicati ai superdotati:</p>
            <ul>
              <li>🗣️ Discutere apertamente di ${subcategoryName.toLowerCase().replace('-', ' ')}, esperienze, preferenze e fantasie.</li>
              <li>🍆 Condividere foto o video (se sei dotato/a e le regole del gruppo lo permettono, con consenso!).</li>
              <li>👀 Ammirare e commentare i contributi di altri membri (sempre con rispetto!).</li>
              <li>💞 Connetterti con persone che condividono questa specifica passione o... caratteristica.</li>
            </ul>
            <p>Se il tema del ${subcategoryName.toLowerCase().replace('-', ' ')} ti affascina o ti riguarda direttamente, questi gruppi offrono un luogo per condividere e connetterti. Ricorda: rispetto e positività prima di tutto! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Chi frequenta i gruppi Telegram sul ${subcategoryName.toLowerCase().replace('-', ' ')}? 🤔`, answer: `Un mix di persone: uomini dotati, partner di uomini dotati, ammiratori/ammiratrici di grandi dimensioni (sia uomini che donne, etero e LGBTQ+), e persone semplicemente curiose.` },
            { question: `Si possono condividere foto o video di ${subcategoryName.toLowerCase().replace('-', ' ')} personali nei gruppi? 📸`, answer: `Dipende strettamente dalle regole del gruppo. Alcuni lo permettono e lo incoraggiano (con consenso e moderazione), altri sono solo per discussioni. Leggi sempre attentamente il regolamento.` },
            { question: `Le discussioni sono solo sull'aspetto fisico o anche sulle implicazioni emotive/relazionali di avere un ${subcategoryName.toLowerCase().replace('-', ' ')}? 💬`, answer: `Possono coprire entrambi gli aspetti. Si può parlare dell'ammirazione estetica, ma anche delle sfide, dei vantaggi, delle insicurezze o dell'orgoglio legati alle dimensioni, sia per chi è dotato sia per i partner.` },
            { question: `Come si evita che le discussioni diventino volgari o irrispettose? 🙏`, answer: `Con una buona moderazione da parte degli admin e con l'impegno di tutti i membri a mantenere un tono rispettoso. È importante evitare commenti puramente oggettivanti e ricordare che si parla di persone.` },
            { question: `È possibile trovare consigli o supporto per chi ha un ${subcategoryName.toLowerCase().replace('-', ' ')} o per i loro partner? ❤️`, answer: `Sì, alcuni gruppi possono offrire uno spazio di supporto e scambio di consigli pratici o emotivi. Ad esempio, su come gestire il sesso con un partner molto dotato, o come vivere con serenità le proprie dimensioni.` },
            { question: `Questi gruppi sul ${subcategoryName.toLowerCase().replace('-', ' ')} sono body positive? ✨`, answer: `Idealmente sì. Anche se il focus è su una caratteristica specifica, un approccio body positive incoraggia l'accettazione e l'apprezzamento di tutti i tipi di corpo e dimensioni, inclusi quelli... più generosi.` }
          ];
        }
        break;

      case 'tette-grandi':
        if (type === 'canali') {
          longDescription = `
            <h2>🍈 ${typeName} Telegram ${subcategoryName}: Un Paradiso di Curve Esplosive e Scollature Generose! 🍒</h2>
            <p>Benvenuto/a nei <strong>canali Telegram dedicati alle ${subcategoryName.toUpperCase().replace('-',' ')}</strong>! Un vero e proprio santuario per gli amanti delle forme abbondanti e dei seni magnifici. Qui troverai una marea di foto, video e gif di donne con un davanzale prosperoso, pronte a mostrarti le loro meraviglie. 🤩</p>
            <p>Cosa ti aspetta in questi canali colmi di grazia:</p>
            <ul>
              <li>🍈 Immagini e video ad alta risoluzione di ${subcategoryName.toLowerCase().replace('-',' ')} naturali o rifatte, sempre stupende.</li>
              <li>👙 Modelle in lingerie, bikini o completamente nude che esibiscono con orgoglio le loro curve.</li>
              <li>🥛 Scene di "milk showers", titty drop, e primi piani mozzafiato che celebrano ogni dettaglio.</li>
              <li>✨ Un flusso costante di nuovi contenuti con donne dalle ${subcategoryName.toLowerCase().replace('-',' ')} più impressionanti del web.</li>
            </ul>
            <p>Se le ${subcategoryName.toLowerCase().replace('-',' ')} sono la tua passione e non ti stanchi mai di ammirarle in tutte le loro forme e dimensioni, questi canali sono il tuo eden personale. Preparati a un'overdose di femminilità esplosiva! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa si intende per '${subcategoryName.toUpperCase().replace('-',' ')}' in questi canali? Dimensioni specifiche? 🤔`, answer: `Generalmente si riferisce a seni considerati grandi o molto grandi, sia naturali che rifatti. Non c\'è una misura specifica, ma l'enfasi è su un décolleté abbondante e ben visibile, che cattura l'attenzione.` },
            { question: `Le donne presenti sono modelle professioniste o amatoriali? 🤷‍♀️`, answer: `Entrambe! Troverai modelle famose per le loro ${subcategoryName.toLowerCase().replace('-',' ')}, ma anche tantissime ragazze comuni che amano mostrare con orgoglio il loro seno prosperoso. La varietà è parte del divertimento.` },
            { question: `I contenuti sono solo foto o anche video di ${subcategoryName.toLowerCase().replace('-',' ')} in azione? 📹`, answer: `Un mix esplosivo! Foto artistiche, selfie piccanti, ma anche brevi clip, GIF animate, e video più lunghi che mostrano le ${subcategoryName.toLowerCase().replace('-',' ')} in movimento, durante balli, titty drop, o scene più esplicite.` },
            { question: `Si trovano tutti i tipi di ${subcategoryName.toLowerCase().replace('-',' ')} (naturali, rifatte, piercing, etc.)? ✨`, answer: `Assolutamente sì. La community apprezza ogni tipo di ${subcategoryName.toLowerCase().replace('-',' ')}: naturali e morbide, rifatte e toniche, con o senza piercing, piccole o enormi. C\'è un canale per ogni preferenza!` },
            { question: `Questi canali sono rispettosi verso le donne mostrate? 🙏`, answer: `I canali di qualità dovrebbero celebrare la bellezza femminile e il corpo in tutte le sue forme, inclusi i seni grandi, in modo consensuale e rispettoso. Evita canali che usano linguaggio dispregiativo o oggettivante.` },
            { question: `Posso trovare anche consigli su lingerie o abbigliamento per ${subcategoryName.toLowerCase().replace('-',' ')}? 👙`, answer: `Mentre il focus primario è l'ammirazione visiva, alcuni canali o gruppi collegati potrebbero occasionalmente condividere foto di lingerie o outfit che valorizzano un seno abbondante, o discussioni a tema.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Ammiratori, Consigli e Discussioni Formose! 🍈</h2>
            <p>Entra nei <strong>gruppi Telegram dedicati alle ${subcategoryName.toUpperCase().replace('-',' ')}</strong>! Questi sono spazi di discussione e condivisione per chiunque apprezzi la bellezza di un seno generoso. Chatta con altri fan, condividi le tue foto preferite (o le tue, se ti va e le regole lo consentono!), e discuti di tutto ciò che riguarda le ${subcategoryName.toLowerCase().replace('-',' ')}. 🍒</p>
            <p>Cosa puoi fare in questi gruppi dedicati alle curve generose:</p>
            <ul>
              <li>🗣️ Discutere delle modelle con le ${subcategoryName.toLowerCase().replace('-',' ')} più belle o delle tue preferenze personali.</li>
              <li>📸 Condividere foto e video a tema (sempre rispettando le regole del gruppo e il consenso).</li>
              <li>🌟 Scoprire nuove bellezze e canali dedicati alle ${subcategoryName.toLowerCase().replace('-',' ')}.</li>
              <li>💬 Chiedere consigli, ad esempio su come valorizzare un seno grande o semplicemente chiacchierare con persone affini.</li>
            </ul>
            <p>Se sei un/una cultore/cultrice delle ${subcategoryName.toLowerCase().replace('-',' ')} e vuoi unirti a una community di appassionati, questi gruppi sono il posto perfetto per te. Rispetto e ammirazione sono le parole d'ordine! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Chi partecipa a questi gruppi sulle ${subcategoryName.toLowerCase().replace('-',' ')}? Solo uomini? 🤔`, answer: `No, assolutamente! Ci sono tantissimi uomini, ma anche donne che ammirano le ${subcategoryName.toLowerCase().replace('-',' ')} altrui, o donne con un seno prosperoso che vogliono condividere la loro bellezza o cercare consigli e supporto.` },
            { question: `Posso condividere foto delle mie ${subcategoryName.toLowerCase().replace('-',' ')} o di altre persone? 📸`, answer: `Se sono foto tue e ti senti a tuo agio, molti gruppi lo permettono (leggi il regolamento!). Per foto di altre persone, devi avere il loro ESPLICITO consenso. La condivisione non consensuale è severamente vietata.` },
            { question: `Si parla solo di ammirazione estetica o anche di aspetti pratici legati alle ${subcategoryName.toLowerCase().replace('-',' ')}? 💡`, answer: `Entrambi! Oltre all'ammirazione, si può discutere di questioni pratiche come la scelta del reggiseno giusto, problemi di schiena, body positivity, o come sentirsi a proprio agio con un seno importante.` },
            { question: `Come si mantiene un ambiente positivo e non volgare in questi gruppi sulle ${subcategoryName.toLowerCase().replace('-',' ')}? ✅`, answer: `Con il rispetto reciproco. Ammirare è una cosa, oggettivare o usare linguaggio volgare è un'altra. Una buona moderazione e la collaborazione dei membri sono fondamentali per creare uno spazio piacevole per tutti.` },
            { question: `Posso trovare consigli su chirurgia estetica per le ${subcategoryName.toLowerCase().replace('-',' ')} in questi gruppi? 🏥`, answer: `È possibile che l'argomento venga trattato, ma questi gruppi non sono consulti medici. Per informazioni sulla chirurgia, rivolgiti sempre a professionisti qualificati. Qui puoi trovare esperienze personali, ma prendile come tali.` },
            { question: `Questi gruppi sulle ${subcategoryName.toLowerCase().replace('-',' ')} promuovono uno standard di bellezza irraggiungibile?  unrealistic`, answer: `L'obiettivo dovrebbe essere celebrare una caratteristica fisica, non imporla come standard. La bellezza è diversità. Un gruppo sano apprezzerà le ${subcategoryName.toLowerCase().replace('-',' ')} in un contesto di body positivity generale.` }
          ];
        }
        break;

      case 'culo-grosso':
        if (type === 'canali') {
          longDescription = `
            <h2>🍑 ${typeName} Telegram ${subcategoryName}: Celebrazione di Forme Prosperose e Curve da Capogiro! 🤩</h2>
            <p>Immergiti nel mondo dei <strong>canali Telegram dedicati al ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>! Un tributo alle terga più magnifiche e seducenti. Qui troverai un'abbondanza di foto, video, e gif che mettono in mostra culi sodi, rotondi, e semplicemente irresistibili. 🌊</p>
            <p>Cosa ti aspetta in questi canali da sogno:</p>
            <ul>
              <li>🍑 Primi piani e angolazioni audaci che esaltano ogni curva e dettaglio di sederi da urlo.</li>
              <li>💃 Donne e uomini che mostrano con orgoglio i loro ${subcategoryName.toLowerCase().replace('-', ' ')}, in pose sexy, twerking o semplicemente mentre camminano.</li>
              <li>👖 Contenuti con jeans attillati, leggings che non lasciano nulla all'immaginazione, e, ovviamente, tanta pelle nuda.</li>
              <li>✨ Un flusso continuo di materiale fresco, con i ${subcategoryName.toLowerCase().replace('-', ' ')} più impressionanti e desiderabili del web.</li>
            </ul>
            <p>Se sei un estimatore/estimatrice dei ${subcategoryName.toLowerCase().replace('-', ' ')} e non ti stanchi mai di ammirare questa parte del corpo così sensuale, questi canali sono il tuo paradiso. Preparati a una festa per gli occhi! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa si intende per '${subcategoryName.toUpperCase().replace('-', ' ')}' in questi canali? C'è una taglia specifica? 🤔`, answer: `Si riferisce a sederi considerati grandi, sodi, rotondi e particolarmente attraenti. Non c\'è una misura standard, l'importante è che il ${subcategoryName.toLowerCase().replace('-', ' ')} sia protagonista e ammirato per le sue forme generose.` },
            { question: `Si trovano solo culi di donne o anche di uomini? 🚻`, answer: `Entrambi! Molti canali celebrano la bellezza del ${subcategoryName.toLowerCase().replace('-', ' ')} in tutte le sue forme, sia femminile che maschile. Alcuni canali potrebbero specializzarsi, ma la varietà è spesso la norma.` },
            { question: `I contenuti sono solo foto statiche o anche video di ${subcategoryName.toLowerCase().replace('-', ' ')} in movimento? 🎬`, answer: `Troverai un mix dinamico: foto ad alta risoluzione, selfie allo specchio, ma anche tantissime GIF e video di twerking, jiggling, e culi che si muovono in modo ipnotico. L'azione non manca!` },
            { question: `Che tipo di abbigliamento (o non abbigliamento) si vede di solito? 👖🍑`, answer: `Di tutto un po'! Da jeans super attillati e leggings che evidenziano ogni curva, a perizomi quasi invisibili, fino al nudo integrale per apprezzare il ${subcategoryName.toLowerCase().replace('-', ' ')} nella sua forma più pura e naturale.` },
            { question: `Questi canali promuovono un ideale di corpo specifico? 🙏`, answer: `Idealmente, questi canali dovrebbero celebrare la diversità e la bellezza dei ${subcategoryName.toLowerCase().replace('-', ' ')} in varie forme e dimensioni. Cerca canali che abbiano un approccio body positive e rispettoso.` },
            { question: `Posso trovare anche esercizi o consigli per avere un ${subcategoryName.toLowerCase().replace('-', ' ')}? 💪`, answer: `Il focus principale è l'ammirazione e il contenuto visivo. Tuttavia, in alcuni gruppi associati o in discussioni, potrebbero emergere argomenti come fitness, squat, e consigli per tonificare i glutei.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Fan Club, Discussioni e Scambi di Apprezzamenti! 🍑</h2>
            <p>Unisciti ai <strong>gruppi Telegram dedicati al ${subcategoryName.toUpperCase().replace('-', ' ')}</strong>! Spazi di discussione e condivisione per tutti gli ammiratori e le ammiratrici di questa parte del corpo così iconica e sensuale. Chatta con altri fan, condividi le tue scoperte migliori, e celebra la bellezza dei sederi più formosi. 🤩</p>
            <p>Cosa puoi fare in questi gruppi dedicati alle curve posteriori:</p>
            <ul>
              <li>🗣️ Discutere dei tuoi modelli/modelle preferiti famosi per il loro ${subcategoryName.toLowerCase().replace('-', ' ')}.</li>
              <li>📸 Condividere foto e video a tema (sempre nel rispetto delle regole e del consenso!).</li>
              <li>🌟 Scoprire nuovi talenti e canali con contenuti dedicati ai ${subcategoryName.toLowerCase().replace('-', ' ')}.</li>
              <li>💬 Scambiare apprezzamenti, commenti e chiacchierare con una community di veri intenditori.</li>
            </ul>
            <p>Se il ${subcategoryName.toLowerCase().replace('-', ' ')} è una tua ossessione positiva e vuoi condividere questa passione, questi gruppi sono il luogo ideale. Rispetto e ammirazione sono sempre benvenuti! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Chi frequenta questi gruppi sul ${subcategoryName.toLowerCase().replace('-', ' ')}? Uomini, donne, entrambi? 🤔`, answer: `Una community molto varia! Uomini e donne, etero e LGBTQ+, tutti uniti dalla comune ammirazione per un bel ${subcategoryName.toLowerCase().replace('-', ' ')}. Troverai sicuramente persone con i tuoi stessi gusti.` },
            { question: `È permesso condividere foto del proprio ${subcategoryName.toLowerCase().replace('-', ' ')} o di altri? 📸`, answer: `Se si tratta del tuo ${subcategoryName.toLowerCase().replace('-', ' ')} e ti senti a tuo agio, molti gruppi lo consentono, previa lettura del regolamento. Per foto di altre persone, è FONDAMENTALE avere il loro consenso esplicito. Mai condividere materiale non consensuale.` },
            { question: `Oltre ad ammirare, si parla anche di fitness o moda legata al ${subcategoryName.toLowerCase().replace('-', ' ')}? 💪👖`, answer: `Sì, le discussioni possono spaziare. Dall'ammirazione estetica si può passare a consigli su esercizi per i glutei (squat, affondi), a quali jeans o leggings valorizzano meglio le forme, o a discussioni sulla body positivity.` },
            { question: `Come si evitano commenti volgari o irrispettosi in un gruppo dedicato al ${subcategoryName.toLowerCase().replace('-', ' ')}? ✅`, answer: `Grazie alla moderazione degli admin e all'educazione dei membri. L'ammirazione per una parte del corpo non deve mai sfociare in mancanza di rispetto o commenti degradanti. L'obiettivo è un ambiente positivo.` },
            { question: `Posso trovare persone con feticismi specifici legati al ${subcategoryName.toLowerCase().replace('-', ' ')} in questi gruppi? 😈`, answer: `È possibile. Alcuni gruppi potrebbero essere più generici, altri più di nicchia. Se hai interessi specifici (es. spanking, anilingus), potresti trovare persone affini o cercare gruppi ancora più specializzati.` },
            { question: `Questi gruppi sul ${subcategoryName.toLowerCase().replace('-', ' ')} aiutano ad aumentare l'autostima per chi è orgoglioso delle proprie forme? ✨`, answer: `Assolutamente! Per molte persone che sono fiere del proprio ${subcategoryName.toLowerCase().replace('-', ' ')}, questi gruppi possono essere un luogo di affermazione, dove ricevere apprezzamenti e sentirsi valorizzati, contribuendo positivamente all'autostima.` }
          ];
        }
        break;

      case 'milf':
        if (type === 'canali') {
          longDescription = `
            <h2>💋 ${typeName} Telegram ${subcategoryName}: Fascino Maturo, Esperienza e Seduzione Intramontabile! 🔥</h2>
            <p>Benvenuto/a nel mondo seducente dei <strong>canali Telegram dedicati alle ${subcategoryName.toUpperCase()}</strong>! Una celebrazione di donne mature, affascinanti e piene di esperienza che sanno esattamente come sedurre e appagare. Qui troverai foto e video di mamme sexy e donne over 30/40 che non hanno perso un briciolo del loro sex appeal. 🌹</p>
            <p>Cosa ti aspetta in questi canali dedicati al fascino maturo:</p>
            <ul>
              <li>👠 ${subcategoryName.toUpperCase()} in lingerie sofisticata, abiti eleganti che esaltano le forme, o completamente svestite.</li>
              <li>🎬 Scene di sesso appassionato dove l'esperienza e la sicurezza di una ${subcategoryName.toLowerCase()} fanno la differenza.</li>
              <li>📸 Primi piani di corpi sensuali, sguardi magnetici e sorrisi che promettono piacere.</li>
              <li>✨ Un flusso continuo di contenuti con ${subcategoryName.toLowerCase()} da tutto il mondo, pronte a dimostrare che l'età è solo un numero.</li>
            </ul>
            <p>Se sei attratto/a dal carisma, dalla sicurezza e dalla bellezza senza tempo delle ${subcategoryName.toLowerCase()}, questi canali sono una fonte inesauribile di piacere e ammirazione. Preparati a scoprire il lato più piccante della maturità! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa significa esattamente l'acronimo '${subcategoryName.toUpperCase()}' e a che età si riferisce? 🤔`, answer: `'${subcategoryName.toUpperCase()}' sta per "Mother I'd Like to Fuck". Generalmente si riferisce a donne considerate attraenti che sono madri o che hanno un'età matura (indicativamente dai 30-35 anni in su), ma l'età esatta può variare molto a seconda della percezione.` },
            { question: `Le ${subcategoryName.toLowerCase()} presenti sono attrici professioniste o donne comuni? 🤷‍♀️`, answer: `Entrambe. Ci sono molte attrici pornografiche specializzate nel genere ${subcategoryName.toLowerCase()}, ma anche canali che presentano donne comuni, mamme reali, che amano mostrarsi e condividere la loro sensualità matura.` },
            { question: `Che tipo di contenuti erotici posso aspettarmi da canali ${subcategoryName.toLowerCase()}? 🌶️`, answer: `Una vasta gamma: da foto e video softcore che esaltano il fascino e l'eleganza, a contenuti hardcore con scene di sesso esplicito dove le ${subcategoryName.toLowerCase()} dimostrano tutta la loro passione ed esperienza.` },
            { question: `L'esperienza è un fattore importante nei contenuti ${subcategoryName.toLowerCase()}? ✨`, answer: `Assolutamente sì. Spesso, il fascino delle ${subcategoryName.toLowerCase()} risiede proprio nella loro presunta (o reale) esperienza sessuale, nella sicurezza in sé e nella capacità di dare e ricevere piacere in modo appagante.` },
            { question: `Questi canali celebrano solo l'aspetto fisico o anche la personalità delle ${subcategoryName.toLowerCase()}? 🌹`, answer: `Idealmente, i migliori canali ${subcategoryName.toLowerCase()} cercano di catturare non solo la bellezza fisica matura, ma anche il carisma, la sicurezza e la personalità seducente che spesso caratterizzano queste donne.` },
            { question: `Posso trovare ${subcategoryName.toLowerCase()} di diverse etnie e fisicità? 🌍`, answer: `Sì, il genere ${subcategoryName.toLowerCase()} è molto popolare e trasversale, quindi è facile trovare canali che presentano donne mature di diverse etnie, corporature e stili, ognuna con il suo fascino unico.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Ammiratori di Donne Mature, Storie e Consigli! 🔥</h2>
            <p>Entra nei <strong>gruppi Telegram dedicati alle ${subcategoryName.toUpperCase()}</strong>! Spazi di discussione e condivisione per tutti coloro che subiscono il fascino intramontabile delle donne mature, esperte e seducenti. Chatta con altri fan, scambia opinioni, e celebra la bellezza senza tempo. 🌹</p>
            <p>Cosa puoi fare in questi gruppi per amanti delle ${subcategoryName.toLowerCase()}:</p>
            <ul>
              <li>🗣️ Discutere delle tue attrici ${subcategoryName.toLowerCase()} preferite o delle donne mature che ti affascinano di più.</li>
              <li>📸 Condividere foto e video a tema (sempre rispettando le regole del gruppo, il copyright e il consenso).</li>
              <li>🌟 Scoprire nuove ${subcategoryName.toLowerCase()} emergenti o canali dedicati a questo genere.</li>
              <li>💬 Scambiare racconti, fantasie o semplicemente apprezzamenti con una community di veri intenditori.</li>
            </ul>
            <p>Se le ${subcategoryName.toLowerCase()} rappresentano il tuo ideale di femminilità e seduzione, questi gruppi ti offrono un luogo per coltivare questa passione e connetterti con persone che la pensano come te. Solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Chi frequenta i gruppi Telegram sulle ${subcategoryName.toLowerCase()}? Giovani, meno giovani? 🤔`, answer: `Un pubblico molto vario! Giovani attratti dal fascino della donna matura, coetanei che apprezzano partner esperte, e anche donne mature che vogliono confrontarsi o semplicemente curiosare.` },
            { question: `È possibile condividere esperienze personali con ${subcategoryName.toLowerCase()} in questi gruppi? 💌`, answer: `Sì, molti gruppi sono aperti alla condivisione di racconti ed esperienze personali (reali o di fantasia), purché fatto con rispetto e in linea con le regole del gruppo. L'anonimato è spesso garantito.` },
            { question: `Si parla solo di sesso o anche di altri aspetti dell'essere una ${subcategoryName.toLowerCase()} (es. maternità, carriera)? 💼`, answer: `Principalmente il focus è erotico e sull'attrazione. Tuttavia, in alcuni gruppi più ampi, le discussioni potrebbero toccare anche temi come il ruolo della donna matura nella società, la maternità, o come conciliare sensualità e vita quotidiana.` },
            { question: `Come si evitano stereotipi o commenti irrispettosi sull'età nei gruppi ${subcategoryName.toLowerCase()}? ✅`, answer: `Con una forte moderazione e promuovendo una cultura del rispetto. L'obiettivo è celebrare il fascino maturo, non denigrare o cadere in stereotipi legati all'età. La sensualità non ha scadenza.` },
            { question: `Posso trovare consigli su come approcciare o sedurre una ${subcategoryName.toLowerCase()}? 😉`, answer: `Alcuni gruppi potrebbero offrire spazio per questo tipo di consigli, ma ricorda che ogni persona è unica. Il rispetto, l'onestà e l'interesse genuino sono sempre le migliori strategie, indipendentemente dall'età.` },
            { question: `Questi gruppi sulle ${subcategoryName.toLowerCase()} aiutano a sfatare i tabù sull'invecchiamento femminile e la sessualità? ✨`, answer: `Possono contribuire positivamente, mostrando che la sensualità e il desiderio non svaniscono con l'età. Celebrare le ${subcategoryName.toLowerCase()} significa anche riconoscere che le donne rimangono esseri sessuali e desiderabili in ogni fase della vita.` }
          ];
        }
        break;

      case 'cougar':
        if (type === 'canali') {
          longDescription = `
            <h2> predatory ${typeName} Telegram ${subcategoryName}: Donne Pantere Pronte a Graffiare! 🐾</h2>
            <p>Benvenuto/a nell'arena selvaggia dei <strong>canali Telegram dedicati alle ${subcategoryName.toUpperCase()}</strong>! Donne mature, sicure di sé, che sanno cosa vogliono e non hanno paura di prenderselo, specialmente se si tratta di partner più giovani. Troverai foto e video di queste predatrici eleganti in piena azione. 😼</p>
            <p>Cosa ti aspetta in questi canali graffianti:</p>
            <ul>
              <li>🔥 ${subcategoryName.toUpperCase()} dominanti e seducenti che giocano con partner più giovani (toyboys).</li>
              <li>🎬 Scene di passione dove l'esperienza della ${subcategoryName.toLowerCase()} si unisce all'energia del partner più giovane.</li>
              <li>🍸 Immagini di donne sofisticate e potenti, che emanano un'aura di controllo e desiderio.</li>
              <li>✨ Contenuti che celebrano la donna che prende l'iniziativa e vive la sua sessualità senza compromessi.</li>
            </ul>
            <p>Se ti eccita la dinamica della ${subcategoryName.toLowerCase()} con un partner più giovane, o se ammiri la forza e la disinvoltura di queste donne pantere, questi canali ti offriranno scene indimenticabili. Preparati a un'esperienza di seduzione selvaggia! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Che differenza c'è tra '${subcategoryName.toUpperCase()}' e 'MILF'? 🤔`, answer: `Mentre 'MILF' si riferisce genericamente a madri o donne mature attraenti, '${subcategoryName.toUpperCase()}' descrive specificamente una donna matura che cerca attivamente o preferisce partner sessuali significativamente più giovani (spesso chiamati 'toyboys'). L'enfasi è sulla dinamica di età.` },
            { question: `Le ${subcategoryName.toLowerCase()} sono sempre dominanti nei video? 💪`, answer: `Non sempre, ma spesso la dinamica '${subcategoryName.toLowerCase()}' implica una donna che ha il controllo, è esperta e guida il gioco. Tuttavia, la sensualità ha molte sfaccettature, e potrai trovare diverse interpretazioni.` },
            { question: `I partner più giovani sono sempre uomini? 👨‍👦`, answer: `Generalmente sì, la dinamica classica della ${subcategoryName.toLowerCase()} la vede con un uomo più giovane. Tuttavia, il termine può essere usato più ampiamente per descrivere una donna matura con un partner più giovane di qualsiasi genere.` },
            { question: `Questi canali celebrano l'indipendenza femminile? ✨`, answer: `Molti vedono la figura della ${subcategoryName.toLowerCase()} come un simbolo di donna indipendente, sessualmente liberata, che sfida le convenzioni sociali sull'età nelle relazioni. I canali possono riflettere questa interpretazione.` },
            { question: `È una fantasia comune quella della ${subcategoryName.toLowerCase()}? 💭`, answer: `Sì, è una fantasia erotica piuttosto diffusa, sia per gli uomini più giovani attratti da donne esperte e sicure, sia per le donne che si identificano in questo ruolo di potere e seduzione.` },
            { question: `Si trovano contenuti ${subcategoryName.toLowerCase()} amatoriali o solo professionali? 🎬`, answer: `Entrambi. Ci sono produzioni professionali dedicate al genere ${subcategoryName.toLowerCase()}, ma anche contenuti amatoriali o semi-professionali di donne che vivono questo tipo di relazioni o fantasie.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Fan di Donne Pantere e Giovani Partner! 🐾</h2>
            <p>Entra nei <strong>gruppi Telegram dedicati alle ${subcategoryName.toUpperCase()}</strong>! Spazi per discutere di questa affascinante dinamica, condividere storie (vere o di fantasia), e connettersi con persone attratte da donne mature e sicure che amano partner più giovani. 😼</p>
            <p>Cosa puoi fare in questi gruppi graffianti:</p>
            <ul>
              <li>🗣️ Discutere delle tue ${subcategoryName.toLowerCase()} preferite (reali o personaggi) e del loro fascino.</li>
              <li>🔗 Condividere foto, video o articoli a tema (rispettando regole, copyright e consenso).</li>
              <li>💕 Parlare delle esperienze o fantasie legate a relazioni ${subcategoryName.toLowerCase()}-toyboy.</li>
              <li>🌟 Connetterti con donne che si identificano come ${subcategoryName.toLowerCase()} o con giovani interessati a loro.</li>
            </ul>
            <p>Se la figura della ${subcategoryName.toLowerCase()} ti intriga e vuoi esplorare questa dinamica in una community di appassionati, questi gruppi sono per te. Rispetto e apertura mentale sono fondamentali. Solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Chi partecipa ai gruppi ${subcategoryName.toLowerCase()}? Donne mature, uomini giovani? 🤔`, answer: `Un mix interessante: donne mature che si identificano come ${subcategoryName.toLowerCase()} o sono curiose, uomini più giovani attratti da questo tipo di donna, e persone semplicemente affascinate da questa dinamica relazionale.` },
            { question: `Si possono trovare ${subcategoryName.toLowerCase()} o 'toyboys' per incontri reali in questi gruppi? 💔`, answer: `Alcuni gruppi potrebbero avere un focus sugli incontri, ma molti sono solo per discussione e fantasia. Sii sempre chiaro/a sulle tue intenzioni e procedi con ESTREMA cautela se decidi di incontrare qualcuno. La sicurezza prima di tutto.` },
            { question: `Le discussioni sono solo sul sesso o anche sugli aspetti psicologici delle relazioni ${subcategoryName.toLowerCase()}? 🧠`, answer: `Possono toccare entrambi gli aspetti. Oltre all'attrazione fisica, si può discutere delle dinamiche di potere (reali o percepite), delle sfide sociali, e dei benefici emotivi di queste relazioni.` },
            { question: `Come si gestisce il tema del consenso e del rispetto dell'età in questi gruppi? 🙏`, answer: `Il consenso è cruciale. Tutte le interazioni devono essere tra adulti consenzienti. Le discussioni dovrebbero evitare di feticizzare l'età in modo negativo e promuovere invece il rispetto per le scelte individuali.` },
            { question: `Questi gruppi possono aiutare a combattere gli stereotipi sull'età nelle relazioni? ✨`, answer: `Sì, possono contribuire a normalizzare e a discutere apertamente di relazioni dove la donna è più grande, sfidando i preconcetti sociali e celebrando l'attrazione che va oltre le differenze di età.` },
            { question: `Cosa cercano le ${subcategoryName.toLowerCase()} in un partner più giovane, secondo le discussioni? 🔥`, answer: `Le discussioni spesso evidenziano che le ${subcategoryName.toLowerCase()} apprezzano l'energia, l'entusiasmo, l'ammirazione e talvolta una minore 'bagaglio' emotivo dei partner più giovani. Dal canto loro, i giovani sono attratti dall'esperienza, sicurezza e indipendenza delle ${subcategoryName.toLowerCase()}.` }
          ];
        }
        break;

      case 'matura':
        if (type === 'canali') {
          longDescription = `
            <h2>🌟 ${typeName} Telegram ${subcategoryName}: Eleganza, Esperienza e Sex Appeal Senza Età! 🍷</h2>
            <p>Esplora i <strong>canali Telegram dedicati alle donne ${subcategoryName.toUpperCase()}</strong>! Un omaggio alla bellezza che fiorisce con gli anni, all'eleganza e alla sensualità di donne che hanno superato i 40, 50 o anche più, e che continuano a sedurre con classe e consapevolezza. Qui troverai la prova che il desiderio non ha data di scadenza. 🥂</p>
            <p>Cosa ti aspetta in questi canali di classe:</p>
            <ul>
              <li>💄 Donne ${subcategoryName.toLowerCase()} affascinanti, sicure di sé, che si mostrano in tutta la loro bellezza, con rughe che raccontano storie e corpi che emanano esperienza.</li>
              <li>🎬 Scene di sesso dove la ${subcategoryName.toLowerCase()} porta passione, intimità e una profonda conoscenza del piacere.</li>
              <li>📸 Immagini che celebrano la femminilità ${subcategoryName.toLowerCase()} in tutte le sue forme: dalla signora elegante alla nonna sexy e disinibita.</li>
              <li>✨ Contenuti che dimostrano come la sensualità possa intensificarsi e arricchirsi con il passare degli anni.</li>
            </ul>
            <p>Se sei affascinato/a dalla bellezza ${subcategoryName.toLowerCase()}, dall'intelligenza seduttiva e dalla profonda sensualità che solo l'esperienza può dare, questi canali ti conquisteranno. Preparati ad ammirare donne che sono come il buon vino: migliorano invecchiando! Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa distingue una '${subcategoryName.toUpperCase()}' da una 'MILF' o 'Cougar'? 🤔`, answer: `'${subcategoryName.toUpperCase()}' è un termine più generale che si riferisce a donne adulte, tipicamente over 40/50, indipendentemente dal fatto che siano madri (MILF) o che cerchino partner più giovani (Cougar). L'accento è sull'età matura e sul fascino che ne deriva.` },
            { question: `I contenuti sono più 'soft' o si trova anche materiale esplicito con donne ${subcategoryName.toLowerCase()}? 🎬`, answer: `Entrambi. Alcuni canali si concentrano su un erotismo più elegante e sofisticato, quasi 'classy'. Altri offrono contenuti hardcore con donne ${subcategoryName.toLowerCase()} pienamente coinvolte in atti sessuali espliciti, dimostrando che la passione non ha età.` },
            { question: `Le donne ${subcategoryName.toLowerCase()} nei canali sono consapevoli della loro età e la valorizzano? ✨`, answer: `Assolutamente. Il genere '${subcategoryName.toLowerCase()}' celebra proprio le donne che sono a loro agio con la propria età, che ne fanno un punto di forza e di seduzione, mostrando sicurezza ed esperienza.` },
            { question: `Si trovano anche 'nonne' (Granny) in questi canali ${subcategoryName.toLowerCase()}? 👵`, answer: `Sì, il termine '${subcategoryName.toLowerCase()}' può includere anche donne più anziane, spesso definite nel gergo 'Granny' o 'GILF' (Grandmother I'd Like to Fuck). C'è un pubblico per ogni sfumatura della maturità.` },
            { question: `Questi canali aiutano a combattere l'ageismo nella pornografia e nella società? 💪`, answer: `Possono avere un ruolo positivo, mostrando che le donne ${subcategoryName.toLowerCase()} sono ancora sessualmente attive, desiderabili e possono essere protagoniste di contenuti erotici, sfidando l'idea che la sensualità sia appannaggio esclusivo della gioventù.` },
            { question: `L'eleganza è una caratteristica comune nei contenuti con donne ${subcategoryName.toLowerCase()}? 🍷`, answer: `Spesso sì. Molti contenuti dedicati alle donne ${subcategoryName.toLowerCase()} puntano su un'estetica più raffinata ed elegante, che si sposa bene con l'immagine di una donna matura, colta e sicura di sé.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Ammiratori del Fascino Senza Età e Discussioni Eleganti! 🌟</h2>
            <p>Unisciti ai <strong>gruppi Telegram dedicati alle donne ${subcategoryName.toUpperCase()}</strong>! Luoghi di incontro e discussione per chi apprezza la bellezza, l'eleganza e la profonda sensualità delle donne che hanno vissuto e amato. Condividi la tua ammirazione, scambia opinioni e celebra il fascino che non teme il tempo. 🥂</p>
            <p>Cosa puoi fare in questi gruppi di classe:</p>
            <ul>
              <li>🗣️ Parlare delle attrici, modelle o figure pubbliche ${subcategoryName.toLowerCase()} che più ti affascinano.</li>
              <li>🔗 Condividere foto, video, articoli o citazioni che celebrano la bellezza e la saggezza ${subcategoryName.toLowerCase()} (consenso e copyright sempre prima!).</li>
              <li>💕 Discutere del sex appeal che si acquisisce con l'esperienza e la maturità.</li>
              <li>🌟 Connetterti con persone che condividono la tua stessa visione della sensualità senza età.</li>
            </ul>
            <p>Se per te la vera seduzione è un mix di esperienza, intelligenza e bellezza consapevole, questi gruppi dedicati alle donne ${subcategoryName.toLowerCase()} ti faranno sentire a casa. Rispetto e raffinatezza sono sempre apprezzati. Solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `Chi frequenta i gruppi Telegram sulle donne ${subcategoryName.toLowerCase()}? C'è un target d'età? 🤔`, answer: `Persone di tutte le età che apprezzano il fascino della donna matura. Non c'è un target specifico; l'importante è condividere l'ammirazione per la bellezza e la sensualità che trascendono l'età.` },
            { question: `Le discussioni sono focalizzate solo sull'aspetto fisico o anche sull'esperienza e la personalità? ✨`, answer: `Idealmente, si valorizzano tutti gli aspetti: la bellezza esteriore, ma anche l'esperienza di vita, la sicurezza, l'intelligenza e il carisma che spesso caratterizzano una donna ${subcategoryName.toLowerCase()}.` },
            { question: `Si possono trovare donne ${subcategoryName.toLowerCase()} interessate a incontri in questi gruppi? 💔`, answer: `Alcuni gruppi potrebbero avere un orientamento agli incontri, ma la maggior parte sono per ammirazione e discussione. Se cerchi incontri, sii chiaro/a e rispetta le regole del gruppo e le intenzioni altrui. La prudenza è d'obbligo.` },
            { question: `Come si crea un ambiente rispettoso che valorizzi le donne ${subcategoryName.toLowerCase()} senza cadere in stereotipi? 🙏`, answer: `Evitando commenti sull'età usati in modo dispregiativo, apprezzando la diversità delle esperienze e delle bellezze mature, e concentrandosi sulla celebrazione piuttosto che sulla feticizzazione fine a sé stessa.` },
            { question: `Questi gruppi possono aiutare le donne ${subcategoryName.toLowerCase()} a sentirsi più apprezzate e desiderabili? 😊`, answer: `Certamente. Per molte donne ${subcategoryName.toLowerCase()}, trovare community che apprezzano e celebrano la loro bellezza e sensualità può essere molto positivo per l'autostima e per sentirsi comprese e valorizzate.` },
            { question: `Si parla anche di relazioni con donne ${subcategoryName.toLowerCase()} o di come affrontare le differenze d'età? 💑`, answer: `Sì, le discussioni possono includere consigli su relazioni con partner mature, come gestire le differenze d'età in modo sano, o semplicemente condividere storie ed esperienze positive.` }
          ];
        }
        break;



      case 'trans':
        if (type === 'canali') {
          longDescription = `
            <h2>⚧️ ${typeName} Telegram ${subcategoryName}: Bellezza Oltre il Binario, Passione Ardente! 🔥</h2>
            <p>Benvenuto/a nei <strong>canali Telegram dedicati al mondo ${subcategoryName.toUpperCase()}</strong>! Un universo di contenuti che celebrano la bellezza, la sensualità e la sessualità delle persone transgender (MtF, FtM, non-binary) e di chi le ammira. Video, foto, gif e storie che esplorano l'eros ${subcategoryName.toLowerCase()} in tutte le sue forme. ✨</p>
            <p>Cosa ti aspetta in questi canali che sfidano le etichette:</p>
            <ul>
              <li>🌟 Persone ${subcategoryName.toLowerCase()} stupende: donne ${subcategoryName.toLowerCase()} con e senza pene, uomini ${subcategoryName.toLowerCase()} con e senza vulva, e individui non-binary che esprimono la loro unica identità.</li>
              <li>🎬 Scene di sesso ${subcategoryName.toLowerCase()} esplicito e passionale: performance soliste, coppie ${subcategoryName.toLowerCase()}/${subcategoryName.toLowerCase()}, ${subcategoryName.toLowerCase()}/cis, e ogni combinazione possibile.</li>
              <li>💖 Contenuti che spaziano dal porno hardcore a rappresentazioni più sensuali, artistiche e che affermano l'identità.</li>
              <li>🌈 Una vasta gamma di generi e nicchie per soddisfare ogni desiderio e apprezzamento della bellezza ${subcategoryName.toLowerCase()}.</li>
            </ul>
            <p>Se cerchi contenuti ${subcategoryName.toLowerCase()} autentici, eccitanti e che celebrano la diversità di genere, questi canali sono una risorsa imperdibile. Immergiti nell'esplorazione del desiderio ${subcategoryName.toLowerCase()} senza pregiudizi. Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa significa '${subcategoryName.toUpperCase()}' in questo contesto? Si riferisce a donne trans, uomini trans, o entrambi? ⚧️`, answer: `Generalmente, i canali '${subcategoryName.toUpperCase()}' includono contenuti con donne transgender (da uomo a donna, MtF), uomini transgender (da donna a uomo, FtM), e talvolta persone non-binary. La specificità può variare da canale a canale.` },
            { question: `Che tipo di scene di sesso posso trovare? Sono solo con partner cisgender? 💑`, answer: `La varietà è ampia. Troverai persone ${subcategoryName.toLowerCase()} in scene soliste, con altri partner ${subcategoryName.toLowerCase()}, o con partner cisgender (uomini o donne). Il porno ${subcategoryName.toLowerCase()} esplora molte dinamiche.` },
            { question: `I contenuti sono rispettosi dell'identità di genere delle persone ${subcategoryName.toLowerCase()} coinvolte? 🙏`, answer: `Molti produttori e canali si sforzano di essere rispettosi e affermativi. Tuttavia, è importante essere critici, poiché esistono ancora contenuti che possono perpetuare stereotipi o usare un linguaggio non ideale. Cerca canali che valorizzino le persone ${subcategoryName.toLowerCase()}.` },
            { question: `Si trovano sia persone ${subcategoryName.toLowerCase()} pre-op che post-op nei video? ✨`, answer: `Sì, c'è una grande diversità. Troverai persone ${subcategoryName.toLowerCase()} in vari stadi della loro transizione, incluse quelle pre-operatorie, post-operatorie, o che non desiderano interventi chirurgici. Ogni corpo è celebrato.` },
            { question: `Quali sono i termini corretti da usare quando si parla di persone ${subcategoryName.toLowerCase()} e porno ${subcategoryName.toLowerCase()}? 💬`, answer: `Usa sempre i pronomi e i termini con cui la persona si identifica. Evita termini dispregiativi o curiosità morbose sui genitali. Nel porno, spesso si usano termini come 'trans woman', 'trans man', 't-girl', 'shemale' (quest'ultimo è considerato da molti obsoleto o offensivo al di fuori di specifici contesti porno).` },
            { question: `Questi canali possono aiutare a comprendere meglio la sessualità ${subcategoryName.toLowerCase()}? ❤️`, answer: `Possono offrire una finestra sulla diversità della sessualità e dell'espressione di genere ${subcategoryName.toLowerCase()}. Tuttavia, ricorda che il porno è una fantasia e non sempre riflette la realtà delle esperienze e delle relazioni delle persone transgender.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Supporto, Comunità e Visibilità! ⚧️</h2>
            <p>Entra nei <strong>gruppi Telegram ${subcategoryName.toUpperCase()}</strong>! Spazi sicuri e di supporto per persone transgender, non-binary, genderfluid, e alleati. Connettiti, chatta, condividi risorse, discuti di transizione, diritti, e costruisci una comunità forte e visibile. L'autenticità è benvenuta! ✨</p>
            <p>Cosa puoi fare in questi gruppi ${subcategoryName.toLowerCase()}:</p>
            <ul>
              <li>🗣️ Discutere di esperienze di transizione (sociale, medica, legale), disforia di genere, euforia di genere.</li>
              <li>🏳️‍⚧️ Condividere notizie, eventi, e risorse utili per la comunità ${subcategoryName.toLowerCase()} e non-binary.</li>
              <li>🤝 Connetterti con altre persone ${subcategoryName.toLowerCase()} per supporto reciproco, amicizia o incontri (se il gruppo lo consente).</li>
              <li>💖 Trovare uno spazio per esprimere liberamente la tua identità di genere e ricevere affermazione.</li>
            </ul>
            <p>Se sei una persona ${subcategoryName.toLowerCase()} o un alleato/a in cerca di una community solidale, informazione e supporto, questi gruppi Telegram possono essere una risorsa preziosa. Il rispetto e l'inclusività sono fondamentali. Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `I gruppi Telegram '${subcategoryName.toUpperCase()}' sono solo per persone transgender o anche per alleati? 🤗`, answer: `Molti gruppi sono aperti e accoglienti anche per gli alleati (amici, familiari, partner di persone ${subcategoryName.toLowerCase()}) che desiderano imparare, offrire supporto e partecipare alla comunità in modo rispettoso.` },
            { question: `Posso trovare informazioni mediche sulla transizione in questi gruppi? 🏥`, answer: `Puoi trovare esperienze condivise e risorse, ma ricorda che i membri del gruppo non sono solitamente professionisti medici. Per informazioni mediche accurate e personalizzate, consulta sempre un medico o uno specialista qualificato.` },
            { question: `Come viene garantita la sicurezza e la privacy nei gruppi ${subcategoryName.toLowerCase()}? 🔒`, answer: `Gli amministratori dei gruppi di solito stabiliscono regole per mantenere un ambiente sicuro e rispettoso, e possono moderare i messaggi. È importante essere cauti nel condividere informazioni personali e utilizzare le impostazioni di privacy di Telegram.` },
            { question: `Si discute di salute mentale e benessere per le persone ${subcategoryName.toLowerCase()}? ❤️`, answer: `Sì, la salute mentale è un tema importante. Molti gruppi offrono uno spazio per discutere di sfide come la disforia di genere, l'ansia, la depressione, e per condividere strategie di coping e risorse di supporto psicologico.` },
            { question: `Posso trovare supporto per affrontare la transfobia o la discriminazione? 💪`, answer: `Assolutamente. Questi gruppi possono essere un luogo di grande supporto per condividere esperienze di discriminazione, ricevere consigli su come affrontarla, e trovare solidarietà e forza nella comunità.` },
            { question: `I gruppi ${subcategoryName.toLowerCase()} aiutano a creare visibilità e a promuovere i diritti delle persone transgender? ✨`, answer: `Sì, contribuendo a creare spazi di discussione, condivisione e organizzazione, questi gruppi possono svolgere un ruolo importante nell'aumentare la visibilità, promuovere la consapevolezza e sostenere la lotta per i diritti delle persone transgender.` }
          ];
        }
        break;

      case 'bdsm':
        if (type === 'canali') {
          longDescription = `
            <h2>⛓️ ${typeName} Telegram ${subcategoryName}: Dominazione, Sottomissione e Piaceri Proibiti! whip</h2>
            <p>Addentrati nel mondo oscuro e affascinante dei <strong>canali Telegram dedicati al ${subcategoryName.toUpperCase()}</strong>! Un universo di bondage, disciplina, dominazione, sottomissione, sadismo e masochismo. Qui troverai video, foto, gif e guide che esplorano ogni sfumatura di queste pratiche consensuali. 👠</p>
            <p>Cosa ti aspetta in questi canali di piacere e dolore (consensuale!):</p>
            <ul>
              <li>DOMINAZIONE & SOTTOMISSIONE: Domme potenti che impartiscono ordini, sottomessi/e devoti/e che obbediscono. Padroni severi e schiave/i adoranti.</li>
              <li>BONDAGE: Corpi legati, imbavagliati, costretti in posizioni vulnerabili, pronti per essere plasmati dal desiderio.</li>
              <li>DISCIPLINA & SADOMASO: Scene di fustigazione, sculacciate, ceretta, e altre forme di impatto e sensazioni intense, sempre nel rispetto dei limiti e del consenso.</li>
              <li>FETISH & ROLEPLAY: Uniformi, lattice, pelle, giochi di ruolo specifici e accessori che amplificano l'esperienza ${subcategoryName.toLowerCase()}.</li>
            </ul>
            <p>Se sei attratto/a dalle dinamiche di potere, dalla sensualità del controllo e della resa, o semplicemente curioso/a di esplorare i confini del piacere, questi canali ${subcategoryName.toUpperCase()} ti offrono un'esperienza intensa e senza censure. Ricorda sempre: SSC (Sicuro, Sano, Consensuale). Solo per maggiorenni. 🔞</p>
          `;
          faq = [
            { question: `Cosa significa esattamente l'acronimo '${subcategoryName.toUpperCase()}'? 🤔`, answer: `'${subcategoryName.toUpperCase()}' sta per Bondage & Disciplina (BD), Dominazione & Sottomissione (DS), e Sadismo & Masochismo (SM). È un termine ombrello per una vasta gamma di pratiche sessuali e relazionali consensuali che coinvolgono dinamiche di potere, sensazioni intense e ruoli specifici.` },
            { question: `I contenuti ${subcategoryName.toLowerCase()} sono sempre estremi o c'è anche un lato più 'soft'? ☁️`, answer: `Esiste un'ampia gamma! Ci sono contenuti ${subcategoryName.toLowerCase()} 'soft' che si concentrano su giochi di potere psicologici, bondage leggero o disciplina erotica. E poi c'è il ${subcategoryName.toLowerCase()} 'hardcore' con pratiche più intense. La chiave è sempre il consenso e la sicurezza.` },
            { question: `Le persone coinvolte nei video ${subcategoryName.toLowerCase()} sono attori o praticanti reali? 🎬🤷`, answer: `Entrambi. Ci sono produzioni professionali con attori specializzati in ${subcategoryName.toLowerCase()}, ma anche molti contenuti amatoriali di persone che praticano ${subcategoryName.toLowerCase()} nella loro vita privata e scelgono di condividere le loro esperienze.` },
            { question: `Qual è il ruolo del consenso (SSC/RACK) nel ${subcategoryName.toUpperCase()}? 🙏`, answer: `Fondamentale! Le etiche più comuni sono SSC (Safe, Sane, Consensual - Sicuro, Sano, Consensuale) e RACK (Risk-Aware Consensual Kink - Kink Consapevole dei Rischi e Consensuale). Senza consenso chiaro, continuo ed entusiasta, non è ${subcategoryName.toUpperCase()}, ma abuso.` },
            { question: `Posso imparare le basi del ${subcategoryName.toUpperCase()} da questi canali? 📚`, answer: `Alcuni canali potrebbero offrire guide o tutorial, ma è cruciale integrare queste informazioni con risorse educative più complete e affidabili. La sicurezza, la comunicazione e la conoscenza delle tecniche sono vitali prima di provare qualsiasi pratica ${subcategoryName.toLowerCase()}.` },
            { question: `Quali sono alcuni dei feticismi comuni associati al ${subcategoryName.toUpperCase()}? 👠👢`, answer: `Molti! Alcuni includono fetish per il lattice, la pelle, le uniformi, le scarpe (specialmente tacchi alti e stivali), il bondage con corde (shibari), i corsetti, e vari strumenti o accessori specifici del ${subcategoryName.toUpperCase()}.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>💬 ${typeName} Telegram ${subcategoryName}: Comunità Kinky, Discussioni e Incontri (Consensuali)! ⛓️</h2>
            <p>Benvenuto/a nei <strong>gruppi Telegram ${subcategoryName.toUpperCase()}</strong>! Spazi per persone kinky, curiose o esperte, per connettersi, discutere di pratiche ${subcategoryName.toLowerCase()}, condividere esperienze, consigli su sicurezza e consenso, e magari trovare partner per giochi consensuali. La parola d'ordine è rispetto! 🤝</p>
            <p>Cosa puoi fare in questi gruppi dedicati al kink:</p>
            <ul>
              <li>🗣️ Discutere di ruoli (Dom, Sub, Switch), dinamiche di potere, tecniche di bondage, negoziazione dei limiti e aftercare.</li>
              <li>🔗 Condividere risorse educative, recensioni di eventi o negozi a tema ${subcategoryName.toLowerCase()}.</li>
              <li>💕 Trovare una comunità di persone che comprendono e condividono i tuoi interessi kinky.</li>
              <li>🔞 Organizzare o partecipare a incontri o "munches" (incontri sociali kinky, spesso in luoghi pubblici) se il gruppo lo facilita e nel rispetto delle regole.</li>
            </ul>
            <p>Se il mondo ${subcategoryName.toUpperCase()} ti affascina e cerchi una community per esplorarlo in modo sicuro e consensuale, questi gruppi Telegram possono offrirti supporto, conoscenza e connessioni. Ricorda sempre l'importanza di SSC/RACK. Solo per maggiorenni! 🔞</p>
          `;
          faq = [
            { question: `I gruppi ${subcategoryName.toUpperCase()} su Telegram sono per esperti o anche per principianti curiosi? 🤔`, answer: `Molti gruppi accolgono sia neofiti che praticanti esperti. Spesso ci sono sezioni o discussioni dedicate ai principianti, con consigli su come iniziare in sicurezza e informazioni sulle basi del ${subcategoryName.toUpperCase()}.` },
            { question: `Come si trova un partner ${subcategoryName.toLowerCase()} o una comunità locale tramite questi gruppi? 📍🤝`, answer: `Alcuni gruppi hanno un focus sugli incontri o sono specifici per area geografica. Puoi cercare gruppi con nomi come '${subcategoryName.toUpperCase()} [tua città]' o chiedere se ci sono 'munches' (incontri sociali kinky) locali. Sii sempre cauto/a e dai priorità alla sicurezza.` },
            { question: `Si parla di sicurezza, consenso e negoziazione nei gruppi ${subcategoryName.toLowerCase()}? ✅`, answer: `Assolutamente. Questi sono temi centrali in qualsiasi comunità ${subcategoryName.toLowerCase()} responsabile. Troverai discussioni su safeword, limiti, negoziazione delle scene, e l'importanza dell'aftercare (cure post-sessione).` },
            { question: `Cosa sono i 'munches' e come funzionano? ☕`, answer: `Un 'munch' è un incontro sociale informale per persone interessate al ${subcategoryName.toUpperCase()} e al kink. Solitamente si tengono in luoghi pubblici (bar, caffè) e sono un ottimo modo per conoscere persone della comunità in un ambiente rilassato e non sessuale.` },
            { question: `Posso fare domande 'stupide' sul ${subcategoryName.toUpperCase()} in questi gruppi senza essere giudicato/a? ❓`, answer: `Generalmente sì. Le community ${subcategoryName.toLowerCase()} tendono ad essere accoglienti verso i nuovi arrivati e comprendono che ci sono molte domande quando si inizia. L'importante è essere rispettosi e aperti ad imparare.` },
            { question: `Come si evitano persone non sicure o che non rispettano il consenso nei gruppi ${subcategoryName.toLowerCase()}? 🛡️`, answer: `Fidati del tuo istinto. Non sentirti obbligato/a a interagire o incontrare nessuno. Presta attenzione a 'red flags' (segnali d'allarme) come pressioni, mancanza di rispetto per i limiti o discorsi non consensuali. Segnala comportamenti problematici agli admin.` }
          ];
        }
        break;

      default:
        // Fallback content if no specific slug matches
        if (type === 'canali') {
          longDescription = `
            <h2>🔞 Esplora Canali Telegram dedicati a ${subcategoryName}! 😈</h2>
            <p>Benvenuto nella nostra selezione di <strong>canali Telegram a tema ${subcategoryName.toLowerCase()}</strong>. Qui potrai trovare canali che offrono contenuti caldi, video, foto e link esclusivi.</p>
            <p>Preparati a scoprire:</p>
            <ul>
              <li>🔥 Contenuti aggiornati e materiale esplicito.</li>
              <li>🎬 Video, immagini e gif che stuzzicheranno la tua fantasia.</li>
              <li>🔗 Link diretti per un accesso immediato e discreto.</li>
              <li>🌶️ Una vasta gamma di ${subcategoryName.toLowerCase()} per soddisfare ogni tua curiosità.</li>
            </ul>
            <p>Non aspettare oltre, tuffati nell'esplorazione e trova i canali ${subcategoryName.toLowerCase()} che fanno per te. Buon divertimento e ricorda: solo per un pubblico adulto e consapevole! 😉</p>
          `;
          faq = [
            { question: `Cosa posso aspettarmi da canali Telegram su ${subcategoryName}? 🤔`, answer: `Contenuti espliciti, video, foto e link diretti relativi a ${subcategoryName}. Ogni canale ha le sue specificità, quindi esplora per trovare quello che più ti si addice.` },
            { question: `Questi canali ${subcategoryName.toLowerCase()} sono gratuiti? 💸`, answer: `Molti sono ad accesso gratuito, ma alcuni potrebbero offrire contenuti premium o avere sezioni VIP. Controlla sempre le info del canale specifico.` },
            { question: `Come posso essere sicuro della qualità e sicurezza dei contenuti ${subcategoryName.toLowerCase()}? 🛡️`, answer: `Fai attenzione ai link esterni e usa il buon senso. I canali seri di solito hanno una community attiva e recensioni. Non condividere mai informazioni personali.` },
            { question: `Vengono aggiunti nuovi contenuti ${subcategoryName.toLowerCase()} regolarmente? 🔄`, answer: `Sì, la maggior parte dei canali attivi dedicati a ${subcategoryName} viene aggiornata frequentemente con nuovi video, foto e link per mantenere alto l'interesse.` },
            { question: `Posso suggerire contenuti o categorie ${subcategoryName.toLowerCase()}? 💡`, answer: `Alcuni canali potrebbero avere amministratori aperti a suggerimenti. Controlla le info del canale o cerca un modo per contattarli, ma non c'è garanzia che le richieste vengano accolte.` },
            { question: `Ci sono limiti di età per accedere a questi canali ${subcategoryName.toLowerCase()}? 🔞`, answer: `Sì, questi contenuti sono strettamente per un pubblico adulto (18+). Accedendo confermi di avere l'età legale per visualizzare materiale esplicito.` }
          ];
        } else { // type === 'gruppi'
          longDescription = `
            <h2>🔞 Unisciti a Gruppi Telegram dedicati a ${subcategoryName}! 😈</h2>
            <p>Benvenuto nella nostra selezione di <strong>gruppi Telegram a tema ${subcategoryName.toLowerCase()}</strong>. Qui potrai trovare gruppi di discussione per chattare, condividere esperienze e conoscere persone con i tuoi stessi interessi piccanti.</p>
            <p>Preparati a scoprire:</p>
            <ul>
              <li>🔥 Discussioni aperte e senza censure.</li>
              <li>🎬 Condivisione di storie personali, foto e video (secondo le regole del gruppo).</li>
              <li>🔗 Opportunità di incontrare persone con gusti simili.</li>
              <li>🌶️ Una vasta gamma di ${subcategoryName.toLowerCase()} per soddisfare ogni tua curiosità.</li>
            </ul>
            <p>Non aspettare oltre, tuffati nell'esplorazione e trova i gruppi ${subcategoryName.toLowerCase()} che fanno per te. Buon divertimento e ricorda: solo per un pubblico adulto e consapevole! 😉</p>
          `;
          faq = [
            { question: `Cosa posso aspettarmi da gruppi Telegram su ${subcategoryName}? 🤔`, answer: `Discussioni aperte, condivisione di esperienze e materiale per adulti relativo a ${subcategoryName}. Ogni gruppo ha le sue regole e la sua atmosfera, quindi esplora!` },
            { question: `Questi gruppi ${subcategoryName.toLowerCase()} sono gratuiti? 💸`, answer: `La maggior parte dei gruppi Telegram è ad accesso gratuito. Alcuni potrebbero avere canali VIP associati a pagamento, ma l'iscrizione al gruppo base è solitamente libera.` },
            { question: `Come posso interagire in modo sicuro nei gruppi ${subcategoryName.toLowerCase()}? 🛡️`, answer: `Rispetta le regole del gruppo, non condividere informazioni personali sensibili e usa il buon senso. Molti gruppi hanno moderatori per mantenere un ambiente civile.` },
            { question: `Posso trovare persone per incontri hot a tema ${subcategoryName.toLowerCase()} in questi gruppi? 🔥`, answer: `Alcuni gruppi potrebbero essere orientati agli incontri, altri solo alla discussione. Sii chiaro/a sulle tue intenzioni e rispetta quelle altrui. La sicurezza prima di tutto!` },
            { question: `Come si evitano truffe o profili falsi nei gruppi ${subcategoryName.toLowerCase()}? 🕵️`, answer: `Sii scettico/a verso richieste di denaro o informazioni personali. I profili falsi esistono; affidati al tuo istinto e non esitare a segnalare comportamenti sospetti agli amministratori.` },
            { question: `Ci sono limiti di età per accedere a questi gruppi ${subcategoryName.toLowerCase()}? 🔞`, answer: `Sì, questi gruppi e le discussioni al loro interno sono per un pubblico adulto (18+). Accedendo confermi di avere l'età legale.` }
          ];
        }
        break;
    }
  
    return {
      type,
      slug: subcategory.slug,
      name: subcategoryName,
      title: pageTitle,
      description: metaDescription,
      longDescription: longDescription,
      faq: faq,
    };
  }

export async function getTelegramPageData(type: 'canali' | 'gruppi', slug: string): Promise<TelegramPageData | null> {
  const subcategory = getTelegramSubcategoryBySlug(slug);

  if (!subcategory) {
    return null;
  }
  try {
    const data = await generateMockData(type, subcategory);
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${type}/${slug}:`, error);
    return null;
  }
}

export function getAllTelegramPageParams(): Array<{ type: 'canali' | 'gruppi'; slug: string }> {
  const params: Array<{ type: 'canali' | 'gruppi'; slug: string }> = [];
  telegramCategoriesData.forEach(mainCat => {
    mainCat.subcategories.forEach(subCat => {
      params.push({ type: 'canali', slug: subCat.slug });
      params.push({ type: 'gruppi', slug: subCat.slug });
    });
  });
  return params;
}