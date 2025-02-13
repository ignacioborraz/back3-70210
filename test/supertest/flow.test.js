import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import { connect } from "mongoose";
import User from "../../src/dao/models/user.model.js";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing Flow", function () {
  before(async () => await connect(process.env.MONGO_LINK));
  const user = { email: "test@coder.com", password: "hola1234" };
  const product = { name: "zapatillas" }
  let producId;
  let cookies = null;
  it("POST /api/auth/login should respond with 200 status code", async () => {
    const { headers, status } = await requester.post("/auth/login").send(user);
    cookies = headers["set-cookie"];
    expect(status).to.equal(200);
  });
  it("POST /api/products should respond with 201 status code", async () => {
    const { status, _body } = await requester.post("/products").send(product).set("Cookie", cookies);
    producId = _body.response._id;
    expect(status).to.equal(201);
  });
  it("PUT /api/products/:pid should respond with 200 status code", async () => {
    const { status } = await requester.put(`/products/${producId}`).send({ name: "zapatos" }).set("Cookie", cookies);
    expect(status).to.equal(200);
  });
  it("DELETE /api/products/:pid should respond with 200 status code", async () => {
    const { status } = await requester.delete(`/products/${producId}`).set("Cookie", cookies);
    expect(status).to.equal(200);
  });
  it("POST /api/auth/signout should respond with 200 status code", async () => {
    const { status } = await requester.post("/auth/signout").set("Cookie", cookies);
    expect(status).to.equal(200);
  });
});
