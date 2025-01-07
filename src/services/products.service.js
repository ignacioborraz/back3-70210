import Product from "../dao/models/product.model.js";

const create = async (data) => {
  const one = await Product.create(data);
  return one;
};

const read = async () => {
  const all = await Product.find();
  return all;
};

export { create, read };
