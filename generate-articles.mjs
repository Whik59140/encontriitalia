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
const TARGET_CATEGORY_SLUG_FOR_ALL_CITIES = 'trav'; // IMPORTANT: Set this to the desired category slug.
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

  if (categorySlug === 'trav') {
    // ... (existing prompt for trans) ...
    return `
Scrivi un articolo SEO-ottimizzato in italiano di 10.000 caratteri sugli incontri con persone trav a ${cityName}. L'articolo deve:

${internalLinksSection}
`;
  } else if (categorySlug === 'trav') {
    
    return `
 Scrivi un articolo SEO-ottimizzato in italiano di circa 10.000 caratteri sugli incontri con **persone transgender, transessuali, e travestiti (spesso cercati con il termine 'trav')** a ${cityName}. L'articolo deve:

Iniziare con un'introduzione accogliente e informativa che metta in luce la specificità e la ricchezza della scena degli incontri per e con **persone transgender (donne trans, uomini trans), transessuali, e travestiti/crossdresser** a ${cityName}. Usa un forte aggancio per attirare lettrici e lettori, mostrando cosa rende speciale e inclusiva questa città per conoscere **persone della comunità T* e chi è interessato a incontrarle con rispetto**.

Includere una sezione dettagliata sui migliori luoghi per incontrare **persone trans, e travestiti** a ${cityName}. Elenca bar LGBTQ+ friendly, club con serate a tema o drag show, centri comunitari LGBTQ+, eventi specifici (es. Pride, festival culturali queer, meet-up dedicati), o piattaforme di dating online popolari e sicure per la **comunità transgender e per travestiti**. Ove possibile, includi nomi di locali o eventi per rendere i consigli pratici e localmente rilevanti per chi cerca **incontri trav a ${cityName}** o **incontri trans a ${cityName}**.

Fornire consigli pratici, rispettosi e attuabili per avere successo negli appuntamenti con **persone transgender e travestiti**, sottolineando l'importanza del rispetto dell'identità di genere, dell'uso corretto dei pronomi, della comunicazione aperta e onesta, dell'ascolto attivo, dell'empatia, dell'autenticità e della sicurezza reciproca. Includi esempi o scenari riconoscibili (es. come chiedere rispettosamente i pronomi, come evitare domande invasive, come creare un ambiente confortevole).

Esplorare le sfide comuni negli incontri per e con **persone trans e travestiti** (ad esempio, affrontare pregiudizi e discriminazione, garantire la sicurezza fisica ed emotiva, trovare partner informati e rispettosi, la gestione del coming out o della transizione nel contesto di una relazione, la comunicazione efficace online) e offrire soluzioni specifiche, pratiche e di supporto.

Presentare almeno due storie di successo o testimonianze (anonimizzate o ipotetiche ma realistiche e positive) che riflettano esperienze di incontri con **persone trans o travestiti** nati a ${cityName}. Queste dovrebbero sembrare autentiche, ispiratrici e celebrare la diversità e la possibilità di creare legami significativi.

Concludere con un elenco personalizzato di risorse utili per **persone transgender, transessuali, travestiti e alleati** a ${cityName}, come gruppi di supporto T*, associazioni LGBTQ+, centri di consulenza, locali dichiaratamente safe space, o community online locali, per aggiungere valore e incoraggiare l'interazione e il supporto reciproco.

Durante tutto l'articolo:

Integrare in modo fluido parole chiave long-tail, come ad esempio:

"migliori posti per conoscere persone trans a ${cityName}"
"come organizzare un appuntamento con una persona trav a ${cityName}"
"consigli per incontri con donne trans ${cityName}"
"appuntamenti sicuri per persone transgender a ${cityName}"
"trav single ${cityName}"
"vita notturna transgender ${cityName}"
"incontrare transessuali a ${cityName}"
"club per travestiti ${cityName}"

Utilizzare sia forme singolari che plurali (ad esempio, "incontro trans" e "incontri trans").

Incorporare variazioni naturali e rispettose dei termini 'transgender', 'transessuale', 'travestito/crossdresser', 'donna trans', 'uomo trans'. Mentre 'trav' è un termine di ricerca comune, l'articolo dovrebbe prediligere una terminologia più precisa e rispettosa, spiegando eventualmente il contesto d'uso di 'trav' se necessario. L'obiettivo è ampliare la copertura delle query di ricerca e garantire l'inclusività, mantenendo sempre un tono rispettoso e affermativo. Evita ripetizioni forzate o frasi innaturali.

Usare emoji con parsimonia e in modo appropriato (ad esempio, 🏳️‍⚧️, ❤️, ✨, 😊, 🥂) per migliorare la vicinanza emotiva e il divertimento senza appesantire il testo.

Adottare un tono naturale, informativo, empatico e colloquiale — come un consiglio da un amico o un'amica informata e alleata — per mantenere l'articolo caldo, accessibile, umano e autorevole.

Coinvolgere lettrici e lettori con domande retoriche (ad esempio, "Pronta/o a esplorare la vibrante comunità T* di ${cityName}?") e anticipazioni (ad esempio, "Curiosa/o di scoprire i locali più inclusivi per un primo appuntamento a ${cityName}? Continua a leggere!") per mantenere vivo l'interesse.

Incorporare dettagli specifici di ${cityName} rilevanti per la comunità T* e per chi desidera incontrarla, come:

Locali, caffè, o club noti per essere accoglienti e frequentati da **persone transgender, transessuali, e travestiti**.
Eventi annuali specifici (ad esempio, Pride cittadino, serate a tema, festival cinematografici LGBTQ+) che potrebbero favorire incontri.
Fattori culturali o sociali che modellano la scena degli incontri per la **comunità T*** in città (es. presenza di associazioni attive, quartieri storicamente LGBTQ+ friendly).

Citare informazioni credibili e verificate (ad esempio, risorse da associazioni LGBTQ+ locali o nazionali, testimonianze dirette nel rispetto della privacy, articoli o studi sulla vita delle persone T*) per aumentare fiducia e autorevolezza.

Aggiungere una sezione sul clima culturale o sociale di ${cityName} riguardo all'inclusività, ai diritti LGBTQ+, e alla vita sociale delle **persone transgender, transessuali e travestiti**, e il suo impatto sul dating, fornendo un contesto prezioso.

Affrontare diverse prospettive e bisogni: **persone T*** che cercano amicizie, relazioni serie, avventure, o supporto comunitario, e persone cisgender interessate a conoscere la **comunità T*** in modo rispettoso e consapevole.

Opzionalmente, includere una sezione FAQ alla fine per affrontare domande o preoccupazioni comuni sugli incontri con **persone trans, transessuali o travestiti** a ${cityName} (es. "Come posso essere un buon alleato durante un appuntamento?", "Quali sono i termini corretti da usare?", "Esistono gruppi di supporto a ${cityName}?"), migliorando il valore per il lettore.

L'articolo dovrebbe essere celebrativo della diversità, informativo, e lasciare lettrici e lettori entusiaste/i all'idea di interagire con la scena degli incontri **trans, transessuali e travestiti** a ${cityName} in modo positivo e rispettoso.

10 Titoli SEO-Ottimizzati per ${cityName}:

"Incontri Trav e Trans ${cityName}: Guida Definitiva alla Scena T* Locale"
"Migliori Posti per Conoscere Persone Transgender e Travestiti a ${cityName}"
"Consigli per Appuntamenti Rispettosi con Persone Trans e Trav a ${cityName}"
"Vita Notturna Trans e Trav a ${cityName}: Club, Bar ed Eventi Imperdibili"
"Top App per Incontri Trans e Trav a ${cityName} – Connettiti in Sicurezza"
"Comunità Transgender ${cityName}: Risorse, Supporto e Incontri"
"Storie Vere di Incontri Trans e Trav a ${cityName} che Ispirano e Insegnano"
"Guida per Principianti agli Incontri con Persone Transgender a ${cityName}"
"Eventi per la Comunità Trans e Trav a ${cityName}: Socializza e Divertiti"
"Perché ${cityName} è Speciale per Incontri Autentici con Persone Trans e Trav"

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