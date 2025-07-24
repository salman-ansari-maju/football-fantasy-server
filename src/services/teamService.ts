// services/teamService.ts
import PlayerModel from "../models/players";
import TeamModel from "../models/team";
import AuthModel from "../models/auth";
import { Types } from "mongoose";
import { throwErrorResponse } from "../utils";
const STARTING_BUDGET = 5_000_000_0;

// Helper: get random N players from a pool
const getRandomSubset = (array: any[], count: number) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const createTeamForUser = async (userId: Types.ObjectId) => {
  const user = await AuthModel.findById(userId);
  if (!user) throw throwErrorResponse("NOT_FOUND", "User not found");

  // Check if user already has a team
  if (user.teamId) {
    throw throwErrorResponse("FORBIDDEN", "User already has a team");
  }

  // 1. Fetch unassigned players by position
  const [goalkeepers, defenders, midfielders, attackers] = await Promise.all([
    PlayerModel.find({ teamId: null, position: "Goalkeeper" }),
    PlayerModel.find({ teamId: null, position: "Defender" }),
    PlayerModel.find({ teamId: null, position: "Midfielder" }),
    PlayerModel.find({ teamId: null, position: "Attacker" }),
  ]);
  // 2. Randomly select 3+6+6+5 players
  const selectedGoalkeepers = getRandomSubset(goalkeepers, 3);
  const selectedDefenders = getRandomSubset(defenders, 6);
  const selectedMidfielders = getRandomSubset(midfielders, 6);
  const selectedAttackers = getRandomSubset(attackers, 5);

  const allPlayers = [
    ...selectedGoalkeepers,
    ...selectedDefenders,
    ...selectedMidfielders,
    ...selectedAttackers,
  ];

  // 3. Calculate total price
  const totalPrice = allPlayers.reduce((sum, p) => sum + p.price, 0);
  if (totalPrice > STARTING_BUDGET) {
    throw throwErrorResponse(
      "BAD_REQUEST",
      "Randomly selected players exceed budget. Try again."
    );
  }

  // 4. Create the team
  const team = await TeamModel.create({
    userId,
    name: `${user.email.split("@")[0]}'s Team`,
    budget: STARTING_BUDGET - totalPrice,
    players: allPlayers.map((p) => p._id),
  });

  // 5. Assign teamId to selected players
  await PlayerModel.updateMany(
    { _id: { $in: allPlayers.map((p) => p._id) } },
    { $set: { teamId: team._id } }
  );

  // Update user's teamId
  user.teamId = team._id;
  await user.save();

  // Return populated team
  return await TeamModel.findById(team._id).populate("players");
};

export const getTeamByUserId = async (userId: Types.ObjectId) => {
  const team = await TeamModel.findOne({ userId })
    .populate("players") // includes player details
    .lean(); // returns plain JS object
  return team;
};
