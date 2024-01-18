import { NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import { TOKEN_KEY } from "../../config/envs";

import { getById } from "../services/user";

const authVerification = (req: any, res: any, next: NextFunction) => {
  try {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
      return res.status(403).json({ status: false, message: "1" });
    }

    jwt.verify(jwtToken, TOKEN_KEY!, async (error: any, data: any) => {
      if (!error) {
        const user = await getById(data.id);
        if (user) {
          req.userId = data.id;
          next();
        }
        if (!user) {
          return res.status(403).json({ status: false, message: "2" });
        }
      }
      if (error) {
        return res.status(403).json({ status: false, message: "3" });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export default authVerification;
