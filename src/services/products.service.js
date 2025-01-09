import Product from "../dao/models/product.model.js";
import { createMockProduct } from "../utils/mocks.util.js";

const create = async (data) => {
  const one = await Product.create(data);
  return one;
};

const read = async (page) => {
  //const all = await Product.find({}, "-__v -createdAt -updatedAt").sort("name");
  const all = await Product.paginate({},{ page, sort: { name: 1 }, select: "-__v -createdAt -updatedAt" });
  return all;
};

const createMock = async () => {
  const data = createMockProduct();
  const one = await Product.create(data);
  return one;
};

const createMocks = async (quantity) => {
  const products = [];
  for (let index = 0; index < quantity; index++) {
    const one = await createMock();
    products.push(one);
  }
  return products;
};

export { create, read, createMock, createMocks };
