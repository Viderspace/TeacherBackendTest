const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let classMaterial = "";

app.post('/set-material', (req, res) => {
  classMaterial = req.body.text;
  console.log("Received class material:", classMaterial?.slice(0, 100));
  res.json({ status: 'ok', message: 'Lesson uploaded!' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log("🔍 Incoming messages:", messages);
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const fetch = require('node-fetch'); // if not already installed: npm install node-fetch
const OPENAI_KEY = process.env.OPENAI_API_KEY;

app.post('/ask', async (req, res) => {
  try {
    const messages = req.body.messages;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: messages,
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      console.error("❌ Unexpected OpenAI response:", JSON.stringify(data, null, 2));
      return res.status(500).json({ error: "Invalid GPT response", raw: data });
    }
    
    const reply = data.choices[0].message.content;
    res.json({ reply });

    
  } catch (err) {
    console.error("❌ GPT-4 Error:", err);
    res.status(500).json({ error: "Failed to fetch GPT-4 response" });
  }
});