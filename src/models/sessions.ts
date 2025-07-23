import { Schema, model, Types } from "mongoose";
import { TSessions } from "../type";

const SessionsSchema = new Schema<TSessions>(
  {
    userId: {
      type: Types.ObjectId,
      required: [true, "userId is required field"],
      index: true,
    },
    token: {
      type: String,
      required: [true, "token is required field"],
    },
  },
  { timestamps: true }
);

export default model<TSessions>("sessions", SessionsSchema);
