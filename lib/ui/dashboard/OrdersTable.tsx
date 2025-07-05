"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaCheck, FaRegPlayCircle, FaRegPauseCircle, FaTimes, FaEye } from 'react-icons/fa';

interface Order {
  id: string;
  orderNumber: string;
  deliveryDate: string;
  customer: {
    name: string;
    avatar: string;
  };
  amount: number;
  status: 'Complete' | 'Pending' | 'In Progress' | 'Cancelled';
}

interface OrdersTableProps {
  orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'Complete':
        return 'badge badge-success gap-1';
      case 'Pending':
        return 'badge badge-warning gap-1';
      case 'In Progress':
        return 'badge badge-info gap-1';
      case 'Cancelled':
        return 'badge badge-error gap-1';
      default:
        return 'badge badge-neutral gap-1';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Complete':
        return <FaCheck size={12} />;
      case 'Pending':
        return <FaRegPauseCircle size={12} />;
      case 'In Progress':
        return <FaRegPlayCircle size={12} />;
      case 'Cancelled':
        return <FaTimes size={12} />;
      default:
        return null;
    }
  };

  return (
    // DaisyUI: table component with rounded corners
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="table table-zebra w-full">
        {/* DaisyUI: table head */}
        <thead className="bg-base-200">
          <tr>
            <th className="font-bold text-base-content">Order#</th>
            <th className="font-bold text-base-content">Customer</th>
            <th className="font-bold text-base-content">Amount</th>
            <th className="font-bold text-base-content">Status</th>
            <th className="font-bold text-base-content">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover">
              {/* Order Number Column */}
              <td>
                <div>
                  <div className="font-bold text-base-content">{order.orderNumber}</div>
                  <div className="text-sm text-base-content/60">{order.deliveryDate}</div>
                </div>
              </td>

              {/* Customer Column */}
              <td>
                <div className="flex items-center gap-3">
                  {/* DaisyUI: avatar component */}
                  <div className="avatar">
                    <div className="mask mask-circle w-8 h-8">
                      <Image
                        src={order.customer.avatar}
                        alt={order.customer.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="font-bold text-base-content">{order.customer.name}</div>
                </div>
              </td>

              {/* Amount Column */}
              <td>
                <span className="font-bold text-base-content">
                  ${order.amount.toFixed(2)}
                </span>
              </td>

              {/* Status Column */}
              <td>
                {/* DaisyUI: badge component */}
                <span className={getStatusStyle(order.status)}>
                  <span>{getStatusIcon(order.status)}</span>
                  {order.status}
                </span>
              </td>

              {/* Actions Column */}
              <td>
                <Link
                  href={`/orders/${order.id}`}
                  className="btn btn-ghost btn-sm gap-2"
                  title="View Order Details"
                >
                  <FaEye size={14} />
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
