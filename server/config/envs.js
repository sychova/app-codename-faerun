"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const Env = {
    MONGO_URL: "mongodb://127.0.0.1:27017/sorcerous-sundries",
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    TOKEN_KEY: "defaultSecretKey",
};
module.exports = Env;
