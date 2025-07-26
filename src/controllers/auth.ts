import { Request, Response } from "express";
import { sendErrorResponse, sendResponse, throwErrorResponse } from "../utils";
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
    const { access_token } = req.body;

    await logoutUser(access_token);

    sendResponse(res, "USER LOGOUT");
  } catch (error: any) {
    if (
      error.message === "INVALID TOKEN" ||
      error.message === "NO SESSION FOUND"
    ) {
      return throwErrorResponse("FORBIDDEN", error.message);
    }

    sendErrorResponse(res, error);
  }
};
