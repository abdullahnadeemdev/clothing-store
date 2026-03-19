import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("db connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce-cloths`);
  } catch (error) {
    console.error("DB connection error", error);
    process.exit(1);
  }
};

export default connectDb;
