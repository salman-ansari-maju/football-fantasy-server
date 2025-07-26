import { Express } from "express";
import AuthRoute from "./auth";
import TeamRoute from "./team";
import TransferRoute from "./transfer";
export default function appRoutes(app: Express) {
  app.use("/api/auth", AuthRoute);
  app.use("/api/team", TeamRoute);
  app.use("/api/transfer", TransferRoute);
}
