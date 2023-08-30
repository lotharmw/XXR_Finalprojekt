import express from "express";
import { upload } from "../utils/fileStorageHandler.js";
import { register } from "../controller/authController.js";
import { login } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.route("/register").post(upload.single("picture"), register);
authRouter.route("/login").post(login);

export default authRouter;
