import { useEffect, useState } from 'react'

const UseGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3002/api/v1/allCategories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return [categories, loading];
}

export default UseGetCategories