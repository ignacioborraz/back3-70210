import "dotenv/config.js";
import express from "express";
import cluster from "cluster";
import { cpus } from "os";
import cookieParser from "cookie-parser";
import compression from "express-compression";
import { serve, setup } from "swagger-ui-express";
import dbConnect from "./src/utils/dbConnect.util.js";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import loggerUtil from "./src/utils/logger.util.js";
import httpLogger from "./src/middlewares/httpLogger.mid.js";
import swaggerSpec from "./src/utils/swagger.util.js";

const server = express();
const port = process.env.PORT || 8080;
const ready = async () => await dbConnect();
const isPrimary = cluster.isPrimary;
const numberOfProcess = cpus().length;
if (isPrimary) {
  loggerUtil.INFO(`server ready on port: ${port} - primary process: ${process.pid}`);
  for (let index = 1; index <= numberOfProcess; index++) {
    cluster.fork();
  }
} else {
  loggerUtil.INFO(`server ready on port: ${port} - worker process: ${process.pid}`);
  server.listen(port, ready);
}

server.use(compression({ brotli: { enabled: true, zlib: {} } }));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(httpLogger);
server.use("/api/docs", serve, setup(swaggerSpec))
server.use("/api", router);
server.use(errorHandler);

export default server