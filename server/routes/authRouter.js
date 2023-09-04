import express from "express";
import { register, login, upload } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.route("/register").post(upload.single("picture"), register);
authRouter.route("/login").post(login);

export default authRouter;
