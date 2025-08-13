import { useState, useEffect } from "react";
import axios from "axios";

/**
 * 
 * this hook is used to fetch all categories from the server
 * we are sending the categories and loading state as an array
 */
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