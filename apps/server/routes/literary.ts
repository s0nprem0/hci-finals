import { Router } from "express";
import type Database from "bun:sqlite";

const router = Router();

router.get("/", (req, res) => {
  const db = res.locals.db as Database;
  const { genre, search } = req.query;

  let sql = "SELECT * FROM literary_works";
  const params: unknown[] = [];
  const conditions: string[] = [];

  if (genre) { conditions.push("genre = ?"); params.push(genre); }
  if (search) { conditions.push("title LIKE ?"); params.push(`%${search}%`); }
  if (conditions.length) sql += " WHERE " + conditions.join(" AND ");

  const works = db.query(sql).all(...params) as Record<string, unknown>[];
  for (const w of works) {
    (w as Record<string, unknown>).theme_analysis = db.query("SELECT * FROM theme_analyses WHERE work_id = ?").all(w.id);
  }
  res.json(works);
});

router.get("/featured", (req, res) => {
  const db = res.locals.db as Database;
  const works = db.query("SELECT * FROM literary_works LIMIT 6").all() as Record<string, unknown>[];
  res.json(works);
});

router.get("/:id", (req, res) => {
  const db = res.locals.db as Database;
  const work = db.query("SELECT * FROM literary_works WHERE id = ?").get(req.params.id) as Record<string, unknown> | null;
  if (!work) return res.status(404).json({ error: "Not found" });
  work.theme_analysis = db.query("SELECT * FROM theme_analyses WHERE work_id = ?").all(work.id);
  work.adaptations = db.query("SELECT * FROM film_adaptations WHERE source_work_id = ?").all(work.id);
  res.json(work);
});

export default router;
