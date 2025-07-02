🚀 AI-Powered Meeting Minutes Extractor
This is a Node.js backend service that accepts meeting notes (as raw text or a .txt file) and uses an AI model (OpenAI's GPT) to extract a concise summary, key decisions, and a structured list of action items. The results are returned in a clean JSON format.
✨ Features
Dual Input Methods: Accepts meeting notes via raw text body (text/plain) or file upload (multipart/form-data).
AI-Powered Analysis: Integrates with the OpenAI API to intelligently parse unstructured text.
Structured Output: Returns a clean, predictable JSON object containing:
A 2-3 sentence summary.
A list of key decisions.
A list of action items with task, owner, and due date.
Robust Error Handling: Manages API errors, timeouts, and invalid user input gracefully.
🛠️ Tech Stack
Backend: Node.js
Framework: Express.js
AI Integration: OpenAI API (openai library)
File Uploads: multer
Environment Variables: dotenv
Development: nodemon for live-reloading
##📋 Prerequisites
Before you begin, ensure you have the following installed and configured:
Node.js and npm: Download & Install Node.js (npm is included).
OpenAI API Key: You need an API key from the OpenAI Platform.
API Client: A tool for testing API endpoints, such as Postman or curl (available in most terminals).
⚙️ Setup and Installation
Follow these steps to get the project running on your local machine.
Clone the Repository
Generated bash
# Replace with your actual repository URL if you have one
git clone https://github.com/your-username/meeting-minutes-extractor.git
cd meeting-minutes-extractor
Use code with caution.
Bash
Install Dependencies
This command will install all the necessary packages defined in package.json.
Generated bash
npm install
Use code with caution.
Bash
Configure Environment Variables
Create a .env file in the root of the project. This file will hold your secret API key.
Generated bash
# For Windows (using command prompt)
copy con .env
# Then paste the line below, press Enter, then Ctrl+Z, then Enter

# For MacOS/Linux
touch .env
Use code with caution.
Bash
Open the newly created .env file and add your OpenAI API key:
Generated env
OPENAI_API_KEY=sk-your-key-here
Use code with caution.
Env
Important: Replace sk-your-key-here with your actual OpenAI API key. This file is included in .gitignore to prevent your key from being committed to version control.
▶️ Running the Application
The project includes scripts for both development and production.
Development Mode:
This command uses nodemon to automatically restart the server whenever you make changes to the code.
Generated bash
npm run dev
Use code with caution.
Bash
Production Mode:
This command runs the server using node.
Generated bash
npm start
Use code with caution.
Bash
Once the server is running, you will see the following message in your terminal:
🚀 Server is running on http://localhost:3000
📡 API Usage
The service exposes a single endpoint for processing meeting notes.
Endpoint: POST /process-meeting
Method 1: File Upload (multipart/form-data)
You can upload a .txt file containing the meeting notes.
Key: notesFile
Value: The .txt file to be uploaded.
Example using curl:
(Assumes you are in the project's root directory)
Generated bash
curl -X POST http://localhost:3000/process-meeting \
-F "notesFile=@./sample-notes/sample1.txt"
Use code with caution.
Bash
Method 2: Raw Text Body (text/plain)
You can send the notes directly as plain text in the request body.
Header: Content-Type: text/plain
Body: The raw text of your meeting notes.
Example using curl:
Generated bash
curl -X POST http://localhost:3000/process-meeting \
-H "Content-Type: text/plain" \
--data "Team Sync - May 26. We'll launch the new product on June 10. Ravi to prepare onboarding docs by June 5. Priya will follow up with logistics team."
Use code with caution.
Bash
✅ Sample API Output
A successful request will return a JSON object with the extracted information.
Generated json
{
  "summary": "The team confirmed the product launch on June 10, assigned onboarding preparation and logistics follow-up, and discussed user feedback on mobile design.",
  "decisions": [
    "Launch set for June 10",
    "Need mobile-first dashboard for beta users"
  ],
  "actionItems": [
    {
      "task": "Prepare onboarding docs",
      "owner": "Ravi",
      "due": "June 5"
    },
    {
      "task": "Follow up with logistics team",
      "owner": "Priya"
    }
  ]
}
Use code with caution.
Json
📁 Project Structure
Generated code
.
├── node_modules/         # Project dependencies
├── sample-notes/         # Sample .txt files for testing
│   ├── sample1.txt
│   └── sample2.txt
├── .env                  # Environment variables (API key) - Private
├── .gitignore            # Files/folders to ignore for Git
├── index.js              # Main application file (server logic)
├── package-lock.json     # Dependency tree
├── package.json          # Project metadata and dependencies
└── README.md             # This file
