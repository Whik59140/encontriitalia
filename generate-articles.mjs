import 'dotenv/config'; // Load variables from .env file, ensure dotenv is installed
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs/promises'; // Use promises API of fs
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const modelName = "gemini-2.0-flash-lite"; // Or your preferred model
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputBaseDir = path.join(__dirname, 'content', 'articles');
const geoJsonPath = path.join(__dirname, 'lib', 'data', 'geo.json');
const requestDelay = 10000; // Milliseconds between requests
const maxOutputTokens = 8192;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! IMPORTANT: SET THIS TO THE CATEGORY SLUG YOU WANT TO GENERATE FOR ALL CITIES !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let TARGET_CATEGORY_SLUG_FOR_ALL_CITIES = ''; // Will be set after loading geo.json

// --- Helper Functions ---

/**
 * Reads and parses the geo.json file.
 * @returns {Promise<object>} The parsed geo data with cities and categories.
 */
async function getGeoData() {
  try {
    const data = await fs.readFile(geoJsonPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading or parsing geo.json at ${geoJsonPath}:`, error);
    throw error; // Re-throw to stop execution if geo data is essential
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
 * @returns {string|null} The detailed prompt string, or null if no prompt is defined for the category.
 */
function getPromptForCategory(categorySlug, cityName, categoryDisplayName) {
  console.log(`   Generating prompt for category '${categoryDisplayName}' in '${cityName}'`);

  if (categorySlug === 'gay') {
    return `
Scrivi un articolo SEO ottimizzato, completo e dettagliato (circa 10.000 caratteri totali), per un blog focalizzato sulla scena ${categoryDisplayName} della città di ${cityName}.

L'articolo deve essere ben strutturato e di facile lettura, con informazioni utili e pratiche per chi cerca incontri ${categoryDisplayName}.
Utilizza un tono accogliente, inclusivo e coinvolgente.

**Titolo SEO:** Incontri ${categoryDisplayName} a ${cityName}: La Guida Definitiva ai Migliori Luoghi ed Eventi

**Meta Description (150-160 caratteri):** Scopri i migliori bar, hotel, club ed eventi per incontri ${categoryDisplayName} a ${cityName}. Guida completa alla scena ${categoryDisplayName} con consigli pratici!

Formato Articolo: Markdown

## Perché ${cityName} è una Meta Ideale per gli Incontri ${categoryDisplayName}?
(Introduci la città...)

## I Migliori Bar ${categoryDisplayName}-Friendly a ${cityName} per Socializzare
(Presenta i bar...)

### [Nome Bar 1]: L'Icona della Scena ${categoryDisplayName} di ${cityName}
(Descrivi il bar...)

### [Nome Bar 2]: Atmosfera Rilassata per Nuove Connessioni
(Dettaglia il bar...)

## I Migliori Club per la Vita Notturna ${categoryDisplayName} a ${cityName}
(Elenca i club...)

## Hotel ${categoryDisplayName}-Friendly a ${cityName}: Dove Soggiornare
(Consiglia hotel...)

## Eventi e Festival ${categoryDisplayName} a ${cityName}: Quando Partecipare
(Elenca eventi chiave...)

## App e Piattaforme per Incontri ${categoryDisplayName} a ${cityName}
(Descrivi le app...)

## Consigli Pratici per Incontri ${categoryDisplayName} Sicuri e Divertenti a ${cityName}
(Fornisci suggerimenti...)

## Risorse Locali per Esplorare la Scena ${categoryDisplayName} di ${cityName}
(Evidenzia il valore di associazioni...)

(.... CONTINUA CON TUTTE LE ALTRE SEZIONI DEL TUO PROMPT DETTAGLIATO ...)

## In Conclusione: ${cityName}, il Tuo Punto di Riferimento per Incontri ${categoryDisplayName}
(Riepiloga...)

**LUNGHEZZA:** Circa 10.000 caratteri.
**FORMATO MARKDOWN:** Output diretto in Markdown.
**NO CODE FENCES:** Non iniziare l'output con \`\`\`markdown.
**STRUTTURA CRUCIALE:** Seguire ESATTAMENTE la struttura H2/H3 specificata. Non omettere sezioni.
**KEYWORDS:** Integrare keywords naturalmente. NON includere le liste "Keywords: ...".
`;
  } else if (categorySlug === 'milf') {
    console.warn(`      --> Placeholder prompt for 'milf' category. IMPLEMENT THIS!`);
    return `**Titolo SEO:** Incontri MILF a ${cityName}: Scopri Dove Trovarle\\n\\n**Meta Description:** Guida agli incontri MILF a ${cityName}.\\n\\n## Introduzione alle MILF di ${cityName}\\n(Scrivi qui...)`;
  } else if (categorySlug === 'donne') {
    console.warn(`      --> Placeholder prompt for 'donne' category. IMPLEMENT THIS!`);
    return `**Titolo SEO:** Incontri Donne a ${cityName}: Guida Completa\\n\\n**Meta Description:** Trova incontri con donne a ${cityName}.\\n\\n## Donne a ${cityName}\\n(Scrivi qui...)`;
  }
  // ... Add else if blocks for: 'ragazze', 'trans', 'trav', 'escort', 'studentessa', 'adulti'
  // For each, provide a unique, detailed prompt structure similar to the "gay" example.

  else {
    console.warn(`      --> No specific prompt defined for category slug '${categorySlug}'. Skipping.`);
    return null; // Or return a very generic fallback prompt if you prefer
  }
}

/**
 * Delays execution for a specified number of milliseconds.
 * @param {number} ms The number of milliseconds to delay.
 * @returns {Promise<void>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Main Generation Logic ---
/**
 * Generates articles for all cities and specified categories.
 */
async function generateArticles() {
    if (!GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY not found in environment variables. Ensure it's set in your .env file.");
        return;
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });

    let geoData;
    try {
        geoData = await getGeoData();
        if (!geoData.categories || geoData.categories.length === 0) {
            console.error("ERROR: No categories found in geo.json. Cannot determine target category.");
            return;
        }
        // Set the target category slug to the first one by default
        TARGET_CATEGORY_SLUG_FOR_ALL_CITIES = geoData.categories[0].slug;
        console.log(`INFO: Targeting category slug '${TARGET_CATEGORY_SLUG_FOR_ALL_CITIES}' for article generation across all cities.`);
        console.log(`      To change this, edit the TARGET_CATEGORY_SLUG_FOR_ALL_CITIES variable in the script.`);

    } catch (error) {
        // Error already logged by getGeoData
        return; // Stop if geoData couldn't be loaded
    }

    const { cities, categories: allCategories } = geoData;

    if (!cities || cities.length === 0) {
        console.error("ERROR: Cities are missing or empty in geo.json.");
        return;
    }

    const targetCategoryObject = allCategories.find(cat => cat.slug === TARGET_CATEGORY_SLUG_FOR_ALL_CITIES);

    if (!targetCategoryObject) {
        console.error(`ERROR: The target category slug '${TARGET_CATEGORY_SLUG_FOR_ALL_CITIES}' was not found in the global categories list in geo.json.`);
        return;
    }

    console.log(`Starting article generation test for the first city: ${cities[0].name}`);
    // --- END TEST MODIFICATION ---

    // Ensure the main articles directory exists (base for category folders)
    try {
        await fs.mkdir(outputBaseDir, { recursive: true });
    } catch (error) {
        console.error(`Error creating base output directory '${outputBaseDir}':`, error);
        return; 
    }

    for (let i = 0; i < cities.length; i++) {
        const city = cities[i];
        const cityName = capitalizeCityName(city.name);
        
        const categorySlug = targetCategoryObject.slug; // This is the TARGET_CATEGORY_SLUG_FOR_ALL_CITIES
        const categoryDisplayName = capitalizeCategoryName(targetCategoryObject.name);

        // New directory structure: content/articles/[categorySlug]/[citySlug]/
        const categorySpecificDir = path.join(outputBaseDir, categorySlug);
        const cityInCategoryDir = path.join(categorySpecificDir, city.slug);

        try {
            await fs.mkdir(cityInCategoryDir, { recursive: true });
        } catch (error) {
            console.error(`Error creating directory '${cityInCategoryDir}':`, error);
            continue; // Skip to next city if its directory cannot be created
        }

        console.log(`
[City ${i + 1}/${cities.length}] Processing city: ${cityName} (slug: ${city.slug}) for category: ${categoryDisplayName}`);

        // New article slug and filename format
        const articleSlug = `incontri-${categorySlug}-in-${city.slug}`;
        const targetFileName = `${articleSlug}.md`;
        const targetFilePath = path.join(cityInCategoryDir, targetFileName);

        console.log(`  Preparing for: ${articleSlug}, Filename: ${targetFileName} at ${targetFilePath}`);

        // Check if file already exists
        try {
            await fs.access(targetFilePath);
            console.log(`    Skipping '${targetFileName}', file already exists.`);
            continue; // Skip to next city's processing for this category
        } catch (error) {
            // File doesn't exist, proceed
        }

        const prompt = getPromptForCategory(categorySlug, cityName, categoryDisplayName);

        if (!prompt) {
            console.log(`    No prompt generated for ${categoryDisplayName} in ${cityName}. Skipping.`);
            continue; // Skip to next city
        }
           
        console.log(`    Generating article for ${categoryDisplayName} in ${cityName}... (this may take a while)`);

        try {
            const generationConfig = { temperature: 0.7, topK: 1, topP: 1, maxOutputTokens: maxOutputTokens };

            // Actual Gemini API call using generateContentStream
            const request = {
                contents: [{ role: "user", parts: [{text: prompt}] }],
                generationConfig: generationConfig,
            };

            const result = await model.generateContentStream(request);
            
            let articleText = '';
            console.log('      Receiving stream...');
            for await (const chunk of result.stream) {
                try {
                    const chunkText = chunk.text();
                    process.stdout.write('.'); // Indicate progress
                    articleText += chunkText;
                } catch (streamError) {
                    console.error('\n      Error processing stream chunk:', streamError);
                    // Decide if you want to continue with partial text or throw
                    // For now, we log and continue, potentially resulting in partial content
                }
            }
            console.log('\n      Stream finished.');

            articleText = articleText.trim().replace(/^```(?:\w*\s*\n)?/, '');

            let finalTitle = `${categoryDisplayName} a ${cityName}: Guida Essenziale`;
            let finalDescription = `Scopri tutto su ${categoryDisplayName.toLowerCase()} a ${cityName}.`;

            const titleMatch = articleText.match(/^\\*\\*Titolo(?: SEO)?:\*\\*\\s*(.+)/im);
            if (titleMatch && titleMatch[1]) {
                finalTitle = titleMatch[1].trim();
                articleText = articleText.replace(titleMatch[0], '').trim();
            }

            const metaDescMatch = articleText.match(/^\\*\\*Meta Description(?: \\(\\d+-\\d+ caratteri\\))?:\*\\*\\s*(.+)/im);
            if (metaDescMatch && metaDescMatch[1]) {
                finalDescription = metaDescMatch[1].trim();
                articleText = articleText.replace(metaDescMatch[0], '').trim();
            }
           
            articleText = articleText.replace(/^\\*Keywords:.*$/gim, '');
            articleText = articleText.replace(/\\n{3,}/g, '\\n\\n').trim();

            // Update frontmatter to reflect the new structure and slugs
            const markdownContent = `---
title: "${finalTitle.replace(/"/g, '\\"')}"
description: "${finalDescription.replace(/"/g, '\\"')}"
articleSlug: "${articleSlug}" 
categorySlug: "${categorySlug}"
citySlug: "${city.slug}"
date: "${new Date().toISOString().split('T')[0]}"
cityName: "${cityName}"
categoryName: "${categoryDisplayName}"
---

${articleText}
`;
            await fs.writeFile(targetFilePath, markdownContent);
            console.log(`    ✅ Successfully saved: ${targetFileName} in ${cityInCategoryDir}`);

        } catch (error) {
            console.error(`    ❌ Error generating or saving for ${categoryDisplayName} in ${cityName}:`, error.message || error);
            if (error.message && error.message.includes('GEMINI_API_KEY')) {
                console.error("       Please ensure your GEMINI_API_KEY is correctly set in the .env file and a .env file exists in the root.");
                return; // Stop further processing if API key is the issue
            }
        }

        // No inner loop for categories, so delay logic applies after each city for the target category
        if (i < cities.length - 1) { 
           console.log(`    ⏳ Waiting ${requestDelay / 1000}s before next request (for the next city)...`);
           await delay(requestDelay);
        }
    }

    console.log("\nGeneration process complete!");
}

// --- Start Generation ---
generateArticles().catch(error => {
    console.error("An unexpected error occurred during the article generation process:", error);
}); 