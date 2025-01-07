import express from "express";
import dbConnect from "./src/utils/dbConnect.util.js";
import router from "./src/routers/index.router.js";

const server = express();
const port = 8080;
const ready = async () => {
  console.log("server ready on port " + port);
  await dbConnect();
};

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(port, ready);

server.use("/api", router)
