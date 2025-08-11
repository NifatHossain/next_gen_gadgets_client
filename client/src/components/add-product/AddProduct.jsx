"use client";

import UseGetCategories from "@/hooks/UseGetCategories";
import axios from "axios";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const categories = ["Laptop", "Mobile", "Tablet", "Monitor"];
  const categories1= UseGetCategories();
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const onSubmit = async(data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category",isAddingCategory ? data.newCategory : data.category);
    formData.append("imageURL", data.imageURL);

    console.log("Form Data ready to send:", data);
	try {
		const res = await axios.post('http://localhost:3002/api/v1/addProduct', formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});	
		console.log("Product saved:", res.data);
	} catch (err) {
		console.error("Error saving product:", err);
	}

    reset();
    setIsAddingCategory(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              {...register("productName", { required: "Product name is required" })}
              className="w-full border rounded p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.productName.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Brand Name</label>
            <input
              type="text"
              {...register("brandName", { required: "Product brand name is required" })}
              className="w-full border rounded p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.brandName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className="w-full border rounded p-2"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Enter Quantity</label>
            <input
              type="number"
              {...register("productStock", { required: "Quantity is required" })}
              className="w-full border rounded p-2"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.productStock.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border rounded p-2"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Product Image URL</label>
            <input
              type="text"
              {...register("image", { required: "Image is required" })}
              className="w-full border rounded p-2 "
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border rounded p-2"
              onChange={(e) =>
                setIsAddingCategory(e.target.value === "add-new")
              }
            >
              <option value="">Select a category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="add-new" className="text-blue-300">
                {" "}
                Add New Category
              </option>
            </select>
            {errors.category && !isAddingCategory && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {isAddingCategory && (
            <div>
              <label className="block mb-1 font-medium">New Category</label>
              <input
                type="text"
                {...register("newCategory", {
                  required: "New category name is required",
                })}
                className="w-full border rounded p-2"
                placeholder="Enter new category name"
              />
              {errors.newCategory && (
                <p className="text-red-500 text-sm">
                  {errors.newCategory.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
