import { Request, Response } from "express";
import AuthModel from "../models/auth";
import SessionsModel from "../models/sessions";
import {
  createToken,
  decodedToken,
  sendErrorResponse,
  sendResponse,
  throwErrorResponse,
} from "../utils";
import bcrypt from "bcrypt";

//   try {
//     const { email, password } = req.body;
//     // login user using email and password
//     const user = await AuthModel.findOne({ email });
//     // if user has invalid credentials
//     if (!user) {
//       req.body.password = await bcrypt.hash(req.body.password, 5);
//       const user = new AuthModel(req.body);
//       await user.save();
//       // create new session
//       const session = new SessionsModel({
//         tokenType: "CONFIRMATION_TOKEN",
//         userId: user.id,
//       });

//       // save session of that token
//       const access_token = createToken(
//         `${user?._id}`,
//         `${session._id}`,
//         "ACCESS_TOKEN"
//       );
//       await session.save();

//       sendResponse(res, "USER LOGIN", {
//         access_token,
//         email: user.email,
//         username: user.username,
//       });
//       return;
//     }
//     // compare password
//     const comparePassword = await bcrypt.compare(
//       password,
//       user?.password || ""
//     );
//     if (!comparePassword)
//       return throwErrorResponse("BAD_REQUEST", "INVALID EMAIL OR PASSWORD");
//     // create new session
//     const session = new SessionsModel({
//       tokenType: "ACCESS_TOKEN",
//       userId: user?._id,
//     });
//     // create user access token
//     const access_token = createToken(
//       `${user?._id}`,
//       `${session._id}`,
//       "ACCESS_TOKEN"
//     );
//     // save user sessions
//     session.token = access_token;
//     await session.save();

//     sendResponse(res, "USER LOGIN", {
//       access_token,
//       email: user.email,
//       username: user.username,
//     });
//   } catch (error) {
//     sendErrorResponse(res, error);
//   }
// };

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await AuthModel.findOne({ email });

    // If user doesn't exist, auto-register them
    const isNewUser = !user;
    if (isNewUser) {
      const hashedPassword = await bcrypt.hash(password, 5);
      user = new AuthModel({ ...req.body, password: hashedPassword });
      await user.save();
    }

    // If existing user, validate password
    if (!isNewUser) {
      const isMatch = await bcrypt.compare(password, user!.password);
      if (!isMatch) {
        return throwErrorResponse("BAD_REQUEST", "INVALID EMAIL OR PASSWORD");
      }
    }

    // Create a new session
    const session = new SessionsModel({
      tokenType: "ACCESS_TOKEN",
      userId: user!._id,
    });

    const access_token = createToken(
      `${user!._id}`,
      `${session._id}`,
      "ACCESS_TOKEN"
    );

    session.token = access_token;
    await session.save();

    sendResponse(res, isNewUser ? "USER REGISTERED" : "USER LOGIN", {
      access_token,
      email: user!.email,
    });
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { access_token } = req.body;
    // decode token payload
    const decoded_token = decodedToken(access_token);
    // throw error if invalid token
    if (!decoded_token) return throwErrorResponse("FORBIDDEN", "INVALID TOKEN");
    // find session and remove it into the database
    const session = await SessionsModel.deleteOne({
      _id: decoded_token?.tki,
      tokenType: "ACCESS_TOKEN",
    });
    if (!session.deletedCount)
      return throwErrorResponse("NOT_FOUND", "NO SESSION FOUND");

    sendResponse(res, "USER LOGOUT");
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
