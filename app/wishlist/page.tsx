"use client";
import {
  ArrowLeft,
  Search,
  MoreVertical,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const wishlistItems = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: "₦23,000.00",
    image: "/placeholder.svg?height=80&width=80&text=Sony+Headphones",
    status: "available", // available, reserved, purchased
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: "₦23,000.00",
    image: "/placeholder.svg?height=80&width=80&text=Sony+Headphones",
    status: "available",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: "₦23,000.00",
    image: "/placeholder.svg?height=80&width=80&text=Sony+Headphones",
    status: "reserved",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: "₦23,000.00",
    image: "/placeholder.svg?height=80&width=80&text=Sony+Headphones",
    status: "purchased",
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: "₦23,000.00",
    image: "/placeholder.svg?height=80&width=80&text=Sony+Headphones",
    status: "available",
  },
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 text-gray-900" />
          <MoreVertical className="w-6 h-6 text-gray-900" />
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="px-4 py-6">
        {/* Title and Description */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Ted's Birthday Wishlist
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Here is a list of Ted's wish kindly select items and make purchase.
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <Card
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900 mb-3">
                      {item.price}
                    </p>

                    {/* Status or Action Button */}
                    {item.status === "available" && (
                      <Link href={`/wishlist/item/${item.id}`}>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium">
                          View Item
                        </Button>
                      </Link>
                    )}

                    {item.status === "reserved" && (
                      <div className="flex items-center space-x-2 py-2.5">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span className="text-orange-600 font-medium">
                          Item Reserved
                        </span>
                      </div>
                    )}

                    {item.status === "purchased" && (
                      <div className="flex items-center space-x-2 py-2.5">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-600 font-medium">
                          Item Purchased
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
}
