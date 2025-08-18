// "use client"

// import { useState } from "react"
// import { ArrowLeft, Search, MoreVertical, Heart } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import Image from "next/image"
// import Link from "next/link"

// const wishlistItems = [
//   {
//     id: 1,
//     name: "Nike Running Shoes",
//     price: "₦25,000.00",
//     image: "/placeholder.svg?height=120&width=120&text=Nike+Shoes",
//     category: "Footwear",
//   },
//   {
//     id: 2,
//     name: "Leather Jacket",
//     price: "₦45,000.00",
//     image: "/placeholder.svg?height=120&width=120&text=Leather+Jacket",
//     category: "Clothing",
//   },
//   {
//     id: 3,
//     name: "Wireless Headphones",
//     price: "₦15,000.00",
//     image: "/placeholder.svg?height=120&width=120&text=Headphones",
//     category: "Electronics",
//   },
//   {
//     id: 4,
//     name: "Designer Watch",
//     price: "₦85,000.00",
//     image: "/placeholder.svg?height=120&width=120&text=Watch",
//     category: "Accessories",
//   },
//   {
//     id: 5,
//     name: "Gaming Console",
//     price: "₦120,000.00",
//     image: "/placeholder.svg?height=120&width=120&text=Console",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Perfume Set",
//     price: "₦35,000.00",
//     image: "/placeholder.svg?height=120&width=120&text=Perfume",
//     category: "Beauty",
//   },
// ]

// export default function WishlistPage() {
//   const [searchQuery, setSearchQuery] = useState("")

//   const filteredItems = wishlistItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

//   return (
//     <div className="min-h-screen bg-purple">
//       {/* Header */}
//       <div className="bg-purple-600 px-4 py-4 flex items-center justify-between text-white">
//         <div className="flex items-center space-x-4">
//           <Link href="/">
//             <ArrowLeft className="w-6 h-6" />
//           </Link>
//           <div>
//             <h1 className="text-lg font-semibold">Wishlist</h1>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Search className="w-6 h-6" />
//           <MoreVertical className="w-6 h-6" />
//         </div>
//       </div>

//       {/* Wishlist Title */}
//       <div className="px-4 py-6 text-center">
//         <h2 className="text-2xl font-bold text-white mb-2">Ted's Birthday Wishlist</h2>
//         <p className="text-purple-200">6 items • Created 2 days ago</p>
//       </div>

//       {/* Search Bar */}
//       <div className="px-4 mb-6">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search wishlist items..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-0 focus:ring-2 focus:ring-purple-300 outline-none"
//           />
//         </div>
//       </div>

//       {/* Wishlist Items Grid */}
//       <div className="px-4 pb-8">
//         <div className="grid grid-cols-2 gap-4">
//           {filteredItems.map((item) => (
//             <Link key={item.id} href={`/wishlist/item/${item.id}`}>
//               <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//                 <CardContent className="p-4">
//                   <div className="relative mb-3">
//                     <Image
//                       src={item.image || "/placeholder.svg"}
//                       alt={item.name}
//                       width={120}
//                       height={120}
//                       className="w-full h-24 object-cover rounded-lg"
//                     />
//                     <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full">
//                       <Heart className="w-4 h-4 text-red-500 fill-current" />
//                     </button>
//                   </div>
//                   <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{item.name}</h3>
//                   <p className="text-xs text-gray-500 mb-2">{item.category}</p>
//                   <p className="font-bold text-purple-600">{item.price}</p>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Action */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
//         <Link href="/wishlist/details">
//           <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold text-lg">
//             View Full Wishlist
//           </Button>
//         </Link>
//       </div>
//     </div>
//   )
// }
"use client"
import { ArrowLeft, Search, MoreVertical, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

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
]

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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ted's Birthday Wishlist</h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Here is a list of Ted's wish kindly select items and make purchase.
          </p>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
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
                    <h3 className="font-semibold text-gray-900 mb-2 leading-tight">{item.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mb-3">{item.price}</p>

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
                        <span className="text-orange-600 font-medium">Item Reserved</span>
                      </div>
                    )}

                    {item.status === "purchased" && (
                      <div className="flex items-center space-x-2 py-2.5">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-600 font-medium">Item Purchased</span>
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
  )
}
