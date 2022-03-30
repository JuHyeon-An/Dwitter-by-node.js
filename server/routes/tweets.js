import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log("middelware for tweets");
  next();
});

// get all tweets
router.get("/", tweetController.getTweets);

// get tweet by id
router.get("/:id", tweetController.getTweet);

// create new tweet
router.post("/", tweetController.createTweet);

// update the tweet
router.put("/:id", tweetController.updateTweet);

router.delete("/:id", tweetController.deleteTweet);

export default router;
