import React, { useEffect, useState } from 'react'
/**
 * 
 * this hook is used to fetch products based on category 
 * it takes category name as a parameter
 * we are sending the products and loading state as an object
 */
const UseGetCategoryWiseProduct = (categoryName) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
	const [categoryLoading, setCategoryLoading] = useState(true);
	
	useEffect(() => {
	  fetch(`http://localhost:3002/api/v1/category/${categoryName}`)
		.then((res) => res.json())
		.then((data) => {
		  setCategoryProducts(data);
		  setCategoryLoading(false);
		})
		.catch((err) => console.error("Error fetching categories:", err));
	}, []);
	
	return {categoryProducts, categoryLoading};
}

export default UseGetCategoryWiseProduct