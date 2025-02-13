import "dotenv/config.js";
import assert from "assert";
import { connect } from "mongoose";
import { createOne, readAll, destroyById } from "../../src/services/products.service.js";

describe("Testing Products Service", function () {
  const data = { name: "zapatilla" };
  before(async () => await connect(process.env.MONGO_LINK));
  it("should return a product that includes an _id property", async () => {
    const product = await createOne(data);
    assert.ok(product._id);
    destroyById(product._id);
  });
  it("should return a product with the correct image", async () => {
    const product = await createOne(data);
    assert.strictEqual(product.image, "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png");
    destroyById(product._id);
  });
  it("should throw an error if required fields are missing", async () => {
    try {
      await createOne({});
    } catch (error) {
      assert.ok(error);
    }
  });
  it("should return a paginated result with docs array", async () => {
    const products = await readAll(1);
    assert.ok(Array.isArray(products.docs));
  });
  it("should return a paginated result with a page number", async () => {
    const products = await readAll(2);
    assert.strictEqual(products.page, 2);
  });
});
