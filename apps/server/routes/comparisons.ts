import { Router } from "express";
import type Database from "bun:sqlite";

const router = Router();

router.get("/", (req, res) => {
  const db = res.locals.db as Database;
  res.json(db.query("SELECT * FROM film_adaptations").all());
});

router.get("/:id", (req, res) => {
  const db = res.locals.db as Database;
  const film = db.query("SELECT * FROM film_adaptations WHERE id = ?").get(req.params.id);
  if (!film) return res.status(404).json({ error: "Not found" });
  res.json(film);
});

export default router;
