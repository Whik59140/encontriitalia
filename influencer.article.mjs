import 'dotenv/config'; // Load variables from .env file, ensure dotenv is installed
import { GoogleGenerativeAI } from "@google/generative-ai";
// Removed VertexAI import as it's not used for influencer articles
import fs from 'fs/promises'; // Use promises API of fs
import path from 'path';
import { fileURLToPath } from 'url';
import {
  HarmCategory,
  HarmBlockThreshold
} from "@google/generative-ai";

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not defined in .env file or environment variables.");
  process.exit(1);
}

const MODEL_NAME = "gemini-1.5-flash-latest"; // Using flash for speed and cost-effectiveness
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const INPUT_FILE = 'influencers.json';
const OUTPUT_BASE_DIR = path.join(__dirname, 'content', 'articles', 'influencer');
const MAX_OUTPUT_TOKENS = 8192; // Max for gemini-1.5-flash, can be adjusted. 5000 chars ~ 1250-1700 tokens.
const ARTICLE_CONCURRENCY_LIMIT = 5; // Number of influencers to process in parallel in a batch
const ARTICLE_BATCH_SIZE = 20; // Number of influencers to process before a potential delay
const RETRY_DELAY_MS = 2000;
const MAX_RETRIES = 3;
const DELAY_BETWEEN_BATCHES_MS = 1000; // Optional delay

// Define the path to the prompt file
const PROMPT_FILE_PATH = path.join(__dirname, 'influencer_biography_prompt.txt');

// Variable to hold the loaded prompt template
let influencerBiographyPromptTemplate = '';

// --- Initialize Gemini AI ---  
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.7, // Adjust for creativity vs. factualness
  topK: 1,
  topP: 1,
  maxOutputTokens: MAX_OUTPUT_TOKENS,
};

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

// Removed vertexAILocation, TARGET_CATEGORY_SLUG_FOR_ALL_CITIES, TARGET_CITY_SLUG, ALL_CATEGORIES

// --- Helper Functions ---
// Removed capitalizeCityName and capitalizeCategoryName functions

/**
 * Loads the prompt template from the file.
 * This should be called once when the script starts.
 */
async function loadPromptTemplate() {
  try {
    influencerBiographyPromptTemplate = await fs.readFile(PROMPT_FILE_PATH, 'utf8');
    console.log("Influencer biography prompt template loaded successfully.");
  } catch (error) {
    console.error(`Error loading prompt template from ${PROMPT_FILE_PATH}:`, error);
    // Fallback to a very basic prompt or exit, depending on desired behavior
    influencerBiographyPromptTemplate = "Scrivi una breve biografia su ${influencerName}."; 
    // Or process.exit(1) if the prompt is critical
  }
}

/**
 * Reads and parses the influencers.json file.
 * @returns {Promise<Array<object>>} The parsed array of influencer objects.
 */
async function loadInfluencers() {
  try {
    const filePath = path.join(process.cwd(), INPUT_FILE); // Assuming INPUT_FILE is relative to cwd or an absolute path
    const fileContent = await fs.readFile(filePath, 'utf8');
    const influencers = JSON.parse(fileContent);
    if (!Array.isArray(influencers)) {
      throw new Error(`${INPUT_FILE} does not contain a valid JSON array.`);
    }
    console.log(`Loaded ${influencers.length} influencers from ${INPUT_FILE}`);
    return influencers;
  } catch (error) {
    console.error(`Error reading or parsing ${INPUT_FILE}:`, error);
    throw error;
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
 * Creates the detailed prompt for generating an article about an influencer.
 * @param {string} influencerName The name of the influencer.
 * @returns {string} The detailed prompt string.
 */
function createArticlePromptForInfluencer(influencerName) {
  console.log(`   ---> Using detailed biography prompt for ${influencerName}`);
  if (!influencerBiographyPromptTemplate) {
    console.warn("Prompt template not loaded. Using basic fallback.");
    // This case should ideally be handled by ensuring loadPromptTemplate is called and awaited at script start
    return `Scrivi una breve biografia su ${influencerName}.`;
  }
  // Replace the placeholder in the loaded template
  return influencerBiographyPromptTemplate.replace(/\$\{influencerName\}/g, influencerName);
}

async function callGenerativeAiWithRetry(prompt, influencerName, currentTry = 1) {
  console.log(`    Calling Gemini for "${influencerName}" (Attempt ${currentTry})...`);
  try {
    const result = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings,
    });

    let text = '';
    for await (const chunk of result.stream) {
      // Ensure chunk and its nested properties are defined
      if (chunk && chunk.candidates && chunk.candidates[0] && chunk.candidates[0].content && chunk.candidates[0].content.parts) {
        text += chunk.candidates[0].content.parts.map(part => part.text).join('');
      }
    }
    
    // Expecting a more substantial article now, e.g., > 1000 chars for a ~5000 char target
    // This is a rough check; the actual length will vary.
    if (!text.trim() || text.trim().length < 1000) { 
        console.warn(`    AI returned insufficient content for "${influencerName}" (length: ${text.trim().length}). Content: ${text.substring(0,200)}... Retrying if possible.`);
        throw new Error('AI returned empty or insufficient content for a detailed article.');
    }
    console.log(`    Successfully received content for "${influencerName}" (length: ${text.length}).`);
    return text.trim();

  } catch (error) {
    console.error(`    Error calling Gemini API for "${influencerName}" (Attempt ${currentTry}/${MAX_RETRIES}): ${error.message}`);
    if (currentTry < MAX_RETRIES) {
      console.log(`    Retrying for "${influencerName}" in ${RETRY_DELAY_MS / 1000} seconds...`);
      await delay(RETRY_DELAY_MS);
      return callGenerativeAiWithRetry(prompt, influencerName, currentTry + 1);
    } else {
      console.error(`    Max retries reached for "${influencerName}". Prompt started with: ${prompt.substring(0, 150)}...`);
      throw error; 
    }
  }
}

/**
 * Processes article generation for a single influencer.
 * @param {object} influencer - The influencer object (e.g., { name: string, slug: string }).
 * @returns {Promise<{status: string, value?: string, reason?: any}>} Promise resolving with success or failure info.
 */
async function processSingleInfluencer(influencer) {
  const { name, slug } = influencer;
  if (!name || !slug) {
    console.warn(`  [SKIP] Influencer data incomplete (missing name or slug): ${JSON.stringify(influencer)}`);
    return { status: 'skipped', reason: `Influencer data incomplete for ${name || 'Unknown'}` };
  }

  console.log(`[START] Processing Influencer: ${name} (Slug: ${slug})`);

  const influencerDir = path.join(OUTPUT_BASE_DIR, slug);
  const articleFileName = `${slug}.md`;
  const targetFilePath = path.join(influencerDir, articleFileName);

  try {
    await fs.mkdir(influencerDir, { recursive: true });

    try {
      await fs.access(targetFilePath);
      console.log(`  [SKIP] ${name} - File already exists: ${targetFilePath}`);
      return { status: 'skipped', value: `${name} - Skipped: File exists` };
    } catch (error) {
      // File doesn't exist, proceed with generation
    }

    const articlePrompt = createArticlePromptForInfluencer(name);
    // No need to check if !articlePrompt as the new one always returns a string

    console.log(`    Generating article content for ${name}...`);
    let articleText = await callGenerativeAiWithRetry(articlePrompt, name);
    
    // The prompt asks for NO CODE FENCES, so this might not be strictly necessary,
    // but it's a good safeguard.
    articleText = articleText.replace(/^```(?:markdown\\s*\\n)?/, '').replace(/```$/, '').trim();

    // Title and description can be derived from the article content or use simpler ones.
    // For now, let's keep it simple, assuming the AI might include them or they can be manually refined.
    const title = `${name}: Biografia Completa, Età, Patrimonio e Curiosità`; 
    const description = `Scopri tutto su ${name}: biografia, carriera, patrimonio, vita privata e le risposte alle domande più frequenti.`;

    const markdownContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
influencerSlug: "${slug}"
influencerName: "${name}"
date: "${new Date().toISOString().split('T')[0]}"
---

${articleText}
`;

    await fs.writeFile(targetFilePath, markdownContent);
    console.log(`  [SUCCESS] ${name} - Saved: ${targetFilePath}`);
    return { status: 'fulfilled', value: `${name} - Completed` };

  } catch (error) {
    console.error(`  [FAIL] ${name} - Error: `, error.message || error);
    // Log the influencer object for which generation failed for easier debugging
    console.error(`  Failed influencer data: ${JSON.stringify(influencer)}`);
    return { status: 'rejected', reason: `${name} - Failed: ${error.message}` };
  }
}

// --- Main Generation Logic ---
/**
 * Generates articles for all influencers.
 */
async function generateInfluencerArticles() {
  // Load the prompt template at the beginning
  await loadPromptTemplate(); 

  console.log("🚀 Starting Influencer Article Generation Script 🚀");

  const influencers = await loadInfluencers();
  if (!influencers || influencers.length === 0) {
    console.log('No influencers found to process. Exiting.');
    return;
  }

  try {
      await fs.mkdir(OUTPUT_BASE_DIR, { recursive: true });
  } catch (error) {
      console.error(`Error creating base output directory '${OUTPUT_BASE_DIR}':`, error);
      return; 
  }

  console.log(`\n🤖 Starting article generation for ${influencers.length} influencers. Concurrency: ${ARTICLE_CONCURRENCY_LIMIT}, Batch Size: ${ARTICLE_BATCH_SIZE}`);

  let processedCount = 0;
  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const totalInfluencers = influencers.length;

  for (let i = 0; i < totalInfluencers; i += ARTICLE_BATCH_SIZE) {
    const batchInfluencers = influencers.slice(i, i + ARTICLE_BATCH_SIZE);
    console.log(`--- Processing Batch ${Math.floor(i / ARTICLE_BATCH_SIZE) + 1} of ${Math.ceil(totalInfluencers / ARTICLE_BATCH_SIZE)} (Size: ${batchInfluencers.length}) --- `);
    
    const taskChunks = [];
    for (let j = 0; j < batchInfluencers.length; j += ARTICLE_CONCURRENCY_LIMIT) {
        taskChunks.push(batchInfluencers.slice(j, j + ARTICLE_CONCURRENCY_LIMIT));
    }

    for (const chunk of taskChunks) {
        const promises = chunk.map(influencer => processSingleInfluencer(influencer));
        const results = await Promise.allSettled(promises);
        
        results.forEach(result => {
            processedCount++;
            if (result.status === 'fulfilled') {
                successCount++;
            } else if (result.status === 'rejected') { // Simplified from previous version
                failedCount++;
            } else { // Assuming 'skipped' is the other main case from processSingleInfluencer
                skippedCount++;
            }
        });
        console.log (`  Batch progress: ${processedCount - i}/${batchInfluencers.length} influencers in current batch processed. Total overall: ${processedCount}/${totalInfluencers}`);
        
        if (taskChunks.indexOf(chunk) < taskChunks.length - 1) {
          console.log(`    Delaying ${DELAY_BETWEEN_BATCHES_MS / 1000}s before next concurrent chunk within batch... (if configured > 0)`);
          if (DELAY_BETWEEN_BATCHES_MS > 0) await delay(DELAY_BETWEEN_BATCHES_MS);
        }
    }
    console.log(`--- Batch ${Math.floor(i / ARTICLE_BATCH_SIZE) + 1} Complete ---`);
    if (i + ARTICLE_BATCH_SIZE < totalInfluencers && DELAY_BETWEEN_BATCHES_MS > 0) {
       console.log(`   Delaying ${DELAY_BETWEEN_BATCHES_MS / 1000}s before next major batch... (if configured > 0)`);
       await delay(DELAY_BETWEEN_BATCHES_MS); 
    }
  }

  console.log("\n--- Generation Summary ---");
  console.log(`Total Influencers: ${totalInfluencers}`);
  console.log(`Successfully Generated: ${successCount}`);
  console.log(`Skipped (Already Exist, No Prompt, Bad Data): ${skippedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log("--- Influencer article generation complete! ---");
}

// --- Start Generation ---
generateInfluencerArticles().catch(error => {
    console.error("An unexpected critical error occurred during the article generation process:", error);
    process.exit(1);
}); 