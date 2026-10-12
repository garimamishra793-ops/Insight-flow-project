
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/web.html");
});

app.get("/api/status", (req, res) => {
    res.json({
        message: "InsightFlow backend is working!"
    });
});
app.post("/api/analyze", (req, res) => {
    const feedback = req.body.feedback;

    if (typeof feedback !== "string" || !feedback.trim()) {
        return res.status(400).json({
            error: "Please enter some feedback."
        });
    }

    const text = feedback.toLowerCase();

    const positiveWords = [
        "good", "great", "excellent", "useful", "easy",
        "helpful", "amazing", "love", "happy", "best",
        "fast", "nice", "perfect", "wonderful", "enjoy",
        "satisfied", "fantastic", "beautiful", "success"
    ];

    const negativeWords = [
        "bad", "poor", "terrible", "difficult", "slow",
        "confusing", "hate", "problem", "worst", "useless",
        "broken", "error", "sad", "angry", "awful",
        "disappointed", "stress", "anxious", "failure"
    ];

    function countWords(words) {
        return words.reduce((count, word) => {
            const pattern = new RegExp("\\b" + word + "\\b", "g");
            return count + (text.match(pattern) || []).length;
        }, 0);
    }

    let positive = countWords(positiveWords);
    let negative = countWords(negativeWords);

    // Handle simple negative phrases such as "not good"
    const negationPattern =
        /\b(not|never|no longer|isn't|wasn't|aren't|weren't|don't|doesn't|didn't)\s+(?:\w+\s+){0,2}(good|great|excellent|useful|easy|helpful|amazing|happy|best|fast|nice|perfect|wonderful|enjoy|satisfied|fantastic|beautiful)\b/g;

    const negatedPositiveMatches = text.match(negationPattern) || [];

    // Each matched negative phrase reverses one positive count
    negative += negatedPositiveMatches.length;
    positive = Math.max(0, positive - negatedPositiveMatches.length);

    let sentiment = "Neutral";
    let confidence = 60;

    const total = positive + negative;

    if (positive > negative) {
        sentiment = "Positive";
        confidence = Math.round((positive / total) * 100);
    } else if (negative > positive) {
        sentiment = "Negative";
        confidence = Math.round((negative / total) * 100);
    } else if (positive > 0 && negative > 0) {
        sentiment = "Mixed";
        confidence = 50;
    }

    const topics = [];

    if (/easy|difficult|confusing/.test(text)) {
        topics.push("Usability");
    }
    if (/fast|slow/.test(text)) {
        topics.push("Performance");
    }
    if (/good|bad|excellent|poor/.test(text)) {
        topics.push("Quality");
    }
    if (/help|support|service/.test(text)) {
        topics.push("Support");
    }
    if (topics.length === 0) {
        topics.push("General Feedback");
    }

    const summaries = {
        Positive: "The feedback expresses a positive experience.",
        Negative: "The feedback highlights concerns for improvement.",
        Mixed: "The feedback contains both positive and negative signals.",
        Neutral: "The feedback has no clear positive or negative keywords."
    };

    const recommendations = {
        Positive: "Maintain quality and continue improving the user experience.",
        Negative: "Review the concerns and prioritize improvements.",
        Mixed: "Review both the positive points and the concerns.",
        Neutral: "Collect more specific feedback to understand user needs."
    };

    res.json({
        sentiment,
        confidence,
        topics,
        summary: summaries[sentiment],
        recommendation: recommendations[sentiment]
    });
});

app.listen(PORT, () => {
    console.log(`InsightFlow server running at http://localhost:${PORT}`);
});
