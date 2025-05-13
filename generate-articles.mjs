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
const TARGET_CATEGORY_SLUG_FOR_ALL_CITIES = 'escort'; // IMPORTANT: Set this to the desired category slug.
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
  { slug: 'studentessa', name: 'Studentessa' },
  { slug: 'adulti', name: 'Adulti' },
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

  if (categorySlug === 'escort') {
    // ... (existing prompt for trans) ...
    return `
Scrivi un articolo SEO-ottimizzato in italiano di 10.000 caratteri sugli incontri con persone escort a ${cityName}. L'articolo deve:

${internalLinksSection}
`;
  } else if (categorySlug === 'escort') {
    
    return `
    Scrivi un articolo SEO-ottimizzato in italiano di circa 10.000 caratteri sui servizi escort e la scena degli incontri con escort a ${cityName}. L'articolo deve essere informativo e responsabile, rivolto a un pubblico adulto che cerca tali informazioni.

L'articolo deve:

1.  **Introduzione alla Scena Escort di ${cityName}:**
    *   Iniziare con un'introduzione discreta e informativa che descriva la disponibilità e le caratteristiche generali dei servizi escort a ${cityName}.
    *   Evidenziare la varietà di servizi che potrebbero essere disponibili, se noti (es. escort indipendenti, agenzie, specializzazioni), mantenendo un tono oggettivo.

2.  **Come Trovare Servizi Escort a ${cityName} in Modo Sicuro e Discreto:**
    *   Dettagliare i metodi comuni per trovare escort a ${cityName}, come piattaforme online specializzate, directory verificate o agenzie rinomate.
    *   Enfatizzare l'importanza della verifica dei profili, della lettura di recensioni (se disponibili e affidabili) e dell'uso di canali discreti e sicuri.
    *   Menzionare l'importanza di comprendere i termini del servizio e i costi in anticipo.
    *   Keywords da integrare: "trovare escort ${cityName}", "escort verificate ${cityName}", "annunci escort ${cityName}", "agenzie escort ${cityName}".

3.  **Consigli per un'Esperienza Positiva, Rispettosa e Sicura:**
    *   Fornire consigli pratici per i clienti su come interagire con le escort in modo rispettoso e chiaro.
    *   Sottolineare l'importanza della comunicazione aperta sulle aspettative, i limiti e il consenso da entrambe le parti.
    *   Includere suggerimenti sulla sicurezza personale (es. incontri in luoghi sicuri, informare una persona di fiducia, igiene).
    *   Discutere l'etichetta e la discrezione attese durante e dopo l'incontro.
    *   Keywords: "incontro escort sicuro ${cityName}", "sesso con escort ${cityName} regole", "comunicare con escort", "esperienza escort positiva ${cityName}".

4.  **Comprendere i Servizi Offerti e Gestire le Aspettative:**
    *   Spiegare la gamma di servizi che le escort a ${cityName} potrebbero offrire (es. compagnia per eventi, cene, conversazione, esperienze intime, GFE - GirlFriend Experience), e come questi possono variare.
    *   Affrontare come gestire le proprie aspettative in modo realistico e come chiarire i servizi desiderati (es. "sesso", "scopare", o altri tipi di interazione) in modo consensuale e rispettoso prima dell'incontro.
    *   Sottolineare che ogni escort è un'individua con propri termini e limiti.

5.  **Sicurezza, Privacy e Aspetti Legali (con Disclaimer):**
    *   Discutere l'importanza della privacy per entrambe le parti.
    *   Fornire una nota generale sulla necessità per gli utenti di essere consapevoli e rispettare le leggi locali relative ai servizi escort a ${cityName}. **Includere un disclaimer che l'articolo è a scopo informativo e non incoraggia attività illegali, e che gli utenti sono responsabili di agire in conformità con le leggi vigenti.**
    *   Potrebbe menzionare l'importanza di evitare situazioni di sfruttamento e di interagire solo con professioniste/i consenzienti e maggiorenni.

6.  **Conclusione Informativa:**
    *   Riassumere i punti chiave per un approccio informato, sicuro e rispettoso alla ricerca di servizi escort a ${cityName}.
    *   Rinforzare l'importanza della discrezione e del consenso.

Durante tutto l'articolo:

*   **Keywords:** Integrare in modo fluido e naturale parole chiave rilevanti, inclusi termini espliciti come "sesso escort ${cityName}", "scopare con escort a ${cityName}", "tariffe escort ${cityName}", "escort di lusso ${cityName}", "escort indipendenti ${cityName}", "accompagnatrici ${cityName}" e varianti. Non creare una lista di keywords visibile nel testo.
*   **Linguaggio:** Mantenere un linguaggio adulto, diretto ma professionale e rispettoso. Evitare volgarità eccessive o linguaggio degradante.
*   **Tono:** Informativo, maturo, discreto e non giudicante. L'obiettivo è fornire informazioni utili a chi cerca questi servizi, non a promuoverli in modo sensazionalistico.
*   **Dettagli Locali:** Se possibile e rilevante, menzionare aspetti specifici della scena di ${cityName} (es. zone note per la vita notturna dove tali servizi potrebbero essere più presenti, tipologie di servizi più comuni in città), sempre in modo fattuale e discreto.
*   **Disclaimer sulla Responsabilità:** L'articolo deve chiarire che le informazioni sono fornite per adulti consenzienti e che l'uso dei servizi descritti è una scelta personale che deve avvenire nel rispetto delle leggi e dell'etica.
*   **Originalità:** Assicurarsi che il contenuto sia unico e non una semplice copia di altre fonti.

10 Titoli SEO-Ottimizzati per ${cityName}:

1.  "Guida Escort ${cityName}: Trovare Servizi Sicuri e Discreti"
2.  "Escort a ${cityName}: Tutto Quello che Devi Sapere per un Incontro Rispettoso"
3.  "Servizi Escort ${cityName}: Consigli, Prezzi e Come Prenotare in Sicurezza"
4.  "La Scena Escort di ${cityName}: Guida Completa per Adulti Consapevoli"
5.  "Sesso con Escort a ${cityName}: Aspettative, Sicurezza e Consigli Utili"
6.  "Recensioni Escort ${cityName}: Come Scegliere l'Accompagnatrice Giusta per Te?" (Se si vuole includere un riferimento a come valutare, con cautela)
7.  "Escort di Lusso ${cityName}: Esperienze Esclusive e Servizi Premium"
8.  "Incontri con Escort a ${cityName}: Etichetta e Suggerimenti per Non Sbagliare"
9.  "Tariffe Escort ${cityName}: Cosa Aspettarsi e Come Chiarire i Costi"
10. "Scoprire ${cityName} con un'Escort: Servizi di Compagnia e Intrattenimento"

${internalLinksSection}

**Lunghezza:** Circa 10.000 caratteri.
**FORMATO MARKDOWN:** Output diretto in Markdown.
**NO CODE FENCES:** Non iniziare l'output con \`\`\`markdown.
**STRUTTURA CRUCIALE:** Seguire ESATTAMENTE la struttura H2/H3 specificata (se applicabile nel prompt originale o dedotta dalla sua struttura). Non omettere sezioni.
**RESPONSABILITÀ:** L'articolo deve essere scritto in modo responsabile, enfatizzando la sicurezza, la discrezione, il consenso e il rispetto reciproco. Evitare linguaggio che possa essere interpretato come sfruttamento o che violi le policy di Google o altre normative.
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