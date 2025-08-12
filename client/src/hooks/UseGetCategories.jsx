import { useState, useEffect } from "react";
import axios from "axios";

const UseGetCategories = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/all-categories`)
      .then((response) => {
        if (response.data.success) {
          setData(response.data.data || []);
        } else {
          setError("Failed to fetch categories.");
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError(err.response?.data?.error || "Failed to fetch categories.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};

export default UseGetCategories;