import { Schema, model, Types } from "mongoose";
import { TTransfer } from "../type";

const TransferSchema = new Schema<TTransfer>(
  {
    playerId: {
      type: Schema.Types.ObjectId,
      ref: "players",
      required: true,
    },
    fromTeam: {
      type: Schema.Types.ObjectId,
      ref: "teams",
      required: true,
    },
    toTeam: {
      type: Schema.Types.ObjectId,
      ref: "teams",
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model<TTransfer>("transfers", TransferSchema);
