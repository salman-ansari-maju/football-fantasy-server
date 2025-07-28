import { Request, Response } from "express";
import { Types } from "mongoose";
import { createTeamForUser, getTeamByUserId } from "../services/teamService";
import { sendErrorResponse, sendResponse, throwErrorResponse } from "../utils";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming req.user is set by auth middleware

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return throwErrorResponse("BAD_REQUEST", "INVALID USER ID");
    }

    const team = await createTeamForUser(new Types.ObjectId(userId));

    sendResponse(res, "TEAM SUCCESSFULLY CREATED", team);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return throwErrorResponse("BAD_REQUEST", "INVALID USER ID");
    }

    const team = await getTeamByUserId(new Types.ObjectId(userId));

    if (!team) {
      return throwErrorResponse("NOT_FOUND", "TEAM NOT FOUND");
    }

    sendResponse(res, "TEAM FETCHED SUCCESSFULLY", team);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
