import { Router } from "express";
import { createOneProduct, readAllProducts, readProductById, updateProductById, destroyProductById, createMockProduct, createMockProducts } from "../controllers/products.controller.js";
import isAdmin from "../middlewares/isAdmin.mid.js";

const productsRouter = Router();

productsRouter.post("/", isAdmin, createOneProduct);
productsRouter.get("/", readAllProducts);
productsRouter.get("/:pid", readProductById);
productsRouter.put("/:pid", isAdmin, updateProductById);
productsRouter.delete("/:pid", isAdmin, destroyProductById);
productsRouter.get("/mocks", isAdmin, createMockProduct);
productsRouter.get("/mocks/:quantity", isAdmin, createMockProducts);

export default productsRouter;
