# codeHelp: Comprehensive Architecture & Flow Guide

**codeHelp** is an AI-powered browser extension designed to act as a personalized tutor for competitive programming. It seamlessly integrates into platforms like LeetCode, HackerRank, and CodeChef to provide dynamic hints, conceptual explanations, and strict code debugging without simply giving away the direct answers.

---

## 🏗️ 1. High-Level Architecture

The project is split into two main components:
1. **Frontend (Chrome Extension):** Injected directly into the DOM of supported coding platforms. It handles UI rendering, context extraction (reading the problem statement and user's code), and user settings.
2. **Backend (Node.js + Express):** Acts as the middleman between the extension and the AI Model. It receives the context, constructs highly specific prompts, and communicates with the **Groq API (Llama-3.3-70b-versatile)** to generate responses.

---

## 🔄 2. The Complete User Flow (Start to End)

### Step 1: Initialization & Context Extraction
- When a user navigates to a supported platform (e.g., LeetCode), the extension's `content.js` script runs.
- It injects a floating `codeHelp` launcher button into the webpage. 
- All UI elements are encapsulated within a **Shadow DOM** to ensure the host website's CSS does not conflict with the extension's beautiful transparent UI.
- **Extraction:** The extension uses specific CSS selectors to scrape the problem description and the code editor's content (supporting Monaco Editor, Ace Editor, etc.).

### Step 2: User Interaction
- The user clicks the launcher, opening the transparent `codeHelp` panel.
- The panel has multiple tabs: **Explain, Hint, Debug, Test, Ask**.
- The user can configure settings via the footer and header:
  - **Hinglish Toggle:** Switches the AI's output language between English and Hinglish.
  - **Interview Mode:** Disables the "Solve" feature to simulate a strict interview environment.
  - **Settings (⚙️):** Allows the user to input their *own* Groq API Key to bypass shared rate limits.

### Step 3: Triggering AI Assistance
- The user selects a tab (e.g., "Hint") and clicks "Ask Question".
- The frontend sends a `POST` request to the backend (`https://codehelp-backened.onrender.com/api/ai/...`) containing:
  - `problem`: The scraped problem statement.
  - `code`: The user's current code.
  - `language`: Target programming language.
  - `outputLang`: English or Hinglish.
  - `apiKey`: Custom Groq key (if provided).
  - `callCount`: How many times the user has asked for a hint/explanation on this specific problem (tracked via LocalStorage).

### Step 4: Backend Prompt Engineering
- The Request hits the `ai.controller.js` in the backend.
- Based on the endpoint, the backend crafts a highly specialized prompt. 
  - *Example:* If it's a **Hint**, and `callCount` is 1, it gives 3 basic hints. If `callCount` is 3, it gives highly detailed advanced hints revealing optimal data structures.
- The prompt is sent to the `ai.service.js`, which initiates a call to the **Groq API** (`llama-3.3-70b-versatile`), passing the custom or fallback API key.

### Step 5: Response & Analytics Tracking
- The AI generates the response, which the backend sends back to the frontend.
- The frontend displays the response in the transparent panel.
- **Analytics:** 
  - Usage counts for "Explain" and "Hint" are incremented in LocalStorage.
  - If the user used the **Debug** tool, the backend returns a strict JSON containing `mistakesAndFeedback`, `perfectCode`, and a highly specific `userWeaknesses` (e.g., "DP State Initialization"). 
  - The frontend logs this weakness. Over time, it calculates the user's most frequent weaknesses and displays statistical averages in the **Review** tab.

---

## 🛠️ 3. Core Features Breakdown

### 1. Dynamic Prompts (Explain & Hint)
Instead of static answers, the system tracks how many times you've asked for help on the current URL.
- **1st Request:** Simple explanation / 3 initial hints.
- **2nd Request:** Detailed analogy / Directional hints.
- **3rd Request:** Step-by-step intuitive breakdown / Advanced algorithmic hints.

### 2. Strict Debugging & Weakness Analysis
The Debug feature is instructed to *not* just fix syntax errors. It looks for logic flaws. It forces the AI to output exactly a JSON structure returning a "Weakness Tag". The extension builds a profile of the user's weaknesses (e.g., 40% Graph Cycle Detection, 60% Binary Search Boundary) visible in the Review tab.

### 3. Interview Mode
A toggle that immediately locks out the "Solve" function, preventing users from cheating by just asking for the final code. It forces them to rely on hints and explanations.

### 4. Custom API Key Bring-Your-Own-Key (BYOK)
Users can provide their own Groq API key securely stored in LocalStorage. The backend prioritizes the user's key over the fallback environment variable, ensuring zero rate-limiting for power users.

---

## 🚀 4. Summary of Tech Stack
- **Extension/Frontend:** HTML, Vanilla CSS (Variables, Flexbox, Glassmorphism with `backdrop-filter`), Vanilla JS.
- **Storage:** Chrome LocalStorage (Usage stats, weaknesses, API key).
- **Backend:** Node.js, Express.js, CORS.
- **AI Integration:** `groq-sdk` (Llama-3.3-70b-versatile).
