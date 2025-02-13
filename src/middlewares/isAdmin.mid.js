import CustomError from "../utils/errors/custom.error.js";
import { badAuth, forbidden } from "../utils/errors/dictionary.error.js";
import { verifyTokenUtil } from "../utils/token.util.js";

function isAdmin(req, res, next) {
  try {
    const token = req?.cookies?.token;
    if (!token) {
      CustomError.new(badAuth);
    }
    const data = verifyTokenUtil(token);
    if (!data && data.role.toLowerCase() !== "admin") {
      CustomError.new(forbidden);
    }
    req.user = data;
    next();
  } catch (error) {
    next(error);
  }
}

export default isAdmin;
