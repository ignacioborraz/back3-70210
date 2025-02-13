import "dotenv/config.js";
import assert from "assert";
import { create, read } from "../../src/services/products.service.js";
import { connect } from "mongoose";

describe("Testing Products Service", function () {
  const data = { name: "zapatilla" };
  before(async () => await connect(process.env.MONGO_LINK));
  it("create product should return a product that includes an _id property", async function () {
    const product = await create(data);
    assert.ok(product._id);
  });
  it("should return a product with the correct image", async () => {
    const product = await create(data);
    assert.strictEqual(
      product.image,
      "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
    );
  });
  it("should throw an error if required fields are missing", async () => {
    try {
      await create({});
    } catch (error) {
      assert.ok(error);
    }
  });
  it("should return a paginated result with docs array", async () => {
    const products = await read(1);
    assert.ok(Array.isArray(products.docs));
  });
  it("should return a paginated result with a page number", async () => {
    const products = await read(2);
    assert.strictEqual(products.page, 2);
  });
});
