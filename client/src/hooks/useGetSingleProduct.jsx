import React, { useEffect, useState } from 'react'

const useGetSingleProduct = ({productId}) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  
	useEffect(() => {
	  fetch(`http://localhost:3002/api/v1/singleProduct/${productId}`)
		.then((res) => res.json())
		.then((data) =>{
			setProduct(data)
			setLoading(false);
		} )
		.catch((err) => console.error("Error fetching categories:", err));
	}, []);
  
	return [product, loading];
}

export default useGetSingleProduct