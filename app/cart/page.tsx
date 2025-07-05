'use client';

import { useState } from 'react';
import { FaShoppingCart, FaTrash, FaCreditCard } from 'react-icons/fa';
import MiniHero from '@/lib/ui/dashboard/MiniHero';
import Header from '@/lib/ui/header/Header';
import Footer from '@/lib/ui/footer/Footer';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      quantity: 1,
      inStock: true
    },
    {
      id: '2',
      name: 'Smart Watch Pro',
      price: 249.99,
      quantity: 2,
      inStock: true
    },
    {
      id: '3',
      name: 'Wireless Charging Pad',
      price: 39.99,
      quantity: 1,
      inStock: true
    }
  ]);

  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col bg-[#ffefaf6]">
      <Header />

      <MiniHero
        title="Your Shopping Cart"
        backgroundImage="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&h=400&fit=crop"
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaShoppingCart size={20} />
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in Cart
              </h2>
            </div>

            <div className="space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-lg shadow-sm p-4 border border-gray-200"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    {!item.inStock && (
                      <span className="badge badge-warning mt-1">Out of Stock</span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 sm:mt-0">
                    <div className="text-sm text-gray-600">
                      <div>Price: <span className="font-semibold">${item.price.toFixed(2)}</span></div>
                      <div>
                        Total:{' '}
                        <span className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center border rounded overflow-hidden">
                      <button
                        className="btn btn-sm min-w-[2rem] px-3 bg-transparent border-none text-black"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <div className="px-3 text-sm">{item.quantity}</div>
                      <button
                        className="btn btn-sm min-w-[2rem] px-3 bg-transparent border-none text-black"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="text-red-500 bg-transparent border-none"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {cartItems.length === 0 && (
                <div className="p-6 text-center text-gray-500 bg-white border rounded">
                  Your cart is empty.
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <div className="card bg-base-100 shadow-sm border border-gray-300 sticky top-8">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <button className="btn btn-primary w-full">
                    <FaCreditCard size={18} className="mr-2" />
                    Proceed to Checkout
                  </button>
                  <div className="flex justify-center">
                    <Link href="/" className="btn btn-outline no-animation">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
