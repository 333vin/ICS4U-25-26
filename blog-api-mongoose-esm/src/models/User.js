// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    role: { type: String },
    address: {
      city: { type: String },
      province: { type: String },
      country: { type: String }
    },
    github: { type: String },
    skills: [{ type: String }],
    stats: {
      posts: { type: Number },
      comments: { type: Number }
    },
    badges: [{ type: String }],
    createdAt: { type: String }
  },
  { collection: "users" }
);

export default mongoose.model("User", userSchema);
