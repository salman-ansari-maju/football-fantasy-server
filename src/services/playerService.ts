// services/playerService.ts
import fs from "fs";
import path from "path";
import PlayerModel from "../models/players";

const playersFilePath = path.join(__dirname, "../data/player_pool.json");

export const seedPlayersFromFile = async () => {
  try {
    const existingCount = await PlayerModel.countDocuments();
    if (existingCount > 0) {
      console.log("Player pool already seeded. Skipping...");
      return;
    }

    const data = fs.readFileSync(playersFilePath, "utf-8");
    const players = JSON.parse(data);

    if (!Array.isArray(players)) {
      throw new Error("Invalid player data format");
    }

    const result = await PlayerModel.insertMany(players);
    console.log(`${result.length} players inserted.`);
  } catch (error) {
    console.error("Error seeding players:", error);
  }
};
