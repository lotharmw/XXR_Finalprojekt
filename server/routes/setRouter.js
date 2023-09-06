import express from "express";
import { verifyToken } from "../middleware/authHandler.js";
import {
  createSet,
  getFeedSet,
  getUserSet,
  likeSet,
  upload,
} from "../controller/setsController.js";

const setRouter = express.Router();

setRouter.route("/").post(verifyToken, upload.single("picture"), createSet);

// GET
setRouter.route("/").get(getFeedSet);
setRouter.route("/:userId/sets").get(getUserSet);

// UPDATE
setRouter.route("/like/:id").patch(verifyToken, likeSet);

export default setRouter;
