import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const generateToken = (id) => {
  console.log("Token Key:", process.env.TOKEN_KEY);
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export default generateToken;
