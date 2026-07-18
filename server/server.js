import express from "express";
import cors from "cors";
import { getNFLPlayoffSkillPlayers } from "./services/espnService.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000" })); // React dev server
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// ESPN test endpoint
// GET /api/espn/playoffs/skill-players?year=2025
app.get("/api/espn/playoffs/skill-players", async (req, res) => {
  try {
    const year = Number(req.query.year ?? 2025);

    if (!Number.isFinite(year)) {
      return res.status(400).json({ error: "Invalid year" });
    }

    const players = await getNFLPlayoffSkillPlayers(year);

    res.json({
      year,
      count: players.length,
      players,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch ESPN data" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
