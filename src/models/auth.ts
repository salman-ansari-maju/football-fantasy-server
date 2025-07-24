import { Schema, model, Types } from "mongoose";
import { TAuth } from "../type";

const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const AuthSchema = new Schema<TAuth>(
  {
    email: {
      type: String,
      required: [true, "email is required field"],
      unique: true,
      validate: (value: string) => {
        if (!value.match(email_regex)) {
          throw new Error("enter valid email address");
        }
      },
    },
    password: {
      type: String,
      required: [true, "password is required field"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    teamId: {
      type: Types.ObjectId,
      ref: "teams",
      default: null,
    },
  },
  { timestamps: true }
);

export default model<TAuth>("auth", AuthSchema);
