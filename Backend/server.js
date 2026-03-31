import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";

//Configs
import connectDb from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";

// ROutes
import userRouter from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoutes.js";

// App config
const app = express();
const PORT = process.env.PORT || 3000;
connectDb();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// Api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("API Works");
});

// start the server
app.listen(PORT, () => console.log(`Server started on: ${PORT}`));
