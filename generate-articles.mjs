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
const CONCURRENCY_LIMIT = 5; // Number of cities to process in parallel

// --- Location for Vertex AI ---
const vertexAILocation = 'us-central1'; // Required for image generation

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !! IMPORTANT: SET THIS TO THE CATEGORY SLUG YOU WANT TO GENERATE FOR ALL CITIES !!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const TARGET_CATEGORY_SLUG_FOR_ALL_CITIES = 'gay'; // IMPORTANT: Set this to the desired category slug.
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

  // Construct the internal links markdown part if data exists
  const internalLinksSection = relatedCitiesData && relatedCitiesData.length > 0 
    ? `\n\n## Esplora Altre Città nella Regione\nScrivi un breve paragrafo che incoraggi i lettori a esplorare altre città vicine nella stessa regione per incontri ${categoryDisplayName}, menzionando e linkando le seguenti guide: ${relatedCitiesData.map(c => `[${c.name}](/${c.slug}/${categorySlug}/incontri-${categorySlug}-in-${c.slug})`).join(', ')}.`
    : ''; // Empty string if no related cities

  if (categorySlug === 'gay') {
    return `
change our current prompt with this one : Write an SEO-optimized, comprehensive, and detailed italian article (approximately 10,000 characters total) for a blog focused on the gay-friendly scene in the city of ${cityName}. The article must be well-structured, easy to read, and packed with practical, up-to-date information for individuals seeking gay-friendly encounters and experiences in ${cityName}. Use an welcoming, inclusive, and engaging tone to appeal to a diverse audience.

Key Instructions:

Search for Real Data: Use your capabilities to search the web and X posts for current, reliable information about gay-friendly bars, clubs, hotels, events, and dating apps relevant to ${cityName}. If specific venues or events are mentioned in search results, include them with accurate details (e.g., names, addresses, vibes, events).
Handle Sparse Data: If limited information is available for ${cityName} (e.g., smaller cities with fewer gay-friendly venues), supplement with general recommendations (e.g., nearby cities like Pescara for Chieti, or online communities) and focus on creating a vibrant narrative. Acknowledge the developing nature of the scene and suggest ways to connect (e.g., local LGBTQ+ groups, social media).
Authenticity: Replace placeholders like "[Nome Bar 1]" with real venue names and details based on search results. If no specific venues are found, describe plausible gay-friendly spaces (e.g., cafes known for inclusivity) based on regional trends, but note the speculative nature transparently.
SEO Optimization: Naturally integrate keywords like "incontri gay ${cityName}", "bar gay-friendly ${cityName}", "eventi gay ${cityName}", "hotel gay-friendly ${cityName}", and "app incontri gay ${cityName}" throughout the article. Do NOT include a "Keywords" list.
Structure: Follow the exact H2/H3 structure provided below. Do not omit any sections. Each section should be detailed, practical, and engaging.
Tone and Style: Maintain an inclusive, friendly, and conversational tone. Avoid overly formal language and make the reader feel welcome and excited to explore ${cityName}.
Output Format: Provide the article directly in Markdown format. Do NOT use code fences . Ensure the output is clean and ready for publication.
Length: Aim for approximately 10,000 characters, including spaces, to ensure depth and comprehensiveness.
No Placeholder Content: Avoid generic placeholders (e.g., "[Nome Bar 1]"). Use real or reasonably inferred names and details based on research.
Article Structure and Content:

Title (H1): Incontri Gay a ${cityName}: La Guida Definitiva ai Migliori Luoghi ed Eventi

Meta Description (150-160 characters): Scopri i migliori bar, hotel, club ed eventi per incontri gay a ${cityName}. Guida completa alla scena gay con consigli pratici!

Perché ${cityName} è una Meta Ideale per gli Incontri Gay?
Introduce ${cityName} as a welcoming destination for the LGBTQ+ community. Highlight its cultural, historical, or social aspects that make it appealing for gay travelers or locals. Mention any known inclusivity efforts (e.g., pride events, progressive policies) or the general vibe of the city. If ${cityName} has a developing gay scene, acknowledge it positively and suggest its potential for authentic connections.

I Migliori Bar Gay-Friendly a ${cityName} per Socializzare
Provide an overview of the gay-friendly bar scene in ${cityName}. Use search results to identify at least 2–3 specific bars (if available). For each bar, include its name, address, atmosphere, offerings (e.g., drinks, events), and why it's great for meeting people. If no specific bars are found, describe inclusive cafes or bars in ${cityName} known for welcoming diverse crowds, or suggest nearby cities.

[Real Bar Name 1]: L'Icona della Scena Gay di ${cityName}
Describe the first bar in detail (e.g., vibe, clientele, events like karaoke or drag shows, drink specialties). Include practical info like address, hours, and social media for event updates. Explain why it's a must-visit for gay visitors or locals.

[Real Bar Name 2]: Atmosfera Rilassata per Nuove Connessioni
Detail the second bar, focusing on its unique features (e.g., cozy setting, themed nights, outdoor seating). Highlight how it fosters connections and any special events. Include practical details and tips for visiting.

I Migliori Club per la Vita Notturna Gay a ${cityName}
List and describe gay-friendly clubs or nightlife venues in ${cityName} based on search results. Focus on dance clubs, cruising bars, or inclusive nightlife spots. Include details like music genres, cover charges, and event schedules. If no clubs are found, mention nightlife in nearby cities or alternative social spaces (e.g., bars with late-night vibes).

Hotel Gay-Friendly a ${cityName}: Dove Soggiornare
Recommend 2–3 gay-friendly hotels or accommodations in ${cityName} based on search results (e.g., from sites like misterb&b). Include details like location, amenities, price range, and why they're welcoming to LGBTQ+ guests. If specific gay-friendly hotels are unavailable, suggest inclusive boutique hotels or Airbnb options with positive reviews for diversity.

Eventi e Festival Gay a ${cityName}: Quando Partecipare
Highlight key LGBTQ+ events in ${cityName} (e.g., pride parades, film festivals, community gatherings) based on search results. Include dates, locations, and what to expect. If no events are found, mention regional events (e.g., Abruzzo Pride for Chieti) or suggest checking local LGBTQ+ group pages for pop-up events.

App e Piattaforme per Incontri Gay a ${cityName}
Discuss popular dating apps and platforms (e.g., Grindr, Scruff, Hornet) used in ${cityName}. Explain their features, user base, and tips for safe usage. Mention local online communities or forums (e.g., Arcigay groups) if available. Include any city-specific platforms or social media groups found in search results.

Consigli Pratici per Incontri Gay Sicuri e Divertenti a ${cityName}
Offer practical tips for safe and enjoyable gay encounters in ${cityName}. Cover topics like meeting in public spaces, respecting local culture, using verified apps, and staying aware of surroundings. Include advice on navigating smaller cities if ${cityName} has a limited scene.

Risorse Locali per Esplorare la Scena Gay di ${cityName}
Highlight local LGBTQ+ organizations, community centers, or social media groups in ${cityName} (e.g., Arcigay Chieti). Explain how they support the community and help visitors connect. If no local groups exist, suggest regional or national resources and online communities.
${internalLinksSection}
In Conclusione: ${cityName}, il Tuo Punto di Riferimento per Incontri Gay
Summarize why ${cityName} is a great destination for gay encounters, recapping key venues, events, and tips. Encourage readers to explore the city, connect with the community, and share their experiences. Include a call-to-action (e.g., "Visit ${cityName} and discover its vibrant gay scene!").

**LUNGHEZZA:** Circa 10.000 caratteri.
**FORMATO MARKDOWN:** Output diretto in Markdown.
**NO CODE FENCES:** Non iniziare l'output con \`\`\`markdown.
**STRUTTURA CRUCIALE:** Seguire ESATTAMENTE la struttura H2/H3 specificata. Non omettere sezioni.
**KEYWORDS:** Integrare keywords naturalmente. NON includere le liste "Keywords: ...".
`;
  } else if (categorySlug === 'milf') {
    console.warn(`      --> Placeholder prompt for 'milf' category. IMPLEMENT THIS! Include internal links.`);
    return `**Titolo SEO:** Incontri MILF a ${cityName}: Scopri Dove Trovarle\\n\\n**Meta Description:** Guida agli incontri MILF a ${cityName}.\\n\\n## Introduzione alle MILF di ${cityName}\\n(Scrivi qui...)${internalLinksSection}\\n## Conclusione`;
  } else if (categorySlug === 'donne') {
    console.warn(`      --> Placeholder prompt for 'donne' category. IMPLEMENT THIS! Include internal links.`);
    return `**Titolo SEO:** Incontri Donne a ${cityName}: Guida Completa\\n\\n**Meta Description:** Trova incontri con donne a ${cityName}.\\n\\n## Donne a ${cityName}\\n(Scrivi qui...)${internalLinksSection}\\n## Conclusione`;
  }
  // ... Add else if blocks for: 'ragazze', 'trans', 'trav', 'escort', 'studentessa', 'adulti'
  // Make sure to add ${internalLinksSection} to their prompts before the conclusion.

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

/**
 * Generates a main image for the article using Vertex AI and Gemini model.
 * @param {string} articleTitle - The title of the article to base the image on.
 * @param {string} imageFilePath - The full path where the image should be saved.
 * @param {string} cityName - The city name for the article.
 * @param {string} categoryName - The category name for the article.
 * @returns {Promise<{success: boolean, altText: string}>} Object with success status and alt text if successful
 */
async function generateMainImage(articleTitle, imageFilePath, cityName, categoryName) {
  try {
    if (!GOOGLE_CLOUD_PROJECT_ID) {
      console.error(`    ❌ GOOGLE_CLOUD_PROJECT_ID not found in environment variables. Required for image generation.`);
      return { success: false, altText: "" };
    }
    
    console.log(`    🖼️ Initializing Vertex AI with project: ${GOOGLE_CLOUD_PROJECT_ID} in location: ${vertexAILocation}`);
    
    // Initialize Vertex AI with the required project and location
    const vertexAI = new VertexAI({
      project: GOOGLE_CLOUD_PROJECT_ID, 
      location: vertexAILocation
    });
    
    // The model to use - based on user's recommendation
    const imageModelName = "gemini-2.0-flash-preview-image-generation";
    console.log(`    📝 Using model: ${imageModelName} in ${vertexAILocation}`);
    
    // Create the generative model
    const generativeModel = vertexAI.getGenerativeModel({
      model: imageModelName,
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 2048
      }
    });
    
    // Prepare a prompt for image generation with city, category, and Donald Trump
    const imagePrompt = `Generate a visually appealing, horizontal image for a blog article about ${categoryName} in ${cityName} with Donald Trump. The image should be professional and appropriate for a blog. Avoid any text in the image.`;
    console.log(`    📋 Sending image generation prompt: "${imagePrompt}"`);
    
    // Generate content with responseModalities to get image output
    const result = await generativeModel.generateContent({
      contents: [{ role: "user", parts: [{ text: imagePrompt }] }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 2048,
        responseModalities: ["TEXT", "IMAGE"]
      }
    });
    
    console.log("    ✅ Response received from Vertex AI");
    const response = result.response;
    
    // Default alt text in case we don't get a description
    let altText = `Featured image for article: ${articleTitle}`;
    
    // Process the response for images
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts) {
        console.log(`      Found ${candidate.content.parts.length} parts in the response`);
        
        for (const part of candidate.content.parts) {
          // Use text from response as alt text if available
          if (part.text) {
            // Extract a concise alt text from the description (first sentence or up to 150 chars)
            const textDescription = part.text.trim();
            // Get first sentence or first 150 chars for alt text
            const firstSentenceMatch = textDescription.match(/^.*?[.!?](?:\s|$)/);
            if (firstSentenceMatch) {
              altText = firstSentenceMatch[0].trim();
            } else {
              altText = textDescription.substring(0, 150);
              if (textDescription.length > 150) altText += '...';
            }
            console.log(`      Using alt text: "${altText.substring(0, 100)}${altText.length > 100 ? '...' : ''}"`);
          }
          
          // Handle image output
          if (part.inlineData && part.inlineData.data) {
            console.log(`      Found image data with MIME type: ${part.inlineData.mimeType || "unspecified"}`);
            const base64Image = part.inlineData.data;
            
            // Save the image to the specified file path
            await fs.writeFile(imageFilePath, Buffer.from(base64Image, 'base64'));
            console.log(`      ✅ Image successfully saved to: ${imageFilePath}`);
            return { success: true, altText };
          }
        }
        console.warn(`      ⚠️ No image data found in the response parts.`);
      } else {
        console.warn(`      ⚠️ No content parts found in the response candidate.`);
      }
    } else {
      console.warn(`      ⚠️ No candidates found in the response.`);
    }
    
    return { success: false, altText: "" };
    } catch (error) {
    console.error(`    ❌ Error during image generation for title "${articleTitle}":`, error.message || error);
    if (error.response) {
      console.error('       API Error Response:', JSON.stringify(error.response, null, 2));
    }
    return { success: false, altText: "" };
  }
}

// Function to list available models (temporary for debugging)
/*
async function listAvailableModels(genAI) {
  console.log("\n--- Listing Available Models ---");
  try {
    const { models } = await genAI.listModels();
    for (const m of models) {
      if (m.supportedGenerationMethods.includes('generateContent')) { // Check if it supports the method we use
        console.log(`Model: ${m.name} - Display Name: ${m.displayName} - Supports generateContent`);
        console.log(`  Supported Generation Methods: ${m.supportedGenerationMethods.join(', ')}`);
        // We are particularly interested in models that might indicate image generation capabilities by name or description
        if (m.name.includes('image') || m.name.includes('vision') || m.displayName.toLowerCase().includes('image')) {
            console.log(`  ^^^ This model might be relevant for image generation.`);
        }
      }
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
  console.log("--- Finished Listing Models ---\n");
}
*/

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


    // Generate Image
    let imagePathForFrontmatter = '';
    let imageAltText = '';
    const imageFileName = `${articleSlug}-main.webp`;
    const publicImageDir = path.join(process.cwd(), 'public', 'content', 'articles', categorySlug, city.slug);
    const fullImageFilePath = path.join(publicImageDir, imageFileName);
    imagePathForFrontmatter = `/content/articles/${categorySlug}/${city.slug}/${imageFileName}`;

    try {
      await fs.mkdir(publicImageDir, { recursive: true });
      console.log(`    Generating image for ${cityName} (${categoryName})...`);
      const imageResult = await generateMainImage(finalTitle, fullImageFilePath, cityName, categoryName);
      if (imageResult.success) {
        imageAltText = imageResult.altText;
        console.log(`      ✅ Image generated for ${cityName}`);
      } else {
        imagePathForFrontmatter = ''; // Don't link to a failed image
        console.log(`      ⚠️ Image generation failed for ${cityName}`);
      }
    } catch (imgError) {
      console.error(`    ❌ Error during image generation/saving for ${cityName}:`, imgError.message || imgError);
      imagePathForFrontmatter = '';
    }

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

${imagePathForFrontmatter ? `![${imageAltText.replace(/"/g, '\\"')}](${imagePathForFrontmatter})\n\n` : ''}${articleText}
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