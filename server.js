// ============================================================
//  VerifyAI — Backend Proxy Server
//  1. Put your API keys below (lines 10-11)
//  2. Run:  node server.js
//  3. Open: http://localhost:3000
// ============================================================

const DEEPSEEK_KEY = "";  // platform.deepseek.com/api-keys
const OPENAI_KEY   = "";    // platform.openai.com/api-keys

// ── dependencies ──────────────────────────────────────────
const express = require("express");
const cors    = require("cors");
const path    = require("path");
const app     = express();

app.use(cors());
app.use(express.json());

// Serve verifyai.html (and any other static files in this folder)
app.use(express.static(path.join(__dirname)));

// ── helper: forward a request to any AI API ───────────────
async function proxyRequest(apiUrl, apiKey, body, res) {
  try {
    const upstream = await fetch(apiUrl, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    const data = await upstream.json();

    if (data.error) {
      console.error(`API error from ${apiUrl}:`, data.error);
      return res.status(400).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error(`Network error reaching ${apiUrl}:`, err.message);
    res.status(500).json({ error: { message: `Proxy error: ${err.message}` } });
  }
}

// ── /api/deepseek ─────────────────────────────────────────
app.post("/api/deepseek", (req, res) => {
  proxyRequest(
    "https://api.deepseek.com/v1/chat/completions",
    DEEPSEEK_KEY,
    req.body,
    res
  );
});

// ── /api/openai ───────────────────────────────────────────
app.post("/api/openai", (req, res) => {
  proxyRequest(
    "https://api.openai.com/v1/chat/completions",
    OPENAI_KEY,
    req.body,
    res
  );
});

// ── start ─────────────────────────────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log("─────────────────────────────────────");
  console.log("  VerifyAI server is running!");
  console.log(`  Open → http://localhost:${PORT}`);
  console.log("─────────────────────────────────────");

  if (DEEPSEEK_KEY === "") {
    console.warn("  ⚠️  DeepSeek key not set — add it to server.js line 10");
  }
  if (OPENAI_KEY === "") {
    console.warn("  ⚠️  OpenAI key not set   — add it to server.js line 11");
  }
});
