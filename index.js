// 1. Import Dependencies
const express = require('express');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const multer = require('multer'); // For handling file uploads

// Load environment variables from .env file
dotenv.config();

// 2. Initialize Express App & OpenAI Client
const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 3. Setup Middleware
// For parsing application/json
app.use(express.json());
// For parsing raw text requests
app.use(express.text({ type: 'text/plain' }));

// Configure Multer for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 4. The Core AI Extraction Logic
async function extractMeetingDetails(notesText) {
  // This is the prompt. It's the most important part!
  // It instructs the AI on exactly what to do and what format to return.
  const prompt = `
    You are an expert assistant specialized in analyzing meeting notes.
    Your task is to extract a summary, key decisions, and action items from the provided text.
    Please return the output in a clean JSON format.

    The JSON object should have the following structure:
    {
      "summary": "A 2-3 sentence summary of the meeting.",
      "decisions": ["A list of key decisions made."],
      "actionItems": [
        {
          "task": "The specific task to be done.",
          "owner": "The person responsible (if mentioned, otherwise omit).",
          "due": "The deadline for the task (if mentioned, otherwise omit)."
        }
      ]
    }

    Here are the meeting notes:
    ---
    ${notesText}
    ---
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Using a powerful and recent model
      messages: [{ role: 'user', content: prompt }],
      // This forces the model to return JSON, reducing errors
      response_format: { type: 'json_object' },
    });

    // The response from the AI is a string, so we need to parse it into a JSON object
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Re-throw the error to be caught by the route handler
    throw new Error('Failed to process notes with AI.');
  }
}

// 5. Define the API Endpoint
// The upload.single('notesFile') middleware handles the file upload.
// 'notesFile' must be the field name used when uploading the file.
app.post('/process-meeting', upload.single('notesFile'), async (req, res) => {
  let notesText = '';

  // Check for file upload
  if (req.file) {
    notesText = req.file.buffer.toString('utf-8');
  }
  // Check for raw text in the body
  else if (req.body && typeof req.body === 'string' && req.body.length > 0) {
    notesText = req.body;
  }
  // Check for JSON body with a 'notes' key
  else if (req.body && req.body.notes) {
    notesText = req.body.notes;
  }

  // Handle missing input
  if (!notesText) {
    return res.status(400).json({ error: 'No meeting notes provided. Please provide raw text or upload a .txt file.' });
  }

  try {
    const result = await extractMeetingDetails(notesText);
    res.json(result);
  } catch (error) {
    // Handle errors from the AI call (e.g., API key issue, timeout)
    res.status(500).json({ error: error.message });
  }
});


// 6. Start the Server
app.listen(port, () => {
  // ** THIS IS THE CORRECTED LINE **
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
