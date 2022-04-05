import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as authFunctions from "../data/auth.js";

// TODO: 서버에 가지고 있으면 not secure -> 추후 보안 필요
const jwtSecretKey = "qm&jhwU8WFeV";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 10;

export function signupUser(req, res) {
  const { username, password, name, email, url } = req.body;
  const user = authFunctions.findByUsername();
  //const user = authFunctions.signup(req.body);
  res.status(201).json(user);
}

export function login(req, res) {
  const user = authFunctions.login(req.body);
  res.status(200).json(user);
}
