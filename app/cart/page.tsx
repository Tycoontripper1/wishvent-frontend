// "use client"

// import { useState } from "react"
// import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import Image from "next/image"
// import Link from "next/link"

// const initialCartItems = [
//   {
//     id: 1,
//     name: "Men's Harrington Jacket",
//     price: 24000,
//     size: "M",
//     color: "Khaki",
//     quantity: 1,
//     image: "/placeholder.svg?height=80&width=80&text=Jacket",
//   },
//   {
//     id: 2,
//     name: "Nike Air Max 270",
//     price: 25000,
//     size: "42",
//     color: "White",
//     quantity: 1,
//     image: "/placeholder.svg?height=80&width=80&text=Shoes",
//   },
//   {
//     id: 3,
//     name: "Premium Leather Jacket",
//     price: 45000,
//     size: "L",
//     color: "Black",
//     quantity: 1,
//     image: "/placeholder.svg?height=80&width=80&text=Leather",
//   },
// ]

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState(initialCartItems)

//   const updateQuantity = (id: number, change: number) => {
//     setCartItems((items) =>
//       items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
//     )
//   }

//   const removeItem = (id: number) => {
//     setCartItems((items) => items.filter((item) => item.id !== id))
//   }

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   const shipping = 2500
//   const total = subtotal + shipping

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
//         <div className="flex items-center space-x-4">
//           <Link href="/wishlist/details">
//             <ArrowLeft className="w-6 h-6 text-gray-900" />
//           </Link>
//           <div>
//             <h1 className="text-lg font-semibold text-gray-900">Cart Items</h1>
//             <p className="text-sm text-gray-500">{cartItems.length} items</p>
//           </div>
//         </div>
//         <Button variant="ghost" className="text-red-600">
//           Remove
//         </Button>
//       </div>

//       {/* Cart Items */}
//       <div className="px-4 py-6 space-y-4">
//         {cartItems.map((item) => (
//           <Card key={item.id} className="bg-white rounded-lg shadow-sm">
//             <CardContent className="p-4">
//               <div className="flex space-x-4">
//                 <Image
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.name}
//                   width={80}
//                   height={80}
//                   className="w-20 h-20 object-cover rounded-lg"
//                 />

//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
//                   <div className="flex space-x-4 text-sm text-gray-600 mb-2">
//                     <span>Size: {item.size}</span>
//                     <span>Color: {item.color}</span>
//                   </div>
//                   <p className="font-bold text-purple-600 mb-3">₦{item.price.toLocaleString()}</p>

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <button
//                         onClick={() => updateQuantity(item.id, -1)}
//                         className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
//                         disabled={item.quantity <= 1}
//                       >
//                         <Minus className="w-4 h-4" />
//                       </button>
//                       <span className="font-semibold">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, 1)}
//                         className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
//                       >
//                         <Plus className="w-4 h-4" />
//                       </button>
//                     </div>

//                     <button onClick={() => removeItem(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Order Summary */}
//       <div className="px-4 py-6">
//         <Card className="bg-white rounded-lg shadow-sm">
//           <CardContent className="p-4">
//             <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

//             <div className="space-y-3 mb-4">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Shipping</span>
//                 <span className="font-semibold">₦{shipping.toLocaleString()}</span>
//               </div>
//               <div className="border-t pt-3">
//                 <div className="flex justify-between">
//                   <span className="text-lg font-semibold text-gray-900">Total</span>
//                   <span className="text-xl font-bold text-purple-600">₦{total.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>

//             <Link href="/checkout">
//               <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold text-lg">
//                 Checkout
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Continue Shopping */}
//       <div className="px-4 pb-8">
//         <Link href="/wishlist">
//           <Button
//             variant="outline"
//             className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 py-3 bg-transparent"
//           >
//             Continue Shopping
//           </Button>
//         </Link>
//       </div>
//     </div>
//   )
// }
"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();
  const handleUpdateQuantity = (id: number, change: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 2500;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="bg-white px-4 py-4 w-full flex items-center border-b border-gray-200">
          {/* <Link href="/wishlist/details">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </Link> */}
          <button onClick={() => router.back()} aria-label="Go back">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>

          <h1 className="text-lg font-semibold text-gray-900 ml-4">
            Cart Items
          </h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/wishlist/details">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <Link href="/wishlist/details">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Cart Items</h1>
            <p className="text-sm text-gray-500">{cartItems.length} items</p>
          </div>
        </div>
        <Button variant="ghost" className="text-red-600">
          Remove
        </Button>
      </div>

      {/* Cart Items */}
      <div className="px-4 py-6 space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="font-bold text-purple-600 mb-3">
                    ₦{item.price.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="px-4 py-6">
        <Card className="bg-white rounded-lg shadow-sm">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  ₦{shipping.toLocaleString()}
                </span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-purple-600">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold text-lg">
                Checkout
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Continue Shopping */}
      <div className="px-4 pb-8">
        <Link href="/wishlist/details">
          <Button
            variant="outline"
            className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 py-3 bg-transparent"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
