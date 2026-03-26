import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      category,
      subCategory,
      price: Number(price),
      bestseller: bestseller === "true" ? true : false,
      sizes: sizes ? JSON.parse(sizes) : [],
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, msg: "product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    res.json({ success: true, prod });
  } catch (error) {
    console.log("errror in list products", error);
    res.json({ success: false, msg: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
  } catch (error) {}
};

const singleProduct = async (req, res) => {
  try {
  } catch (error) {}
};

export { addProduct, singleProduct, removeProduct, listProducts };
