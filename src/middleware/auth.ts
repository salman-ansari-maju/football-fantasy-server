import { NextFunction, Request, Response } from "express";
import { sendErrorResponse, throwErrorResponse, verifyToken } from "../utils";

export const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")?.trim();
    if (!token)
      return throwErrorResponse("UNAUTHORIZE", "Unauthorized request");

    const decoded = verifyToken(token, "ACCESS_TOKEN");

    if (!decoded)
      return throwErrorResponse("UNAUTHORIZE", "Unauthorized request");

    req.user = {
      id: decoded?.sub,
      sessionId: decoded?.tki,
    };

    next();
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
