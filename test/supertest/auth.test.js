import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import { destroyById } from "../../src/services/users.service.js";
import { connect } from "mongoose";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing Auth Module", () => {
  before(async () => connect(process.env.MONGO_LINK));
  const user = {
    email: "coder@coder.com.ar",
    password: "hola1234",
  };
  let userId;
  let cookies;
  it("POST /api/auth/register should respond with fail and 401 status code", async () => {
    const { status } = await requester.post("/auth/login").send({});
    expect(status).to.equal(401);
  });
  it("POST /api/auth/register should respond with success and 201 status code", async () => {
    const response = await requester.post("/auth/register").send(user);
    const { status, _body } = response;
    //console.log({ status, _body });
    expect(status).to.equal(201);
    /* COMO RECOMENDACION HACER UN IT POR CADA EXPECT */
    userId = _body.response;
  });
  it("POST /api/auth/login should respond with fail and 401 status code", async () => {
    const data = { email: "coder@coder.com", password: "hola1234" };
    const { status } = await requester.post("/auth/login").send(data);
    expect(status).to.equal(401);
  });
  it("POST /api/auth/login should respond with success and 200 status code", async () => {
    const { status, headers } = await requester.post("/auth/login").send(user);
    cookies = headers["set-cookie"];
    expect(status).to.equal(200);
  });
  it("POST /api/auth/signout should respond with fail and 401 status code", async () => {
    const { status } = await requester.post("/auth/signout");
    expect(status).to.equal(401);
  });
  it("POST /api/auth/signout should respond with success and 200 status code", async () => {
    const { status } = await requester.post("/auth/signout").set("Cookie", cookies)
    expect(status).to.equal(200);
    await destroyById(userId);
  });
});
