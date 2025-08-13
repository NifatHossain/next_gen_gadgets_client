"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import UseGetCategories from "@/hooks/UseGetCategories";
import useGetSingleProduct from "@/hooks/useGetSingleProduct";

const UpdateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { productId } = useParams();
  const { data: product = {}, isLoading: productLoading } = useGetSingleProduct(productId);
  const { data: categories = [], isLoading: categoriesLoading } = UseGetCategories();
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const payload = {
      productName: data.productName,
      brandName: data.brandName,
      price: Number(data.price),
      productStock: Number(data.productStock),
      description: data.description,
      category: isAddingCategory ? data.newCategory : data.category,
      imageURL: data.imageURL,
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/updateProduct/${productId}`,
        payload
      );
      if (response.data.success) {
        toast.success("Product updated successfully!");
        reset();
        setIsAddingCategory(false);
      } else {
        toast.error("Failed to update product.");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error(err.response?.data?.error || "Failed to update product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Update Product</h1>
      {productLoading || categoriesLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Product Name</label>
                <input
                  type="text"
                  {...register("productName", { required: "Product name is required" })}
                  className="w-full border rounded p-2"
                  defaultValue={product.productName}
                />
                {errors.productName && (
                  <p className="text-red-500 text-sm">{errors.productName.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Brand Name</label>
                <input
                  type="text"
                  {...register("brandName", { required: "Product brand name is required" })}
                  className="w-full border rounded p-2"
                  defaultValue={product.brandName}
                />
                {errors.brandName && (
                  <p className="text-red-500 text-sm">{errors.brandName.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Price</label>
                <input
                  type="number"
                  {...register("price", { required: "Price is required", min: 0 })}
                  className="w-full border rounded p-2"
                  defaultValue={product.price}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Quantity</label>
                <input
                  type="number"
                  {...register("productStock", { required: "Quantity is required", min: 1 })}
                  className="w-full border rounded p-2"
                  defaultValue={product.productStock}
                />
                {errors.productStock && (
                  <p className="text-red-500 text-sm">{errors.productStock.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  className="w-full border rounded p-2"
                  defaultValue={product.description}
                  rows="4"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Product Image URL</label>
                <input
                  type="text"
                  {...register("imageURL", { required: "Image URL is required" })}
                  className="w-full border rounded p-2"
                  defaultValue={product.imageURL}
                />
                {errors.imageURL && (
                  <p className="text-red-500 text-sm">{errors.imageURL.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full border rounded p-2"
                  defaultValue={product.category}
                  onChange={(e) => setIsAddingCategory(e.target.value === "add-new")}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="add-new" className="text-blue-300">
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
                    {...register("newCategory", { required: "New category name is required" })}
                    className="w-full border rounded p-2"
                    placeholder="Enter new category name"
                  />
                  {errors.newCategory && (
                    <p className="text-red-500 text-sm">{errors.newCategory.message}</p>
                  )}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;