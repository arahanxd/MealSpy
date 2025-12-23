import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Analytics from "./models/Analytics.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB error:", err));

// Your API routes
app.post("/api/track-click", async (req, res) => {
  const { platform, restaurant } = req.body;
  if (!platform || !restaurant) return res.status(400).json({ error: "Platform and restaurant required" });
  await Analytics.create({ platform, restaurant });
  res.json({ success: true });
});

app.get("/api/analytics/restaurants", async (req, res) => {
  const swiggyData = await Analytics.aggregate([
    { $match: { platform: "Swiggy" } },
    { $group: { _id: "$restaurant", count: { $sum: 1 } } }
  ]);
  const zomatoData = await Analytics.aggregate([
    { $match: { platform: "Zomato" } },
    { $group: { _id: "$restaurant", count: { $sum: 1 } } }
  ]);
  res.json({ swiggy: swiggyData, zomato: zomatoData });
});

// ---------------------- Serve Frontend ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ---------------------- Start Server ----------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
