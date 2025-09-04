"use client";

import { useState } from "react";
import { ArrowLeft, Share2, MoreVertical, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart } from "@/store/cartSlice";
// import { RootState } from "@/lib/redux/store";

const wishlistItems = [
  {
    id: 1,
    name: "Nike Air Max 270 Running Shoes",
    price: 25000,
    originalPrice: 30000,
    image: "/placeholder.svg?height=80&width=80&text=Nike+Shoes",
    description: "Comfortable running shoes with air cushioning",
    inStock: true,
    quantity: 1,
  },
  {
    id: 2,
    name: "Premium Leather Jacket",
    price: 45000,
    originalPrice: 55000,
    image: "/placeholder.svg?height=80&width=80&text=Leather+Jacket",
    description: "Genuine leather jacket with premium finish",
    inStock: true,
    quantity: 1,
  },
  {
    id: 3,
    name: "Sony WH-1000XM4 Headphones",
    price: 15000,
    originalPrice: 18000,
    image: "/placeholder.svg?height=80&width=80&text=Headphones",
    description: "Noise cancelling wireless headphones",
    inStock: false,
    quantity: 1,
  },
  {
    id: 4,
    name: "Rolex Submariner Watch",
    price: 85000,
    originalPrice: 95000,
    image: "/placeholder.svg?height=80&width=80&text=Watch",
    description: "Luxury diving watch with automatic movement",
    inStock: true,
    quantity: 1,
  },
];

export default function WishlistDetailsPage() {
  const [items, setItems] = useState(wishlistItems);
  const dispatch = useDispatch();
  // const cartItems = useSelector((state: RootState) => state.cart.items);

  const updateQuantity = (id: number, change: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleAddToCart = (item: any) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })
    );
  };

  const handlePurchaseItem = (item: any) => {
    // Clear cart and add only this item for direct checkout
    dispatch(clearCart());
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })
    );
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      if (item.inStock) {
        dispatch(
          addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          })
        );
      }
    });
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 px-4 py-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-4">
          <Link href="/wishlist">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Ted's Birthday Wishlist</h1>
            <p className="text-sm text-purple-200">4 items</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Share2 className="w-6 h-6" />
          <MoreVertical className="w-6 h-6" />
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="px-4 py-6 space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <Link href={`/wishlist/item/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>

                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-bold text-purple-600">
                      ₦{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₦{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                      >
                        Remove
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        disabled={!item.inStock}
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                      <Link href="/checkout">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={!item.inStock}
                          onClick={() => handlePurchaseItem(item)}
                        >
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <div className="px-4 py-6 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">
            Total Wishlist Value
          </span>
          <span className="text-2xl font-bold text-purple-600">
            ₦{totalAmount.toLocaleString()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
          >
            Purchase All
          </Button>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleAddAllToCart}
          >
            Add All to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
