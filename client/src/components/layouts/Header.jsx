"use client";

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingCart, FaBars, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false to test guest view

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          NextGenGadgets
        </Link>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-3 py-1 w-64"
        />

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/deals">Deals</Link>
          <Link href="/support">Support</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* User Section */}
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <FaUserCircle size={24} />
            <span>Shoumik</span>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/wishlist">Wishlist</Link>
            <button>Logout</button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}

        {/* Cart Icon */}
        <Link href="/cart" className="relative">
          <FaShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
            0
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-100 p-4">
          <Link href="/">Home</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/deals">Deals</Link>
          <Link href="/support">Support</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
