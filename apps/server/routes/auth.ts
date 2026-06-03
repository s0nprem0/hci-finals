import { Router } from "express";
import type Database from "bun:sqlite";

const router = Router();

router.get("/me", (req, res) => {
  const db = res.locals.db as Database;
  const user = db.query("SELECT * FROM users LIMIT 1").get();
  res.json(user || { name: "Marco", bio: "Film Student · 21 years old", avatar_emoji: "M" });
});

router.put("/me", (req, res) => {
  const db = res.locals.db as Database;
  const { name, bio, avatar_emoji } = req.body;
  db.run("INSERT INTO users (name, bio, avatar_emoji) VALUES (?, ?, ?) ON CONFLICT DO UPDATE SET name=excluded.name, bio=excluded.bio, avatar_emoji=excluded.avatar_emoji",
    [name, bio, avatar_emoji]);
  const user = db.query("SELECT * FROM users LIMIT 1").get();
  res.json(user);
});

export default router;
