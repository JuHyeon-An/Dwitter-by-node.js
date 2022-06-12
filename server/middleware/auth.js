import jwt from "jsonwebtoken";
import * as userFunctions from "../data/auth.js";
import { config } from "../config.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    console.log("no authHeader or no Bearer");
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  console.log(`token : ${token}`);

  // TODO: Make it secure!
  jwt.verify(token, config.jwt.jwtSecretKey, async (error, decoded) => {
    if (error) {
      console.log(`failed to veryfy token`);
      return res.status(401).json(AUTH_ERROR);
    }

    const user = await userFunctions.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id; //req.customData 등록
    req.token = token;
    next();
  });
};
