import { Types } from "mongoose";
import Player from "../models/players";
import Team from "../models/team";
import Transfer from "../models/transfer";
import { throwErrorResponse } from "../utils";

// Get all players currently listed for transfer

export const getActiveTransfers = async () => {
  const players = await Player.find({ isTransferListed: true })
    .populate("teamId", "name")
    .select("name position price rating nationality age askingPrice teamId");

  return players;
};

//List a player for transfer (owned by the logged-in user)

export const listPlayerForTransferService = async (
  userId: Types.ObjectId,
  playerId: Types.ObjectId,
  askingPrice: number
) => {
  if (!askingPrice || askingPrice <= 0) {
    throw throwErrorResponse("BAD_REQUEST", "ASKING PRICE REQUIRED");
  }

  const player = await Player.findById(playerId);
  if (!player) throw throwErrorResponse("NOT_FOUND", "PLAYER NOT FOUND");

  const team = await Team.findOne({ _id: player.teamId, userId });
  if (!team)
    throw throwErrorResponse("FORBIDDEN", "UNAUTHORIZED TO LIST THIS PLAYER");

  if (player.isTransferListed) {
    throw throwErrorResponse("BAD_REQUEST", "PLAYER ALREADY LISTED");
  }

  player.isTransferListed = true;
  player.askingPrice = askingPrice;
  await player.save();

  return player;
};

// Buy a player from another team

export const buyPlayerService = async (
  buyerUserId: Types.ObjectId,
  playerId: Types.ObjectId
) => {
  const player = await Player.findById(playerId);
  if (!player || !player.isTransferListed) {
    throw throwErrorResponse("NOT_FOUND", "PLAYER NOT AVAILABLE FOR TRANSFER");
  }

  const askingPrice = player.askingPrice;
  const salePrice = Math.floor(askingPrice * 0.95);

  const sellerTeam = await Team.findById(player.teamId);
  if (!sellerTeam)
    throw throwErrorResponse("NOT_FOUND", "SELLER TEAM NOT FOUND");

  const buyerTeam = await Team.findOne({ userId: buyerUserId });
  if (!buyerTeam) throw throwErrorResponse("NOT_FOUND", "BUYER TEAM NOT FOUND");

  if (String(sellerTeam._id) === String(buyerTeam._id)) {
    throw throwErrorResponse("BAD_REQUEST", "CANNOT BUY YOUR OWN PLAYER");
  }

  if (buyerTeam.budget < salePrice) {
    throw throwErrorResponse("BAD_REQUEST", "INSUFFICIENT BUDGET");
  }

  const sellerTeamSize = await Player.countDocuments({
    teamId: sellerTeam._id,
  });
  const buyerTeamSize = await Player.countDocuments({ teamId: buyerTeam._id });

  if (sellerTeamSize <= 15) {
    throw throwErrorResponse(
      "BAD_REQUEST",
      "SELLER MUST KEEP AT LEAST 15 PLAYERS"
    );
  }
  if (buyerTeamSize >= 25) {
    throw throwErrorResponse("BAD_REQUEST", "BUYER CANNOT EXCEED 25 PLAYERS");
  }

  // Transfer ownership
  player.teamId = buyerTeam._id;
  player.isTransferListed = false;
  player.askingPrice = 0;
  await player.save();

  // Update teams' player arrays
  await Team.findByIdAndUpdate(sellerTeam._id, {
    $pull: { players: player._id },
  });
  await Team.findByIdAndUpdate(buyerTeam._id, {
    $push: { players: player._id },
  });

  // Adjust budgets
  buyerTeam.budget -= salePrice;
  sellerTeam.budget += salePrice;
  await buyerTeam.save();
  await sellerTeam.save();

  // Record transfer
  const transfer = await Transfer.create({
    playerId: player._id,
    fromTeam: sellerTeam._id,
    toTeam: buyerTeam._id,
    salePrice,
  });

  return {
    player,
    from: sellerTeam.name,
    to: buyerTeam.name,
    salePrice,
    transferId: transfer._id,
  };
};

export const removePlayerFromTransferList = async (
  userId: Types.ObjectId,
  playerId: Types.ObjectId
) => {
  const player = await Player.findById(playerId);
  if (!player) throw throwErrorResponse("NOT_FOUND", "PLAYER NOT FOUND");

  const team = await Team.findOne({ _id: player.teamId, userId });
  if (!team)
    throw throwErrorResponse("FORBIDDEN", "UNAUTHORIZED TO MODIFY THIS PLAYER");

  if (!player.isTransferListed) {
    throw throwErrorResponse("BAD_REQUEST", "PLAYER IS NOT LISTED");
  }

  player.isTransferListed = false;
  player.askingPrice = 0;
  await player.save();

  return player;
};
