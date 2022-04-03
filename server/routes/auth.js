import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth.js";
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
  console.log("middelware for auth");
  next();
});

router.post("/signup", authController.signupUser);

router.post("/login", authController.login);

export default router;
