import { Types } from "mongoose";

export type TErrorResponseType = {
  NOT_FOUND: number;
  FORBIDDEN: number;
  UNAUTHORIZE: number;
  BAD_REQUEST: number;
};

export type TError = {
  status: TErrorResponseType[keyof TErrorResponseType];
  response: { success: boolean; message: string[] };
};

export type TStatusCode = {
  SUCCESS: number;
  CREATED: number;
};

export type TokenType = "ACCESS_TOKEN";

export type JwtPayload = {
  sub: string;
  tki: string;
  iat: number;
  exp?: number;
};

export type TAuth = {
  email: string;
  password: string;
  isActive: boolean;
  teamId?: Types.ObjectId | null;
};

export type TSessions = {
  userId: String;
  token: string;
};

export type TUserReq = {
  userId: string;
  sessionId: string;
};

export interface IPlayer {
  name: string;
  age: number;
  nationality: string;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Attacker";
  price: number;
  rating: number;
  teamId?: Types.ObjectId;
  isTransferListed: boolean;
  askingPrice: number;
}

export type TTeam = {
  userId: Types.ObjectId;
  name: string;
  budget: number;
  players: Types.ObjectId[];
};
export type TTransfer = {
  playerId: Types.ObjectId;
  fromTeam: Types.ObjectId;
  toTeam: Types.ObjectId;
  salePrice: number;
  date: Date;
};
