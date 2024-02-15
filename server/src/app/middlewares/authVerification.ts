import { NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import { TOKEN_KEY } from "../../config/envs";

import { getById } from "../services/user";

const authVerification = (req: any, res: any, next: NextFunction) => {
  try {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken || jwtToken === "undefined") {
      return res.status(403).json({ status: false });
    }

    jwt.verify(jwtToken, TOKEN_KEY!, async (error: any, data: any) => {
      if (!error) {
        const user = await getById(data.id);
        if (user) {
          req.user = {
            userId: data.id,
            isAdmin: user.isAdmin,
          };
          next();
        }
        if (!user) {
          return res.status(403).json({ status: false });
        }
      }
      if (error) {
        return res.status(403).json({ status: false });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export default authVerification;
