import express from "express";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import Connection from "./db/dbConnection.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import xploreRouter from "./routes/xploreRouter.js";
import errorHandler from "./middleware/errorHandler.js";
import setRouter from "./routes/setRouter.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const port = process.env.PORT || 8000;
Connection();

// ROUTES
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/xplore", xploreRouter);
app.use("/xperience", setRouter);

// ERROR HANDLER
app.use(errorHandler);

app.listen(port, () =>
  console.log("Server is running on http://localhost:" + port)
);
