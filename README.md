# InsightFlow — Feedback Sentiment Analysis

**Turn feedback into meaningful insights.**

InsightFlow is a web-based feedback analysis application that helps users understand the sentiment behind written feedback. It analyzes text and classifies the feedback into Positive, Negative, Mixed, or Neutral categories. It also provides a confidence estimate, identifies related topics, and displays a summary and recommendations.

## 📌 Project Overview

Understanding user feedback is important for improving products, services, and user experiences. Manually reviewing large amounts of feedback can take time.

InsightFlow provides a simple interface where users can enter feedback and receive an automated sentiment analysis result. The project demonstrates how frontend development, backend processing, and basic Natural Language Processing (NLP) concepts can be combined in a web application.

## ✨ Features

- **Sentiment Analysis:** Classifies feedback as Positive, Negative, Mixed, or Neutral.
- **Confidence Estimate:** Displays a rule-based estimate associated with the predicted sentiment.
- **Topic Identification:** Identifies topics such as usability, performance, quality, and support.
- **Feedback Summary:** Generates a short explanation of the analysis result.
- **Recommendations:** Provides suggestions based on the detected sentiment.
- **Feedback History:** Stores previous analyses in browser local storage.
- **Dashboard:** Displays an overview of saved feedback sentiment.
- **Interactive Interface:** Allows users to enter feedback and view analysis results.

## 🛠️ Technologies Used

- **HTML5** — Structures the web pages.
- **CSS3** — Provides styling and responsive layout.
- **JavaScript** — Handles user interactions and displays analysis results.
- **Node.js** — Runs the backend server.
- **Express.js** — Handles HTTP requests and serves the website.

## ⚙️ How It Works

1. The user enters feedback into the website.
2. The frontend sends the feedback to the backend through an API request.
3. The backend analyzes the text using predefined positive and negative keywords and simple rules.
4. The system determines the sentiment category and identifies relevant topics.
5. The backend returns the analysis result to the frontend.
6. The website displays the sentiment, confidence estimate, summary, and recommendations.
7. Previous results can be stored in browser local storage and displayed in the history and dashboard.

## 🚀 Installation and Setup

### Prerequisites

Install the following software before running the project:

- [Node.js](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### Step 1: Open the Project

Open the Insightflow project folder in Visual Studio Code.

### Step 2: Open the Terminal

Select **Terminal → New Terminal** from the VS Code menu.

### Step 3: Install Dependencies

If your project contains a `package.json` file, run:

```bash
npm install
```

### Step 4: Start the Server

Run the following command:

```bash
node server.js
```

Wait until the terminal displays a message confirming that the server is running.

### Step 5: Open the Website

Open your browser and visit:

http://localhost:3000

The InsightFlow website should now be available locally on your computer.

## 🧪 Example

**Input feedback:**

> The website is easy to use and very helpful.

**Expected output:**

- Sentiment: Positive
- Topic: Usability
- Summary: The feedback expresses a positive experience.
- Recommendation: Maintain quality and continue improving the user experience.

*Actual results depend on the keywords and rules implemented in the current version.*

## 📁 Project Structure

The project may contain files arranged as follows:

```text
Insightflow/
├── web.html
├── style.css
├── script.js
├── server.js
├── package.json
└── README.md
```

The CSS filename may differ in your project. Keep your actual filenames unchanged.

## ⚠️ Limitations

- The current prototype uses keyword-based sentiment analysis rather than a trained machine-learning model.
- It may misunderstand negation, sarcasm, context, and complex sentences.
- The confidence estimate is rule-based and is not a scientifically validated probability.
- Browser local storage keeps history in the current browser profile and is not a shared database.
- The system has not necessarily been evaluated against a validated dataset.

## 🔮 Future Improvements

- Integrate a trained NLP or machine-learning model.
- Improve detection of negation, sarcasm, and mixed emotions.
- Evaluate classification accuracy using labeled feedback data.
- Add data export and improved dashboard visualizations.
- Improve accessibility, validation, and error handling.
- Add secure user accounts and database storage if required.

## 🔒 Responsible Use

InsightFlow is a feedback-analysis prototype. Its results should be treated as preliminary text-based indicators, not as definitive conclusions. It is not a medical diagnostic tool or a validated method for assessing mental health or self-harm risk. Sensitive feedback should be handled carefully and securely.

## 🎓 Learning Outcomes

This project demonstrates practical skills in:

- Frontend development using HTML, CSS, and JavaScript.
- Backend development with Node.js and Express.js.
- Connecting a frontend to a backend API.
- Processing text using basic keyword-matching rules.
- Managing browser local storage.
- Building an interactive web application.

## 👩‍💻 Project Information

**Project Name:** InsightFlow  
**Project Type:** Web Development / Feedback Sentiment Analysis  
**Developer:** [Your Name]  
**Technologies:** HTML, CSS, JavaScript, Node.js, Express.js

---

*InsightFlow — Making feedback easier to understand.*