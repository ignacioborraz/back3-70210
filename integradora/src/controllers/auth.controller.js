import User from "../dao/models/user.model.js";
import { loginService, registerService } from "../services/auth.service.js";
import CustomError from "../utils/errors/custom.error.js";
import { badAuth, forbidden } from "../utils/errors/dictionary.error.js";
import { verifyTokenUtil } from "../utils/token.util.js";

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      CustomError.new(badAuth);
    }
    const one = await User.findOne({ email });
    if (one) {
      CustomError.new(badAuth);
    }
    const user = await registerService({ email, password, role });
    const message = "User Registered!";
    return res.status(201).json({ response: user._id, message });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      CustomError.new(badAuth);
    }
    const one = await User.findOne({ email });
    if (!one) {
      CustomError.new(badAuth);
    }
    const token = await loginService({ password, one });
    const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true };
    const message = "User logged in!";
    return res
      .cookie("token", token, opts)
      .json({ response: one._id, message });
  } catch (error) {
    next(error);
  }
};
const signout = (req, res, next) => {
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
    next(error);
  }
};

export { register, login, signout };
