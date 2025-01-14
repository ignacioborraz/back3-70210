import { model, Schema } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
