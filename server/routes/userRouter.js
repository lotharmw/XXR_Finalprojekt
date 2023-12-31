import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../controller/userController.js";
// import { verifyToken } from "../middleware/authHandler.js";

const userRouter = express.Router();

// GET
userRouter.route("/:id").get(getUser);
userRouter.route("/:id/friends").get(getUserFriends);

// UPDATE
userRouter.route("/:id/:friendId").patch(addRemoveFriends);

export default userRouter;
