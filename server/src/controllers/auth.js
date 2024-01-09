const bcrypt = require("bcrypt");

const User = require("../models/User");
const { generateToken } = require("../utils/tokenGenerator");
