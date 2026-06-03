import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

import db from "./db";
import authRoutes from "./routes/auth";
import literaryRoutes from "./routes/literary";
import filmRoutes from "./routes/films";
import comparisonRoutes from "./routes/comparisons";
import communityRoutes from "./routes/community";

app.use((_, res, next) => { res.locals.db = db; next(); });

app.use("/api/auth", authRoutes);
app.use("/api/literary", literaryRoutes);
app.use("/api/films", filmRoutes);
app.use("/api/comparisons", comparisonRoutes);
app.use("/api/community", communityRoutes);

app.get("/api/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
