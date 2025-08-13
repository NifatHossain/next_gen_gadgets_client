"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaHeart, FaTimes } from "react-icons/fa";
import { Home, Package, User, LogOut, Plus, Edit, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { selectCartItemCount } from "@/_features/cartSlice";
import { logOutUser } from "@/_features/userSlice";
import { clearCart } from "@/_features/cartSlice"; // Added import
import toast from "react-hot-toast";
import Searching from "../searching-filtering/Searching";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const cartItemCount = useAppSelector(selectCartItemCount) || 0;
  const { isLoggedIn, name: userName, role } = useAppSelector((state) => state.user);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  const handleLogout = () => {
    dispatch(logOutUser());
    dispatch(clearCart()); // Clear the cart on logout
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-slate-50 to-blue-50 shadow-xl border-b border-blue-100/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            aria-label="ProductHub Home"
          >
            ProductHub
          </Link>

          {/* Desktop Search */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {[
              { href: "/", label: "Home", icon: Home },
              { href: "/all-products", label: "All Products", icon: Package }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-slate-700 hover:text-blue-600 font-medium transition-all duration-200 relative group"
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 lg:gap-4">
                {/* User Info */}
                <div className="hidden md:flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm border border-blue-100">
                  <User size={20} className="text-blue-600" aria-hidden="true" />
                  <span className="font-medium text-slate-700 text-sm" aria-label={`Logged in as ${userName}`}>
                    {userName}
                  </span>
                </div>

                {/* Admin Links */}
                {role === "admin" && (
                  <div className="hidden xl:flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
                      aria-label="Add Product"
                    >
                      <Link href="/add-product">
                        <Plus className="h-4 w-4" />
                        Add Product
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
                      aria-label="All Products"
                    >
                      <Link href="/all-products">
                        <Edit className="h-4 w-4" />
                        All Products
                      </Link>
                    </Button>
                  </div>
                )}

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="flex items-center gap-1 text-slate-600 hover:text-red-500 transition-all duration-200 p-2 rounded-full hover:bg-red-50"
                  aria-label="View Wishlist"
                >
                  <FaHeart size={18} aria-hidden="true" />
                  <span className="hidden sm:inline text-sm font-medium">Wishlist</span>
                </Link>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                      aria-label={`User menu for ${userName}`}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/generic-user-avatar.png" alt={userName} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" aria-hidden="true" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">
                        <Package className="mr-2 h-4 w-4" aria-hidden="true" />
                        <span>Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">
                        <FaHeart className="mr-2 h-4 w-4" aria-hidden="true" />
                        <span>Wishlist</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex gap-2 lg:gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 lg:px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                  aria-label="Log in"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="border-2 border-blue-600 text-blue-600 px-4 lg:px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 text-sm font-medium"
                  aria-label="Register"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-blue-100 transition-all duration-200 group"
              aria-label={`View cart with ${cartItemCount} items`}
            >
              <FaShoppingCart
                size={22}
                className="text-slate-700 group-hover:text-blue-600 transition-colors"
                aria-hidden="true"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center shadow-lg animate-pulse">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 rounded-full hover:bg-blue-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <FaTimes size={20} className="text-slate-700" aria-hidden="true" />
              ) : (
                <Menu size={20} className="text-slate-700" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40"
          aria-label="Mobile navigation"
        >
          <div className="bg-white shadow-2xl border-t border-blue-100 animate-in slide-in-from-top duration-300">
            {/* Mobile Navigation */}
            <nav className="p-6 space-y-1">
              {[
                { href: "/", label: "Home", icon: Home },
                { href: "/all-products", label: "All Products", icon: Package },
                { href: "/categories", label: "Categories", icon: Package },
                { href: "/deals", label: "Deals", icon: Package },
                { href: "/support", label: "Support", icon: Package },
                { href: "/contact", label: "Contact", icon: Package },
              ].map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="w-full justify-start gap-3 py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label={item.label}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                </Button>
              ))}

              {/* Mobile User Info */}
              {isLoggedIn && (
                <div className="pt-4 border-t border-slate-200 mt-4">
                  <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-lg mb-3">
                    <User size={24} className="text-blue-600" aria-hidden="true" />
                    <span className="font-medium text-slate-700" aria-label={`Logged in as ${userName}`}>
                      {userName}
                    </span>
                  </div>

                  {/* Mobile Admin Links */}
                  {role === "admin" && (
                    <div className="space-y-1 mb-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="w-full justify-start gap-3 py-3 px-4 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Add Product"
                      >
                        <Link href="/add-product">
                          <Plus className="h-4 w-4" aria-hidden="true" />
                          Add Product
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="w-full justify-start gap-3 py-3 px-4 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="All Products"
                      >
                        <Link href="/all-products">
                          <Edit className="h-4 w-4" aria-hidden="true" />
                          All Products
                        </Link>
                      </Button>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full justify-start gap-2 py-3 px-4 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 mb-3"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="View Wishlist"
                  >
                    <Link href="/wishlist">
                      <FaHeart size={16} aria-hidden="true" />
                      Wishlist
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full justify-start gap-2 py-3 px-4 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 mb-3"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="View Orders"
                  >
                    <Link href="/orders">
                      <Package className="h-4 w-4" aria-hidden="true" />
                      Orders
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
      <Searching />
    </header>
  );
};

export default Header;