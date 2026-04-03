import { MapPin, Truck, CheckCircle, Clock } from "lucide-react";
import { currency } from "../assets/data";
import { useEffect, useState } from "react";
import axios from "axios";

// const mockOrders = [
//   {
//     id: 'ORD-001',
//     image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
//     name: 'Classic White Tee',
//     price: 29.99,
//     quantity: 2,
//     size: 'M',
//     date: 'March 10, 2026',
//     paymentMethod: 'Cash on Delivery',
//     status: 'Out for delivery',
//     statusColor: 'blue',
//   },
//   {
//     id: 'ORD-002',
//     image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=200&fit=crop',
//     name: 'Slim Fit Chinos',
//     price: 59.99,
//     quantity: 1,
//     size: 'L',
//     date: 'March 5, 2026',
//     paymentMethod: 'Stripe',
//     status: 'Ready to ship',
//     statusColor: 'orange',
//   },
//   {
//     id: 'ORD-003',
//     image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=200&h=200&fit=crop',
//     name: 'Wool Blend Overcoat',
//     price: 189.99,
//     quantity: 1,
//     size: 'S',
//     date: 'February 20, 2026',
//     paymentMethod: 'Razorpay',
//     status: 'Delivered',
//     statusColor: 'green',
//   },
// ];

const statusConfig = {
  green: {
    icon: CheckCircle,
    class: "text-green-600 bg-green-50 border-green-200",
  },
  blue: { icon: Truck, class: "text-blue-600 bg-blue-50 border-blue-200" },
  orange: {
    icon: Clock,
    class: "text-orange-600 bg-orange-50 border-orange-200",
  },
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Orders = ({ token }) => {
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorder",
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["id"] = order._id;

            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="max-w-4xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
      <h1 className="pb-4 mb-8 text-2xl font-semibold tracking-widest text-gray-900 uppercase border-b border-gray-100">
        My Orders
      </h1>

      <div className="space-y-4">
        {orderData.map((order) => {
          return (
            <div
              key={order.id}
              className="p-5 transition-shadow bg-white border border-gray-100 rounded-2xl sm:p-6 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Image */}
                <div className="flex-shrink-0 w-20 h-24 overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={order.image[0]}
                    alt={order.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {order.name}
                      </h3>
                      <p className="text-sm text-gray-400 mt-0.5">
                        Order {order.id}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 border text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 `}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 mt-3 text-xs text-gray-500 sm:grid-cols-4 gap-y-2 gap-x-4">
                    <div>
                      <span className="font-medium text-gray-700">Price</span>
                      <p>
                        {currency}
                        {order.price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Qty & Size
                      </span>
                      <p>
                        ×{order.quantity} — {order.size}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Date</span>
                      <p>{order.date}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Payment</span>
                      <p>{order.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors">
                      <MapPin size={13} />
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
