if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";

const app = express();

import { connectDB } from "./database/connectMongo";

connectDB();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use((err: any, req: any, res: any, next: any) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).send("error", { err });
});

let port = 8080;

app.listen(port, () => {
  console.log("listening on port :", port);
});
