import { useState, useEffect } from "react";
import axios from "axios";

const useGetSingleProduct = (productId) => {
  const [product, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      setLoading(false);
      fetch(`http://localhost:3002/api/v1/singleProduct/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching categories:", err));
    }
  }, []);

  return { product, isLoading};
};

export default useGetSingleProduct;
