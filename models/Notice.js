import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  content: String,
});

const model = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);

export default model;
