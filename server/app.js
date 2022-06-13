import express, { Router } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";
import tweetRouter from "./routes/tweets.js";
import authRouter from "./routes/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js ";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/tweets", tweetRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});

const server = app.listen(config.host.port);
initSocket(server);
