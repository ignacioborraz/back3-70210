import { Router } from "express";
import { createMockProduct, createProduct, createMockProducts, readProducts } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.post("/", createProduct);
productsRouter.get("/mocks", createMockProduct)
productsRouter.get("/mocks/:quantity", createMockProducts)
productsRouter.get("/", readProducts);

export default productsRouter;
