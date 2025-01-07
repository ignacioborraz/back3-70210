import { Router } from "express";
import productsRouter from "./products.router.js";

const router = Router();

router.use("/products", productsRouter);
//router.use("/carts", cartsRouter)
//router.use("/sessions", sessionsRouter)

export default router;
