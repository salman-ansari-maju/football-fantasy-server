import { Router } from "express";
import { isAuthorized } from "../middleware/auth";
import { createTeam, getTeam } from "../controllers/team";

let route = Router();

route.get("/", isAuthorized, getTeam);
route.post("/create", isAuthorized, createTeam);

export default route;
