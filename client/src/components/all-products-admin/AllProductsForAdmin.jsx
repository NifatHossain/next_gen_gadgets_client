"use client";
import axios from "axios";
import React from "react";

const AllProductsForAdmin = () => {
  const products = [
    {
      imageURL: "https://i5.walmartimages.com/seo/HP-15-6-Ryzen-5-8GB-256GB-Laptop-Rose-Gold_36809cf3-480b-47a5-94f0-e1d5e70c58c0_3.fcc0d6494b0e279a13c32c80c28abfa3.jpeg",
      productName: "Product A",
      price: 25,
    },
    {
      imageURL: "https://i5.walmartimages.com/seo/HP-15-6-Ryzen-5-8GB-256GB-Laptop-Rose-Gold_36809cf3-480b-47a5-94f0-e1d5e70c58c0_3.fcc0d6494b0e279a13c32c80c28abfa3.jpeg",
      productName: "Product B",
      price: 40,
    },
  ];

  const handleAction = (action, product) => {
    console.log(`Action: ${action}`, product);
  };
  const handleDeleteProduct = (productId) => {
	console.log(`Delete product with ID: ${productId}`);
	axios.delete(`http://localhost:3002/api/v1/deleteProduct/${productId}`)
	  .then((response) => {
		console.log("Product deleted successfully:", response.data);
	  }).catch((error) => {
		console.error("Error deleting product:", error);
	  })
  }	
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
          {products.map((product, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-200">
                <img
                  src={product.imageURL}
                  alt={product.productName}
                  className="w-14 h-14 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 border border-gray-200">
                {product.productName}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                ${product.price}
              </td>
              <td className="px-4 py-2 border border-gray-200">
                <select
                  className="border border-gray-300 rounded px-2 py-1"
                  onChange={(e) => {
                    if (e.target.value == 'delete') {
                      handleDeleteProduct(product?._id);
                    }
                  }}
                >
                  <option value="">Select</option>
                  <option value="update">Update</option>
                  <option value="delete">Delete</option>
                  <option value="view">View</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProductsForAdmin;
