import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../assets/data';
import Title from '../components/Title';
import ProductCard from '../components/ProductCard';
import NewsletterBox from '../components/NewsletterBox';
import { Package, RefreshCw, Headphones } from 'lucide-react';

const Home = () => {
  const latestProducts = products.slice(0, 10);
  const bestSellers = products.filter((p) => p.bestseller);

  return (
    <div>
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh]">
        {/* Left */}
        <div className="flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 bg-white">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-[2px] bg-gray-900"></span>
            <p className="text-xs font-semibold tracking-[4px] text-gray-500 uppercase">Our Best Sellers</p>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Latest<br />
            <span className="text-5xl sm:text-6xl lg:text-7xl font-light">Arrivals</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-10">
            Discover timeless pieces crafted for the modern wardrobe. Elevate your everyday style with our newest collection.
          </p>
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 group w-fit"
          >
            <span className="text-sm font-semibold tracking-[3px] uppercase text-gray-900">Shop Now</span>
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
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
      </section>

      {/* Latest Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Title text1="LATEST" text2="COLLECTION" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Title text1="BEST" text2="SELLERS" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Our Policy */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                <RefreshCw size={26} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 tracking-wide">Easy Exchange Policy</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">Hassle-free exchanges on all orders within 30 days.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                <Package size={26} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 tracking-wide">7 Days Return Policy</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">Not satisfied? Return within 7 days, no questions asked.</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                <Headphones size={26} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 tracking-wide">Best Customer Support</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">Our support team is available 24/7 to help you.</p>
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
