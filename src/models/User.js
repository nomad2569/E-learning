import mongoose from "mongoose";
import passportLoclaMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  isStudent: {
    type: Boolean,
    default: false,
  },
  name: String,
  schoolId: Number,
  isProf: {
    type: Boolean,
    default: false,
  },
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
