# Vertex AI Image Generator Guide

This guide will help you set up and use the Vertex AI Image Generator tool with the `gemini-2.0-flash-exp-image-generation` model in the correct region (us-central1).

## Prerequisites

Before you begin, make sure you have:

1. A Google Cloud account with billing enabled
2. The Vertex AI API enabled in your project
3. Node.js installed (v16 or higher recommended)
4. A service account with appropriate permissions (Vertex AI User)

## Step 1: Set Up Google Cloud Project

### Create a Project (if you don't have one)

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Click on the project dropdown at the top of the page
3. Click "New Project"
4. Give your project a name and click "Create"

### Enable the Vertex AI API

1. Go to [Vertex AI API](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com)
2. Make sure your project is selected
3. Click "Enable"

## Step 2: Create a Service Account

1. Go to [IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Click "Create Service Account"
3. Enter a name (e.g., "vertex-ai-image-generator")
4. Click "Create and Continue"
5. Add the "Vertex AI User" role
6. Click "Done"
7. Find your new service account in the list
8. Click the three dots menu (⋮) and select "Manage keys"
9. Click "Add Key" > "Create new key"
10. Choose JSON format and click "Create"
11. Save the key file to a secure location on your computer

## Step 3: Configure Environment Variables

### For Windows (PowerShell):

```powershell
$env:GOOGLE_CLOUD_PROJECT_ID="your-project-id"
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your-credentials.json"
```

### For Windows (Command Prompt):

```cmd
set GOOGLE_CLOUD_PROJECT_ID=your-project-id
set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\your-credentials.json
```

### For Linux/MacOS:

```bash
export GOOGLE_CLOUD_PROJECT_ID="your-project-id"
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-credentials.json"
```

## Step 4: Install Dependencies

Run the following command to install the required packages:

```bash
npm install @google-cloud/vertexai dotenv
```

## Step 5: Run the Image Generator

### Option 1: Using the provided scripts

#### For Windows (PowerShell):

```powershell
.\run-image-generator.ps1
```

#### For Windows (Command Prompt):

```cmd
run-image-generator.bat
```

#### For Linux/MacOS:

```bash
./run-image-generator.sh
```

### Option 2: Running the script directly

```bash
node vertex-image-generator.mjs
```

## Understanding the Code

The `vertex-image-generator.mjs` script:

1. Connects to Vertex AI in the `us-central1` region
2. Uses the `gemini-2.0-flash-exp-image-generation` model for image generation
3. Sends a text prompt requesting an image
4. Specifies `responseModalities: ["TEXT", "IMAGE"]` to get image output
5. Processes the response to extract and save any generated images

## Troubleshooting

### Common Issues

#### 1. Authentication Errors

Error message: "Unable to detect a Project Id..."

Solution: Make sure your `GOOGLE_CLOUD_PROJECT_ID` environment variable is set correctly and that your credentials file path in `GOOGLE_APPLICATION_CREDENTIALS` is correct.

#### 2. "Model Not Found" Error

Error message: "Model gemini-2.0-flash-exp-image-generation not found"

Solution: 
- Make sure you're using the `us-central1` region
- Verify the model name is spelled correctly
- Check if you have access to the model (it may be restricted)

#### 3. No Image in Response

Issue: The model returns text but no image

Solution:
- Make sure you're specifying `responseModalities: ["TEXT", "IMAGE"]` in your request
- Try modifying your prompt to be more specific about generating an image
- Try with a simpler prompt first

## Advanced Usage

### Modifying the Prompt

Edit the `prompt` variable in `vertex-image-generator.mjs` to change what image is generated:

```javascript
const prompt = "Generate an image of a flying bear over a mountain landscape";
```

### Changing Generation Parameters

Adjust the temperature and other parameters in the `generationConfig` object:

```javascript
generationConfig: {
  temperature: 0.9,
  maxOutputTokens: 2048,
  responseModalities: ["TEXT", "IMAGE"]
}
```

- Higher temperature (0.9-1.0): More creative, varied outputs
- Lower temperature (0.1-0.5): More deterministic, focused outputs

### Using Images as Input

To modify the script to accept images as input for image editing:

```javascript
// Add this after imports
import fs from 'fs/promises';

// Then modify the contents array to include the image
const imageData = await fs.readFile('path/to/your/image.jpg');
const imageBase64 = imageData.toString('base64');

const result = await generativeModel.generateContent({
  contents: [{
    role: "user",
    parts: [
      { text: "Edit this image to look like a watercolor painting" },
      { 
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      }
    ]
  }],
  generationConfig: {
    // ...existing config
  }
});
```

## Additional Resources

- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Gemini Models Overview](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini)
- [Generate Images with Gemini](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/image-generation)
- [Vertex AI Pricing](https://cloud.google.com/vertex-ai/pricing) 