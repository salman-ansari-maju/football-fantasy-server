import { Request, Response } from "express";
import { sendErrorResponse, sendResponse } from "../utils";
import { loginOrRegisterUser, logoutUser } from "../services/authService";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginOrRegisterUser(email, password);

    sendResponse(res, result.isNewUser ? "USER REGISTERED" : "USER LOGIN", {
      access_token: result.access_token,
      email: result.email,
    });
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    await logoutUser(authorization as string);

    sendResponse(res, "USER LOGOUT");
  } catch (error: any) {
    sendErrorResponse(res, error);
  }
};
