import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETKEY);
};

// USER LOGIN ROUTE
const loginUser = async (req, res) => {
  try {
  } catch (error) {}
};

// USER REGISTER ROUTE
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user email for duplication
    const exists = await userModel.findOne({ email });
    if (exists)
      return res
        .status(401)
        .json({ msg: "user already registered", success: false });

    // validation of email and password
    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ msg: "Enter a valid email", success: false });
    }

    if (password.length < 8) {
      return res
        .status(401)
        .json({ msg: "Enter a strong password", success: false });
    }

    // hashing user password

    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token: token });
  } catch (error) {
    console.log("error in user controller", error);
    res.json({ success: false, message: error.msg });
  }
};

// ROUTE FOR ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
  } catch (error) {}
};

export { loginUser, registerUser, adminLogin };
