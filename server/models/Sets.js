import mongoose from "mongoose";

const SetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    youtube: String,
    spotify: String,
    soundcloud: String,
    last_name: String,
    userPicturePath: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Set = mongoose.model("set", SetSchema);

export default Set;
