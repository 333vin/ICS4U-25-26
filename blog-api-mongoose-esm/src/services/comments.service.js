// src/services/comments.service.js
import Comment from "../models/Comment.js";

export async function getAllComments(filter) {
  const f = filter || {};
  return Comment.find(f).lean();
}

export async function getCommentByCommentId(commentId) {
  return Comment.findOne({ commentId: commentId }).lean();
}

export async function createComment(data) {
  const doc = new Comment({
    commentId: data.commentId,
    postId: data.postId,
    authorId: data.authorId,
    text: data.text,
    isFlagged: data.isFlagged || false,
    likeCount: data.likeCount || 0,
    mentions: data.mentions || [],
    createdAt: data.createdAt || new Date().toISOString()
  });

  await doc.save();
  return doc.toObject();
}

export async function updateCommentByCommentId(commentId, patch) {
  const updated = await Comment.findOneAndUpdate(
    { commentId: commentId },
    { $set: patch },
    { new: true }
  ).lean();

  return updated;
}

export async function deleteCommentByCommentId(commentId) {
  const result = await Comment.deleteOne({ commentId: commentId });
  return result.deletedCount === 1;
}
