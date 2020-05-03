import mongoose from "mongoose";
import passportLoclaMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  isStudent: Boolean,
  schoolId: Number,
  isProf: Boolean,
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],
  email: String,
});

UserSchema.plugin(passportLoclaMongoose, { usernameField: "email" });

const model = mongoose.models.User || mongoose.model("User", UserSchema);

export default model;
