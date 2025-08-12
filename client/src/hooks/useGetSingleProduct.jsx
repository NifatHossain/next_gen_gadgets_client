import { useState, useEffect } from "react";
import axios from "axios";

const useGetSingleProduct = (productId) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/singleProduct/${productId}`)
        .then((response) => {
          if (response.data.success) {
            setData(response.data.data || {});
          } else {
            setError("Failed to fetch product.");
          }
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError(err.response?.data?.error || "Failed to fetch product.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  return { data, isLoading, error };
};

export default useGetSingleProduct;