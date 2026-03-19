import { MapPin, Truck, CheckCircle, Clock } from 'lucide-react';
import { currency } from '../assets/data';

const mockOrders = [
  {
    id: 'ORD-001',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
    name: 'Classic White Tee',
    price: 29.99,
    quantity: 2,
    size: 'M',
    date: 'March 10, 2026',
    paymentMethod: 'Cash on Delivery',
    status: 'Out for delivery',
    statusColor: 'blue',
  },
  {
    id: 'ORD-002',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=200&h=200&fit=crop',
    name: 'Slim Fit Chinos',
    price: 59.99,
    quantity: 1,
    size: 'L',
    date: 'March 5, 2026',
    paymentMethod: 'Stripe',
    status: 'Ready to ship',
    statusColor: 'orange',
  },
  {
    id: 'ORD-003',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e4?w=200&h=200&fit=crop',
    name: 'Wool Blend Overcoat',
    price: 189.99,
    quantity: 1,
    size: 'S',
    date: 'February 20, 2026',
    paymentMethod: 'Razorpay',
    status: 'Delivered',
    statusColor: 'green',
  },
];

const statusConfig = {
  green: { icon: CheckCircle, class: 'text-green-600 bg-green-50 border-green-200' },
  blue: { icon: Truck, class: 'text-blue-600 bg-blue-50 border-blue-200' },
  orange: { icon: Clock, class: 'text-orange-600 bg-orange-50 border-orange-200' },
};

const Orders = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold tracking-widest uppercase text-gray-900 mb-8 border-b border-gray-100 pb-4">
        My Orders
      </h1>

      <div className="space-y-4">
        {mockOrders.map((order) => {
          const { icon: StatusIcon, class: statusClass } = statusConfig[order.statusColor];
          return (
            <div key={order.id} className="border border-gray-100 rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow bg-white">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Image */}
                <div className="w-20 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50">
                  <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.name}</h3>
                      <p className="text-sm text-gray-400 mt-0.5">Order {order.id}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 border text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ${statusClass}`}
                    >
                      <StatusIcon size={12} />
                      {order.status}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-4 text-xs text-gray-500">
                    <div>
                      <span className="font-medium text-gray-700">Price</span>
                      <p>{currency}{order.price.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Qty & Size</span>
                      <p>×{order.quantity} — {order.size}</p>
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

                  <div className="mt-4 flex items-center gap-3">
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
