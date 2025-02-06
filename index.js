import express from "express";
import cluster from "cluster";
import { cpus } from "os";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import { serve, setup } from "swagger-ui-express";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtil from "./src/utils/args.util.js";
import router from "./src/routers/index.router.js";
import env from "./src/utils/env.util.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import loggerUtil from "./src/utils/logger.util.js";
import httpLogger from "./src/middlewares/httpLogger.mid.js";
import docSpec from "./src/utils/docSpec.util.js";

const server = express();
const port = env.PORT || 8080;
const ready = async () => {
  const mode = argsUtil.mode;
  loggerUtil.INFO(
    `server ready on ${mode} mode, on port ${port} and on process ${process.pid}`
  );
  await dbConnect();
};
const isPrimary = cluster.isPrimary;
const numberOfProcess = cpus().length;
if (isPrimary) {
  loggerUtil.INFO("isPrimary: " + process.pid);
  for (let index = 1; index <= numberOfProcess; index++) {
    cluster.fork();
  }
} else {
  loggerUtil.INFO("isWorker: " + process.pid);
  server.listen(port, ready);
}

server.use(compression({ brotli: { enabled: true, zlib: {} } }));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(httpLogger);
server.use("/api/docs", serve, setup(docSpec));
server.use("/api", router);
server.use(errorHandler);
