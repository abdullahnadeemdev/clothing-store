import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currency, delivery_fee } from '../assets/data';
import { clearCart } from '../store/slices/cartSlice';

const paymentMethods = [
  { id: 'stripe', label: 'Stripe', icon: '💳' },
  { id: 'razorpay', label: 'Razorpay', icon: '📱' },
  { id: 'cod', label: 'CASH ON DELIVERY', icon: '💵' },
];

const inputClass =
  'w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + delivery_fee;

  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zipCode: '', country: '', phone: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    dispatch(clearCart());
    navigate('/orders');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold tracking-widest uppercase text-gray-900 mb-8">
        Place Order
      </h1>
      <form onSubmit={handlePlaceOrder}>
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left - Delivery Info */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-500 mb-5">
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="firstName" value={form.firstName} onChange={handleChange}
                placeholder="First Name" required className={inputClass}
              />
              <input
                name="lastName" value={form.lastName} onChange={handleChange}
                placeholder="Last Name" required className={inputClass}
              />
              <input
                name="email" value={form.email} onChange={handleChange}
                placeholder="Email Address" type="email" required className={`${inputClass} sm:col-span-2`}
              />
              <input
                name="street" value={form.street} onChange={handleChange}
                placeholder="Street Address" required className={`${inputClass} sm:col-span-2`}
              />
              <input
                name="city" value={form.city} onChange={handleChange}
                placeholder="City" required className={inputClass}
              />
              <input
                name="state" value={form.state} onChange={handleChange}
                placeholder="State" required className={inputClass}
              />
              <input
                name="zipCode" value={form.zipCode} onChange={handleChange}
                placeholder="Zip Code" required className={inputClass}
              />
              <input
                name="country" value={form.country} onChange={handleChange}
                placeholder="Country" required className={inputClass}
              />
              <input
                name="phone" value={form.phone} onChange={handleChange}
                placeholder="Phone Number" required className={`${inputClass} sm:col-span-2`}
              />
            </div>
          </div>

          {/* Right - Summary & Payment */}
          <div className="lg:w-80 flex-shrink-0 space-y-6">
            {/* Cart Totals */}
            <div className="bg-gray-50 rounded-2xl p-6">
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
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-900 mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPayment(method.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 border-2 rounded-xl text-left transition-all ${
                      selectedPayment === method.id
                        ? 'border-black bg-black/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedPayment === method.id ? 'border-black' : 'border-gray-300'
                    }`}>
                      {selectedPayment === method.id && (
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      )}
                    </div>
                    <span className="text-lg">{method.icon}</span>
                    <span className="text-sm font-medium text-gray-800">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white text-xs font-semibold tracking-widest uppercase py-4 rounded-xl hover:bg-gray-800 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
