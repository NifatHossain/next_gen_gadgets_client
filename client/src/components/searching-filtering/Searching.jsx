"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/_features/cartSlice"
import toast from "react-hot-toast"
import { FaSearch } from "react-icons/fa"

const Searching = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { isLoggedIn } = useAppSelector((state) => state.user)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      toast.error("Please enter a search query.")
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/search`, {
        params: { query: searchQuery, sortBy, sortOrder },
      })
      if (response.data.success) {
        setProducts(response.data.data.products || [])
      } else {
        setError(response.data.error || "No products found.")
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load search results.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add products to your cart.")
      router.push("/login")
      return
    }

    dispatch(
      addToCart({
        id: product._id,
        name: product.productName,
        price: product.price,
        image: product.imageURL,
        quantity: 1,
        stock: product.productStock || 99999,
      }),
    )
    toast.success(`${product.productName} added to cart!`)
  }

  return (
    <div className="relative p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-l-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 focus:outline-none"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-2 py-2 focus:outline-none"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaSearch />
            Search
          </button>
        </div>
      </form>

      {isLoading && <div className="mt-4 text-center">Loading...</div>}
      {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      {products.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg p-3 shadow hover:shadow-lg">
              <img src={product.imageURL} alt={product.productName} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-2 font-medium">{product.productName}</h3>
              <p className="text-red-500 font-bold">{product.price}৳</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 w-full bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Searching
