import { connect } from "mongoose";

async function dbConnect() {
  try {
    await connect(
      "mongodb+srv://coderhouse:hola1234@cluster0.yztit1b.mongodb.net/coder-70210"
    );
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
}

export default dbConnect;
