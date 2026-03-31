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
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) return res.json({ success: false, msg: "no user found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, msg: "Invalid user credentials" });
    }

    const token = createToken(user._id);
    return res.json({ success: true, token });
  } catch (error) {
    console.log("error in login user", error);
    return res.json({ success: false, msg: error.message });
  }
};

// USER REGISTER ROUTE
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user email for duplication
    const exists = await userModel.findOne({ email });
    if (exists)
      return res.json({ msg: "user already registered", success: false });

    // validation of email and password
    if (!validator.isEmail(email)) {
      return res.json({ msg: "Enter a valid email", success: false });
    }

    if (password.length < 8) {
      return res.json({ msg: "Enter a strong password", success: false });
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
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.SECRETKEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, msg: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, msg: error.message });
  }
};

// const check = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log("i am header", req.headers);
//     console.log("----------------------------------------------", req.body);

//     res.json({ header: req.headers, body: req.body });
//   } catch (error) {}
// };

export { loginUser, registerUser, adminLogin };
