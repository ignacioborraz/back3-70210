import express from "express";
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
  loggerUtil.INFO("server ready on " + mode + " mode and on port " + port);
  await dbConnect();
};

server.use(compression({ brotli: { enabled: true, zlib: {} } }));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(httpLogger)

server.listen(port, ready);

server.use("/api", router);
server.use(errorHandler)
