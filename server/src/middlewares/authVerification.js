import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

import { User } from "../models/index.js";

const authVerification = (req, res, next) => {
  try {
    const jwtToken = req.cookies.jwtToken;
    if (!jwtToken) {
      return res.status(403).json({ status: false, message: "1" });
    }

    jwt.verify(jwtToken, process.env.TOKEN_KEY, async (error, data) => {
      if (!error) {
        const user = await User.findById(data.id);
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
