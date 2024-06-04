import mongoose, { Schema } from "mongoose";
import User from "./user.js";

const tweetSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, default: "" },
  createdAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Tweet", tweetSchema);
