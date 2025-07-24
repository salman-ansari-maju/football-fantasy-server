// models/player.model.ts

import { Schema, model, Types } from "mongoose";
import { IPlayer } from "../type";

const PlayerSchema = new Schema<IPlayer>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    nationality: { type: String, required: true },
    position: {
      type: String,
      enum: ["Goalkeeper", "Defender", "Midfielder", "Attacker"],
      required: true,
    },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    teamId: { type: Types.ObjectId, ref: "teams", default: null },
    isTransferListed: { type: Boolean, default: false },
    askingPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model<IPlayer>("players", PlayerSchema);
