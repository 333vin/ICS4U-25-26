// server.js (Option B: static HTML + fetch JSON API + MongoDB Atlas)
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { connectToMongo, getCollection } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse JSON (for fetch POST /users) and form data (harmless to keep)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public (index.html, css, etc.)
app.use(express.static(path.join(__dirname, "public")));

function usersCol() {
  return getCollection("users");
}

// Serve homepage (your public/index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API: return users as JSON (used by loadUsers())
app.get("/users", async (req, res, next) => {
  try {
    const users = await usersCol().find({}).sort({ createdAt: -1 }).toArray();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

// API: create user from JSON (used by newUser())
app.post("/users", async (req, res, next) => {
  try {
    const { name, age, gender, phone, address, username, password } = req.body;

    if (!name || !age || !gender || !phone || !address || !username || !password) {
      return res.status(400).send("Missing required fields.");
    }

    const doc = {
      userId: "u" + Date.now(), // string ID
      name: String(name).trim(),
      age: Number(age),
      gender: String(gender).trim(),
      phone: String(phone).trim(),
      address: String(address).trim(),
      username: String(username).trim(),

      // For real apps: hash passwords; never return them.
      // For your UI: you already display bullets, but your JS needs the created object.
      // We'll store the password but you should NOT render it on the client.
      password: String(password),

      createdAt: new Date().toISOString(),
    };

    await usersCol().insertOne(doc);
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server error");
});

async function start() {
  await connectToMongo();
  app.listen(PORT, "0.0.0.0", () => console.log("Listening on " + PORT));
}

start();