import { Router } from "express";
import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import authRouter from "./auth.router.js";
import { fork } from "child_process";
import { dividir } from "calculator-70210";

const router = Router();

router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.get("/sum", (req, res) => {
  try {
    const childProcess = fork("./src/process/sum.proc.js");
    childProcess.send("start");
    childProcess.on("message", (message) => {
      if (message && typeof message === "number") {
        return res.status(200).json({ message });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.get("/dividir/:n1/:n2", (req, res, next) => {
  try {
    const { n1, n2 } = req.params;
    const resultado = dividir(n1, n2);
    return res.status(200).json({ resultado });
  } catch (error) {
    next(error);
  }
});
router.get("/simplex", (req, res) => {
  let result = 0;
  for (let i = 1; i < 100; i++) {
    result += i;
  }
  return res.status(200).json({ result });
});
router.get("/complex", (req, res) => {
  let result = 0;
  for (let i = 1; i < 10000000; i++) {
    result += i;
  }
  return res.status(200).json({ result });
});

export default router;
