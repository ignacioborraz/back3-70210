import Product from "../dao/models/product.model.js";
import { createMockProduct } from "../utils/mocks.util.js";

const createOne = async (data) => await Product.create(data);
const readAll = async (page) => await Product.paginate({}, { page, sort: { name: 1 }, select: "-__v -createdAt -updatedAt" });
const readById = async (id) => await Product.findById(id);
const updateById = async (id, data) => await Product.findByIdAndUpdate(id, data, { new: true });
const destroyById = async (id) => await Product.findByIdAndDelete(id);
const createMock = async () => {
  const data = createMockProduct();
  const one = await Product.create(data);
  return one;
};
const createMocks = async (quantity) => {
  const products = [];
  for (let index = 0; index < quantity; index++) {
    const data = createMockProduct();
    products.push(one);
    const one = await Product.create(data);
  }
  return products;
};

export { createOne, readAll, readById, updateById, destroyById, createMock, createMocks };
