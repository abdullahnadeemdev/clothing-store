import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../assets/data";
import Title from "../components/Title";
import ProductCard from "../components/ProductCard";
import NewsletterBox from "../components/NewsletterBox";
import { Package, RefreshCw, Headphones } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/all");
      // console.log("response", response.data);
      if (response.data.success) {
        setProducts(response?.data?.products);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log("error in collections", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const latestProducts = products.slice(0, 10);
  const bestSellers = products.filter((p) => p.bestseller);

  return (
    <div>
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh]">
        {/* Left */}
        <div className="flex flex-col justify-center px-8 py-16 bg-white sm:px-14 lg:px-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-[2px] bg-gray-900"></span>
            <p className="text-xs font-semibold tracking-[4px] text-gray-500 uppercase">
              Our Best Sellers
            </p>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Latest
            <br />
            <span className="text-5xl font-light sm:text-6xl lg:text-7xl">
              Arrivals
            </span>
          </h1>
          <p className="max-w-sm mb-10 text-sm leading-relaxed text-gray-500">
            Discover timeless pieces crafted for the modern wardrobe. Elevate
            your everyday style with our newest collection.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 group w-fit"
          >
            <span className="text-sm font-semibold tracking-[3px] uppercase text-gray-900">
              Shop Now
            </span>
            <span className="flex items-center gap-1">
              <span className="w-8 h-[1.5px] bg-gray-900 transition-all duration-300 group-hover:w-12"></span>
              <ArrowRight size={14} className="text-gray-900" />
            </span>
          </Link>
        </div>
        {/* Right - Hero Image */}
        <div className="relative overflow-hidden bg-gray-100 min-h-[50vh] md:min-h-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=1100&fit=crop"
            alt="Latest fashion arrivals"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
      </section>

      {/* Latest Collection */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Title text1="LATEST" text2="COLLECTION" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="px-4 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Title text1="BEST" text2="SELLERS" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Our Policy */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full">
                <RefreshCw size={26} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold tracking-wide text-gray-900">
                  Easy Exchange Policy
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Hassle-free exchanges on all orders within 30 days.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full">
                <Package size={26} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold tracking-wide text-gray-900">
                  7 Days Return Policy
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Not satisfied? Return within 7 days, no questions asked.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full">
                <Headphones size={26} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold tracking-wide text-gray-900">
                  Best Customer Support
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Our support team is available 24/7 to help you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
};

export default Home;
