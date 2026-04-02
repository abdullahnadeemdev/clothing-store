import express from "express";
import {
  updateStatus,
  userOrders,
  allOrders,
  placeOrderRazorpay,
  placeOrderStripe,
  placeOrder,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/stripe", authUser, placeOrderStripe);

//user feature
orderRouter.post("/userorder", authUser, userOrders);

export default orderRouter;
