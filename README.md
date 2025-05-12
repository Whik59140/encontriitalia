# Vertex AI Image Generation with Gemini

This project demonstrates how to use Google's Vertex AI to generate images with Gemini models, specifically targeting the `gemini-2.0-flash-exp` model that supports image generation.

## Background

As mentioned in community discussions, Google has restricted access to certain Gemini image generation capabilities through the standard Gemini API in many regions. However, Vertex AI (Google Cloud's enterprise AI offering) still provides access to these capabilities when properly configured.

## Prerequisites

1. Google Cloud account with billing enabled
2. Vertex AI API enabled in your project
3. A service account with appropriate permissions
4. Node.js installed (v18 or higher recommended)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install @google-cloud/vertexai dotenv
```

### 2. Create a Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to IAM & Admin > Service Accounts
3. Click "Create Service Account"
4. Name your service account (e.g., "vertex-ai-image-generator")
5. Grant the service account the "Vertex AI User" role
6. Create and download a JSON key for this service account

### 3. Set Up Environment Variables

Create a `.env` file with the following content:

```
GOOGLE_CLOUD_PROJECT_ID=your-project-id
```

### 4. Configure Authentication

Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to your service account key:

On Windows PowerShell:
```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your-credentials.json"
```

On Linux/MacOS:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-credentials.json"
```

### 5. Run the Script

```bash
node vertex-image-generator.mjs
```

## Important Notes

- **Location Requirement**: Always use `us-central1` as the location for image generation with Vertex AI
- **Data Location**: Be aware of data location considerations for your users/customers
- **Model Availability**: The model names and availability may change over time
- **Error Handling**: The script includes extensive error handling to help diagnose issues

## How It Works

The script:
1. Initializes the Vertex AI client with the `us-central1` location
2. Configures the `gemini-2.0-flash-exp` model
3. Sends a text prompt requesting an image
4. Specifies `responseType: "TEXT_AND_IMAGES"` to get image output
5. Processes the response to extract and save any generated images

## Troubleshooting

If you encounter issues:

1. Verify your service account has the necessary permissions
2. Ensure you're using the correct project ID
3. Check that the Vertex AI API is enabled in your project
4. Verify that you're using `us-central1` as the location
5. Check the error messages for specific guidance

## References

- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs/generative-ai/image/generate-images)
- [Google Cloud Authentication](https://cloud.google.com/docs/authentication/getting-started)
