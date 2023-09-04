import Event from "../models/Event.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const storage = new Multer.memoryStorage();
export const upload = Multer({
  storage,
});

export async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

// CREATE
export const createEvent = asyncHandler(async (req, res, next) => {
  const {
    userId,
    title,
    date,
    time,
    location,
    radioEvent,
    city,
    genre,
    price,
    picturePath,
    description,
    lineUp,
  } = req.body;
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataURI);
  const pic = cldRes.url;
  const newEvent = new Event({
    userId,
    title,
    date,
    time,
    location,
    radioEvent,
    city,
    genre,
    price,
    description,
    lineUp,
    picturePath: pic,
    likes: {},
  });

  await newEvent.save();

  const event = await Event.find();

  res.status(201).json(event);

  if (!newEvent) throw new ErrorResponse(`Can not create Event`, 409);
  next();
});

// GET
export const getFeedEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.find();

  if (!event) throw new ErrorResponse(`Can not find Posts`, 404);
  res.status(200).json(event);

  next();
});

export const getUserEvent = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  const evnt = await Event.find({ userId });

  res.status(200).json(evnt);

  if (!evnt) throw new ErrorResponse(`Can not find Posts of ${userId}`, 404);
  next();
});

// UPDATE
export const likeEvent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const event = await Event.findById(id);
  const isLiked = event.likes.get(userId);

  if (isLiked) {
    event.likes.delete(userId);
  } else {
    event.likes.set(userId, true);
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { likes: event.likes },
    { new: true }
  );

  if (!updatedEvent)
    throw new ErrorResponse(`Can not find Posts of ${userId}`, 404);

  const allEvents = await Event.find();

  return res.status(200).json(allEvents);

  next();
});
