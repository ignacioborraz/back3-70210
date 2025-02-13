import { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
  },
  { timestamps: true }
);

schema.plugin(paginate);

const User = model(collection, schema);
export default User;
