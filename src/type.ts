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
};

export type TSessions = {
  userId: String;
  token: string;
};

export type TUserReq = {
  userId: string;
  sessionId: string;
};
