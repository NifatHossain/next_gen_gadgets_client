import { useState, useEffect } from "react";
import axios from "axios";

const UseGetAllProducts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getAllProducts`)
      .then((response) => {
        if (response.data.success) {
          setData(response.data.data || []);
        } else {
          setError("Failed to fetch products.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.error || "Failed to fetch products.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};

export default UseGetAllProducts;