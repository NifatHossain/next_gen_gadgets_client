import React, { useEffect, useState } from 'react'

const UseGetLatestProducts = () => {
  const [latestProducts, setLatestProducts] = useState([]);
	const [loading, setLoading] = useState(true);
  
	useEffect(() => {
	  fetch(`http://localhost:3002/api/v1/getLatestProducts`)
		.then((res) => res.json())
		.then((data) => {
		  setLatestProducts(data);
		  setLoading(false);
		})
		.catch((err) => console.error("Error fetching categories:", err));
	}, []);
  
	return [latestProducts, loading];
}

export default UseGetLatestProducts