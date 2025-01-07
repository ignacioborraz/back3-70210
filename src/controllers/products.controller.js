import { create, read } from "../services/products.service.js";

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const one = await create(data);
    return res.status(201).json({ message: "Created!", response: one });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const readProducts = async (req, res) => {
  try {
    const all = await read();
    return res.status(200).json({ message: "Read!", response: all });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export { createProduct, readProducts };
