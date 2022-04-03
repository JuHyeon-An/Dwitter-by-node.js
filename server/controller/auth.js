import * as authFunctions from "../data/auth.js";

export function signupUser(req, res) {
  const user = authFunctions.signup(req.body);
  res.status(201).json(user);
}

export function login(req, res) {
  const user = authFunctions.login(req.body);
  res.status(200).json(user);
}
