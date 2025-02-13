import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing Products", () => {
  it("GET /api/products should respond with 200 status code", async () => {
    const response = await requester.get("/products");
    expect(response.status).to.equal(200);
  });
  it("GET /api/products should return an array containing paginated products", async () => {
    const response = await requester.get("/products");
    expect(response._body.response.docs).to.be.an("array");
  });
  it("GET /api/products/:pid should respond with 200 status code", async () => {
    const { status } = await requester.get("/products/67805a3cd081d21733596af1");
    expect(status).to.equal(200);
  });
  it("GET /api/products/:pid should return an object", async () => {
    const { _body } = await requester.get("/products/67805a3cd081d21733596af1");
    expect(_body.response).to.be.an("object");
  });
});
