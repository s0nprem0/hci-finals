import db from "./db";

// Clear existing data
db.run("DELETE FROM critiques");
db.run("DELETE FROM scenes");
db.run("DELETE FROM film_adaptations");
db.run("DELETE FROM theme_analyses");
db.run("DELETE FROM literary_works");
db.run("DELETE FROM discussions");
db.run("DELETE FROM users");
db.run("DELETE FROM sqlite_sequence"); // reset auto-increment counters

// Seed literary works
const works = [
  { title: "Romeo and Juliet", author: "William Shakespeare", year: 1597, genre: "Tragedy", cover_emoji: "🎭",
    description: "A young couple from feuding families fall deeply in love, risking everything to be together. Their passionate romance defies the bitter rivalry between the Montagues and Capulets, but fate and circumstance conspire against them, leading to one of literature's most heartbreaking conclusions.",
    themes: [
      ["Love vs. Hate", "The passionate love between Romeo and Juliet stands in stark contrast to the hatred between their families. Shakespeare explores how love can bloom even in the most hostile environments.", "#8BD5CA"],
      ["Fate and Destiny", "From the opening prologue, the lovers are described as 'star-crossed.' The play constantly raises the question of whether their tragic end was inevitable or the result of their own choices.", "#8AADF4"],
      ["Youth and Rebellion", "Romeo and Juliet challenge the authority of their parents and the traditions of their society. Their youth gives them courage but also makes them impulsive.", "#C6A0F6"],
    ] },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Novel", cover_emoji: "🎩",
    description: "Nick Carraway moves to West Egg, Long Island, where he becomes drawn into the lavish world of his mysterious neighbor, Jay Gatsby. Through Gatsby's obsessive pursuit of Daisy Buchanan, Fitzgerald paints a vivid portrait of the American Dream's corruption.",
    themes: [
      ["The American Dream", "Gatsby's rise from poverty to immense wealth embodies the American Dream, yet his wealth cannot buy what he truly desires.", "#EED49F"],
      ["Class and Status", "The division between East Egg and West Egg represents the rigid class structure of 1920s America.", "#A6DA95"],
    ] },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Southern Gothic", cover_emoji: "🦅",
    description: "Through the eyes of young Scout Finch, Harper Lee explores racial injustice and moral growth in the American South. Her father Atticus, a principled lawyer, defends a Black man falsely accused of a crime.",
    themes: [
      ["Racial Injustice", "The trial of Tom Robinson reveals the deeply entrenched racism of Maycomb's society. Despite compelling evidence, the verdict is predetermined by racial bias.", "#ED8796"],
      ["Moral Growth", "Scout's journey from innocence to understanding mirrors the novel's central theme of developing empathy and moral courage.", "#8AADF4"],
    ] },
  { title: "Macbeth", author: "William Shakespeare", year: 1606, genre: "Tragedy", cover_emoji: "👑",
    description: "A brave Scottish general receives a prophecy from three witches that he will become king. Consumed by ambition, Macbeth murders King Duncan and takes the throne, setting off a chain of paranoia, guilt, and bloodshed.",
    themes: [
      ["Ambition", "Macbeth's vaulting ambition drives him to commit regicide, but it also becomes his fatal flaw. The play explores the corrupting nature of unchecked ambition.", "#ED8796"],
    ] },
  { title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Romance", cover_emoji: "💞",
    description: "Elizabeth Bennet navigates issues of manners, morality, and marriage in Regency-era England. Her evolving relationship with the seemingly proud Mr. Darcy challenges both their prejudices.",
    themes: [
      ["Pride and Prejudice", "The novel's title encapsulates the central obstacles Elizabeth and Darcy must overcome.", "#C6A0F6"],
    ] },
  { title: "Noli Me Tangere", author: "José Rizal", year: 1887, genre: "Social Realism", cover_emoji: "🇵🇭",
    description: "A landmark novel of Philippine literature, Noli Me Tangere exposes the corruption and abuse of Spanish colonial rule through the story of Crisostomo Ibarra.",
    themes: [
      ["Colonial Oppression", "Rizal's novel is a scathing indictment of Spanish colonial rule, exposing the corruption of the friars.", "#EED49F"],
      ["Social Reform", "Through Ibarra's journey, Rizal advocates for education and peaceful reform as the path to national liberation.", "#A6DA95"],
    ] },
];

const insertWork = db.prepare("INSERT INTO literary_works (title, author, year, genre, cover_emoji, description) VALUES (?, ?, ?, ?, ?, ?)");
const insertTheme = db.prepare("INSERT INTO theme_analyses (work_id, title, description, color) VALUES (?, ?, ?, ?)");
const insertFilm = db.prepare("INSERT INTO film_adaptations (title, director, year, source_work_id, description, cover_emoji) VALUES (?, ?, ?, ?, ?, ?)");
const insertScene = db.prepare("INSERT INTO scenes (film_id, title, text_excerpt, film_description, insight) VALUES (?, ?, ?, ?, ?)");
const insertCritique = db.prepare("INSERT INTO critiques (film_id, user_name, avatar, text) VALUES (?, ?, ?, ?)");

const insertAll = db.transaction(() => {
  const workIds: Record<string, number> = {};

  for (const w of works) {
    const result = insertWork.run(w.title, w.author, w.year, w.genre, w.cover_emoji, w.description);
    workIds[w.title] = result.lastInsertRowid as number;
    for (const [title, desc, color] of w.themes) {
      insertTheme.run(result.lastInsertRowid, title, desc, color);
    }
  }

  const films = [
    { title: "Romeo + Juliet", director: "Baz Luhrmann", year: 1996, source: "Romeo and Juliet", emoji: "🎬",
      desc: "Luhrmann's adaptation reimagines Verona as 'Verona Beach,' a neon-lit metropolis where the feud is portrayed as a corporate-gang war.",
      scenes: [{ title: "Opening Scene", text: "Two households, both alike in dignity...", film: "The film opens with a TV newscaster reading the prologue, followed by a gas station shootout.", insight: "The film's visual language translates Shakespeare's intensity into a contemporary idiom." }],
      critiques: [
        { user: "Maria", avatar: "M", text: "The film captures the energy of the opening scene perfectly." },
        { user: "Jake", avatar: "J", text: "The modern setting makes the text more accessible." },
        { user: "Anna", avatar: "A", text: "The contrast between poetic language and fast editing creates interesting tension." },
      ] },
    { title: "The Great Gatsby", director: "Baz Luhrmann", year: 2013, source: "The Great Gatsby", emoji: "🥂",
      desc: "Luhrmann's 3D adaptation brings Fitzgerald's Jazz Age to life with dazzling visuals and a contemporary soundtrack.",
      scenes: [{ title: "The First Party", text: "There was music from my neighbor's house...", film: "A continuous tracking shot sweeps through Gatsby's mansion with fireworks and dancing.", insight: "The hyper-stylized party scenes represent the excess and emptiness of the Jazz Age." }],
      critiques: [{ user: "Sofia", avatar: "S", text: "Spectacular party sequences, but the emotional depth gets lost in the spectacle." }] },
    { title: "To Kill a Mockingbird", director: "Robert Mulligan", year: 1962, source: "To Kill a Mockingbird", emoji: "⚖️",
      desc: "A faithful adaptation starring Gregory Peck as Atticus Finch, widely considered one of the greatest film performances in cinema history.",
      scenes: [{ title: "The Courtroom Scene", text: "The one thing that doesn't abide by majority rule is a person's conscience...", film: "Peck delivers his closing argument in an unbroken shot, letting the words carry the weight.", insight: "The static camera forces the audience to confront the injustice directly." }],
      critiques: [{ user: "Jake", avatar: "J", text: "Peck's performance is timeless. The courtroom scene is cinema at its finest." }] },
  ];

  for (const f of films) {
    const result = insertFilm.run(f.title, f.director, f.year, workIds[f.source!]!, f.desc, f.emoji);
    const filmId = result.lastInsertRowid as number;
    for (const s of f.scenes) insertScene.run(filmId, s.title, s.text, s.film, s.insight);
    for (const c of f.critiques) insertCritique.run(filmId, c.user, c.avatar, c.text);
  }

  // Seed discussions
  const discussions = [
    { title: "Is Luhrmann's Gatsby faithful to the novel?", tag: "Debate", author: "Maria", replies: 23, last: "Maria" },
    { title: "Why the 1962 Mockingbird still holds up", tag: "Review", author: "Jake", replies: 18, last: "Jake" },
    { title: "Philippine literature in film — Noli Me Tangere", tag: "Discussion", author: "Sofia", replies: 31, last: "Sofia" },
    { title: "Macbeth (2015): A visual masterpiece?", tag: "Analysis", author: "Marco", replies: 14, last: "Marco" },
    { title: "Best Pride & Prejudice adaptation?", tag: "Question", author: "Anna", replies: 27, last: "Anna" },
  ];

  const insertDiscussion = db.prepare("INSERT INTO discussions (title, tag, author, reply_count, last_post) VALUES (?, ?, ?, ?, ?)");
  for (const d of discussions) insertDiscussion.run(d.title, d.tag, d.author, d.replies, d.last);

  // Seed default user
  db.run("INSERT INTO users (name, bio, avatar_emoji) VALUES (?, ?, ?)", ["Marco", "Film Student · 21 years old", "M"]);
});

insertAll();

console.log("Seeded successfully!");
