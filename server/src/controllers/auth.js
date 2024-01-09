import bcrypt from "bcrypt";

import { User } from "../models/index.js";
import generateToken from "../utils/tokenGenerator.js";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const newUser = await User.create({ email, password });
    const jwtToken = generateToken(newUser._id);

    res.cookie("jwtToken", jwtToken, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password." });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User with provided email does not exist." });
    }

    const auth = await bcrypt.compare(password, existingUser.password);

    if (!auth) {
      return res
        .status(403)
        .json({ message: "You shall not pass! (wrong email or password)" });
    }

    const jwtToken = generateToken(existingUser._id);

    res.cookie("jwtToken", jwtToken, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({ message: "Success!" });
  } catch (error) {
    console.error(error);
  }
};

export { register, login };
