import Product from "../dao/models/product.model.js";
import {
  create,
  createMock,
  createMocks,
  read,
} from "../services/products.service.js";
import CustomError from "../utils/errors/custom.error.js";
import { notFound } from "../utils/errors/dictionary.error.js";

const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await create(data);
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    next(error);
  }
};

const readOneProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await Product.findById(pid);
    if (one) {
      return res.status(200).json({ message: "Read!", response: one });
    } else {
      //return res.status(404).json({ message: "Not found!"})
      //return res.status(notFound.statusCode).json({ message: notFound.message})
      //const { statusCode, message } = notFound;
      //return res.status(statusCode).json({ message });
      CustomError.new(notFound);
    }
  } catch (error) {
    next(error);
  }
};

const readProducts = async (req, res, next) => {
  try {
    const { page } = req.query;
    const all = await read(page);
    if (all.docs.length > 0) {
      return res.status(200).json({ message: "Read!", response: all });
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

export {
  createProduct,
  readProducts,
  createMockProduct,
  createMockProducts,
  readOneProduct,
};
