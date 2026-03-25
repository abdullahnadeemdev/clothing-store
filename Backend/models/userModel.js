import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {}, // initializes an empty object for the user cart data
    },
  },
  { minimize: false }, // this handles empty objects when saving data, by default mongoose deletes empty objects but due to minimize it wont be deleted
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
