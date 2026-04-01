import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { removeFromCart, updateQuantity } from "../store/slices/cartSlice";
import { currency, delivery_fee } from "../assets/data";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Cart = ({ token }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal + (cartItems.length > 0 ? delivery_fee : 0);

  const updateBackend = async (itemId, size, quantity) => {
    try {
      if (token) {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          {
            headers: { token },
          },
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-4 text-2xl font-semibold tracking-widest text-gray-900 uppercase">
          Your Cart
        </h1>
        <p className="mb-8 text-gray-400">Your cart is empty.</p>
        <Link
          to="/collection"
          className="inline-block bg-black text-white text-sm font-semibold tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="pb-4 mb-8 text-2xl font-semibold tracking-widest text-gray-900 uppercase border-b border-gray-100">
        Your Cart
      </h1>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 text-xs font-semibold tracking-widest uppercase text-gray-400 pb-3 border-b border-gray-100 mb-2">
            <span>Product</span>
            <span>Price</span>
            <span>Size</span>
            <span>Quantity</span>
            <span></span>
          </div>

          <div className="divide-y divide-gray-100">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="py-5 grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center"
              >
                {/* Product */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 h-20 overflow-hidden sm:w-20 sm:h-24 rounded-xl bg-gray-50">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Size: {item.size}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <p className="text-sm font-semibold text-gray-900">
                  {currency}
                  {item.price.toFixed(2)}
                </p>

                {/* Size (mobile hidden, shown inline above) */}
                <p className="hidden text-sm text-gray-500 sm:block">
                  {item.size}
                </p>

                {/* Quantity */}
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = Math.max(
                      1,
                      parseInt(e.target.value) || 1,
                    );
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        size: item.size,
                        quantity: newQuantity,
                      }),
                    );
                    updateBackend(item.productId, item.size, newQuantity);
                  }}
                  className="w-16 border border-gray-200 rounded-lg text-center text-sm py-1.5 focus:outline-none focus:border-black"
                />

                {/* Delete */}
                <button
                  onClick={() => {
                    dispatch(
                      removeFromCart({
                        productId: item.productId,
                        size: item.size,
                      }),
                    );
                    updateBackend(item.productId, item.size, 0);
                  }}
                  className="p-2 text-gray-400 transition-colors rounded-lg hover:text-red-500 hover:bg-red-50"
                  aria-label="Remove item"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Totals */}
        <div className="flex-shrink-0 lg:w-72">
          <div className="sticky p-6 bg-gray-50 rounded-2xl top-20">
            <h2 className="pb-3 mb-5 text-sm font-semibold tracking-widest text-gray-900 uppercase border-b border-gray-200">
              Cart Totals
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>
                  {currency}
                  {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>
                  {currency}
                  {delivery_fee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between pt-3 mt-2 text-base font-semibold text-gray-900 border-t border-gray-200">
                <span>Total</span>
                <span>
                  {currency}
                  {total.toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              to="/place-order"
              className="block w-full py-4 mt-6 text-xs font-semibold tracking-widest text-center text-white uppercase transition-colors bg-black rounded-xl hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/collection"
              className="block w-full py-2 mt-3 text-xs text-center text-gray-400 hover:text-black"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
