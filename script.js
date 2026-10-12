
"use strict";

// =============================================
// INSIGHTFLOW - script.js
// Matches your actual index.html
// =============================================

const API_URL = "/api/analyze";
const STORAGE_KEY = "insightflow_feedback_history";

// HTML elements
const feedbackForm = document.getElementById("feedback-form");
const feedbackInput = document.getElementById("feedback-input");
const analyzeButton = document.getElementById("analyze-btn");
const charCount = document.getElementById("char-count");
const errorMessage = document.getElementById("error-message");
const analysisResult = document.getElementById("analysis-result");

const sentimentResult = document.getElementById("sentiment-result");
const confidenceResult = document.getElementById("confidence-result");
const topicsResult = document.getElementById("topics-result");
const summaryResult = document.getElementById("summary-result");
const recommendationResult =
    document.getElementById("recommendation-result");

const feedbackHistory = document.getElementById("feedback-history");
const clearHistoryButton =
    document.getElementById("clear-history-btn");

// Dashboard elements
const totalFeedback = document.getElementById("total-feedback");
const positiveFeedback = document.getElementById("positive-feedback");
const neutralFeedback = document.getElementById("neutral-feedback");
const negativeFeedback = document.getElementById("negative-feedback");

const heroTotal = document.getElementById("hero-total");
const heroPositive = document.getElementById("hero-positive");
const heroNeutral = document.getElementById("hero-neutral");
const heroNegative = document.getElementById("hero-negative");

const positiveBar = document.getElementById("positive-bar");
const neutralBar = document.getElementById("neutral-bar");
const negativeBar = document.getElementById("negative-bar");

const positivePercent = document.getElementById("positive-percent");
const neutralPercent = document.getElementById("neutral-percent");
const negativePercent = document.getElementById("negative-percent");

// =============================================
// 1. Load and Save History
// =============================================

let history = loadHistory();

function loadHistory() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const data = saved ? JSON.parse(saved) : [];

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("History loading error:", error);
        return [];
    }
}

function saveHistory() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(history)
        );
        return true;
    } catch (error) {
        console.error("History saving error:", error);
        showError("Could not save history in your browser.");
        return false;
    }
}

// =============================================
// 2. Error Messages
// =============================================

function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
    } else {
        console.error(message);
    }
}

function clearError() {
    if (errorMessage) {
        errorMessage.textContent = "";
    }
}

// =============================================
// 3. Character Counter
// =============================================

function updateCharacterCount() {
    if (!feedbackInput || !charCount) return;

    charCount.textContent =
        `${feedbackInput.value.length} / 5000 characters`;
}

if (feedbackInput) {
    feedbackInput.addEventListener("input", function () {
        updateCharacterCount();
        clearError();
    });
}

updateCharacterCount();

// =============================================
// 4. Format Sentiment
// =============================================

function normalizeSentiment(value) {
    const sentiment = String(value || "")
        .trim()
        .toLowerCase();

    if (sentiment.includes("positive")) return "Positive";
    if (sentiment.includes("negative")) return "Negative";
    if (sentiment.includes("neutral")) return "Neutral";

    return "Unknown";
}

function getTopics(value) {
    if (Array.isArray(value)) {
        return value.join(", ");
    }

    return value == null ? "Not available" : String(value);
}

// =============================================
// 5. Show Analysis Results
// =============================================

function displayResult(data) {
    if (analysisResult) {
        analysisResult.hidden = false;
    }

    if (sentimentResult) {
        sentimentResult.textContent =
            data.sentiment ?? "Not available";
    }

    if (confidenceResult) {
        const confidence = data.confidence;

        if (typeof confidence === "number") {
            const percentage =
                confidence <= 1
                    ? confidence * 100
                    : confidence;

            confidenceResult.textContent =
                `${Math.round(percentage)}%`;
        } else {
            confidenceResult.textContent =
                confidence ?? "Not available";
        }
    }

    if (topicsResult) {
        topicsResult.textContent = getTopics(data.topics);
    }

    if (summaryResult) {
        summaryResult.textContent =
            data.summary ?? "No summary available.";
    }

    if (recommendationResult) {
        recommendationResult.textContent =
            data.recommendation ?? "No recommendation available.";
    }
}

// =============================================
// 6. Update Dashboard Statistics
// =============================================

function updateDashboard() {
    const total = history.length;

    const positive = history.filter(
        item => normalizeSentiment(item.sentiment) === "Positive"
    ).length;

    const neutral = history.filter(
        item => normalizeSentiment(item.sentiment) === "Neutral"
    ).length;

    const negative = history.filter(
        item => normalizeSentiment(item.sentiment) === "Negative"
    ).length;

    const positiveRate = total ? Math.round(positive / total * 100) : 0;
    const neutralRate = total ? Math.round(neutral / total * 100) : 0;
    const negativeRate = total ? Math.round(negative / total * 100) : 0;

    if (totalFeedback) totalFeedback.textContent = total;
    if (positiveFeedback) positiveFeedback.textContent = positive;
    if (neutralFeedback) neutralFeedback.textContent = neutral;
    if (negativeFeedback) negativeFeedback.textContent = negative;

    if (heroTotal) heroTotal.textContent = total;
    if (heroPositive) heroPositive.textContent = positiveRate + "%";
    if (heroNeutral) heroNeutral.textContent = neutralRate + "%";
    if (heroNegative) heroNegative.textContent = negativeRate + "%";

    if (positiveBar) positiveBar.style.width = positiveRate + "%";
    if (neutralBar) neutralBar.style.width = neutralRate + "%";
    if (negativeBar) negativeBar.style.width = negativeRate + "%";

    if (positivePercent) {
        positivePercent.textContent = positiveRate + "%";
    }

    if (neutralPercent) {
        neutralPercent.textContent = neutralRate + "%";
    }

    if (negativePercent) {
        negativePercent.textContent = negativeRate + "%";
    }
}

// =============================================
// 7. Display Recent Feedback Table
// =============================================

function renderHistory() {
    if (!feedbackHistory) return;

    feedbackHistory.replaceChildren();

    if (history.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 3;
        cell.textContent = "No feedback analyzed yet.";

        row.appendChild(cell);
        feedbackHistory.appendChild(row);

        updateDashboard();
        return;
    }

    history.slice(0, 10).forEach(function (item) {
        const row = document.createElement("tr");

        const feedbackCell = document.createElement("td");
        const sentimentCell = document.createElement("td");
        const topicsCell = document.createElement("td");

        feedbackCell.textContent = item.feedback;
        sentimentCell.textContent =
            item.sentiment ?? "Not available";
        topicsCell.textContent = getTopics(item.topics);

        row.append(
            feedbackCell,
            sentimentCell,
            topicsCell
        );

        feedbackHistory.appendChild(row);
    });

    updateDashboard();
}

// =============================================
// 8. Analyze Feedback Through Node.js
// =============================================

if (feedbackForm) {
    feedbackForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearError();

        const feedback = feedbackInput.value.trim();

        if (feedback.length < 3) {
            showError("Please enter at least 3 characters.");
            feedbackInput.focus();
            return;
        }

        if (feedback.length > 5000) {
            showError("Feedback cannot exceed 5000 characters.");
            return;
        }

        analyzeButton.disabled = true;
        analyzeButton.textContent = "Analyzing...";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    feedback: feedback
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.message ||
                    `Server error: ${response.status}`
                );
            }

            if (!data || typeof data !== "object") {
                throw new Error("Invalid response from the server.");
            }

            displayResult(data);

            const record = {
                feedback: feedback,
                sentiment: data.sentiment ?? "Unknown",
                confidence: data.confidence ?? null,
                topics: data.topics ?? [],
                summary: data.summary ?? "",
                recommendation: data.recommendation ?? "",
                date: new Date().toLocaleString()
            };

            history.unshift(record);
            history = history.slice(0, 50);

            saveHistory();
            renderHistory();

        } catch (error) {
            console.error("Analysis error:", error);

            if (error instanceof TypeError) {
                showError(
                    "Cannot connect to the backend. " +
                    "Make sure node server.js is running."
                );
            } else {
                showError(error.message);
            }
        } finally {
            analyzeButton.disabled = false;
            analyzeButton.textContent = "Analyze Feedback";
        }
    });
}

// =============================================
// 9. Clear Feedback History
// =============================================

if (clearHistoryButton) {
    clearHistoryButton.addEventListener("click", function () {
        if (history.length === 0) {
            showError("There is no history to clear.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to clear all feedback history?"
        );

        if (!confirmed) return;

        history = [];

        if (saveHistory()) {
            clearError();
            renderHistory();

            if (analysisResult) {
                analysisResult.hidden = true;
            }
        }
    });
}

// =============================================
// 10. Initialize Dashboard
// =============================================

renderHistory();
