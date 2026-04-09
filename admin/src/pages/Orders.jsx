import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]); // Renamed 'order' to 'orders' (plural) for better naming convention

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } },
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.log("error in order admin", error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log("error in order status function", error);
      toast.error(response.data.msg);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h3 className="pb-4 mb-6 text-2xl font-bold tracking-wider text-gray-900 uppercase border-b border-gray-200">
        Order Page
      </h3>

      <div className="space-y-4">
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start border border-gray-200 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* 1. Parcel Icon */}
              <div className="shrink-0">
                <img
                  className="object-contain w-12 h-12"
                  src={assets.parcel_icon}
                  alt="Parcel Icon"
                />
              </div>

              {/* 2. Order Items & Address */}
              <div>
                {/* Items List */}
                <p className="mb-3 text-sm font-medium leading-relaxed text-gray-900">
                  {order.items.map((item, itemIndex) => {
                    if (itemIndex === order.items.length - 1) {
                      return `${item.name} x ${item.quantity} (${item.size})`;
                    } else {
                      return `${item.name} x ${item.quantity} (${item.size}), `;
                    }
                  })}
                </p>

                {/* Customer Details */}
                <p className="mt-3 mb-1 text-sm font-semibold text-gray-800">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <div className="text-sm text-gray-500">
                  <p>{order.address.street},</p>
                  {/* Pro Tip: Using Template Literals makes strings much cleaner! */}
                  <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode}`}</p>
                  <p className="mt-2 font-medium text-gray-800">
                    Phone: {order.address.phone}
                  </p>
                </div>
              </div>

              {/* 3. Order Details (Items count, Payment method) */}
              <div className="space-y-1 text-sm text-gray-600">
                <p>Items: {order.items.length}</p>
                <p className="mt-1">
                  Method:{" "}
                  <span className="font-semibold text-gray-800">
                    {order.paymentMethod}
                  </span>
                </p>
                <p>
                  Payment:{" "}
                  <span
                    className={`font-semibold ${
                      order.payment ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                {/* Optional: Add Date here if you want */}
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* 4. Total Amount */}
              <div className="text-sm text-gray-600 sm:text-center">
                <p className="text-lg font-bold text-gray-900">
                  ${order.amount}
                </p>
              </div>

              {/* 5. Status Dropdown (Since this is Admin Panel) */}
              <div className="text-sm sm:text-right">
                <select
                  defaultValue={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                  className="p-2.5 border border-gray-200 rounded-lg font-medium bg-gray-50 outline-none focus:border-black cursor-pointer w-full sm:w-auto text-sm"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
