import express from "express";
import Connection from "./db/dbConncection.js";
import exampleRouter from "./routes/exampleRouter.js";
import cors from "cors";

const app = express();
app.use(express.json());
Connection();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const port = process.env.PORT || 8000;

app.use("/", exampleRouter);

app.listen(port, () =>
  console.log("Server is running on http://localhost:" + port)
);
