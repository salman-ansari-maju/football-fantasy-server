export const JWT_SECRET = {
  ACCESS_TOKEN: {
    SECRET: process.env.JWT_ACCESS_SECRET ?? "",
    DURATION: "1d",
  },
};

export const MONGODB_URI = process.env.MONGODB_URI ?? "";
