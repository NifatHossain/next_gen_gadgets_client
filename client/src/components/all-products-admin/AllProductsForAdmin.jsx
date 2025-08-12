"use client";
import UseGetAllProducts from "@/hooks/UseGetAllProducts";
import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const AllProductsForAdmin = () => {
  const [products, loading] = UseGetAllProducts();
  console.log("Products:", products);

  const handleAction = (action, product) => {
    console.log(`Action: ${action}`, product);
  };
  const handleDeleteProduct = (productId) => {
    console.log(`Delete product with ID: ${productId}`);
    axios
      .delete(`http://localhost:3002/api/v1/deleteProduct/${productId}`)
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
        toast.success("Product deleted successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product.");
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
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr className="hover:bg-slate-50" key={product._id}>
                <td className="px-4 py-2 border  border-gray-200">
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
                  ${product.price}
                </td>
                <td className="px-4 py-2 border border-gray-200">
                  {/* <button
					// onClick={() => handleAction("Edit", product)}
					
					
				  > */}
                  {/* Edit
				  </button> */}
                  {product?._id && (
                    <Link className="bg-blue-500 text-white px-3 py-1 rounded mr-2" href={`/update-product/${product._id}`}>Update</Link>
                  )}
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
