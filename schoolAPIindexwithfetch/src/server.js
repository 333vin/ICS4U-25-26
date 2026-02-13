console.log("Starting index.js — Node version:", process.version);
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Ensure dotenv loads the project-root .env even when running from `src`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "..", ".env") });
import express from "express";
import cors from "cors";

import User from "./models/Users.js";

import connectDB from "./db.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

console.log("MONGODB_URI set?", !!process.env.MONGODB_URI);
try {
    await connectDB();
} catch (err) {
    console.error("Failed to connect to DB — exiting.");
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

app.get("/users", async (req, res) => {
    try {
        const all = await User.find().lean();
        res.status(200).json(all);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
})

app.post("/users", async (req, res) => {
    try {
        const { name, phone, address, gender, age, username, password } = req.body;
        if (!name || !phone || !address || !username || !password) {
            return res.status(400).json({ error: "Missing required fields." });
        }
        const max = await User.findOne().sort({ id: -1 }).select("id").lean();
        const nextId = (max?.id ?? 0) + 1;
        const newUser = await User.create({ name, phone, address, gender, age, username, password });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
})