import { connect } from "mongoose";
import loggerUtil from "./logger.util.js";

async function dbConnect() {
  try {
    await connect(process.env.MONGO_LINK);
    loggerUtil.INFO("database connected");
  } catch (error) {
    loggerUtil.WARN(error.message);
  }
}

export default dbConnect;
