import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
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

// REGISTER USER

export const register = asyncHandler(async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body;
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataURI);
  const pic = cldRes.url;
  const passwordHash = await bcrypt.hash(password, 5);
  const newUser = new User({
    first_name,
    last_name,
    email,
    password: passwordHash,
    picturePath: pic,
    friends,
    location,
    occupation,
    viewedProfile: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 10000),
  });
  const savedUser = await newUser.save();
  console.log(savedUser);
  if (!savedUser)
    throw new ErrorResponse(`Please fill in required information`, 404);
  res.status(201).json(savedUser);
  next();
});

// LOGGIN IN

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new ErrorResponse(`User does not exist`, 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ErrorResponse(`Invalid credentials. `, 400);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  delete user.password;

  res.status(200).json({ token, user });

  if (!req.body) throw new ErrorResponse(`Login failed ${error.message}`, 500);
  next();
});
