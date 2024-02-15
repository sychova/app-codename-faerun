import bcrypt from "bcrypt";

import { userService } from "../services";
import generateToken from "../utils/tokenGenerator";

const register = async (req: any, res: any) => {
  try {
    const { email, guild, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide a valid email." });
    }
    if (!guild) {
      return res.status(400).json({ message: "Please choose a guild." });
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Please provide a valid password." });
    }

    const existingUser: any = await userService.getByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const newUser: any = userService.create(email, guild, password);

    const jwtToken = generateToken(newUser.id);

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

    const existingUser: any = await userService.getByEmail(email);
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

    const jwtToken = generateToken(existingUser.id);

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
