import { Express } from "express";
import AuthRoute from "./auth";
import TeamRoute from "./team";
export default function appRoutes(app: Express) {
  app.use("/api/auth", AuthRoute);
  app.use("/api/team", TeamRoute);
}
