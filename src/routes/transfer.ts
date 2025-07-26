import { Router } from "express";
import { isAuthorized } from "../middleware/auth";
import {
  getActiveTransferPlayers,
  listPlayerForTransfer,
  buyPlayer,
} from "../controllers/transfer";

let route = Router();

route.get("/", isAuthorized, getActiveTransferPlayers);
route.post("/player/:playerId", isAuthorized, listPlayerForTransfer);
route.post("/buy/:playerId", isAuthorized, buyPlayer);

export default route;
