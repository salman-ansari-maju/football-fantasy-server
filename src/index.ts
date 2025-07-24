require("dotenv").config();
require("./database/mongoose");
import cors from "cors";
import express from "express";
import appRoutes from "./routes";
import { seedPlayersFromFile } from "./services/playerService";

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

async function seedPlayers() {
  await seedPlayersFromFile();
}

seedPlayers();

app.use(express.json());
// Configure app routes
appRoutes(app);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
