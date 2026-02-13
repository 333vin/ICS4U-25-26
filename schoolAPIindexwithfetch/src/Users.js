import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        address: String,
        gender: String,
        age: Number,
        username: String,
        password: String
    },
    { versionKey: false }
);

export default mongoose.model("User", schema, "Users");