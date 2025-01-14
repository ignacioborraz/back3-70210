import { Router } from "express";
import { createMockProduct, createProduct, createMockProducts, readProducts, readOneProduct } from "../controllers/products.controller.js";
import isAdmin from "../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.post("/", isAdmin, createProduct);
productsRouter.get("/mocks", isAdmin, createMockProduct);
productsRouter.get("/mocks/:quantity", isAdmin, createMockProducts);
productsRouter.get("/", readProducts);
productsRouter.get("/:pid", readOneProduct);

export default productsRouter;
