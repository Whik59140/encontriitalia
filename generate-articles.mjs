import 'dotenv/config'; // Load variables from .env file, ensure dotenv is installed
import { GoogleGenerativeAI } from "@google/generative-ai";
import { VertexAI } from '@google-cloud/vertexai'; // Add Vertex AI import
import fs from 'fs/promises'; // Use promises API of fs
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID; // Add project ID for Vertex AI
const modelName = "gemini-2.5-flash-preview-04-17"; // Or your preferred model
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputBaseDir = path.join(__dirname, 'content', 'articles');
const geoJsonPath = path.join(__dirname, 'lib', 'data', 'geo.json');
const maxOutputTokens = 8192;
const CONCURRENCY_LIMIT = 15; // Number of cities to process in parallel

// --- Location for Vertex AI ---
const vertexAILocation = 'us-central1'; // Required for image generation

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! IMPORTANT: SET THIS TO THE CATEGORY SLUG YOU WANT TO GENERATE FOR ALL CITIES !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const TARGET_CATEGORY_SLUG_FOR_ALL_CITIES = 'milf'; // IMPORTANT: Set this to the desired category slug.
const TARGET_CITY_SLUG = ''; // Optional: Set to a specific city slug to generate only for that city, or empty for all.

// Define all available categories statically
const ALL_CATEGORIES = [
  { slug: 'gay', name: 'Gay' },
  { slug: 'milf', name: 'Milf' },
  { slug: 'donne', name: 'Donne' },
  { slug: 'ragazze', name: 'Ragazze' },
  { slug: 'trans', name: 'Trans' },
  { slug: 'trav', name: 'Trav' },
  { slug: 'escort', name: 'Escort' },
  
];

// --- Helper Functions ---

/**
 * Reads and parses the geo.json file.
 * @returns {Promise<object>} The parsed geo data with cities and categories.
 */
async function getGeoData() {
  try {
    const filePath = path.join(process.cwd(), 'lib', 'data', 'geo.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    const cities = [];
    for (const region in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, region)) {
        jsonData[region].forEach(city => {
          cities.push({ ...city, region });
        });
      }
    }
    // Categories are now static, so we only return cities.
    return { cities };
  } catch (error) {
    console.error('Error reading or parsing geo.json:', error);
    throw error; // Rethrow to stop execution if geo data is critical
  }
}

/**
 * Capitalizes each word in a city slug.
 * @param {string} slug The city slug (e.g., "roma" or "reggio-emilia").
 * @returns {string} The capitalized city name (e.g., "Roma" or "Reggio Emilia").
 */
function capitalizeCityName(slug) {
    if (!slug) return '';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Capitalizes the first letter of a category name.
 * @param {string} name The category name (e.g., "gay" or "studentessa").
 * @returns {string} The capitalized category name (e.g., "Gay" or "Studentessa").
 */
function capitalizeCategoryName(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
}


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! IMPORTANT: YOU MUST IMPLEMENT THIS FUNCTION WITH YOUR DETAILED PROMPT LOGIC  !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
 * Returns the appropriate detailed prompt string for a given category and city.
 * @param {string} categorySlug - The slug of the category (e.g., "gay", "milf").
 * @param {string} cityName - The capitalized name of the city (e.g., "Roma").
 * @param {string} categoryDisplayName - The capitalized display name of the category (e.g., "Gay", "Milf").
 * @param {array} relatedCitiesData - An array of related cities data for internal linking.
 * @returns {string|null} The detailed prompt string, or null if no prompt is defined for the category.
 */
function getPromptForCategory(categorySlug, cityName, categoryDisplayName, relatedCitiesData) {
  console.log(`   Generating prompt for category '${categoryDisplayName}' in '${cityName}'`);

  const internalLinksSection = relatedCitiesData && relatedCitiesData.length > 0 
    ? `\\n\\n## Esplora Altre Città nella Regione\\nScrivi un breve paragrafo che incoraggi i lettori a esplorare altre città vicine nella stessa regione per incontri ${categoryDisplayName}, menzionando e linkando le seguenti guide: ${relatedCitiesData.map(c => `[${c.name}](/${c.slug}/${categorySlug}/incontri-${categorySlug}-in-${c.slug})`).join(', ')}.`
    : '';

  if (categorySlug === 'milf') {
    // ... (existing prompt for trans) ...
    return `
Scrivi un articolo SEO-ottimizzato in italiano di 10.000 caratteri sugli incontri con persone escort a ${cityName}. L'articolo deve:

${internalLinksSection}
`;
  } else if (categorySlug === 'milf') {
    
    return `
   Scrivi un articolo SEO-ottimizzato in italiano di circa 10.000 caratteri sugli incontri con **donne mature (spesso cercate con termini come MILF)** a ${cityName}. L'articolo deve:

Iniziare con un'introduzione accattivante che metta in luce il fascino unico e l'esperienza che caratterizzano la scena degli incontri con **donne mature e affascinanti** a ${cityName}. Usa un forte aggancio per attirare lettrici e lettori, mostrando cosa rende speciale questa città per conoscere **signore carismatiche e consapevoli**.

Includere una sezione dettagliata sui migliori luoghi per incontrare **donne mature single** a ${cityName}. Elenca wine bar sofisticati, caffè con atmosfera rilassata, club con serate a tema che attraggono un pubblico adulto, eventi culturali (mostre, teatro), corsi di interesse specifico (es. degustazione vini, arte, yoga), o piattaforme di dating online popolari tra le **donne con esperienza**. Ove possibile, includi nomi di locali o eventi per rendere i consigli pratici e localmente rilevanti per chi cerca **incontri MILF a ${cityName}**.

Fornire consigli pratici e attuabili per avere successo negli appuntamenti con **donne mature**, sottolineando l'importanza del rispetto per la loro individualità, della comunicazione matura, dell'ascolto attento, dell'empatia, dell'autenticità e della sicurezza reciproca. Includi esempi o scenari riconoscibili (es. come approcciare una conversazione interessante, come valorizzare l'esperienza reciproca) per illustrare questi suggerimenti, utili per chi desidera **incontrare una MILF a ${cityName}**.

Esplorare le sfide comuni negli incontri con **donne mature** (ad esempio, conciliare impegni familiari o carriere avviate, differenze nelle aspettative rispetto a partner più giovani, gestire pregiudizi, o la comunicazione efficace online in contesti di dating per adulti) e offrire soluzioni specifiche e pratiche per affrontarle.

Presentare almeno due storie di successo o testimonianze (anonimizzate o ipotetiche ma realistiche) che riflettano esperienze positive di incontri con **donne mature** nati a ${cityName}. Queste dovrebbero sembrare autentiche e ispiratrici, evidenziando la possibilità di creare legami profondi e stimolanti in città.

Concludere con un elenco personalizzato di risorse utili a ${cityName} per chi è interessato a socializzare con o per **donne mature**, come club del libro con un target adulto, associazioni culturali, gruppi di escursionismo o benessere, o community online focalizzate sugli interessi di un pubblico adulto, per aggiungere valore e incoraggiare l'interazione.

Durante tutto l'articolo:

Integrare in modo fluido parole chiave long-tail, come ad esempio:

"migliori posti per conoscere donne mature single a ${cityName}"
"come organizzare un appuntamento con una donna matura a ${cityName}"
"consigli per incontri con MILF ${cityName}"
"appuntamenti sicuri con donne adulte a ${cityName}"
"donne mature single ${cityName}"
"vita notturna donne mature ${cityName}"
"incontrare MILF a ${cityName}"

Utilizzare sia forme singolari che plurali (ad esempio, "incontro donna matura" e "incontri donne mature").

Incorporare variazioni naturali e rispettose dei termini 'donne mature', 'signore', 'MILF' (quest'ultimo usato con consapevolezza della sua natura di termine di ricerca, ma tradotto in linguaggio rispettoso ed elegante nell'articolo, ad esempio 'donne affascinanti e con esperienza', 'signore carismatiche'). L'obiettivo è ampliare la copertura delle query di ricerca e garantire l'inclusività, mantenendo sempre un tono rispettoso. Evita ripetizioni forzate o frasi innaturali.

Usare emoji con parsimonia (ad esempio, 🍷, 😊, ✨, 💃, 🌹) per migliorare la vicinanza emotiva e il divertimento senza appesantire il testo.

Adottare un tono naturale e colloquiale — come un consiglio da un amico o un'amica esperta e fidata — per mantenere l'articolo caldo, accessibile e umano.

Coinvolgere lettrici e lettori con domande retoriche (ad esempio, "Pronta/o a scoprire il fascino degli incontri con donne di esperienza a ${cityName}?") e anticipazioni (ad esempio, "Curiosa/o di sapere qual è il segreto per un appuntamento indimenticabile con una signora a ${cityName}? Continua a leggere!") per mantenere vivo l'interesse.

Incorporare dettagli specifici di ${cityName}, come:

Locali, caffè o ristoranti noti per essere frequentati da un pubblico adulto o adatti per appuntamenti con donne mature.
Eventi annuali (ad esempio, festival culturali, mercatini enogastronomici, concerti di musica classica o jazz, eventi di networking per professionisti) che potrebbero favorire incontri con donne mature.
Fattori culturali o sociali che modellano la scena degli incontri per donne mature in città.

Citare informazioni credibili e verificate (ad esempio, statistiche sulla vita sociale degli adulti, citazioni di esperti di relazioni, o studi sul dating in età matura) per aumentare fiducia e autorevolezza.

Aggiungere una sezione sul clima culturale o sociale di ${cityName} riguardo agli incontri e alla vita sociale delle donne mature, e il suo impatto sul dating, fornendo un contesto prezioso.

Affrontare diverse prospettive e bisogni: donne mature che cercano amicizie, relazioni serie, o avventure passionali, e persone interessate a conoscere donne mature con questi diversi obiettivi, garantendo inclusività e un ampio appeal.

Opzionalmente, includere una sezione FAQ alla fine per affrontare domande o preoccupazioni comuni sugli incontri con donne mature (o MILF) a ${cityName}, migliorando il valore per il lettore.

L'articolo dovrebbe essere divertente, profondo, e lasciare lettrici e lettori entusiaste/i all'idea di vivere la scena degli incontri con donne mature a ${cityName}.

10 Titoli SEO-Ottimizzati per ${cityName}:

"Incontri Donne Mature ${cityName}: Guida agli Appuntamenti con Signore Affascinanti"
"Migliori Posti per Conoscere MILF Single a ${cityName} – Scoprili Ora!"
"Consigli per Appuntamenti con Donne Mature a ${cityName}: Segreti per Sedurre con Stile"
"Com'è la Scena degli Incontri con Donne Mature a ${cityName}? Tutte le Info"
"Top App per Incontri con Donne Mature e MILF a ${cityName} – Inizia Oggi!"
"Galateo degli Appuntamenti con Donne Mature a ${cityName}: Eleganza e Rispetto"
"Storie Vere di Incontri con Donne Mature a ${cityName} che Ispirano Passione"
"Guida per Principianti agli Incontri con Donne Mature (MILF) a ${cityName}"
"Eventi per Donne Mature Single a ${cityName} da Non Perdere Assolutamente"
"Perché ${cityName} è Perfetta per Incontri con Donne Mature Indimenticabili"

${internalLinksSection}

**Lunghezza:** Circa 10.000 caratteri.
**FORMATO MARKDOWN:** Output diretto in Markdown.
**NO CODE FENCES:** Non iniziare l'output con \`\`\`markdown.
**STRUTTURA CRUCIALE:** Seguire ESATTAMENTE la struttura H2/H3 specificata (se applicabile nel prompt originale o dedotta dalla sua struttura). Non omettere sezioni.
**PAROLE CHIAVE:** Integrare le parole chiave in modo naturale. Non includere elenchi di "Parole Chiave".

`;
  }
  // Add more else if blocks for other categories as needed
  console.warn(`   ---> No specific prompt defined for category \'${categorySlug}\'. Using a generic approach or skipping.`);
  return null; // Or a very generic prompt as a fallback

}

/**
 * Delays execution for a specified number of milliseconds.
 * @param {number} ms The number of milliseconds to delay.
 * @returns {Promise<void>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Processes the generation for a single city.
 * @param {object} city - The city object from geo.json (including region).
 * @param {object} targetCategoryObject - The category object { slug, name }.
 * @param {Array<object>} allCities - The complete list of cities for finding related ones.
 * @param {object} model - The initialized Gemini generative model.
 * @returns {Promise<{status: string, value?: string, reason?: any}>} Promise resolving with success or failure info.
 */
async function processSingleCity(city, targetCategoryObject, allCities, model) {
  const cityName = capitalizeCityName(city.name);
  const categorySlug = targetCategoryObject.slug;
  const categoryName = targetCategoryObject.name;
  const currentCityRegion = city.region;

  console.log(`[START] Processing: ${cityName} (${categoryName})`);

  // Find related cities
  let relatedCitiesData = [];
  if (currentCityRegion) {
    relatedCitiesData = allCities
      .filter(relatedCity => relatedCity.region === currentCityRegion && relatedCity.slug !== city.slug)
      .slice(0, 3)
      .map(rc => ({ name: capitalizeCityName(rc.name), slug: rc.slug })); // Capitalize related city names here
  }

  // Define paths
        const categorySpecificDir = path.join(outputBaseDir, categorySlug);
        const cityInCategoryDir = path.join(categorySpecificDir, city.slug);
        const articleSlug = `incontri-${categorySlug}-in-${city.slug}`;
        const targetFileName = `${articleSlug}.md`;
        const targetFilePath = path.join(cityInCategoryDir, targetFileName);

  try {
    // Ensure city-specific directory exists within the category directory
    await fs.mkdir(cityInCategoryDir, { recursive: true });

        // Check if file already exists
        try {
            await fs.access(targetFilePath);
      console.log(`  [SKIP] ${cityName} (${categoryName}) - File already exists.`);
      return { status: 'skipped', value: `${cityName} (${categoryName}) - Skipped: File exists` };
        } catch (error) {
            // File doesn't exist, proceed
        }

    // Get Prompt
    const articlePrompt = getPromptForCategory(categorySlug, cityName, categoryName, relatedCitiesData);
    if (!articlePrompt) {
      console.log(`  [WARN] ${cityName} (${categoryName}) - No prompt generated. Skipping.`);
      return { status: 'skipped', reason: `${cityName} (${categoryName}) - Skipped: No prompt` };
    }

    console.log(`    Generating article content for ${cityName} (${categoryName})...`);
    
    // Generate Article Content
            const generationConfig = { temperature: 0.7, topK: 1, topP: 1, maxOutputTokens: maxOutputTokens };
            const request = {
      contents: [{ role: "user", parts: [{ text: articlePrompt }] }],
                generationConfig: generationConfig,
            };
    const resultStream = await model.generateContentStream(request);
            
            let articleText = '';
    // process.stdout.write(`      Receiving stream for ${cityName}: `); // Less noisy logging
    for await (const chunk of resultStream.stream) {
                try {
                    const chunkText = chunk.text();
            // process.stdout.write('.'); // Indicate progress per city might be too noisy
                    articleText += chunkText;
                } catch (streamError) {
            console.error(`\n      Error processing stream chunk for ${cityName}:`, streamError);
        }
    }
    // console.log(' Done.'); // Less noisy logging

    articleText = articleText.trim().replace(/^```(?:markdown\\s*\n)?/, '').replace(/```$/, '').trim();

    // Extract Title/Description
    let finalTitle = `${categoryName} a ${cityName}: Guida Essenziale`;
    let finalDescription = `Scopri tutto su ${categoryName.toLowerCase()} a ${cityName}.`;
    // (Keep the title/desc extraction logic as before)
    const titleMatch = articleText.match(/^\*\*Titolo(?: SEO)?:\*\*\s*(.+)/im);
            if (titleMatch && titleMatch[1]) {
                finalTitle = titleMatch[1].trim();
                articleText = articleText.replace(titleMatch[0], '').trim();
            }
      const metaDescMatch = articleText.match(/^\*\*Meta Description(?: \(\d+-\d+ caratteri\))?:\*\*\s*(.+)/im);
            if (metaDescMatch && metaDescMatch[1]) {
                finalDescription = metaDescMatch[1].trim();
                articleText = articleText.replace(metaDescMatch[0], '').trim();
            }
      articleText = articleText.replace(/^\*Keywords:.*$/gim, '');
      articleText = articleText.replace(/\n{3,}/g, '\\n\\n').trim();
           
    // Image generation is removed.
    const imagePathForFrontmatter = ''; // Set to empty for frontmatter

    // Construct Markdown
            const markdownContent = `---
title: "${finalTitle.replace(/"/g, '\\"')}"
description: "${finalDescription.replace(/"/g, '\\"')}"
articleSlug: "${articleSlug}" 
categorySlug: "${categorySlug}"
citySlug: "${city.slug}"
date: "${new Date().toISOString().split('T')[0]}"
cityName: "${cityName}"
categoryName: "${categoryName}"
image: "${imagePathForFrontmatter}"
---

${articleText}
`;

    // Save File
            await fs.writeFile(targetFilePath, markdownContent);
    console.log(`  [SUCCESS] ${cityName} (${categoryName}) - Saved: ${targetFileName}`);
    return { status: 'fulfilled', value: `${cityName} (${categoryName}) - Completed` };

        } catch (error) {
    console.error(`  [FAIL] ${cityName} (${categoryName}) - Error:`, error.message || error);
    // Optionally log the full error stack: console.error(error);
    return { status: 'rejected', reason: `${cityName} (${categoryName}) - Failed: ${error.message}` };
  }
}

// --- Main Generation Logic ---
/**
 * Generates articles for all cities and specified categories.
 */
async function generateArticles() {
  if (!TARGET_CATEGORY_SLUG_FOR_ALL_CITIES) {
    console.error("Error: TARGET_CATEGORY_SLUG_FOR_ALL_CITIES is not set in generate-articles.mjs. Please set it to the desired category slug (e.g., 'gay', 'milf').");
    process.exit(1);
  }

  const geoData = await getGeoData();
  if (!geoData || !geoData.cities) {
    console.error('Failed to load cities from geoData.');
    return;
  }

  const allCities = geoData.cities;
  // Use the static ALL_CATEGORIES defined at the top of the file
  const targetCategoryObject = ALL_CATEGORIES.find(cat => cat.slug === TARGET_CATEGORY_SLUG_FOR_ALL_CITIES);

  if (!targetCategoryObject) {
    console.error(`Error: Category with slug "${TARGET_CATEGORY_SLUG_FOR_ALL_CITIES}" not found in ALL_CATEGORIES.`);
    console.log('Available category slugs are:', ALL_CATEGORIES.map(c => c.slug).join(', '));
    process.exit(1);
  }

  const categorySlug = targetCategoryObject.slug;
  const categoryName = targetCategoryObject.name;

    if (!GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY not found in environment variables. Ensure it's set in your .env file.");
        return;
    }

  // Check for Vertex AI configuration for image generation
  if (!GOOGLE_CLOUD_PROJECT_ID) {
    console.warn("WARNING: GOOGLE_CLOUD_PROJECT_ID not found in environment variables. Image generation with Vertex AI will not work.");
    console.warn("Set this in your .env file to enable article image generation.");
  }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });

    // Ensure the main articles directory exists (base for category folders)
    try {
        await fs.mkdir(outputBaseDir, { recursive: true });
    } catch (error) {
        console.error(`Error creating base output directory '${outputBaseDir}':`, error);
        return; 
    }

  // Filter cities if TARGET_CITY_SLUG is set
  const citiesToProcess = TARGET_CITY_SLUG 
      ? allCities.filter(city => city.slug === TARGET_CITY_SLUG) 
      : allCities;

  if (citiesToProcess.length === 0) {
      console.error(`Error: No cities found to process.` + (TARGET_CITY_SLUG ? ` Did you mean to unset TARGET_CITY_SLUG?` : ''));
      return;
  }

  console.log(`\n🚀 Starting article generation for ${citiesToProcess.length} cities, Category: '${targetCategoryObject.name}', Concurrency: ${CONCURRENCY_LIMIT}\n`);

  let processedCount = 0;
  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const totalCities = citiesToProcess.length;

  for (let i = 0; i < totalCities; i += CONCURRENCY_LIMIT) {
    const batch = citiesToProcess.slice(i, i + CONCURRENCY_LIMIT);
    console.log(`--- Processing Batch ${Math.floor(i / CONCURRENCY_LIMIT) + 1} (Cities ${i + 1}-${Math.min(i + CONCURRENCY_LIMIT, totalCities)} of ${totalCities}) ---`);

    const promises = batch.map(city => 
      processSingleCity(city, targetCategoryObject, allCities, model)
    );

    // Wait for the current batch to complete
    const results = await Promise.allSettled(promises);
    
    // Log results for the batch
    results.forEach(result => {
        processedCount++;
        if (result.status === 'fulfilled') {
            successCount++;
            // console.log(`  ✅ ${result.value}`); // Already logged in processSingleCity
        } else if (result.status === 'skipped') { // Our custom status
            skippedCount++;
            // console.log(`  ⚪️ ${result.value || result.reason}`); // Already logged
        } else { // status === 'rejected'
            failedCount++;
            // console.error(`  ❌ ${result.reason}`); // Already logged
        }
    });

    console.log(`--- Batch ${Math.floor(i / CONCURRENCY_LIMIT) + 1} Complete ---`);
     // Optional: Add a small delay between batches if hitting rate limits persists
     // if (i + CONCURRENCY_LIMIT < totalCities) {
     //    await delay(2000); // e.g., 2-second delay between batches
     // }
  }

  console.log("\n--- Generation Summary ---");
  console.log(`Total Cities: ${totalCities}`);
  console.log(`Successfully Generated: ${successCount}`);
  console.log(`Skipped (Already Exist or No Prompt): ${skippedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log("--- Generation process complete! ---");
}

// --- Start Generation ---

// Temporarily call listAvailableModels before starting generation
/*
async function main() {
  if (!GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY not found. Please set it in .env");
    return;
  }
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  // await listAvailableModels(genAI); // Call the function here

  // Proceed with article generation if needed, or comment this out during model listing
  await generateArticles().catch(error => {
    console.error("An unexpected error occurred during the article generation process:", error);
  });
}

main().catch(console.error);
*/

// Original generateArticles().catch call commented out for controlled execution
generateArticles().catch(error => {
    console.error("An unexpected error occurred outside the main generation loop:", error);
}); 