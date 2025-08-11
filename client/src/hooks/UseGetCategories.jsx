import { useEffect, useState } from 'react'

const UseGetCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3002/api/v1/all-categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return categories;
}

export default UseGetCategories