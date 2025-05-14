import 'dotenv/config'; // Load variables from .env file
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import fs from 'fs/promises'; // For file system operations
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuration ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const modelName = "gemini-2.5-flash-preview-04-17";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keywordsFilePath = path.join(__dirname, 'keywords.txt');
const BATCH_SIZE = 100;
const CONCURRENCY_LIMIT = 15; // Concurrency for name extraction
const OUTPUT_JSON_FILE = 'influencers.json';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const CONSOLIDATION_BATCH_SIZE = 200; // Batch size for sending names to AI for consolidation
const CONSOLIDATION_DELAY_MS = 1000; // Delay between AI consolidation batches - Will be revised for concurrent approach
const CONSOLIDATION_CONCURRENCY_LIMIT = 15; // Number of consolidation batches to process in parallel

// List of common first names to help filter out non-specific entries.
// This list can be expanded.
const COMMON_FIRST_NAMES = new Set([
    'sofia', 'sara', 'laura', 'anna', 'elena', 'valentina', 'alessia',
    'elisa', 'andrea', 'marco', 'luca', 'francesca', 'giulia', 'chiara',
    'martina', 'federica', 'riccardo', 'davide', 'simone', 'matteo',
    'alessandro', 'giacomo', 'lorenzo', 'gabriele', 'christian', 'daniel',
    // Add more common names as needed, in lowercase
]);


async function loadKeywordsFromFile(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        return fileContent.split('\n').map(kw => kw.trim()).filter(kw => kw);
    } catch (error) {
        console.error(`Error reading keywords file from ${filePath}:`, error);
        return [];
    }
}

async function extractInfluencerNames(keywordsList, model) {
    if (!keywordsList || keywordsList.length === 0) return [];

    const promptTemplate = `Analyze the following list of keyword phrases.
Your goal is to identify distinct individuals (e.g., influencers, celebrities) and for each distinct individual, return ONLY ONE canonical full name.

GUIDELINES:

1.  **Identify Distinct Individuals & Select ONE Canonical Name**:
    Your primary and most critical task is to analyze all keywords and identify *distinct individuals*. For each distinct individual, you must return ONLY ONE canonical full name, even if their name appears in multiple forms across the keywords.

2.  **Recognizing Variations of the Same Person**:
    Closely examine names that are similar. Often, apparent differences are just minor variations of the same person's name. Consider names as belonging to the SAME PERSON if they differ by:
    *   **Minor Typos or Spelling Differences**: Single letter insertions, deletions, or substitutions (e.g., "Jenifer" vs "Jennifer", "Ainett Stephens" vs "Ainette Stephens", "Aisha Sofey" vs "Aishah Sofey"). Treat these as the same person.
    *   **Repeated Letters**: (e.g., "sofiiiiagomez" vs "sofiagomez").
    *   **Spacing & Punctuation**: Differences in spacing, or presence/absence of hyphens or other typical punctuation (e.g., "Sofiagomez" vs "Sofia Gomez", "Mary-Jane" vs "Mary Jane").
    *   **Extraneous Words/Suffixes**: Common suffixes like "leaks", "onlyfans", "xxx" or descriptive words attached to a name (e.g., "Queen Kalin" vs "queenkalinxxx", "sofiagomez leaks"). These usually refer to the same core person.
    *   **Capitalization**: Ignore differences in capitalization when determining if names refer to the same person.

3.  **Choosing the Canonical Name**:
    Once you've identified variations belonging to the same person, choose the single BEST representation as the canonical name. Prefer the form that:
    *   Is the most complete (e.g., "Jane Doe" over "Jane D.").
    *   Uses standard capitalization (e.g., "Sofia Gomez" not "sofia gomez" or "SoFiA GoMeZ").
    *   Has clear spacing between first and last names (e.g., "Sofia Gomez" not "Sofiagomez").
    *   Appears to be the most common or standard spelling. For example, if you see "Aisha Sofey" and "Aishah Sofey", pick one (e.g., "Aisha Sofey") and use it consistently if that person is identified.
    *   Avoids typos or less common spellings if a more standard one is evident (e.g., prefer "Jennifer Smith" if you also see "Jenifer Smith" for the same person).
    *   Excludes extraneous words/suffixes like "leaks", "bio", "xxx" unless they are undeniably part of a widely recognized stage name AND are consistently used.

4.  **Examples of Consolidation (VERY IMPORTANT)**:
    *   Input keywords might contain: "sofia gomez", "sofiiiiagomez pics", "sofiagomez leaks" -> AI should output ONLY: "Sofia Gomez"
    *   Input keywords might contain: "Queen Kalin official", "queenkalinxxx video" -> AI should output ONLY: "Queen Kalin"
    *   Input keywords might contain: "Aisha Sofey profile", "Aishah Sofey gallery" -> AI should output ONLY ONE, e.g.: "Aisha Sofey"
    *   Input keywords might contain: "Ainett Stephens fan page", "Ainette Stephens bio" -> AI should output ONLY ONE, e.g.: "Ainette Stephens" (if 'Ainette' is deemed more standard).

5.  **Full Names Over Fragments**: Prioritize full names (e.g., "Jane Doe") over partial names or apparent nicknames if a full name is present or strongly implied for that individual.

6.  **Single Names (Strict Filter)**: CRITICALLY, AVOID extracting common single first names (e.g., "Sara", "Sofia", "Alex", "Paul"). Only extract a single word as a name if you are VERY confident that this single word is the ENTIRE, well-known public name of a specific influencer AND it's not an extremely common first name by itself. If a phrase *only* contains a common single first name (like just "sofia leaks"), extract NOTHING for that phrase. Prefer longer, more unique single-word names if they must be extracted.

7.  **Ignore Non-Name Keywords**: Discard generic terms, brands, website names, actions, or descriptive words (e.g., 'onlyfans', 'leak', 'fapello', 'tour', 'porn', 'italia', 'leaked videos', 'official site'). Focus solely on the person's name.

8.  **Context is Key**: Use the context of the keywords provided to help determine if a name is plausible as an influencer.


Return ONLY the extracted canonical names, one name per line. For all the keywords you process in this batch, ensure the list of names you return is unique for who you believe are distinct individuals. Do NOT output variations if you've identified a canonical name for them.

Keyword phrases to process:
---------------------------
${keywordsList.join("\\n")}
---------------------------
Extracted canonical names (one name per line, unique for distinct individuals):
`;

    try {
        const result = await model.generateContent(promptTemplate);
        const response = result.response;
        const aiResponseText = response.text();
        const extractedNames = new Set();
        if (aiResponseText) {
            const lines = aiResponseText.trim().split(/\r?\n/);
            for (const line of lines) {
                const name = line.trim();
                // Post-API basic filter: ensure the name is not empty and has some substance
                if (name && name.length > 2) { 
                    const nameParts = name.split(' ');
                    if (nameParts.length >= 2) {
                        extractedNames.add(name); // Good, likely a full name
                    } else if (nameParts.length === 1 && name.length >= 5 && !COMMON_FIRST_NAMES.has(name.toLowerCase())) {
                        // Allow single names if reasonably long (>=5) and NOT in our common list
                        extractedNames.add(name);
                    }
                }
            }
        }
        return Array.from(extractedNames);
    } catch (error) {
        console.error("\n[AI ERROR] Error calling Gemini API for name extraction:", error);
        return [];
    }
}

function generateSlug(name) {
    if (!name) return '';
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

async function consolidateNamesWithAI(rawNamesList, model) {
    if (!rawNamesList || rawNamesList.length === 0) {
        console.log("No raw names provided to consolidate.");
        return [];
    }
    console.log(`\n--- Consolidating ${rawNamesList.length} Raw Names with AI ---`);

    const prompt = `
You will be provided with a list of names and usernames, sorted alphabetically.
Many of these may be variations of the same person's name due to typos, different spellings, abbreviations, or the inclusion of extra words.

Your task is to:
1.  Analyze the entire list and identify groups of names that refer to the SAME distinct individual.
2.  For each distinct individual identified, choose ONE name as the "canonical_name". This should be the most complete, standard, and well-spelled version. Prefer names with standard capitalization and proper spacing.
3.  List all other variations you identified for that individual under "variations". The canonical_name itself should NOT be repeated in its own variations list.
4.  Ensure that each variation appears in only ONE group.

Consider these factors when grouping and choosing the canonical name:
*   Minor typos (e.g., "Jenifer" vs "Jennifer", "Ainett" vs "Ainette").
*   Slight spelling differences (e.g., "Aisha" vs "Aishah").
*   Presence or absence of middle names or initials.
*   Nicknames vs. full names.
*   Extraneous words (e.g., "leaks", "official", "fanpage", "pics", "videos", "xxx") unless they are part of a very distinct and consistent stage name.
*   Spacing and capitalization (prefer standard capitalization and spacing for the canonical_name).

Return your result as a VALID JSON ARRAY of objects. Each object in the array must have the following structure:
{
  "canonical_name": "The chosen canonical name for the individual",
  "variations": ["variation1 found for this person", "variation2", "etc."]
}

If an individual has no variations from the input list (i.e., their name was unique and clear), the "variations" array should be empty or omitted.
The list of names is sorted alphabetically to help you.

Here is the list of names to process:
---------------------------
${rawNamesList.join("\\n")}
---------------------------
JSON output (ensure this is a valid JSON array):
`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        let aiResponseText = response.text(); // Use let to allow modification

        if (aiResponseText) {
            // Clean the AI response text: remove Markdown fences if present
            if (aiResponseText.startsWith("```json")) {
                aiResponseText = aiResponseText.substring(7); // Remove ```json
                if (aiResponseText.endsWith("```")) {
                    aiResponseText = aiResponseText.substring(0, aiResponseText.length - 3); // Remove ```
                }
            }
            aiResponseText = aiResponseText.trim(); // Trim any leading/trailing whitespace

            let consolidatedList = []; // Initialize as empty array
            try {
                // Attempt to parse the JSON response from the AI
                consolidatedList = JSON.parse(aiResponseText);
            } catch (parseError) {
                console.error("\n[AI JSON PARSE ERROR] Failed to parse AI response as JSON.");
                console.error("Problematic AI Response Text causing parse error:\n", aiResponseText);
                console.error("Parse Error Details:", parseError);
                // Let the outer catch handle this as an error to trigger retries or failure for the batch
                throw new Error(`JSON Parse Error: ${parseError.message}`); 
            }
            
            // Further processing: Add slug, ensure 'variations' exists
            const finalInfluencers = consolidatedList.map(entry => ({
                name: entry.canonical_name,
                slug: generateSlug(entry.canonical_name),
                variations: entry.variations || [] // Ensure variations array exists
            })).sort((a,b) => a.name.localeCompare(b.name)); // Sort final list by canonical name

            console.log(`AI consolidated into ${finalInfluencers.length} unique canonical entries.`);
            return finalInfluencers;
        } else {
            console.error("AI consolidation returned no text.");
            return [];
        }
    } catch (error) {
        console.error("\n[AI ERROR] Error during AI name consolidation:", error.message); // Log only message for cleaner top-level error
        // Specific parse errors with text are logged above. If it's another type of error, this will catch it.
        // If the error was a parse error re-thrown from above, it will be caught here.
        // No need to log aiResponseText here again as it would have been logged by the inner catch if it was a parse error.
        return []; // Return empty if error
    }
}

async function main() {
    console.log("--- Script to Extract and Group Influencer Names (using Gemini API) ---");

    if (!GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY not found. Ensure it's set in your .env file.");
        return;
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });
    console.log(`Using Gemini model: ${modelName}`);

    const allKeywords = await loadKeywordsFromFile(keywordsFilePath);
    if (allKeywords.length === 0) {
        console.log("No keywords loaded. Exiting.");
        return;
    }
    console.log(`\nLoaded ${allKeywords.length} keywords. Initial extraction batch size: ${BATCH_SIZE}, Concurrency: ${CONCURRENCY_LIMIT}`);

    const allExtractedRawNames = new Set();
    const nameExtractionTasks = [];

    for (let i = 0; i < allKeywords.length; i += BATCH_SIZE) {
        const batch = allKeywords.slice(i, i + BATCH_SIZE);
        nameExtractionTasks.push(async () => {
            // Add retry logic for initial name extraction if desired, similar to consolidation. For now, it uses existing error handling.
            let attempt = 0;
            let success = false;
            while (attempt < MAX_RETRIES && !success) {
                try {
                    const namesFromBatch = await extractInfluencerNames(batch, model);
                    if (Array.isArray(namesFromBatch)) {
                        namesFromBatch.forEach(name => allExtractedRawNames.add(name));
                    }
                    success = true; // Mark as success if API call and processing don't throw
                } catch (error) { // This catch is for extractInfluencerNames's own potential throws, though it mostly logs internally
                    attempt++;
                    console.error(`   Error in name extraction task (attempt ${attempt}/${MAX_RETRIES}):`, error);
                    if (attempt < MAX_RETRIES) {
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt));
                    } else {
                        console.error(`   Failed extraction task for a batch after ${MAX_RETRIES} attempts.`);
                    }
                }
            }
        });
    }

    console.log(`\nCreated ${nameExtractionTasks.length} name extraction tasks. Processing...`);
    for (let i = 0; i < nameExtractionTasks.length; i += CONCURRENCY_LIMIT) {
        const taskChunk = nameExtractionTasks.slice(i, i + CONCURRENCY_LIMIT);
        await Promise.all(taskChunk.map(task => task()));
        console.log(`   Finished processing ${Math.min(i + CONCURRENCY_LIMIT, nameExtractionTasks.length)} of ${nameExtractionTasks.length} initial extraction tasks.`);
    }

    let extractedNamesArray = Array.from(allExtractedRawNames);
    if (extractedNamesArray.length === 0) {
        console.log("\nNo names were extracted by the API initially. Exiting.");
        console.log("\n--- Script Finished ---");
        return;
    }
    console.log(`\nTotal raw unique names extracted by API: ${extractedNamesArray.length}`);
    
    // Sort raw names alphabetically before sending to consolidation AI
    extractedNamesArray.sort((a, b) => a.localeCompare(b));
    console.log("Raw names sorted alphabetically for consolidation processing.");

    const allConsolidatedInfluencers = [];
    console.log(`\n--- Starting AI Consolidation in Batches ---`);
    console.log(`Consolidation batch size: ${CONSOLIDATION_BATCH_SIZE}, Consolidation concurrency: ${CONSOLIDATION_CONCURRENCY_LIMIT}`);

    const consolidationTasks = [];

    for (let i = 0; i < extractedNamesArray.length; i += CONSOLIDATION_BATCH_SIZE) {
        const batchToConsolidate = extractedNamesArray.slice(i, i + CONSOLIDATION_BATCH_SIZE);
        const batchNumber = Math.floor(i / CONSOLIDATION_BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(extractedNamesArray.length / CONSOLIDATION_BATCH_SIZE);

        consolidationTasks.push(async () => {
            console.log(`   Starting processing for consolidation batch ${batchNumber}/${totalBatches} (names ${i + 1}-${Math.min(i + CONSOLIDATION_BATCH_SIZE, extractedNamesArray.length)})`);
            let attempt = 0;
            let consolidatedBatch = [];
            let success = false;

            while(attempt < MAX_RETRIES && !success) {
                try {
                    consolidatedBatch = await consolidateNamesWithAI(batchToConsolidate, model);
                    success = true; 
                } catch (error) { 
                    attempt++;
                    console.error(`      Attempt ${attempt}/${MAX_RETRIES} failed for consolidation batch ${batchNumber}.`);
                    if (attempt < MAX_RETRIES) {
                        console.log(`      Retrying in ${RETRY_DELAY_MS * attempt / 1000}s...`);
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt));
                    } else {
                        console.error(`      Failed to consolidate batch ${batchNumber} after ${MAX_RETRIES} attempts. Skipping this batch.`);
                    }
                }
            }
            
            if (success && consolidatedBatch && consolidatedBatch.length > 0) {
                // Ensure results are added in a way that can be flattened later
                return consolidatedBatch; 
            } else if (success) { 
                 console.log(`      Consolidation batch ${batchNumber} processed, but returned 0 entries (or was empty).`);
            }
            return []; // Return empty array if batch failed or had no entries
        });
    }

    // Process consolidation tasks concurrently
    console.log(`\nCreated ${consolidationTasks.length} consolidation tasks. Processing with concurrency ${CONSOLIDATION_CONCURRENCY_LIMIT}...`);
    for (let i = 0; i < consolidationTasks.length; i += CONSOLIDATION_CONCURRENCY_LIMIT) {
        const taskChunk = consolidationTasks.slice(i, i + CONSOLIDATION_CONCURRENCY_LIMIT);
        try {
            const chunkResults = await Promise.all(taskChunk.map(task => task()));
            chunkResults.forEach(resultBatch => {
                if (resultBatch && resultBatch.length > 0) {
                    allConsolidatedInfluencers.push(...resultBatch);
                }
            });
            console.log(`   Finished processing a chunk of ${taskChunk.length} consolidation tasks. Total consolidated so far: ${allConsolidatedInfluencers.length}`);
        } catch (error) {
            // This catch is for Promise.all itself, though individual tasks have their own retries.
            console.error(`   Error processing a chunk of consolidation tasks: ${error}. Some results in this chunk may be lost.`);
        }
        
        // Optional: Add a small delay between chunks if API rate limiting becomes an issue with high concurrency
        if (i + CONSOLIDATION_CONCURRENCY_LIMIT < consolidationTasks.length && CONSOLIDATION_DELAY_MS > 0) {
             console.log(`      Waiting for ${CONSOLIDATION_DELAY_MS / 1000}s before next consolidation chunk...`);
             await new Promise(resolve => setTimeout(resolve, CONSOLIDATION_DELAY_MS));
        }
    }

    console.log(`\n--- AI Consolidation Finished ---`);
    console.log(`Total unique canonical entries after all consolidation batches: ${allConsolidatedInfluencers.length}`);

    // Optional: Further de-duplication if names from different AI batches could be identical
    // This might be necessary if the AI, despite instructions, produces an identical canonical_name from two different input batches
    // if those batches contained subtle variations that the AI in one batch resolved one way, and in another batch another way to the same canonical name.
    const finalUniqueInfluencersMap = new Map();
    for (const influencer of allConsolidatedInfluencers) {
        if (!finalUniqueInfluencersMap.has(influencer.slug)) {
            finalUniqueInfluencersMap.set(influencer.slug, influencer);
        } else {
            // If duplicate slug found, merge variations (simple strategy: combine and unique)
            // This is a basic merge. More sophisticated logic could be added if needed.
            const existing = finalUniqueInfluencersMap.get(influencer.slug);
            const combinedVariations = new Set([...existing.variations, ...influencer.variations]);
            // Ensure the canonical name itself is not in variations
            combinedVariations.delete(existing.name); 
            existing.variations = Array.from(combinedVariations);
            console.log(`   Merged duplicate slug entry for: ${existing.name} (slug: ${existing.slug})`);
        }
    }
    const groupedInfluencers = Array.from(finalUniqueInfluencersMap.values()).sort((a,b) => a.name.localeCompare(b.name));
    console.log(`Total unique influencers after final de-duplication pass (by slug): ${groupedInfluencers.length}`);


    if (!groupedInfluencers || groupedInfluencers.length === 0) {
        console.log("No influencers remained after AI consolidation and grouping. Exiting.");
        console.log("\n--- Script Finished ---");
        return;
    }

    console.log("\n--- Writing Influencer Data to JSON ---");
    try {
        await fs.writeFile(OUTPUT_JSON_FILE, JSON.stringify(groupedInfluencers, null, 2));
        console.log(`Successfully wrote ${groupedInfluencers.length} grouped influencers to ${OUTPUT_JSON_FILE}`);
    } catch (error) {
        console.error(`Error writing JSON to file ${OUTPUT_JSON_FILE}:`, error);
    }

    console.log("\n--- Script Finished (Image downloading will be handled by a separate Python script) ---");
}

main().catch(error => {
    console.error("An unexpected error occurred in the main script flow:", error);
}); 