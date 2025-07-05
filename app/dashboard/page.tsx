

import {
  FaDollarSign,
  FaUndo,
  FaShoppingCart,
  FaShoppingBasket
} from 'react-icons/fa';
import MiniHero from '@/lib/ui/dashboard/MiniHero';
import VendorHeader from '@/lib/ui/dashboard/VendorHeader';
import PerformanceCard from '@/lib/ui/dashboard/PerformanceCard';
import OrdersTable from '@/lib/ui/dashboard/OrdersTable';

export default function Dashboard() {
  // Mock data for demonstration
  const performanceData = [
    {
      title: 'Revenue',
      value: '$12,426',
      change: 3.5,
      icon: <FaDollarSign size={20} />
    },
    {
      title: 'Refunds',
      value: '$892',
      change: -1.2,
      icon: <FaUndo size={20} />,
      inverted: true
    },
    {
      title: 'Orders',
      value: '1,247',
      change: 8.3,
      icon: <FaShoppingCart size={20} />
    },
    {
      title: 'Basket Size',
      value: '$53.40',
      change: 2.1,
      icon: <FaShoppingBasket size={20} />
    }
  ];

  const ordersData = [
    {
      id: '1',
      orderNumber: '#12345',
      deliveryDate: 'Wed 1:00 pm',
      customer: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      amount: 53.40,
      status: 'Complete' as const
    },
    {
      id: '2',
      orderNumber: '#12346',
      deliveryDate: 'Thu 3:30 pm',
      customer: {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
      },
      amount: 89.99,
      status: 'Pending' as const
    },
    {
      id: '3',
      orderNumber: '#12347',
      deliveryDate: 'Fri 11:15 am',
      customer: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      amount: 124.50,
      status: 'In Progress' as const
    },
    {
      id: '4',
      orderNumber: '#12348',
      deliveryDate: 'Sat 9:45 am',
      customer: {
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      amount: 67.25,
      status: 'Cancelled' as const
    }
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Mini Hero Section */}
      <MiniHero
        title="Vendor Dashboard"
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop"
      />

      {/* Vendor Header with Logo and Tabs */}
      <VendorHeader
        vendorName="Shopizon"
        vendorLogo="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop"
        activeTab="Dashboard"
      />

      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 pb-8">

        {/* Performance Summary Section */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-base-content mb-4">Performance Summary</h2>
            {/* DaisyUI: divider */}
            <div className="divider"></div>
          </div>

          {/* Performance Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceData.map((data, index) => (
              <PerformanceCard
                key={index}
                title={data.title}
                value={data.value}
                change={data.change}
                icon={data.icon}
                inverted={data.inverted}
              />
            ))}
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-base-content mb-4">Orders</h2>
            {/* DaisyUI: divider */}
            <div className="divider"></div>
          </div>

          {/* DaisyUI: card component for orders section */}
          <div className="card bg-base-100 shadow-sm border border-gray-300">
            <div className="card-body">
              {/* Filters Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search Bar - DaisyUI: input component */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Status Dropdown - DaisyUI: select component */}
                <div className="w-full sm:w-auto">
                  <select className="select select-bordered w-full sm:w-auto">
                    <option>All Status</option>
                    <option>Complete</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <OrdersTable orders={ordersData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}