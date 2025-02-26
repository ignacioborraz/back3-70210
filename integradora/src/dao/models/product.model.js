import { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2"

const collection = "products";
const schema = new Schema(
  {
    name: { type: String, index: true, required: true },
    description: { type: String },
    stock: { type: Number, default: 1 },
    price: { type: Number, default: 1 },
    image: { type: String, default: "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png" },
    category: { type: String, enum: ["", "none", "computadoras", "perifericos", "celulares"], default: "none" },
  },
  { timestamps: true }
);

schema.plugin(paginate)

const Product = model(collection, schema);
export default Product;
