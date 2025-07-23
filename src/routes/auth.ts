import { Router } from "express";
import { login, logout } from "../controllers/auth";
import { isAuthorized } from "../middleware/auth";

let route = Router();

route.post("/login", login);
route.post("/logout", isAuthorized, logout);

export default route;
