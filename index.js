import express from "express";
import dbConnect from "./src/utils/dbConnect.util.js";
import argsUtil from "./src/utils/args.util.js";
import router from "./src/routers/index.router.js";
import env from "./src/utils/env.util.js";
import cookieParser from "cookie-parser";
import compression from "express-compression";

const server = express();
const port = env.PORT || 8080;
const ready = async () => {
  const mode = argsUtil.mode;
  console.log("server ready on " + mode + " mode and on port " + port);
  await dbConnect();
};

server.use(compression({ brotli: { enabled: true, zlib: {} } }));
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(port, ready);

server.use("/api", router);
