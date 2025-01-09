import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { mode } = argsUtil;

const path = ".env." + mode;
config({ path });

const env = {
  PORT: process.env.PORT,
  MONGO_LINK: process.env.MONGO_LINK,
};

export default env;
