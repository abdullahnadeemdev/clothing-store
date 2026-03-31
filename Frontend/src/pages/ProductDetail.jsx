import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { products } from "../assets/data";
import { addToCart } from "../store/slices/cartSlice";
import ProductCard from "../components/ProductCard";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetail = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/product/single", {
        id,
      });
      setProduct(response.data.product);
    } catch (error) {
      console.log("error in products fetching", error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const [mainImage, setMainImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p._id !== product._id && p.category === product.category)
    .slice(0, 5);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        size: selectedSize,
        name: product.name,
        price: product.price,
        image: product.image,
      }),
    );

    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId: product._id, size: selectedSize },
          { headers: { token } },
        );
      } catch (error) {
        console.error("Failed to sync cart:", error);
        toast.error("Cart sync failed, please refresh.");
      }
    }

    // 3. UI Feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex gap-2 mb-8 text-xs text-gray-400">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        <span>/</span>
        <Link to="/collection" className="hover:text-black">
          Collection
        </Link>
        <span>/</span>
        <span className="text-gray-700">{product.name}</span>
      </nav>

      {/* Product Top */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
        {/* Image Gallery */}
        <div className="flex gap-3">
          {/* Thumbnails */}
          <div className="flex flex-col w-16 gap-2 sm:w-20">
            {product.image.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(idx)}
                className={`overflow-hidden rounded-lg aspect-square border-2 transition-all ${
                  mainImage === idx
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 overflow-hidden rounded-2xl bg-gray-50 aspect-[3/4]">
            <img
              src={product.image[mainImage]}
              alt={product.name}
              className="object-cover w-full h-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-widest text-gray-400 uppercase">
              {product.category} / {product.subCategory}
            </p>
            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
              <Star size={14} className="text-yellow-200 fill-yellow-200" />
            </div>
            <span className="text-xs text-gray-500">(122 reviews)</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <p className="pt-4 text-sm leading-relaxed text-gray-500 border-t border-gray-100">
            {product.description}
          </p>

          {/* Size Selector */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 text-sm font-medium border-2 rounded-lg transition-all ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-2 py-4 px-8 text-sm font-semibold tracking-widest uppercase rounded-xl transition-all ${
              added
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-gray-800 active:scale-95"
            }`}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>

          {/* Feature List */}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <ShieldCheck size={16} className="flex-shrink-0 text-gray-400" />
              100% Original product
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Truck size={16} className="flex-shrink-0 text-gray-400" />
              Cash on delivery available
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <RotateCcw size={16} className="flex-shrink-0 text-gray-400" />
              Easy 7-day return & exchange policy
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews Tabs */}
      <div className="mt-16">
        <div className="flex border-b border-gray-200">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium tracking-wider uppercase transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="max-w-3xl py-8 text-sm leading-relaxed text-gray-600">
          {activeTab === "description" ? (
            <div className="space-y-4">
              <p>{product.description}</p>
              <p>
                Our garments are crafted from premium materials, ensuring
                durability and comfort in every wear. Each piece is carefully
                quality-checked before dispatch to maintain our high standards.
              </p>
              <ul className="space-y-1 text-gray-500 list-disc list-inside">
                <li>Machine washable at 30°C</li>
                <li>Do not bleach or tumble dry</li>
                <li>Sustainably sourced materials where possible</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-6">
              {[
                {
                  name: "Ayesha K.",
                  rating: 5,
                  text: "Absolutely love this! The quality is exceptional and the fit is perfect.",
                  date: "Jan 2026",
                },
                {
                  name: "Marcus L.",
                  rating: 4,
                  text: "Great product, fast shipping. Would definitely recommend to friends.",
                  date: "Feb 2026",
                },
                {
                  name: "Priya M.",
                  rating: 5,
                  text: "Exceeded expectations. The material feels luxurious and looks stunning.",
                  date: "Mar 2026",
                },
              ].map((review, i) => (
                <div key={i} className="pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 text-xs font-semibold text-gray-600 bg-gray-200 rounded-full">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {review.name}
                      </p>
                      <div className="flex gap-0.5 mt-0.5">
                        {Array.from({ length: review.rating }).map((_, s) => (
                          <Star
                            key={s}
                            size={11}
                            className="text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-gray-400">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-gray-500">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-8">
          <Title text1="RELATED" text2="PRODUCTS" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
