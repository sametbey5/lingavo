
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let groqClient: Groq | null = null;
function getGroqClient() {
  if (!groqClient) {
    const key = process.env.GROQ_API_KEY;
    if (!key) {
      console.warn('GROQ_API_KEY environment variable is required');
    }
    groqClient = new Groq({ apiKey: key || '' });
  }
  return groqClient;
}

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, systemPrompt } = req.body;
      const groq = getGroqClient();
      if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ error: "GROQ_API_KEY is not configured" });
      }
      
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt || "You are a helpful, enthusiastic, and encouraging AI English tutor designed for language learners. Keep your responses conversational, natural, and relatively short (2-3 sentences max). Ask engaging questions to keep the conversation going."
          },
          ...messages
        ],
        model: "llama-3.3-70b-versatile",
      });

      res.json({ message: chatCompletion.choices[0]?.message?.content || "" });
    } catch (error) {
      console.error("Groq API Error:", error);
      res.status(500).json({ error: "Failed to fetch response" });
    }
  });

  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
