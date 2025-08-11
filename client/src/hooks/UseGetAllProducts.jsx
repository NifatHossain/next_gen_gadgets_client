import React from 'react'

const UseGetAllProducts = () => {
  const [products, setProducts] = useState([]);
  
	useEffect(() => {
	  fetch(`http://localhost:3002/all-products`)
		.then((res) => res.json())
		.then((data) => setProducts(data))
		.catch((err) => console.error("Error fetching categories:", err));
	}, []);
  
	return products;
}

export default UseGetAllProducts