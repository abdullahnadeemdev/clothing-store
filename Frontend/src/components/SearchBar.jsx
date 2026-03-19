import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { closeSearch } from '../store/slices/uiSlice';
import { useLocation } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const dispatch = useDispatch();
  const { isSearchOpen } = useSelector((s) => s.ui);
  const location = useLocation();

  // Only visible on collection page
  const isCollectionPage = location.pathname === '/collection';

  if (!isSearchOpen || !isCollectionPage) return null;

  return (
    <div className="border-b border-gray-100 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          <div className="flex-1 relative">
            <input
              autoFocus
              type="text"
              placeholder="Search for products..."
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <button
            onClick={() => dispatch(closeSearch())}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
