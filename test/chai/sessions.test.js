import "dotenv/config.js";
import { expect } from "chai";
import { connect } from "mongoose";
import { registerService, loginService } from "../../src/services/sessions.service.js";
import User from "../../src/dao/models/user.model.js";

describe("Sessions Testing", () => {
  const data = {
    email: "igna@coderhouse.com.ar",
    password: "hola1234",
  };
  let user;
  before(async () => await connect(process.env.MONGO_LINK));
  it("should return a user object with an _id property", async () => {
    const user = await registerService(data);
    expect(user).to.have.property("_id");
    await User.findByIdAndDelete(user._id);
  });
  it("should throw an error if email is missing", async () => {
    try {
      await registerService({});
    } catch (error) {
      expect(error).to.have.property("message");
    }
  });
  it("should assign a role to the user", async () => {
    user = await registerService(data);
    expect(user.role).to.be.equals("user");
  });
  it("should throw an error if the password is incorrect", async () => {
    const incorrectData = { password: "hola", one: data };
    try {
      await loginService(incorrectData);
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it("should return a token if the password is correct", async () => {
    const correctData = {
      password: "hola1234",
      one: user,
    };
    const token = await loginService(correctData);
    expect(token).to.be.an("string");
    await User.findByIdAndDelete(user._id);
  });
});
