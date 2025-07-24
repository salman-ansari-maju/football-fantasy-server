import { Schema, model, Types } from "mongoose";
import { TTeam } from "../type";

const TeamSchema = new Schema<TTeam>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "auth",
      required: true,
      unique: true, // 1 user = 1 team
    },
    name: { type: String, required: true },
    budget: { type: Number, default: 5000000 },
    players: [{ type: Types.ObjectId, ref: "players" }],
  },
  { timestamps: true }
);

export default model<TTeam>("teams", TeamSchema);
