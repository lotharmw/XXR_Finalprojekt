import Sets from "../models/Sets.js";
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
export const createSet = asyncHandler(async (req, res, next) => {
  const {
    userId,
    first_name,
    last_name,
    title,
    youtube,
    spotify,
    soundcloud,
    picturePath,
    userPicturePath,
  } = req.body;
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataURI);
  const pic = cldRes.url;
  const newSet = new Sets({
    userId,
    first_name,
    last_name,
    title,
    youtube,
    spotify,
    soundcloud,
    userPicturePath,
    picturePath: pic,
    likes: {},
  });

  await newSet.save();

  const set = await Sets.find();

  res.status(201).json(set);

  if (!newSet) throw new ErrorResponse(`Can not create Sets`, 409);
  next();
});

// GET
export const getFeedSet = asyncHandler(async (req, res, next) => {
  const set = await Sets.find();

  if (!set) throw new ErrorResponse(`Can not find Set`, 404);
  res.status(200).json(set);

  next();
});

export const getUserSet = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const evnt = await Sets.find({ userId });

  res.status(200).json(evnt);

  if (!evnt) throw new ErrorResponse(`Can not find Set of ${userId}`, 404);
  next();
});

// UPDATE
export const likeSet = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const set = await Sets.findById(id);
  const isLiked = set.likes.get(userId);

  if (isLiked) {
    set.likes.delete(userId);
  } else {
    set.likes.set(userId, true);
  }

  const updatedSet = await Sets.findByIdAndUpdate(
    id,
    { likes: set.likes },
    { new: true }
  );

  if (!updatedSet)
    throw new ErrorResponse(`Can not find Set of ${userId}`, 404);

  const allSets = await Sets.find();

  return res.status(200).json(allSets);

  next();
});
