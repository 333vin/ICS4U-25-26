// src/models/Comment.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentId: { type: String, required: true, unique: true },
    postId: { type: String, required: true },
    authorId: { type: String, required: true },
    text: { type: String },
    isFlagged: { type: Boolean },
    likeCount: { type: Number },
    mentions: [{ type: String }],
    createdAt: { type: String }
  },
  { collection: "comments" }
);

export default mongoose.model("Comment", commentSchema);
