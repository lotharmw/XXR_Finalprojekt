import express from "express";
import { upload } from "../utils/fileStorageHandler.js";
import { verifyToken } from "../middleware/authHandler.js";
import {
  createPost,
  getFeedPost,
  getUserPost,
  likePost,
} from "../controller/postController.js";

const postRouter = express.Router();

postRouter
  .route("/")
  .post(verifyToken, upload.single("picturePath"), createPost);

// GET
postRouter.route("/").get(verifyToken, getFeedPost);
postRouter.route("/:userId/posts").get(verifyToken, getUserPost);

// UPDATE
postRouter.route("/:userId/like").get(verifyToken, likePost);

export default postRouter;
