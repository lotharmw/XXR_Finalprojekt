import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    location: {
      type: String,
      required: true,
    },
    radioEvent: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    genre: String,
    lineUp: String,
    description: String,
    picturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", EventSchema);

export default Event;
