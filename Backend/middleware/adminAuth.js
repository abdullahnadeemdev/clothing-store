import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) return res.json({ success: false, msg: "Unauthorised entry" });

    const tokenDecode = jwt.verify(token, process.env.SECRETKEY);

    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, msg: "Not allowed" });
    }

    next();
  } catch (error) {
    console.log("errror in admin middleware", error);
    return res.json({ success: false, msg: error.message });
  }
};
export default adminAuth;
