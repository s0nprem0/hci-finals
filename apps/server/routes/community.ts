import { Router } from "express";
import type Database from "bun:sqlite";

const router = Router();

router.get("/", (req, res) => {
  const db = res.locals.db as Database;
  const discussions = db.query("SELECT * FROM discussions ORDER BY last_post_at DESC").all();
  res.json(discussions);
});

router.get("/top-contributors", (_, res) => {
  res.json([
    { name: "Maria", posts: 142 },
    { name: "Marco", posts: 98 },
    { name: "Sofia", posts: 87 },
    { name: "Jake", posts: 65 },
    { name: "Anna", posts: 54 },
  ]);
});

router.post("/", (req, res) => {
  const db = res.locals.db as Database;
  const { title, tag, author, content } = req.body;
  const result = db.run(
    "INSERT INTO discussions (title, tag, author, content) VALUES (?, ?, ?, ?)",
    [title, tag, author, content]
  );
  const discussion = db.query("SELECT * FROM discussions WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(discussion);
});

export default router;
