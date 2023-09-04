import express from "express";
import { verifyToken } from "../middleware/authHandler.js";
import {
  createEvent,
  getFeedEvent,
  getUserEvent,
  likeEvent,
  upload,
} from "../controller/xploreController.js";

const xploreRouter = express.Router();

xploreRouter
  .route("/")
  .post(verifyToken, upload.single("picture"), createEvent);

// GET
xploreRouter.route("/").get(getFeedEvent);
xploreRouter.route("/:userId/evnts").get(getUserEvent);

// UPDATE
xploreRouter.route("/like/:id").patch(verifyToken, likeEvent);

export default xploreRouter;
