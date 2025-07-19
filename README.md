# AI-Powered Meeting Minutes Extractor

A Node.js backend service that uses OpenAI's GPT to extract concise summaries, key decisions, and structured action items from meeting notes. Accepts input as raw text or `.txt` file and returns clean, structured JSON.

---

## 🚀 Features

- **Dual Input Methods:** Accepts meeting notes via raw text (body) or `.txt` file upload.
- **AI-Powered Analysis:** Integrates with OpenAI API to intelligently parse unstructured meeting notes.
- **Structured Output:** Returns a JSON object with:
  - 2–3 sentence summary
  - List of key decisions
  - List of action items (task, owner, deadline)
- **Robust Error Handling:** Handles API errors, timeouts, and invalid input gracefully.

---
## Architecture & Flow

    participant User
    participant ExpressServer
    participant OpenAIAPI

    User->>ExpressServer: POST /process-meeting (file or text)
    ExpressServer->>ExpressServer: Parse input (multer or raw body)
    ExpressServer->>OpenAIAPI: Send notes with prompt
    OpenAIAPI-->>ExpressServer: AI-generated summary, decisions, action items
    ExpressServer->>User: Return structured JSON response
---

## 🛠️ Tech Stack

- **Backend:** Node.js
- **Framework:** Express.js
- **AI Integration:** OpenAI API (`openai` library)
- **File Uploads:** `multer`
- **Environment Variables:** `dotenv`
- **Development:** `nodemon` for live-reloading

---

## 📦 Project Structure

```
.
├── node_modules/         # Project dependencies
├── sample_notes/         # Sample .txt files for testing
│   ├── sample1.txt
│   └── sample2.txt
├── .env                  # Environment variables (API key) - Private
├── .gitignore            # Files/folders to ignore for Git
├── index.js              # Main application file (server logic)
├── package-lock.json     # Dependency tree
├── package.json          # Project metadata and dependencies
└── README.md             # This file
```

---

## 📝 Prerequisites

- **Node.js** and **npm**: [Download & Install Node.js](https://nodejs.org/)
- **OpenAI API Key**: [Get your API key](https://platform.openai.com/)
- **API Client**: Tool for testing API endpoints (e.g., Postman or `curl`)

---

## ⚙️ Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/meeting-minutes-extractor.git
   cd meeting-minutes-extractor
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory:
     ```
     OPENAI_API_KEY=sk-your-key-here
     ```
   - Replace `sk-your-key-here` with your actual OpenAI API key.

---

## ▶️ Running the Application

- **Development Mode** (with live reload):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

The server will start at: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Usage

### Endpoint

```
POST /process-meeting
```

### Method 1: File Upload (`multipart/form-data`)

- **Key:** `notesFile`
- **Value:** The `.txt` file to upload

**Example using `curl`:**
```bash
curl -X POST http://localhost:3000/process-meeting \
  -F "notesFile=@./sample_notes/sample1.txt"
```

### Method 2: Raw Text Body (`text/plain`)

- **Header:** `Content-Type: text/plain`
- **Body:** Raw meeting notes

**Example using `curl`:**
```bash
curl -X POST http://localhost:3000/process-meeting \
  -H "Content-Type: text/plain" \
  --data "Team Sync – May 26. We'll launch the new product on June 10. Ravi to prepare onboarding docs by June 5. Priya will follow up with logistics team."
```

---

## 📬 Using Postman for API Testing

You can use [Postman](https://www.postman.com/) to easily test the API endpoints. Below are the steps for both file upload and raw text methods:

### 1. File Upload (`multipart/form-data`)

1. Open Postman and create a new `POST` request to:
   ```
   http://localhost:3000/process-meeting
   ```
2. Go to the **Body** tab and select **form-data**.
3. Add a key named `notesFile`, set the type to **File**, and choose your `.txt` file (e.g., `sample2.txt`).
4. Click **Send**.
5. The response will be shown in the **Body** section as JSON.

### 2. Raw Text Body (`text/plain`)

1. Create a new `POST` request to:
   ```
   http://localhost:3000/process-meeting
   ```
2. Go to the **Body** tab and select **raw**.
3. In the dropdown next to raw, select **Text**.
4. Paste your meeting notes as plain text in the body.
5. Click **Send**.
6. The response will be shown in the **Body** section as JSON.


---

```
