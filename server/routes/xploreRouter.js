import express from "express";
// import { verifyToken } from "../middleware/authHandler.js";
import {
  createEvent,
  getFeedEvent,
  getUserEvent,
  likeEvent,
  upload,
} from "../controller/xploreController.js";

const xploreRouter = express.Router();

xploreRouter.route("/").post(upload.single("picture"), createEvent);

// GET
xploreRouter.route("/").get(getFeedEvent);
xploreRouter.route("/:userId/events").get(getUserEvent);

// UPDATE
xploreRouter.route("/like/:id").patch(likeEvent);

export default xploreRouter;
