import { readAll, readById, updateById, destroyById } from "../services/users.service.js";
import CustomError from "../utils/errors/custom.error.js";
import { notFound } from "../utils/errors/dictionary.error.js";

const readAllUsers = async (req, res, next) => {
  try {
    const { page } = req.params;
    const all = await readAll(page);
    if (all.length > 0) {
      return res.status(200).json({ message: "Read!", response: all });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};
const readUserById = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const one = await readById(user_id);
    if (one) {
      return res.status(200).json({ message: "Read!", response: one });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};
const updateUserById = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const data = req.body;
    const one = await updateById(user_id, data);
    if (one) {
      return res.status(200).json({ message: "Updated!", response: one });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};
const destroyUserById = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const one = await destroyById(user_id);
    if (one) {
      return res
        .status(200)
        .clearCookie("token")
        .json({ message: "Destroyed!", response: one });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};

export { readAllUsers, readUserById, updateUserById, destroyUserById };
