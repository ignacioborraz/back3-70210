import User from "../dao/models/user.model.js";

const createOne = async (data) => await User.create(data);
const readAll = async (page) => await User.paginate({}, { page, sort: { email: 1 }, select: "-__v -createdAt -updatedAt" });
const readById = async (id) => await User.findById(id);
const readByEmail = async (email) => await User.findOne({ email });
const updateById = async (id, data) => await User.findByIdAndUpdate(id, data, { new: true });
const destroyById = async (id) => await User.findByIdAndDelete(id);

export { createOne, readAll, readById, readByEmail, updateById, destroyById };
