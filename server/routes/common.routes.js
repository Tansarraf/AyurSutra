import express from "express";
import { isAuthenticated, logout, getUserData } from "../controllers/common.controllers.js";
import userAuth from "../middlewares/user.auth.js";

const commonRouter = express.Router();

commonRouter.get("/logout", logout);
commonRouter.get("/is-auth", userAuth, isAuthenticated);
commonRouter.get("/getuserdata", userAuth, getUserData);

export default commonRouter;