"use client";

import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartShipping,
  selectCartTax,
  selectCartDiscount,
  selectCartTotal,
  updateShipping,
  applyDiscount,
  clearCart,
} from "@/_features/cartSlice";
// import axios from "axios";
import toast from "react-hot-toast";

const Order = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = useAppSelector(selectCartItems) || [];
  const subtotal = useAppSelector(selectCartSubtotal) || 0;
  const shippingCost = useAppSelector(selectCartShipping) || 0;
  const tax = useAppSelector(selectCartTax) || 0;
  const discount = useAppSelector(selectCartDiscount) || 0;
  const total = useAppSelector(selectCartTotal) || 0;

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobile: "",
    email: "",
    city: "",
    zone: "Dhaka City",
    comment: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [deliveryMethod, setDeliveryMethod] = useState("Home Delivery - 60৳");

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleDeliveryChange = (method) => {
    setDeliveryMethod(method);
    const cost = method === "Home Delivery - 60৳" ? 60 : method === "Request Express - 120৳" ? 120 : 0;
    dispatch(updateShipping(cost));
  };

  const handleApplyDiscount = () => {
    // Placeholder - adapt to your promo logic
    dispatch(applyDiscount(0));
  };

  const handleOrder = async () => {
    if (!customerInfo.firstName || !customerInfo.address || !customerInfo.mobile) {
      toast.error("Please fill required fields: First name, Address, Mobile.");
      return;
    }

    const payload = {
      customer: customerInfo,
      paymentMethod,
      deliveryMethod,
      cartItems,
      totals: {
        subtotal,
        shipping: shippingCost,
        tax,
        discount,
        total,
      },
    };

    setIsSubmitting(true);
     alert("Your order has been placed successfully!");
  };

  const subtotalFixed = subtotal.toFixed(2);
  const shippingFixed = shippingCost.toFixed(2);
  const taxFixed = tax.toFixed(2);
  const discountFixed = discount.toFixed(2);
  const totalFixed = total.toFixed(2);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Customer Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First Name*" onChange={handleChange} className="border p-2" />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-2" />
          <input name="address" placeholder="Address*" onChange={handleChange} className="border p-2 col-span-2" />
          <input name="mobile" placeholder="Telephone*" onChange={handleChange} className="border p-2" />
          <input name="email" placeholder="E-Mail" onChange={handleChange} className="border p-2" />
          <input name="city" placeholder="City" onChange={handleChange} className="border p-2" />
          <select name="zone" onChange={handleChange} className="border p-2">
            <option>Dhaka City</option>
          </select>
          <textarea name="comment" placeholder="Comment" onChange={handleChange} className="border p-2 col-span-2" />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Payment Method</h2>
        {["Cash on Delivery", "Online Payment", "POS on Delivery"].map((method) => (
          <label key={method} className="block">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
            />{" "}
            {method}
          </label>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Delivery Method</h2>
        {["Home Delivery - 60৳", "Store Pickup - 0৳", "Request Express - 120৳"].map((method) => (
          <label key={method} className="block">
            <input
              type="radio"
              name="delivery"
              checked={deliveryMethod === method}
              onChange={() => handleDeliveryChange(method)}
            />{" "}
            {method}
          </label>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Order Overview</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border">{item.name} x {item.quantity}</td>
                <td className="p-2 border">{item.price.toFixed(2)}৳</td>
                <td className="p-2 border">{(item.price * item.quantity).toFixed(2)}৳</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" className="p-2 border text-right font-semibold">Sub-Total:</td>
              <td className="p-2 border">{subtotalFixed}৳</td>
            </tr>
            <tr>
              <td colSpan="2" className="p-2 border text-right font-semibold">Delivery:</td>
              <td className="p-2 border">{shippingFixed}৳</td>
            </tr>
            <tr>
              <td colSpan="2" className="p-2 border text-right font-semibold">Tax:</td>
              <td className="p-2 border">{taxFixed}৳</td>
            </tr>
            <tr>
              <td colSpan="2" className="p-2 border text-right font-semibold">Discount:</td>
              <td className="p-2 border">-{discountFixed}৳</td>
            </tr>
            <tr>
              <td colSpan="2" className="p-2 border text-right font-bold">Total:</td>
              <td className="p-2 border font-bold">{totalFixed}৳</td>
            </tr>
          </tbody>
        </table>

        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleApplyDiscount}
            className="bg-yellow-500 text-black px-6 py-2 rounded text-lg"
            disabled={isSubmitting}
          >
            Apply Discount
          </button>
          <button
            onClick={handleOrder}
            className="bg-green-600 text-white px-6 py-2 rounded text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Order;