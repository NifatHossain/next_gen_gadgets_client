"use client";

import React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import UseGetAllProducts from "@/hooks/UseGetAllProducts";

const AllProductsForAdmin = () => {
  const { products, isLoading } = UseGetAllProducts();

  /**
   *
   * Function to handle product deletion
   * productId is sent as a parameter to function, then we call the API to delete the product
   * On success, we show a success toast and reload the page to reflect changes
   * On error, we log the error and show an error toast
   */
  const handleDeleteProduct = (productId) => {
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/deleteProduct/${productId}`
      )
      .then((response) => {
        toast.success("Product deleted successfully!");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        toast.error(err.response?.data?.error || "Failed to delete product.");
      });
  };

  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="min-w-1/2 border border-gray-200 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-200">Image</th>
            <th className="px-4 py-2 border border-gray-200">Product Name</th>
            <th className="px-4 py-2 border border-gray-200">Price</th>
            <th className="px-4 py-2 border border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr className="hover:bg-slate-50" key={product._id}>
                <td className="px-4 py-2 border border-gray-200">
                  <img
                    src={product.imageURL}
                    alt={product.productName}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {product.productName}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  ৳ {product.price}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  /** *Link tag to navigate to the update product page
                  *product._id is passed as a parameter to the URL
                  *update-product page will use this id to fetch the product
                  details for updating */
                  <Link
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    href={`/update-product/${product._id}`}
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllProductsForAdmin;
