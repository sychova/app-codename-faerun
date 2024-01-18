import bcrypt from "bcrypt";

import { User } from "../models";
import generateToken from "../utils/tokenGenerator";

const register = async (req: any, res: any) => {
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
    res.status(201).json({ status: true });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide both email and password.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User with provided email does not exist.",
      });
    }

    const auth = await bcrypt.compare(password, existingUser.password);

    if (!auth) {
      return res.status(403).json({
        status: false,
        message: "You shall not pass! (wrong email or password)",
      });
    }

    const jwtToken = generateToken(existingUser._id);

    res.cookie("jwtToken", jwtToken, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({ status: true });
  } catch (error) {
    console.error(error);
  }
};

export { register, login };