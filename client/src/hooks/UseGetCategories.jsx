import { useState, useEffect } from "react";
import axios from "axios";

const UseGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3002/api/v1/allCategories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setCategoryLoading(false);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return [categories, categoryLoading];
}


export default UseGetCategories;