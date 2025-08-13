"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaShoppingCart, FaBars, FaUserCircle, FaHeart, FaTimes } from "react-icons/fa"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { selectCartItemCount } from "@/_features/cartSlice"
import { logOutUser } from "@/_features/userSlice"
import toast from "react-hot-toast"
import Searching from "@/components/searching-filtering/Searching"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const cartItemCount = useAppSelector(selectCartItemCount) || 0
  const { isLoggedIn, name: userName, role } = useAppSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logOutUser())
    toast.success("Logged out successfully!")
  }

  return (
    <header className="bg-gradient-to-r from-slate-50 to-blue-50 shadow-xl border-b border-blue-100/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            NextGenGadgets
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-8">
            <div className="relative top">
              <Searching />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: "/", label: "Home" },
              { href: "/categories", label: "Categories" },
              { href: "/deals", label: "Deals" },
              { href: "/support", label: "Support" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-700 hover:text-blue-600 font-medium transition-all duration-200 relative group"
              >
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
                  <FaUserCircle size={20} className="text-blue-600" />
                  <span className="font-medium text-slate-700 text-sm">{userName}</span>
                </div>

                {/* Admin Links */}
                {role === "admin" && (
                  <div className="hidden xl:flex items-center gap-4">
                    <Link
                      href="/add-product"
                      className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      Add Products
                    </Link>
                    <Link
                      href="/all-products"
                      className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
                    >
                      Manage Products
                    </Link>
                  </div>
                )}

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="flex items-center gap-1 text-slate-600 hover:text-red-500 transition-all duration-200 p-2 rounded-full hover:bg-red-50"
                >
                  <FaHeart size={18} />
                  <span className="hidden sm:inline text-sm font-medium">Wishlist</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 lg:gap-3">
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 lg:px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="border-2 border-blue-600 text-blue-600 px-4 lg:px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 text-sm font-medium"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Shopping Cart */}
            <Link
              href="/add-to-cart"
              className="relative p-2 rounded-full hover:bg-blue-100 transition-all duration-200 group"
            >
              <FaShoppingCart size={22} className="text-slate-700 group-hover:text-blue-600 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center shadow-lg animate-pulse">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-full hover:bg-blue-100 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes size={20} className="text-slate-700" />
              ) : (
                <FaBars size={20} className="text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <Searching />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40">
          <div className="bg-white shadow-2xl border-t border-blue-100 animate-in slide-in-from-top duration-300">
            {/* Mobile Navigation */}
            <nav className="p-6 space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/categories", label: "Categories" },
                { href: "/deals", label: "Deals" },
                { href: "/support", label: "Support" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile User Info */}
              {isLoggedIn && (
                <div className="pt-4 border-t border-slate-200 mt-4">
                  <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-lg mb-3">
                    <FaUserCircle size={24} className="text-blue-600" />
                    <span className="font-medium text-slate-700">{userName}</span>
                  </div>

                  {/* Mobile Admin Links */}
                  {role === "admin" && (
                    <div className="space-y-1 mb-3">
                      <Link
                        href="/add-product"
                        className="block py-3 px-4 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Add Products
                      </Link>
                      <Link
                        href="/all-products"
                        className="block py-3 px-4 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Manage Products
                      </Link>
                    </div>
                  )}

                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2 py-3 px-4 text-slate-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 mb-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaHeart size={16} />
                    Wishlist
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
