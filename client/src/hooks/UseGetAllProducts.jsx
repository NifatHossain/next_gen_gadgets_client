import { useState, useEffect } from "react";
import axios from "axios";
/**
 * this hook is used to fetch all products from the server
 * it doesn't take any parameters
 */
const UseGetAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(false);
      fetch(`http://localhost:3002/api/v1/getAllProducts`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching categories:", err));
    
  }, []);

  return { products, isLoading};
};

export default UseGetAllProducts;