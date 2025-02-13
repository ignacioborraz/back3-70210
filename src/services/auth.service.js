import User from "../dao/models/user.model.js";
import CustomError from "../utils/errors/custom.error.js";
import { badAuth } from "../utils/errors/dictionary.error.js";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil } from "../utils/token.util.js";

const registerService = async (data) => {
  try {
    const { email, password, role } = data;
    const hashedPassword = createHashUtil(password);
    data = { email, password: hashedPassword, role };
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw error;
  }
};

const loginService = async (data) => {
  try {
    const { password, one } = data;
    const verifyPassword = verifyHashUtil(password, one.password);
    if (!verifyPassword) {
      CustomError.new(badAuth);
    }
    let token = {
      user_id: one._id,
      role: one.role,
    };
    token = createTokenUtil(token);
    return token;
  } catch (error) {
    throw error;
  }
};

export { registerService, loginService };
