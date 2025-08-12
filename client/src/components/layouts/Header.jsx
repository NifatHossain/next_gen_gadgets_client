"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaBars, FaUserCircle, FaSearch, FaHeart } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { selectCartItemCount } from "@/_features/cartSlice";
import { logOutUser } from "@/_features/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const cartItemCount = useAppSelector(selectCartItemCount) || 0;
  const { isLoggedIn, name: userName } = useAppSelector((state) => state.user);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    } else {
      toast.error("Please enter a search query.");
    }
  };

  const handleLogout = () => {
    dispatch(logOutUser());
    toast.success("Logged out successfully!");
  };

  return (
    <header className="bg-white shadow-lg border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          NextGenGadgets
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-l-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            <FaSearch />
          </button>
        </form>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/categories" className="hover:text-blue-600 transition-colors">
            Categories
          </Link>
          <Link href="/deals" className="hover:text-blue-600 transition-colors">
            Deals
          </Link>
          <Link href="/support" className="hover:text-blue-600 transition-colors">
            Support
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <FaUserCircle size={24} className="text-gray-600" />
              <span className="font-medium">{userName}</span>
              <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/orders" className="hover:text-blue-600 transition-colors">
                Orders
              </Link>
              <Link href="/wishlist" className="hover:text-blue-600 transition-colors flex items-center gap-1">
                <FaHeart size={16} />
                Wishlist
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          <Link href="/add-to-cart" className="relative hover:text-blue-600 transition-colors">
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs min-w-[20px] text-center">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars size={24} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          {/* Mobile Search */}
          <div className="p-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-l px-3 py-2 flex-1"
              />
              <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-r">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4 space-y-2">
            <Link href="/" className="block py-2 hover:text-blue-600">
              Home
            </Link>
            <Link href="/categories" className="block py-2 hover:text-blue-600">
              Categories
            </Link>
            <Link href="/deals" className="block py-2 hover:text-blue-600">
              Deals
            </Link>
            <Link href="/support" className="block py-2 hover:text-blue-600">
              Support
            </Link>
            <Link href="/contact" className="block py-2 hover:text-blue-600">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;