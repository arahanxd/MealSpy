const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Ensure clicks.json exists
if (!fs.existsSync("clicks.json")) {
  fs.writeFileSync("clicks.json", JSON.stringify([]));
}

// Track click API
app.post("/api/track-click", (req, res) => {
  const { platform } = req.body;

  if (!platform) {
    return res.status(400).json({ error: "Platform is required" });
  }

  const clicks = JSON.parse(fs.readFileSync("clicks.json"));

  clicks.push({
    platform,
    timestamp: new Date().toISOString(),
  });

  fs.writeFileSync("clicks.json", JSON.stringify(clicks, null, 2));

  res.json({ success: true });
});

// View stats (for you)
app.get("/api/stats", (req, res) => {
  const clicks = JSON.parse(fs.readFileSync("clicks.json"));
  res.json(clicks);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
