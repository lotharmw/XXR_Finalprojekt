import express from "express";
import { verifyToken } from "../middleware/authHandler.js";
import {
  createPost,
  getFeedPost,
  getUserPost,
  likePost,
  upload,
} from "../controller/postController.js";

const postRouter = express.Router();

postRouter.route("/").post(verifyToken, upload.single("picture"), createPost);

// GET
postRouter.route("/").get(verifyToken, getFeedPost);
postRouter.route("/:userId/posts").get(verifyToken, getUserPost);

// UPDATE
postRouter.route("/:userId/like").get(verifyToken, likePost);

export default postRouter;
