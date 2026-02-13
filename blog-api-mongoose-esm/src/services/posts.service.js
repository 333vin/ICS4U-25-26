// src/services/posts.service.js
import Post from "../models/Post.js";

export async function getAllPosts(filter) {
  const f = filter || {};
  return Post.find(f).lean();
}

export async function getPostByPostId(postId) {
  return Post.findOne({ postId: postId }).lean();
}

export async function createPost(data) {
  const doc = new Post({
    postId: data.postId,
    authorId: data.authorId,
    title: data.title,
    content: data.content,
    tags: data.tags,
    status: data.status,
    views: data.views || 0,
    createdAt: data.createdAt || new Date().toISOString(),
    editedAt: data.editedAt
  });

  await doc.save();
  return doc.toObject();
}

export async function updatePostByPostId(postId, patch) {
  const updated = await Post.findOneAndUpdate(
    { postId: postId },
    { $set: patch },
    { new: true }
  ).lean();

  return updated;
}

export async function deletePostByPostId(postId) {
  const result = await Post.deleteOne({ postId: postId });
  return result.deletedCount === 1;
}
