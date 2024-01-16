import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
import { TOKEN_KEY } from "../../config/envs";

const generateToken = (id: any) => {
  return jwt.sign({ id }, TOKEN_KEY!, {
    expiresIn: "1h",
  });
};

export default generateToken;
