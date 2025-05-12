import 'dotenv/config'; // Load variables from .env file, ensure dotenv is installed
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs/promises'; // Use promises API of fs
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const modelName = "gemini-2.5-flash-preview-04-17"; // Or your preferred model
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
change our current prompt with this one : Write an SEO-optimized, comprehensive, and detailed italian article (approximately 10,000 characters total) for a blog focused on the gay-friendly scene in the city of ${cityName}. The article must be well-structured, easy to read, and packed with practical, up-to-date information for individuals seeking gay-friendly encounters and experiences in ${cityName}. Use an welcoming, inclusive, and engaging tone to appeal to a diverse audience.

Key Instructions:

Search for Real Data: Use your capabilities to search the web and X posts for current, reliable information about gay-friendly bars, clubs, hotels, events, and dating apps relevant to ${cityName}. Cite sources where appropriate using the provided citation format (e.g.,). If specific venues or events are mentioned in search results, include them with accurate details (e.g., names, addresses, vibes, events).web:<citation_number>
Handle Sparse Data: If limited information is available for ${cityName} (e.g., smaller cities with fewer gay-friendly venues), supplement with general recommendations (e.g., nearby cities like Pescara for Chieti, or online communities) and focus on creating a vibrant narrative. Acknowledge the developing nature of the scene and suggest ways to connect (e.g., local LGBTQ+ groups, social media).
Authenticity: Replace placeholders like "[Nome Bar 1]" with real venue names and details based on search results. If no specific venues are found, describe plausible gay-friendly spaces (e.g., cafes known for inclusivity) based on regional trends, but note the speculative nature transparently.
SEO Optimization: Naturally integrate keywords like "incontri gay ${cityName}", "bar gay-friendly ${cityName}", "eventi gay ${cityName}", "hotel gay-friendly ${cityName}", and "app incontri gay ${cityName}" throughout the article. Do NOT include a "Keywords" list.
Structure: Follow the exact H2/H3 structure provided below. Do not omit any sections. Each section should be detailed, practical, and engaging.
Tone and Style: Maintain an inclusive, friendly, and conversational tone. Avoid overly formal language and make the reader feel welcome and excited to explore ${cityName}.
Citations: When using information from web or X sources, cite them at the end of the relevant paragraph using the format or. Limit citations to three per paragraph.web:<citation_number>post:<citation_number>
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

In Conclusione: ${cityName}, il Tuo Punto di Riferimento per Incontri Gay
Summarize why ${cityName} is a great destination for gay encounters, recapping key venues, events, and tips. Encourage readers to explore the city, connect with the community, and share their experiences. Include a call-to-action (e.g., "Visit ${cityName} and discover its vibrant gay scene!").

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

/**
 * Generates a main image for the article using the specified Gemini image model.
 * @param {GoogleGenerativeAI} genAI - The GoogleGenerativeAI instance.
 * @param {string} articleTitle - The title of the article to base the image on.
 * @param {string} imageFilePath - The full path where the image should be saved.
 * @returns {Promise<boolean>} True if image generation and saving was successful, false otherwise.
 */
async function generateMainImage(genAI, articleTitle, imageFilePath) {
  const imageModelName = "gemini-2.0-flash-preview-image-generation";
  console.log(`    🖼️ Requesting image generation for title: "${articleTitle}" using model ${imageModelName}`);
  const imagePrompt = `Generate a visually appealing, horizontal image suitable for a blog article header, related to the theme of an article titled: "${articleTitle.replace(/"/g, '\\\"')}". Avoid any text in the image. Ensure the output is a single .webp image.`;

  try {
    const fullModelName = imageModelName.startsWith("models/") ? imageModelName : `models/${imageModelName}`;
    console.log(`    📝 Using full model name: ${fullModelName}`);
    
    const imageModel = genAI.getGenerativeModel({ 
      model: imageModelName,
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1
      }
    });
    
    console.log(`    📋 Sending image generation request...`);
    const result = await imageModel.generateContent({
      contents: [{ role: "user", parts: [{ text: imagePrompt }] }],
    });

    // According to the Python example, the response structure might be nested.
    // We need to find the part with inlineData.
    const response = result.response; // Access the full response object
    if (response && response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data && part.inlineData.mimeType === 'image/webp') {
            const base64Image = part.inlineData.data;
            const buffer = Buffer.from(base64Image, 'base64');
            await fs.writeFile(imageFilePath, buffer);
            console.log(`      ✅ Image successfully saved to: ${imageFilePath}`);
            return true;
          }
        }
        console.warn(`      ⚠️ No suitable image/webp part found in Gemini response for title: "${articleTitle}". Parts:`, JSON.stringify(candidate.content.parts, null, 2));
      } else {
        console.warn(`      ⚠️ No content parts found in Gemini response candidate for title: "${articleTitle}". Candidate:`, JSON.stringify(candidate, null, 2));
      }
    } else {
      console.warn(`      ⚠️ No candidates found in Gemini image generation response for title: "${articleTitle}". Response:`, JSON.stringify(response, null, 2));
    }
    return false;
  } catch (error) {
    console.error(`    ❌ Error during image generation for title "${articleTitle}":`, error.message || error);
    if (error.response) {
      console.error('       Gemini API Error Response:', JSON.stringify(error.response, null, 2));
    }
    return false;
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

            articleText = articleText.trim().replace(/^```(?:markdown\s*\n)?/, '').replace(/```$/, '').trim();

            let finalTitle = `${categoryDisplayName} a ${cityName}: Guida Essenziale`;
            let finalDescription = `Scopri tutto su ${categoryDisplayName.toLowerCase()} a ${cityName}.`;

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

            // Image generation call
            let imagePathForFrontmatter = '';
            const imageFileName = `${articleSlug}-main.webp`;
            const fullImageFilePath = path.join(cityInCategoryDir, imageFileName);
            
            console.log(`    ---> ATTEMPTING IMAGE GENERATION for article: "${finalTitle}"`); // DEBUG LINE
            try {
                const imageGenerated = await generateMainImage(genAI, finalTitle, fullImageFilePath);
                if (imageGenerated) {
                    imagePathForFrontmatter = `/content/articles/${categorySlug}/${city.slug}/${imageFileName}`;
                }
            } catch (imgError) {
                console.error(`    ❌ Main error catcher for image generation for "${finalTitle}":`, imgError.message || imgError);
            }

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
image: "${imagePathForFrontmatter}"
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
    console.error("An unexpected error occurred during the article generation process:", error);
}); 