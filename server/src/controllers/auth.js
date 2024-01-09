import bcrypt from "bcrypt";

import { User } from "../models/index.js";
import generateToken from "../utils/tokenGenerator.js";

// MAYBE NEED TO PASS NEXT IN THE END
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ messag: "User with this email already exists." });
    }

    const newUser = await User.create({ email, password });
    const jwt = generateToken(user._id);

    res.cookie("jwt", jwt, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
  }
};

export { register };
