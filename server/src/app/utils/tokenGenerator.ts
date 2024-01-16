import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });
};

export default generateToken;
