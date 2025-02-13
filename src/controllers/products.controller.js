import { createOne, readAll, readById, updateById, destroyById, createMock, createMocks } from "../services/products.service.js";
import CustomError from "../utils/errors/custom.error.js";
import { notFound } from "../utils/errors/dictionary.error.js";

const createOneProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await createOne(data);
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    next(error);
  }
};
const readAllProducts = async (req, res, next) => {
  try {
    const { page } = req.params;
    const all = await readAll(page);
    if (all.docs.length > 0) {
      return res.status(200).json({ message: "Read!", response: all });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};
const readProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await readById(pid);
    if (one) {
      return res.status(200).json({ message: "Read!", response: one });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};
const updateProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await updateById(pid, data);
    if (one) {
      return res.status(200).json({ message: "Updated!", response: one });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};
const destroyProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await destroyById(pid);
    if (one) {
      return res.status(200).json({ message: "Destroyed!", response: one });
    } else {
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};
const createMockProduct = async (req, res, next) => {
  try {
    const one = await createMock();
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    next(error);
  }
};
const createMockProducts = async (req, res, next) => {
  try {
    const { quantity } = req.params;
    const products = await createMocks(quantity);
    return res.status(201).json({ message: "Created!", response: products });
  } catch (error) {
    next(error);
  }
};

export { createOneProduct, readAllProducts, readProductById, updateProductById, destroyProductById, createMockProduct, createMockProducts };
