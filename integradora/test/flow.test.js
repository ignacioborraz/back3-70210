import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080/api");

describe("Testing Login, Create & Delete product, Signout", () => {
  const user = { email: "test@coder.com", password: "hola1234" };
  let cookies;
  let productId;
  it("POST /api/auth/login should respond with success and 200 status code", async () => {
    const response = await requester.post("/auth/login").send(user);
    const { status, headers } = response;
    cookies = headers["set-cookie"];
    expect(status).to.equal(200);
  });
  it("POST /api/products should respond with a new product of type object", async () => {
    const response = await requester
      .post("/products")
      .set("Cookie", cookies)
      .send({ name: "producto " });
    const { _body } = response;
    productId = _body.response._id;
    expect(_body.response).to.be.an("object");
  });
  it("DELETE /api/products/:pid should destroy the product", async () => {
    await requester.delete("/products/" + productId).set("Cookie", cookies);
    const response = await requester.get("/products/" + productId);
    const { status } = response;
    expect(status).to.equal(404);
  });
  it("POST /api/auth/should respond with 'User signed out!'", async () => {
    const response = await requester
      .post("/auth/signout")
      .set("Cookie", cookies);
    const { _body } = response;
    expect(_body.message).to.equal("User signed out!");
  });
});
