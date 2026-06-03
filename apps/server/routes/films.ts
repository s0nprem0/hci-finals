import { Router } from "express";
import type Database from "bun:sqlite";

const router = Router();

router.get("/", (req, res) => {
  const db = res.locals.db as Database;
  const { source } = req.query;
  let sql = "SELECT * FROM film_adaptations";
  const params: unknown[] = [];
  if (source) { sql += " WHERE source_work_id = ?"; params.push(source); }
  const films = db.query(sql).all(...params) as Record<string, unknown>[];
  for (const f of films) {
    f.scenes = db.query("SELECT * FROM scenes WHERE film_id = ?").all(f.id);
    f.critiques = db.query("SELECT * FROM critiques WHERE film_id = ?").all(f.id);
  }
  res.json(films);
});

router.get("/:id", (req, res) => {
  const db = res.locals.db as Database;
  const film = db.query("SELECT * FROM film_adaptations WHERE id = ?").get(req.params.id) as Record<string, unknown> | null;
  if (!film) return res.status(404).json({ error: "Not found" });
  film.scenes = db.query("SELECT * FROM scenes WHERE film_id = ?").all(film.id);
  film.critiques = db.query("SELECT * FROM critiques WHERE film_id = ?").all(film.id);
  film.source_work = db.query("SELECT * FROM literary_works WHERE id = ?").get(film.source_work_id);
  res.json(film);
});

export default router;
