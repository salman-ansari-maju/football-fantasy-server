import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";
import { JwtPayload, TokenType } from "../type";

// create jwt token
export const createToken = (
  userId: string,
  sessionId: string,
  tokenType: TokenType
) => {
  const payload: JwtPayload = {
    sub: userId,
    tki: sessionId,
    iat: Date.now(),
  };
  return jwt.sign(payload, JWT_SECRET[tokenType].SECRET, {
    expiresIn: JWT_SECRET[tokenType].DURATION,
  });
};

// decode jwt token and return the payload
export const decodedToken = (token: string) => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};

// verify jwt token
export const verifyToken = (token: string, tokenType: TokenType) => {
  try {
    return jwt.verify(token, JWT_SECRET[tokenType].SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};
