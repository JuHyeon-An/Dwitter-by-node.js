import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .notEmpty()
    .withMessage("text is empty")
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 characters"),

  validate,
];

router.use((req, res, next) => {
  console.log("middelware for tweets");
  next();
});

// get all tweets
router.get("/", tweetController.getTweets);

// get tweet by id
router.get("/:id", tweetController.getTweet);

// create new tweet
router.post("/", validateTweet, tweetController.createTweet);

// update the tweet
router.put("/:id", validateTweet, tweetController.updateTweet);

router.delete("/:id", tweetController.deleteTweet);

export default router;
