import { Router } from "express";
import { readAllUsers, readUserById, updateUserById, destroyUserById } from "../controllers/users.controller.js";
import isAuth from "../middlewares/isAuth.mid.js";
import isAdmin from "../middlewares/isAdmin.mid.js";

const usersRouter = Router();

usersRouter.get("/", isAdmin, readAllUsers);
usersRouter.get("/me", isAuth, readUserById);
usersRouter.put("/me", isAuth, updateUserById);
usersRouter.delete("/me", isAuth, destroyUserById);

export default usersRouter;
