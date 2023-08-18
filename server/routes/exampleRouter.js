import express from "express";
import {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
} from "../controller/exampleController";

const exampleRouter = express.Router();

postRouter.route("/").get(getAll).post(create);

postRouter.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

export default exampleRouter;
