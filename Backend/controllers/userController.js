// USER LOGIN ROUTE
const loginUser = async (req, res) => {
  res.json({ msg: "LOGIN Api working" });
};

// USER REGISTER ROUTE
const registerUser = async (req, res) => {
  res.json({ msg: "Api working" });
};

// ROUTE FOR ADMIN LOGIN
const adminLogin = async (req, res) => {};

export { loginUser, registerUser, adminLogin };
