import { connect } from "mongoose";
import env from "./env.util.js";

async function dbConnect() {
  try {
    await connect(env.MONGO_LINK);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
