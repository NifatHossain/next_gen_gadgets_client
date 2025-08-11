'use client';

import React, { useState } from "react";

const Order = () => {
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

  const cartItems = [
    {
      id: 1,
      name: "PC Power PCMU1018P 8800mAh Mini UPS For Router",
      price: 1584,
      quantity: 1,
    },
  ];

  const deliveryCost =
    deliveryMethod === "Home Delivery - 60৳"
      ? 60
      : deliveryMethod === "Request Express - 120৳"
      ? 120
      : 0;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryCost;

  const handleChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    console.log("Order placed:", { customerInfo, paymentMethod, deliveryMethod, cartItems });
    alert("Your order has been placed successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Customer Information */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Customer Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First Name*" onChange={handleChange} className="border p-2" />
          <input name="lastName" placeholder="Last Name*" onChange={handleChange} className="border p-2" />
          <input name="address" placeholder="Address*" onChange={handleChange} className="border p-2 col-span-2" />
          <input name="mobile" placeholder="Telephone*" onChange={handleChange} className="border p-2" />
          <input name="email" placeholder="E-Mail*" onChange={handleChange} className="border p-2" />
          <input name="city" placeholder="City*" onChange={handleChange} className="border p-2" />
          <select name="zone" onChange={handleChange} className="border p-2">
            <option>Dhaka City</option>
          </select>
          <textarea name="comment" placeholder="Comment" onChange={handleChange} className="border p-2 col-span-2" />
        </div>
      </section>

      {/* Payment Method */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Payment Method</h2>
        {["Cash on Delivery", "Online Payment", "POS on Delivery"].map(method => (
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

      {/* Delivery Method */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Delivery Method</h2>
        {["Home Delivery - 60৳", "Store Pickup - 0৳", "Request Express - 120৳"].map(method => (
          <label key={method} className="block">
            <input
              type="radio"
              name="delivery"
              checked={deliveryMethod === method}
              onChange={() => setDeliveryMethod(method)}
            />{" "}
            {method}
          </label>
        ))}
      </section>

      {/* Order Overview */}
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
            {cartItems.map(item => (
              <tr key={item.id}>
                <td className="p-2 border">{item.name} x {item.quantity}</td>
                <td className="p-2 border">{item.price}৳</td>
                <td className="p-2 border">{item.price * item.quantity}৳</td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" className="p-2 border text-right font-semibold">Sub-Total:</td>
              <td className="p-2 border">{subtotal}৳</td>
            </tr>
            <tr>
              <td colSpan="2" className="p-2 border text-right font-semibold">Delivery:</td>
              <td className="p-2 border">{deliveryCost}৳</td>
            </tr>
            <tr>
              <td colSpan="2" className="p-2 border text-right font-bold">Total:</td>
              <td className="p-2 border font-bold">{total}৳</td>
            </tr>
          </tbody>
        </table>
      </section>

      <button
        onClick={handleOrder}
        className="bg-green-600 text-white px-6 py-2 rounded text-lg"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Order;
