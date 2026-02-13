// src/config/db.js
import mongoose from "mongoose";

export async function connectToMongo() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) throw new Error("Missing MONGODB_URI");
  if (!dbName) throw new Error("Missing DB_NAME");

  await mongoose.connect(uri, { dbName: dbName });
  console.log("Connected to MongoDB (Mongoose)");
}
