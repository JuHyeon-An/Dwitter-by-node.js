import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userFunctions from "../data/auth.js";

// TODO: 서버에 가지고 있으면 not secure -> 추후 보안 필요
const jwtSecretKey = "qm&jhwU8WFeV";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 10;

export async function signupUser(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userFunctions.findByUsername(username);
  console.log(`found : ${found}`);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hased = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = userFunctions.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });

  const token = createJwtToken(userId);

  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { usernname, password } = req.body;
  const user = await userFunctions.findByUsername(username);
  if (!user) {
    // 보안상 user, password 구분하지 않고 Invalid message 띄워줌
    return res.status(401).json({ message: "Invalid user or password" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }

  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
