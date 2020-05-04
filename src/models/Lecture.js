import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  lectureId: String,
  name: String,
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notice",
    },
  ],
});

const model =
  mongoose.models.Lecture ||
  mongoose.models.lectures ||
  mongoose.model("Lecture", LectureSchema);

export default model;
