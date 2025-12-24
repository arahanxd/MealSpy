import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Analytics from "./models/Analytics.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

/* ---------- DB ---------- */
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("Mongo error:", err));

/* ---------- API ---------- */
app.post("/api/track-click", async (req, res) => {
  try {
    const { platform, restaurant } = req.body;
    if (!platform || !restaurant)
      return res.status(400).json({ error: "platform + restaurant required" });

    await Analytics.create({ platform, restaurant });
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "tracking failed" });
  }
});

/* ---------- SERVE FRONTEND ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
