import React, { useState } from "react";
import "./ProductFilter.css"; // Import the CSS file

const ProductFilter = () => {
  const products = [
    { id: 1, name: "MacBook Pro", category: "Laptop" },
    { id: 2, name: "Dell XPS 13", category: "Laptop" },
    { id: 3, name: "iPhone 15", category: "Mobile" },
    { id: 4, name: "Samsung Galaxy S23", category: "Mobile" },
    { id: 5, name: "HP Pavilion", category: "Laptop" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <h2>Product Filter</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>

      <ul className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} - <strong>{product.category}</strong>
            </li>
          ))
        ) : (
          <li className="no-results">No products found</li>
        )}
      </ul>
    </div>
  );
};

export default ProductFilter;
