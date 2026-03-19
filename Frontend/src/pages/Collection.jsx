import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { products } from '../assets/data';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';

const categories = ['Men', 'Women', 'Kids'];
const types = ['Topwear', 'Bottomwear', 'Winterwear'];
const sortOptions = [
  { value: 'relevant', label: 'Relevant' },
  { value: 'low-high', label: 'Price: Low to High' },
  { value: 'high-low', label: 'Price: High to Low' },
];

const Collection = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('relevant');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    // Type filter
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.subCategory));
    }
    // Sort
    if (sortBy === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  }, [selectedCategories, selectedTypes, sortBy, searchQuery]);

  const toggleFilter = (value, list, setList) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div>
      <SearchBar onSearch={setSearchQuery} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">

          {/* Sidebar Filters */}
          <aside className="w-56 flex-shrink-0 hidden md:block">
            <h3 className="text-xs font-semibold tracking-widest text-gray-900 uppercase mb-6 border-b border-gray-200 pb-3">
              Filters
            </h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-3">Categories</h4>
              <div className="space-y-2.5">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                      className="w-4 h-4 rounded border-gray-300 accent-black"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-3">Type</h4>
              <div className="space-y-2.5">
                {types.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                      className="w-4 h-4 rounded border-gray-300 accent-black"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Mobile Filters Toggle */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-sm font-medium border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
              >
                <SlidersHorizontal size={16} />
                FILTERS
                <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              {showFilters && (
                <div className="mt-3 p-4 border border-gray-100 rounded-xl bg-gray-50">
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                            className="accent-black"
                          />
                          <span className="text-sm">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2">Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {types.map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                            className="accent-black"
                          />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title text1="ALL" text2="COLLECTIONS" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-black cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Collection;
