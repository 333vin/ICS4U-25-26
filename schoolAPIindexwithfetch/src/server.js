import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { connectToMongo, getCollection } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// form body parsing (for method="post" forms)
app.use(express.urlencoded({ extended: true }));

// static files (CSS)
app.use(express.static(path.join(__dirname, "..", "public")));

// EJS views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

function usersCol() {
  return getCollection("users");
}

// GET page: pull users from Atlas and render table
app.get("/", async (req, res, next) => {
  try {
    const users = await usersCol().find({}).sort({ createdAt: -1 }).toArray();
    res.render("index", { users });
  } catch (e) {
    next(e);
  }
});

// POST form: insert into Atlas then redirect back to /
app.post("/add-user", async (req, res, next) => {
  try {
    const { name, age, gender, phone, address, username, password } = req.body;

    if (!name || !age || !gender || !phone || !address || !username || !password) {
      return res.status(400).send("Missing required fields.");
    }

    // IMPORTANT: don’t store plaintext passwords in real life.
    // For your assignment, store it if required—but NEVER render it back.
    const doc = {
      userId: "u" + Date.now(),           // string id (simple unique)
      name: String(name).trim(),
      age: Number(age),
      gender: String(gender).trim(),
      phone: String(phone).trim(),
      address: String(address).trim(),
      username: String(username).trim(),
      password: String(password),         // stored but not shown
      createdAt: new Date().toISOString()
    };

    await usersCol().insertOne(doc);
    res.redirect("/");
  } catch (e) {
    next(e);
  }
});

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error");
});

async function start() {
  await connectToMongo();
  app.listen(PORT, "0.0.0.0", () => console.log("Listening on " + PORT));
}

start();