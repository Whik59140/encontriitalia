import 'dotenv/config'; // Load variables from .env file
import { VertexAI } from '@google-cloud/vertexai';

// Configure Vertex AI with us-central1 location as recommended
const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
const location = 'us-central1'; // MUST use this region as noted by user

/**
 * IMPORTANT: Authentication
 * 
 * This script uses Application Default Credentials (ADC) which can be set up in multiple ways:
 * 1. Create a service account and download credentials.json
 * 2. Set GOOGLE_APPLICATION_CREDENTIALS environment variable to point to that file:
 *    $env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your-credentials.json"
 * 
 * The service account needs the following roles:
 * - Vertex AI User
 * - Or more specific roles depending on your needs
 */

async function generateImageWithVertexAI() {
  try {
    console.log(`Initializing Vertex AI with project: ${projectId} in location: ${location}`);
    
    // Initialize Vertex AI with the required project and location
    const vertexAI = new VertexAI({
      project: projectId, 
      location: location
    });
    
    // The model to use - based on user's recommendation
    const modelName = "gemini-2.0-flash-preview-image-generation";
    console.log(`Using model: ${modelName} in ${location}`);
    
    // Create the generative model
    const generativeModel = vertexAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 2048
      }
    });
    
    // The prompt for image generation
    const prompt = "Roma Gay city with donald trump";
    console.log(`Sending prompt: "${prompt}"`);
    
    // Generate content with responseModalities to get image output
    // This parameter structure is based on the user's Vercel AI SDK example
    // For direct Vertex API, we need to adapt accordingly
    // Documentation: https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/generate-images
    
    // Set the parameters for generating content
    const result = await generativeModel.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      // For Vertex AI, we need to use the appropriate generation configuration
      // to get image output along with text
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 2048,
        // Specify response modalities for image generation
        responseModalities: ["TEXT", "IMAGE"]
      }
    });
    
    console.log("Response received");
    const response = result.response;
    
    // Process the response for images
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts) {
        console.log(`Found ${candidate.content.parts.length} parts in the response`);
        
        for (const part of candidate.content.parts) {
          // Handle text output
          if (part.text) {
            console.log("Text response:", part.text);
          }
          
          // Handle image output
          if (part.inlineData && part.inlineData.data) {
            console.log(`Found image data with MIME type: ${part.inlineData.mimeType || "unspecified"}`);
            const base64Image = part.inlineData.data;
            
            // Save the image to a file
            const fs = await import('fs/promises');
            const filename = `flying-bear-${Date.now()}.webp`;
            await fs.writeFile(filename, Buffer.from(base64Image, 'base64'));
            console.log(`✅ Image successfully saved to: ${filename}`);
          }
        }
      } else {
        console.log("No content parts found in the response");
        console.log("Raw response:", JSON.stringify(response, null, 2));
      }
    } else {
      console.log("No candidates found in the response");
      console.log("Raw response:", JSON.stringify(response, null, 2));
    }
  } catch (error) {
    console.error("❌ Error generating image:", error.message);
    if (error.response) {
      console.error('API Error Response:', JSON.stringify(error.response, null, 2));
    }
    // Print the full error for debugging
    console.error(error);
  }
}

// Run the generator
generateImageWithVertexAI().catch(error => {
  console.error("Unexpected error:", error);
}); 