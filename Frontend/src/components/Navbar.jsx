import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Package,
  LogOut,
  UserCircle,
} from "lucide-react";
import {
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  toggleProfileDropdown,
  closeProfileDropdown,
} from "../store/slices/uiSlice";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const dispatch = useDispatch();
  const location = useLocation();
  const { isMobileMenuOpen, isProfileDropdownOpen } = useSelector((s) => s.ui);
  const { user } = useSelector((s) => s.auth);
  const isAuthenticated = token ? true : false;

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    isAuthenticated(false);
  };

  const cartCount = useSelector((s) =>
    s.cart.items.reduce((acc, item) => acc + item.quantity, 0),
  );
  const profileRef = useRef(null);

  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [location, dispatch]);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        dispatch(closeProfileDropdown());
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dispatch]);

  const navLinks = [
    { label: "HOME", to: "/" },
    { label: "COLLECTION", to: "/collection" },
    { label: "ABOUT", to: "/about" },
    { label: "CONTACT", to: "/contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold tracking-widest text-black uppercase">
                Forever
              </h1>
            </Link>

            {/* Desktop Nav Links */}
            <div className="items-center hidden gap-8 md:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wider transition-colors pb-1 ${
                      isActive
                        ? "text-black border-b-2 border-black"
                        : "text-gray-500 hover:text-black border-b-2 border-transparent"
                    }`
                  }
                  end={link.to === "/"}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button
                onClick={() => dispatch(toggleSearch())}
                className="p-2 text-gray-600 rounded-full hover:text-black hover:bg-gray-100"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => dispatch(toggleProfileDropdown())}
                  className="flex items-center gap-1 p-2 text-gray-600 rounded-full hover:text-black hover:bg-gray-100"
                  aria-label="Profile"
                >
                  <User size={20} />
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 z-50 py-2 mt-2 bg-white border border-gray-100 shadow-xl w-44 rounded-xl">
                    {isAuthenticated ? (
                      <>
                        <p className="px-4 py-2 text-xs text-gray-400 border-b border-gray-100">
                          Hello, {user?.name}
                        </p>
                        <Link
                          to="/profile"
                          onClick={() => dispatch(closeProfileDropdown())}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <UserCircle size={15} /> My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => dispatch(closeProfileDropdown())}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Package size={15} /> Orders
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            dispatch(logout());
                            dispatch(closeProfileDropdown());
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                        >
                          <LogOut size={15} /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => dispatch(closeProfileDropdown())}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <UserCircle size={15} /> Login
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => dispatch(closeProfileDropdown())}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Package size={15} /> Orders
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 rounded-full hover:text-black hover:bg-gray-100"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full leading-none px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className="p-2 text-gray-600 rounded-full md:hidden hover:text-black hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => dispatch(closeMobileMenu())}
        />
        {/* Sidebar panel */}
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-lg font-bold tracking-widest">FOREVER</h2>
            <button
              onClick={() => dispatch(closeMobileMenu())}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg text-sm font-medium tracking-wider transition-colors ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="flex flex-col gap-1 pt-4 mt-4 border-t border-gray-100">
              <Link
                to="/login"
                className="px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Login / Sign Up
              </Link>
              <Link
                to="/orders"
                className="px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              >
                My Orders
              </Link>
              <Link
                to="/cart"
                className="px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cart ({cartCount})
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
