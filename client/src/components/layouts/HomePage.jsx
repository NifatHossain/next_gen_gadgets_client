"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart } from "@/_features/cartSlice";
import toast from "react-hot-toast";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoggedIn } = useAppSelector((state) => state.user);

  // Hardcoded content for the homepage
  const promotions = [
    { id: 1, title: "Summer Sale", image: "/images/banner1.jpg" },
    { id: 2, title: "New Arrivals", image: "/images/banner2.jpg" },
  ];

  const categories = [
    { id: 1, name: "Laptops", image: "/images/laptops.jpg" },
    { id: 2, name: "Desktops", image: "/images/desktops.jpg" },
    { id: 3, name: "Accessories", image: "/images/accessories.jpg" },
  ];

  const featuredProducts = [
    { id: 1, name: "Gaming Laptop", image: "/images/laptop.jpg", price: 85000 },
    { id: 2, name: "Mechanical Keyboard", image: "/images/keyboard.jpg", price: 4500 },
    { id: 3, name: "4K Monitor", image: "/images/monitor.jpg", price: 28000 },
  ];

  const latestArrivals = [
    { id: 4, name: "Wireless Mouse", image: "/images/mouse.jpg", price: 1200 },
    { id: 5, name: "SSD 1TB", image: "/images/ssd.jpg", price: 9500 },
  ];

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add products to your cart.");
      router.push("/login");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        stock: 99999, // Replace with actual stock from backend if available
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <main className="p-6">
      {/* Hero Banner */}
      <section className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {promotions.map((promo) => (
            <div key={promo.id} className="relative">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-64 object-cover rounded-lg shadow"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                {promo.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="text-center cursor-pointer">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover rounded-lg shadow"
              />
              <p className="mt-2 font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-3 shadow hover:shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-medium">{product.name}</h3>
              <p className="text-red-500 font-bold">{product.price}৳</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Arrivals */}
      <section>
        <h2 className="text-xl font-bold mb-4">Latest Arrivals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latestArrivals.map((item) => (
            <div key={item.id} className="border rounded-lg p-3 shadow hover:shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-medium">{item.name}</h3>
              <p className="text-red-500 font-bold">{item.price}৳</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-2 w-full bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Building Section */}
      <section className="bg-green-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Why Shop With Us?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Trusted by 10,000+ customers in Bangladesh</li>
          <li>24/7 Customer Support</li>
          <li>Easy Return Policies</li>
          <li>Partnerships with top brands</li>
        </ul>
      </section>
    </main>
  );
}