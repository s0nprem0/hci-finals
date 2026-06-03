import { Database } from "bun:sqlite";

const db = new Database("/home/jllyn/hci-finals/database/database.sqlite");

db.exec("PRAGMA journal_mode=WAL");
db.exec("PRAGMA foreign_keys=ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS literary_works (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER NOT NULL,
    genre TEXT NOT NULL,
    description TEXT NOT NULL,
    cover_emoji TEXT DEFAULT '📖',
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS theme_analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    work_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    color TEXT DEFAULT '#8BD5CA',
    FOREIGN KEY (work_id) REFERENCES literary_works(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS film_adaptations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    director TEXT NOT NULL,
    year INTEGER NOT NULL,
    source_work_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    cover_emoji TEXT DEFAULT '🎬',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (source_work_id) REFERENCES literary_works(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS scenes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    film_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    text_excerpt TEXT,
    film_description TEXT,
    insight TEXT,
    FOREIGN KEY (film_id) REFERENCES film_adaptations(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS critiques (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    film_id INTEGER NOT NULL,
    user_name TEXT NOT NULL,
    avatar TEXT DEFAULT '👤',
    text TEXT NOT NULL,
    FOREIGN KEY (film_id) REFERENCES film_adaptations(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS discussions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    tag TEXT NOT NULL CHECK(tag IN ('Debate','Review','Discussion','Analysis','Question')),
    author TEXT NOT NULL,
    reply_count INTEGER DEFAULT 0,
    last_post TEXT DEFAULT '',
    last_post_at TEXT DEFAULT (datetime('now')),
    content TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    bio TEXT DEFAULT '',
    avatar_emoji TEXT DEFAULT '👤',
    post_count INTEGER DEFAULT 0
  )
`);

export default db;
