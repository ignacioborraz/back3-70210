import { connect } from "mongoose";
import env from "./env.util.js";
import loggerUtil from "./logger.util.js";

async function dbConnect() {
  try {
    await connect(env.MONGO_LINK);
    loggerUtil.INFO("database connected");
  } catch (error) {
    loggerUtil.WARN(error.message);
  }
}

export default dbConnect;
