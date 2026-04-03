import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currency, delivery_fee, products } from "../assets/data";
import { clearCart } from "../store/slices/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const paymentMethods = [
  { id: "stripe", label: "Stripe", icon: "💳" },
  { id: "razorpay", label: "Razorpay", icon: "📱" },
  { id: "cod", label: "CASH ON DELIVERY", icon: "💵" },
];

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const inputClass =
  "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400";

const PlaceOrder = ({ token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const total = subtotal + delivery_fee;

  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      let orderData = {
        address: form,
        items: cartItems,
        amount: total,
      };

      switch (selectedPayment) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } },
          );

          if (response.data.success) {
            toast.success("Order placed successfully! ");
            dispatch(clearCart());
            navigate("/orders");
          } else {
            toast.error(response.data.msg);
          }
          break;

        case "stripe":
          toast.info("Stripe integration coming soon!");
          break;

        case "razorpay":
          toast.info("Razorpay integration coming soon!");
          break;

        default:
          toast.error("Please select a valid payment method.");
          break;
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(
        error.message || "Something went wrong while placing the order.",
      );
    }
  };

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-semibold tracking-widest text-gray-900 uppercase">
        Place Order
      </h1>
      <form onSubmit={handlePlaceOrder}>
        <div className="flex flex-col gap-10 lg:flex-row">
          {/* Left - Delivery Info */}
          <div className="flex-1">
            <h2 className="mb-5 text-sm font-semibold tracking-widest text-gray-500 uppercase">
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className={inputClass}
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className={inputClass}
              />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                required
                className={`${inputClass} sm:col-span-2`}
              />
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Street Address"
                required
                className={`${inputClass} sm:col-span-2`}
              />
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
                className={inputClass}
              />
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                required
                className={inputClass}
              />
              <input
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                placeholder="Zip Code"
                required
                className={inputClass}
              />
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                required
                className={inputClass}
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className={`${inputClass} sm:col-span-2`}
              />
            </div>
          </div>

          {/* Right - Summary & Payment */}
          <div className="flex-shrink-0 space-y-6 lg:w-80">
            {/* Cart Totals */}
            <div className="p-6 bg-gray-50 rounded-2xl">
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
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="mb-4 text-sm font-semibold tracking-widest text-gray-900 uppercase">
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
                        ? "border-black bg-black/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedPayment === method.id
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPayment === method.id && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-lg">{method.icon}</span>
                    <span className="text-sm font-medium text-gray-800">
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 text-xs font-semibold tracking-widest text-white uppercase transition-colors bg-black rounded-xl hover:bg-gray-800"
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
