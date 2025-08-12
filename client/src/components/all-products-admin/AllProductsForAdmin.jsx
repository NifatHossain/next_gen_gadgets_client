"use client";

import React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import UseGetAllProducts from "@/hooks/UseGetAllProducts";

const AllProductsForAdmin = () => {
  const { data: products = [], isLoading } = UseGetAllProducts();
  const [isDeleting, setIsDeleting] = React.useState(null);

  const handleDeleteProduct = async (productId) => {
    setIsDeleting(productId);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/deleteProduct/${productId}`
      );
      if (response.data.success) {
        toast.success("Product deleted successfully!");
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error(err.response?.data?.error || "Failed to delete product.");
    } finally {
      setIsDeleting(null);
    }
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
                <td className="px-4 py-2 border border-gray-200">{product.productName}</td>
                <td className="px-4 py-2 border border-gray-200">{product.price}৳</td>
                <td className="px-4 py-2 border border-gray-200">
                  <Link
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    href={`/update-product/${product._id}`}
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    disabled={isDeleting === product._id}
                  >
                    {isDeleting === product._id ? "Deleting..." : "Delete"}
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