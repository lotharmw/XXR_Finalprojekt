import express from "express";
import { register } from "../controller/authController.js";
import { login } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);

export default authRouter;
