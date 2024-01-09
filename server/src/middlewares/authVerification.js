import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

import { User } from "../models/index.js";

const authVerification = (req, res) => {
  const jwtToken = req.cookies.token;
  if (!jwtToken) {
    return res.status(403).json({ status: false });
  }

  jwt.verify(jwtToken, process.env.TOKEN_KEY, async (error, data) => {
    if (!error) {
      const user = await User.findById(data.id);
      if (user) {
        return res.status(200).json({ status: true, user: user.email });
      }

      if (!user) {
        return res.status(403).json({ status: false });
      }
    }

    if (error) {
      return res.status(403).json({ status: false });
    }
  });
};

export default authVerification;
