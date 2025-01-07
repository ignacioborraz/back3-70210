import { Router } from "express";
import { createProduct, readProducts } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.post("/", createProduct);
productsRouter.get("/", readProducts);

export default productsRouter;
