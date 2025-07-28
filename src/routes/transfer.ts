import { Router } from "express";
import { isAuthorized } from "../middleware/auth";
import {
  getActiveTransferPlayers,
  listPlayerForTransfer,
  buyPlayer,
  unlistPlayer,
} from "../controllers/transfer";

let route = Router();

route.get("/", isAuthorized, getActiveTransferPlayers);
route.post("/player/:playerId", isAuthorized, listPlayerForTransfer);
route.post("/buy/:playerId", isAuthorized, buyPlayer);
route.patch("/player/:playerId/remove-transfer", isAuthorized, unlistPlayer);
// route.post("/listed-players", isAuthorized, getMyListedPlayers);

export default route;
