import { Router } from "express";
import productsRouter from "./products.router.js";
import { fork } from "child_process";

const router = Router();

router.use("/products", productsRouter);
router.get("/sum", (req, res) => {
  try {
    const childProcess = fork("./src/process/sum.proc.js");
    childProcess.send("start");
    childProcess.on("message", (message) => {
      return res.status(200).json({ message });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
