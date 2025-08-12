import React, { useEffect, useState } from "react";

const UseGetAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3002/api/v1/getAllProducts`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return [products, loading];
};

export default UseGetAllProducts;
