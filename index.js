import express from "express";
import cluster from "cluster";
import { cpus } from "os";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtil from "./src/utils/args.util.js";
import router from "./src/routers/index.router.js";
import env from "./src/utils/env.util.js";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import loggerUtil from "./src/utils/logger.util.js";
import httpLogger from "./src/middlewares/httpLogger.mid.js";

const server = express();
const port = env.PORT || 8080;
const ready = async () => {
  const mode = argsUtil.mode;
  loggerUtil.INFO(
    `server ready on ${mode} mode, on port ${port} and on process ${process.pid}`
  );
  await dbConnect();
};
/* SOLO los procesos primarios pueden crear WORKERS */
//loggerUtil.INFO(JSON.stringify({ isPrimary: cluster.isPrimary, numberOfProcess: cpus().length }))
const isPrimary = cluster.isPrimary;
const numberOfProcess = cpus().length;
if (isPrimary) {
  loggerUtil.INFO("isPrimary: " + process.pid);
  for (let index = 1; index <= numberOfProcess; index++) {
    cluster.fork();
  }
  // el proceso primario NO LEVANTA EL SERVIDOR
  // solamente crea los nodos
  //server.listen(port, ready);
} else {
  loggerUtil.INFO("isWorker: " + process.pid);
  server.listen(port, ready);
}

server.use(compression({ brotli: { enabled: true, zlib: {} } }));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(httpLogger);
server.use("/api", router);
server.use(errorHandler);
