// src/services/users.service.js
import User from "../models/User.js";

export async function getAllUsers() {
  const f = filter || {};
  return User.find(f).lean();
}

export async function getUserByUserId(userId) {
  return User.findOne({ userId: userId }).lean();
}

export async function createUser(data) {
  const doc = new User({
    userId: data.userId,
    name: data.name,
    email: data.email,
    role: data.role,
    address: data.address,
    github: data.github,
    skills: data.skills,
    stats: data.stats,
    badges: data.badges,
    createdAt: data.createdAt || new Date().toISOString()
  });

  await doc.save();
  return doc.toObject();
}

export async function updateUserByUserId(userId, patch) {
  const updated = await User.findOneAndUpdate(
    { userId: userId },
    { $set: patch },
    { new: true }
  ).lean();

  return updated;
}

export async function deleteUserByUserId(userId) {
  const result = await User.deleteOne({ userId: userId });
  return result.deletedCount === 1;
}
