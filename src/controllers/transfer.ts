import { Types } from "mongoose";
import { Request, Response } from "express";
import { sendErrorResponse, sendResponse, throwErrorResponse } from "../utils";
import {
  getActiveTransfers,
  listPlayerForTransferService,
  buyPlayerService,
  getMyListedPlayers,
  removePlayerFromTransferList,
} from "../services/transferService";

export const getActiveTransferPlayers = async (req: Request, res: Response) => {
  try {
    const result = await getActiveTransfers();
    sendResponse(res, "ACTIVE TRANSFER LIST FETCHED", result);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const listPlayerForTransfer = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { playerId } = req.params;
    const { askingPrice } = req.body;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return throwErrorResponse("BAD_REQUEST", "INVALID USER ID");
    }

    const result = await listPlayerForTransferService(
      new Types.ObjectId(userId),
      new Types.ObjectId(playerId),
      askingPrice
    );

    sendResponse(res, "PLAYER LISTED FOR TRANSFER", result);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const buyPlayer = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { playerId } = req.params;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return throwErrorResponse("BAD_REQUEST", "INVALID USER ID");
    }

    const result = await buyPlayerService(
      new Types.ObjectId(userId),
      new Types.ObjectId(playerId)
    );

    sendResponse(res, "PLAYER PURCHASED SUCCESSFULLY", result);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const getMyTransferListedPlayers = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return throwErrorResponse("BAD_REQUEST", "INVALID USER ID");
    }

    const result = await getMyListedPlayers(new Types.ObjectId(userId));
    sendResponse(res, "MY LISTED PLAYERS FETCHED", result);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const unlistPlayer = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { playerId } = req.params;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return throwErrorResponse("BAD_REQUEST", "INVALID USER ID");
    }

    const result = await removePlayerFromTransferList(
      new Types.ObjectId(userId),
      new Types.ObjectId(playerId)
    );

    sendResponse(res, "PLAYER REMOVED FROM TRANSFER LIST", result);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
