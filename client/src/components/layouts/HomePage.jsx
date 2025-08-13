"use client";
import UseGetCategories from "@/hooks/UseGetCategories";
import UseGetCategoryWiseProduct from "@/hooks/UseGetCategoryWiseProduct";
import UseGetLatestProducts from "@/hooks/UseGetLatestProducts";
import  Link  from "next/link";
import React from "react";

export default function HomePage() {

  const [categories, categoryLoading] = UseGetCategories();
  const [latestProducts, latestLoading] = UseGetLatestProducts();
  const {categoryProducts, categoryProductLoading} = UseGetCategoryWiseProduct("Laptop");
  const { categoryProducts:phones, categoryLoading:phonesLoading} = UseGetCategoryWiseProduct("Phone");
  console.log("Category Products:", categoryProducts);  
  console.log("Phones:", phones);
  console.log("Latest Products:", latestProducts);


  return (
    <main className="p-6">
      {/* Hero Banner */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Latest Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {!latestLoading && latestProducts.map((product,idx) => (
            <div
              key={product._id}
              className="border rounded-lg p-3 shadow hover:shadow-lg"
            >
              <img
                src={product?.imageURL}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-medium">{product.productName}</h3>
              <p className="text-red-500 font-bold">{product.price}</p>
              <div className="flex flex-row justify-center">
                <button className="mt-2 w-full bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
                <Link
                  href={`/product-details/${product?._id}`}
                  className="mt-2 w-full bg-green-600 text-center text-white px-3 py-1 rounded hover:bg-green-700 ml-2"
                >
                 Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {!categoryLoading && categories.map((cat,idx) => (
            <div key={idx} className="text-center cursor-pointer">
              <img
                src={
                  cat.image ||
                  "https://as2.ae/wp-content/uploads/2024/10/Gadgets-Examples.webp"
                }
                alt={cat.name}
                className="w-full h-40 object-cover rounded-lg shadow"
              />
              <p className="mt-2 font-medium">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* laptop */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Laptops</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {!categoryProductLoading && categoryProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-3 shadow hover:shadow-lg"
            >
              <img
                src={product.imageURL}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-medium">{product.productName}</h3>
              <p className="text-red-500 font-bold">{product.price}</p>
              <div className="flex flex-row justify-center">
                <button className="mt-2 w-full bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
                <Link
                  href={`/product-details/${product?._id}`}
                  className="mt-2 w-full bg-green-600 text-center text-white px-3 py-1 rounded hover:bg-green-700 ml-2"
                >
                 Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phone */}
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">Phones</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {!phonesLoading && phones.map((phone) => (
            <div
              key={phone._id}
              className="border rounded-lg p-3 shadow hover:shadow-lg"
            >
              <div className="flex justify-center">
                <img
                src={phone.imageURL}
                className=" object-cover w-40 h-40  rounded"
              />
              </div>
              <h3 className="mt-2 font-medium">{phone.productName}</h3>
              <p className="text-red-500 font-bold">{phone.price}</p>
              <div className="flex flex-row justify-center">
                <button className="mt-2 w-full bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
                <Link
                  href={`/product-details/${phone?._id}`}
                  className="mt-2 w-full bg-green-600 text-center text-white px-3 py-1 rounded hover:bg-green-700 ml-2"
                >
                 Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
