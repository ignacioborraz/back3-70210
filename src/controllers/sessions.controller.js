import User from "../dao/models/user.model.js";
import CustomError from "../utils/errors/custom.error.js";
import { badAuth, forbidden } from "../utils/errors/dictionary.error.js";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil, verifyTokenUtil } from "../utils/token.util.js";

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      CustomError.new(badAuth);
    }
    const one = await User.findOne({ email });
    if (one) {
      CustomError.new(badAuth);
    }
    const hashedPassword = createHashUtil(password);
    const data = { email, password: hashedPassword, role };
    const user = await User.create(data);
    const message = "User Registered!";
    return res.status(201).json({ response: user._id, message });
  } catch (error) {
    const { statusCode, message } = error;
    return res.status(statusCode).json({ message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      CustomError.new(badAuth);
    }
    const one = await User.findOne({ email });
    if (!one) {
      CustomError.new(badAuth);
    }
    const verifyPassword = verifyHashUtil(password, one.password);
    if (!verifyPassword) {
      CustomError.new(badAuth);
    }
    const data = {
      user_id: one._id,
      role: one.role,
    };
    const token = createTokenUtil(data);
    const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };
    const message = "User logged in!";
    return res
      .cookie("token", token, opts)
      .json({ response: one._id, message });
  } catch (error) {
    const { statusCode, message } = error;
    return res.status(statusCode).json({ message });
  }
};
const signout = (req, res) => {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      CustomError.new(badAuth);
    }
    const verifyToken = verifyTokenUtil(token);
    if (!verifyToken) {
      CustomError.new(forbidden);
    }
    const message = "User signed out!";
    return res.clearCookie("token").json({ response: token.user_id, message });
  } catch (error) {
    const { statusCode, message } = error;
    return res.status(statusCode).json({ message });
  }
};

export { register, login, signout };
