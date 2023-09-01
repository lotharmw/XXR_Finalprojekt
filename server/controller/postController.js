import User from "../models/User.js";
import Post from "../models/Post.js";
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
export const createPost = asyncHandler(async (req, res, next) => {
  const { userId, picturePath, description } = req.body;
  const user = await User.findById(userId);
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataURI);
  const pic = cldRes.url;
  const newPost = new Post({
    userId,
    first_name: user.first_name,
    last_name: user.last_name,
    location: user.location,
    description,
    picturePath: pic,
    userPicturePath: user.picturePath,
    likes: {},
    comments: [],
  });

  await newPost.save();

  const post = await Post.find();

  res.status(201).json(post);

  if (!newPost) throw new ErrorResponse(`Can not create Post`, 409);
  next();
});

// GET
export const getFeedPost = asyncHandler(async (req, res, next) => {
  const post = await Post.find();

  if (!post) throw new ErrorResponse(`Can not find Posts`, 404);
  res.status(200).json(post);

  next();
});

export const getUserPost = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  const post = await Post.find({ userId });

  res.status(200).json(post);

  if (!post) throw new ErrorResponse(`Can not find Posts of ${userId}`, 404);
  next();
});

// UPDATE
export const likePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  console.log(req.params);
  console.log(req.body);

  const post = await Post.findById(id);
  console.log(post);
  const isLiked = post.likes.get(userId);

  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes },
    { new: true }
  );

  if (!updatedPost)
    throw new ErrorResponse(`Can not find Posts of ${userId}`, 404);

  const allPost = await Post.find();

  return res.status(200).json(allPost);

  next();
});
