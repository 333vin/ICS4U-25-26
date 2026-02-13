// src/models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true, unique: true },
    authorId: { type: String, required: true },
    title: { type: String },
    content: { type: String },
    tags: [{ type: String }],
    status: { type: String },
    views: { type: Number },
    createdAt: { type: String },
    editedAt: { type: String }
  },
  { collection: "posts" }
);

export default mongoose.model("Post", postSchema);
