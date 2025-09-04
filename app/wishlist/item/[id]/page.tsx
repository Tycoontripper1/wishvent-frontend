// "use client";

// import { useEffect, useState } from "react";
// import { ArrowLeft, Heart, Share2, Star, Plus, Minus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { addItem, clearCart } from "@/store/cartSlice";
// import { useParams } from "next/navigation";
// import { useGetSingleWishlist } from "@/services/wishlist";
// import { WishlistDetails } from "@/constants/interface";

// const productData = {
//   id: 1,
//   name: "Men's Harrington Jacket",
//   price: 24000,
//   originalPrice: 30000,
//   rating: 4.5,
//   reviews: 128,
//   images: [
//     "/placeholder.svg?height=400&width=400&text=Jacket+Front",
//     "/placeholder.svg?height=400&width=400&text=Jacket+Back",
//     "/placeholder.svg?height=400&width=400&text=Jacket+Side",
//   ],
//   description:
//     "This is the perfect jacket for any occasion. Made with premium materials and designed for comfort and style. Perfect for casual outings or semi-formal events.",
//   features: [
//     "Premium cotton blend fabric",
//     "Water-resistant coating",
//     "Multiple pockets",
//     "Adjustable cuffs",
//     "Machine washable",
//   ],
//   sizes: ["S", "M", "L", "XL", "XXL"],
//   colors: ["Khaki", "Navy", "Black", "Olive"],
//   inStock: true,
//   stockCount: 15,
// };

// export default function ProductDetailPage() {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedSize, setSelectedSize] = useState("M");
//   const [selectedColor, setSelectedColor] = useState("Khaki");
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(true);
//   const dispatch = useDispatch();
//   const [item, setItem] = useState<any>(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("selectedItem");
//     if (stored) setItem(JSON.parse(stored));
//   }, []);

//   const handleAddToCart = () => {
//     dispatch(
//       addItem({
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         image: item?.images[0],
//         quantity: quantity,
//         // size: selectedSize,
//         // color: selectedColor,
//       })
//     );
//   };

//   const handlePurchaseNow = () => {
//     // Clear cart and add only this item for direct checkout
//     dispatch(clearCart());
//     dispatch(
//       addItem({
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         image: item.images[0],
//         quantity: quantity,
//         // size: selectedSize,
//         // color: selectedColor,
//       })
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
//         <Link href="/wishlist/details">
//           <ArrowLeft className="w-6 h-6 text-gray-900" />
//         </Link>
//         <h1 className="text-lg font-semibold text-gray-900">Product Details</h1>
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={() => setIsWishlisted(!isWishlisted)}
//             className="p-2"
//           >
//             <Heart
//               className={`w-6 h-6 ${
//                 isWishlisted ? "text-red-500 fill-current" : "text-gray-400"
//               }`}
//             />
//           </button>
//           <Share2 className="w-6 h-6 text-gray-900" />
//         </div>
//       </div>

//       {/* Product Images */}
//       <div className="px-4 py-6">
//         <div className="mb-4">
//           <Image
//             src={productData.images[selectedImage] || "/placeholder.svg"}
//             alt={productData.name}
//             width={400}
//             height={400}
//             className="w-full h-80 object-cover rounded-lg"
//           />
//         </div>

//         <div className="flex space-x-2 overflow-x-auto">
//           {productData.images.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedImage(index)}
//               className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
//                 selectedImage === index
//                   ? "border-purple-600"
//                   : "border-gray-200"
//               }`}
//             >
//               <Image
//                 src={image || "/placeholder.svg"}
//                 alt={`${item?.name} ${index + 1}`}
//                 width={64}
//                 height={64}
//                 className="w-full h-full object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="px-4 pb-6">
//         <div className="mb-4">
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
//           <div className="flex items-center space-x-2 mb-3">
//             <div className="flex items-center">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < Math.floor(productData.rating)
//                       ? "text-yellow-400 fill-current"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//             <span className="text-sm text-gray-600">
//               ({productData.reviews} reviews)
//             </span>
//           </div>

//           <div className="flex items-center space-x-3 mb-4">
//             <span className="text-3xl font-bold text-purple-600">
//               ₦{item.price.toLocaleString()}
//             </span>
//             <span className="text-lg text-gray-400 line-through">
//               ₦{item.originalPrice.toLocaleString()}
//             </span>
//             <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
//               20% OFF
//             </span>
//           </div>
//         </div>

//         {/* Size Selection */}
//         <div className="mb-6">
//           <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
//           <div className="flex space-x-2">
//             {productData.sizes.map((size) => (
//               <button
//                 key={size}
//                 onClick={() => setSelectedSize(size)}
//                 className={`px-4 py-2 rounded-lg border ${
//                   selectedSize === size
//                     ? "border-purple-600 bg-purple-50 text-purple-600"
//                     : "border-gray-200 text-gray-700"
//                 }`}
//               >
//                 {size}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Color Selection */}
//         <div className="mb-6">
//           <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
//           <div className="flex space-x-2">
//             {productData.colors.map((color) => (
//               <button
//                 key={color}
//                 onClick={() => setSelectedColor(color)}
//                 className={`px-4 py-2 rounded-lg border ${
//                   selectedColor === color
//                     ? "border-purple-600 bg-purple-50 text-purple-600"
//                     : "border-gray-200 text-gray-700"
//                 }`}
//               >
//                 {color}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Quantity */}
//         <div className="mb-6">
//           <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
//               >
//                 <Minus className="w-4 h-4" />
//               </button>
//               <span className="font-semibold text-lg">{quantity}</span>
//               <button
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
//               >
//                 <Plus className="w-4 h-4" />
//               </button>
//             </div>
//             <span className="text-sm text-gray-600">
//               {productData.stockCount} in stock
//             </span>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
//           <p className="text-gray-600 leading-relaxed">
//             {productData.description}
//           </p>
//         </div>

//         {/* Features */}
//         <div className="mb-8">
//           <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
//           <ul className="space-y-2">
//             {productData.features.map((feature, index) => (
//               <li key={index} className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
//                 <span className="text-gray-600">{feature}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Actions */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
//         <div className="grid grid-cols-2 gap-3">
//           <Link href="/checkout">
//             <Button
//               onClick={handlePurchaseNow}
//               className="w-full bg-green-600 hover:bg-green-700 text-white"
//             >
//               Buy Now
//             </Button>
//           </Link>
//           <Link href="/cart">
//             <Button
//               onClick={handleAddToCart}
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//             >
//               Add to Cart
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Zap,
  Shield,
  Truck,
  Undo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItem, clearCart } from "@/store/cartSlice";
import { useParams } from "next/navigation";
import { useGetSingleWishlist } from "@/services/wishlist";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Khaki");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const dispatch = useDispatch();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
  };

  useEffect(() => {
    const stored = localStorage.getItem("selectedItem");
    if (stored) {
      setItem(JSON.parse(stored));
    } else {
      // fallback data
      setItem({
        id: 1,
        name: "Men's Harrington Jacket",
        price: 24000,
        originalPrice: 30000,
        description:
          "This is the perfect jacket for any occasion. Made with premium materials and designed for comfort and style.",
        features: [
          "Premium cotton blend fabric",
          "Water-resistant coating",
          "Multiple pockets",
          "Adjustable cuffs",
          "Machine washable",
        ],
      });
    }
    setLoading(false);
  }, []);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: "/placeholder.svg",
        quantity: quantity,
      })
    );

    setNotificationMessage("Item added to cart!");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handlePurchaseNow = () => {
    dispatch(clearCart());
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: "/placeholder.svg",
        quantity: quantity,
      })
    );
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    setNotificationMessage(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist!"
    );
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down">
          <div className="flex items-center">
            <Check className="w-5 h-5 mr-2" />
            {notificationMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <Link href="/wishlist/details">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-gray-900">Product Details</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlistToggle}
            className="rounded-full"
          >
            <Heart
              className={`w-6 h-6 ${
                isWishlisted ? "text-red-500 fill-current" : "text-gray-600"
              }`}
            />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share2 className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto pb-24">
        {/* Product Images */}
        <div className="px-4 py-6">
          <div className="mb-4 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={"/placeholder.svg?height=500&width=500&text=Product+Image"}
              alt={item.name}
              width={500}
              height={500}
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="flex space-x-3 overflow-x-auto pb-2">
            {[1, 2, 3].map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-purple-600 shadow-md"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={
                    "/placeholder.svg?height=80&width=80&text=Thumb+" +
                    (index + 1)
                  }
                  alt={`${item.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                20% OFF
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(128 reviews)</span>
            </div>

            <div className="flex items-end space-x-3 mb-6">
              <span className="text-3xl font-bold text-purple-600">
                ₦{item.price?.toLocaleString()}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ₦{item.price?.toLocaleString()}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {productData.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Select Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border ${
                      selectedSize === size
                        ? "border-purple-600 bg-purple-50 text-purple-600 font-semibold"
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
              <h3 className="font-semibold text-gray-900 mb-3">Select Color</h3>
              <div className="grid grid-cols-4 gap-2">
                {["Khaki", "Navy", "Black", "Olive"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`py-3 rounded-lg border ${
                      selectedColor === color
                        ? "border-purple-600 bg-purple-50 text-purple-600 font-semibold"
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
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-lg w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">15 in stock</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Why Shop With Us
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Undo className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm">Easy Returns</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-sm">Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* You Might Also Like */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">
              You Might Also Like
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((item) => (
                <div key={item} className="border rounded-xl overflow-hidden">
                  <Image
                    src={
                      "/placeholder.svg?height=120&width=120&text=Related+" +
                      item
                    }
                    alt="Related product"
                    width={120}
                    height={120}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Related Product {item}
                    </p>
                    <p className="text-sm font-bold text-purple-600">
                      ₦{(15000 + item * 5000).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="h-12 border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
          <Link href="/checkout">
            <Button
              onClick={handlePurchaseNow}
              className="h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              Buy Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
