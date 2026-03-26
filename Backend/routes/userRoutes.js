import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  // check,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
// userRouter.post("/check", check);

export default userRouter;
