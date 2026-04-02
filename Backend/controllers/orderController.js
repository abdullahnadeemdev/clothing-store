import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//COD orders
const placeOrder = async (req, res) => {
  try {
    const { userId, amount, address, items } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      data: Date.now(),
      address,
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: success, msg: "order placed" });
  } catch (error) {
    console.log("error in place order", error);
    res.json({ success: false, msg: error.message });
  }
};

//stripe orders
const placeOrderStripe = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in place order", error);
    res.json({ success: false, msg: error.message });
  }
};

//razor orders
const placeOrderRazorpay = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in place order", error);
    res.json({ success: false, msg: error.message });
  }
};

//All orders for admin
const allOrders = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in place order", error);
    res.json({ success: false, msg: error.message });
  }
};

// order for a specific user
const userOrders = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in place order", error);
    res.json({ success: false, msg: error.message });
  }
};

//change order status from admin
const updateStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log("error in place order", error);
    res.json({ success: false, msg: error.message });
  }
};

export {
  updateStatus,
  userOrders,
  allOrders,
  placeOrderRazorpay,
  placeOrderStripe,
  placeOrder,
};
