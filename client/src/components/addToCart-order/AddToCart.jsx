"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartItemCount,
} from "@/_features/cartSlice";
import { updateQuantity, removeFromCart } from "@/_features/cartSlice";

/**
 * AddToCart component: uses redux cart as single source of truth.
 * - Quantity updates dispatch updateQuantity
 * - Remove dispatches removeFromCart
 */

const AddToCart = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems) || [];
  const subtotal = useAppSelector(selectCartSubtotal) || 0;
  const itemCount = useAppSelector(selectCartItemCount) || 0;

  const handleQuantityChange = (id, quantity) => {
    const q = parseInt(quantity, 10);
    if (Number.isNaN(q)) return;
    dispatch(updateQuantity({ id, quantity: q }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          Your cart is empty.
        </div>
      ) : (
        <>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-left">Product</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border flex items-center gap-3">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    ) : null}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.brand}</div>
                    </div>
                  </td>
                  <td className="p-2 border">{item.price}৳</td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-20 border rounded px-1"
                    />
                  </td>
                  <td className="p-2 border">{(item.price * item.quantity).toFixed(2)}৳</td>
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

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-sm">Items: {itemCount}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">Subtotal: {subtotal.toFixed(2)}৳</p>
              <button
                onClick={() => router.push("/order")}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
