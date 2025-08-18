"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Share2, Star, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const productData = {
  id: 1,
  name: "Men's Harrington Jacket",
  price: 24000,
  originalPrice: 30000,
  rating: 4.5,
  reviews: 128,
  images: [
    "/placeholder.svg?height=400&width=400&text=Jacket+Front",
    "/placeholder.svg?height=400&width=400&text=Jacket+Back",
    "/placeholder.svg?height=400&width=400&text=Jacket+Side",
  ],
  description:
    "This is the perfect jacket for any occasion. Made with premium materials and designed for comfort and style. Perfect for casual outings or semi-formal events.",
  features: [
    "Premium cotton blend fabric",
    "Water-resistant coating",
    "Multiple pockets",
    "Adjustable cuffs",
    "Machine washable",
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: ["Khaki", "Navy", "Black", "Olive"],
  inStock: true,
  stockCount: 15,
}

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("Khaki")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(true)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <Link href="/wishlist/details">
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Product Details</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsWishlisted(!isWishlisted)} className="p-2">
            <Heart className={`w-6 h-6 ${isWishlisted ? "text-red-500 fill-current" : "text-gray-400"}`} />
          </button>
          <Share2 className="w-6 h-6 text-gray-900" />
        </div>
      </div>

      {/* Product Images */}
      <div className="px-4 py-6">
        <div className="mb-4">
          <Image
            src={productData.images[selectedImage] || "/placeholder.svg"}
            alt={productData.name}
            width={400}
            height={400}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto">
          {productData.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? "border-purple-600" : "border-gray-200"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productData.name} ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 pb-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{productData.name}</h2>
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(productData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({productData.reviews} reviews)</span>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <span className="text-3xl font-bold text-purple-600">₦{productData.price.toLocaleString()}</span>
            <span className="text-lg text-gray-400 line-through">₦{productData.originalPrice.toLocaleString()}</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">20% OFF</span>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
          <div className="flex space-x-2">
            {productData.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedSize === size
                    ? "border-purple-600 bg-purple-50 text-purple-600"
                    : "border-gray-200 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
          <div className="flex space-x-2">
            {productData.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedColor === color
                    ? "border-purple-600 bg-purple-50 text-purple-600"
                    : "border-gray-200 text-gray-700"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <span className="text-sm text-gray-600">{productData.stockCount} in stock</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
          <p className="text-gray-600 leading-relaxed">{productData.description}</p>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
          <ul className="space-y-2">
            {productData.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent">
            Add to Wishlist
          </Button>
          <Link href={`/cart?add=${productData.id}&quantity=${quantity}&size=${selectedSize}&color=${selectedColor}`}>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Add to Cart</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
