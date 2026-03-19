import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { currency, delivery_fee } from '../assets/data';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + (cartItems.length > 0 ? delivery_fee : 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-semibold tracking-widest uppercase text-gray-900 mb-4">Your Cart</h1>
        <p className="text-gray-400 mb-8">Your cart is empty.</p>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold tracking-widest uppercase text-gray-900 mb-8 border-b border-gray-100 pb-4">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
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
                  <div className="w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-1">Size: {item.size}</p>
                  </div>
                </div>

                {/* Price */}
                <p className="text-sm font-semibold text-gray-900">
                  {currency}{item.price.toFixed(2)}
                </p>

                {/* Size (mobile hidden, shown inline above) */}
                <p className="hidden sm:block text-sm text-gray-500">{item.size}</p>

                {/* Quantity */}
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        size: item.size,
                        quantity: Math.max(1, parseInt(e.target.value) || 1),
                      })
                    )
                  }
                  className="w-16 border border-gray-200 rounded-lg text-center text-sm py-1.5 focus:outline-none focus:border-black"
                />

                {/* Delete */}
                <button
                  onClick={() =>
                    dispatch(removeFromCart({ productId: item.productId, size: item.size }))
                  }
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  aria-label="Remove item"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Totals */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-20">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-900 mb-5 pb-3 border-b border-gray-200">
              Cart Totals
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{currency}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>{currency}{delivery_fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 text-base border-t border-gray-200 pt-3 mt-2">
                <span>Total</span>
                <span>{currency}{total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              to="/place-order"
              className="mt-6 block w-full bg-black text-white text-xs font-semibold tracking-widest uppercase text-center py-4 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/collection"
              className="mt-3 block w-full text-center text-xs text-gray-400 hover:text-black py-2"
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
