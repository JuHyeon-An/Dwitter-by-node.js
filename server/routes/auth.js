import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";
import * as authController from "../controller/auth.js";

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

const loginValid = [
  body("username")
    .trim()
    .isLength({ min: 5 })
    .withMessage("username should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
  validate,
];

const signupValid = [
  ...loginValid,
  body("name").trim().notEmpty().withMessage("name is empty"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email address!"),
  body("url").isURL().withMessage("invalid URL!").optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.use((req, res, next) => {
  console.log("middelware for auth");
  next();
});

router.post("/signup", signupValid, authController.signupUser);

router.post("/login", loginValid, authController.login);

router.get("/me", isAuth, authController.me);

export default router;
