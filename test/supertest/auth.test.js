import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";
import { connect } from "mongoose";
import User from "../../src/dao/models/user.model.js";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testing Flow", function () {
  before(async () => await connect(process.env.MONGO_LINK));
  const data = { email: "coder@example.com", password: "hola1234" };
  let userId = null;
  let cookies = null;
  it("POST /api/auth/register should respond with 201 status code", async () => {
    const { _body, status } = await requester.post("/auth/register").send(data);
    expect(status).to.equal(201);
    await User.findByIdAndDelete(_body.response);
  });
  it("POST /api/auth/register should responde with the correct message", async () => {
    const { _body } = await requester.post("/auth/register").send(data);
    userId = _body.response;
    expect(_body.message).to.be.equals("User Registered!");
  });
  it("POST /api/auth/register should respond with 401 status code if email already exists", async () => {
    const { status } = await requester.post("/auth/register").send(data);
    expect(status).to.equal(401);
  });
  it("POST /api/auth/login should return an error for incorrect password", async () => {
    const data = { email: "coder@example.com", password: "hola12345" };
    const { status } = await requester.post("/auth/login").send(data);
    expect(status).to.equal(401);
  });
  it("POST /api/auth/login should responde with the correct message", async () => {
    const { _body, headers } = await requester.post("/auth/login").send(data);
    expect(_body.message).to.be.equals("User logged in!");
    cookies = headers["set-cookie"];
  });
  it("POST /api/auth/signout should respond with 201 status code", async () => {
    const { status } = await requester.post("/auth/signout").set("Cookie", cookies);
    expect(status).to.equal(200);
    await User.findByIdAndDelete(userId);
  });
});
