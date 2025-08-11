'use client';

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddToCart = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "PC Power PCMU1018P 8800mAh Mini UPS For Router",
      price: 1584,
      quantity: 1,
    },
    {
      id: 2,
      name: "MOuse",
      price: 700,
      quantity: 2,
    },
    {
      id: 3,
      name: "Laptop",
      price: 4500,
      quantity: 2,
    },
  ]);

  const handleQuantityChange = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.price}৳</td>
              <td className="p-2 border">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, e.target.value)}
                  className="w-16 border rounded px-1"
                />
              </td>
              <td className="p-2 border">{item.price * item.quantity}৳</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <div className="text-right">
          <p className="text-lg font-semibold">Subtotal: {subtotal}৳</p>
          <button
            onClick={() => router.push("/order")}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
