// services/authService.ts
import bcrypt from "bcrypt";
import AuthModel from "../models/auth";
import SessionsModel from "../models/sessions";
import { createToken, decodedToken, throwErrorResponse } from "../utils";

export const loginOrRegisterUser = async (email: string, password: string) => {
  let user = await AuthModel.findOne({ email });
  const isNewUser = !user;

  if (isNewUser) {
    const hashedPassword = await bcrypt.hash(password, 5);
    user = new AuthModel({ email, password: hashedPassword });
    await user.save();
  } else {
    const isMatch = await bcrypt.compare(password, user!.password);
    if (!isMatch) {
      throw throwErrorResponse("BAD_REQUEST", "INVALID EMAIL OR PASSWORD");
    }
  }

  const session = new SessionsModel({
    tokenType: "ACCESS_TOKEN",
    userId: user!._id,
  });

  const access_token = createToken(
    `${user!._id}`,
    `${session._id}`,
    "ACCESS_TOKEN"
  );

  session.token = access_token;
  await session.save();

  return {
    access_token,
    isNewUser,
    email: user!.email,
  };
};

export const logoutUser = async (access_token: string) => {
  const decoded_token = decodedToken(access_token.split(" ")[1]);
  if (!decoded_token) {
    throw throwErrorResponse("FORBIDDEN", "INVALID TOKEN");
  }

  const session = await SessionsModel.deleteOne({
    _id: decoded_token?.tki,
    tokenType: "ACCESS_TOKEN",
  });

  if (!session.deletedCount) {
    throw throwErrorResponse("NOT_FOUND", "NO SESSION FOUND");
  }

  return true;
};
