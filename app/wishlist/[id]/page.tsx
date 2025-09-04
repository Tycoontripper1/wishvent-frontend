"use client";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Gift,
  Sparkles,
  Heart,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useGetAllWishlists } from "@/services/wishlist";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { WishlistDetails } from "@/constants/interface";

export default function WishlistPage() {
  const { id } = useParams();
  const { data: wish, loading, error } = useGetAllWishlists(id as string);
  const wishlistItem: WishlistDetails | undefined = wish?.data?.details;
  const [copied, setCopied] = useState(false);

  // Save wish when it loads
  useEffect(() => {
    if (typeof window !== "undefined" && wishlistItem) {
      localStorage.setItem("wishlistDetails", JSON.stringify(wishlistItem));
    }
  }, [wishlistItem]);

  const handleShare = () => {
    // navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
        {/* <Card className="w-full max-w-md p-6 text-center">
          <div className="mx-auto bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <span className="text-2xl">😢</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Try Again
          </Button>
        </Card> */}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Wishlist</h1>
            <p className="text-xs text-gray-500">Share the joy of giving</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="flex items-center gap-2"
        >
          <Share2 size={16} />
          {copied ? "Copied!" : "Share"}
        </Button>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Gift size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">{wishlistItem?.title}</h1>
          <p className="text-lg opacity-90 mb-4">
            Here is a list of Ted&apos;s wishes. Select items to purchase and
            make their day special!
          </p>
          <div className="bg-white/10 p-4 rounded-lg inline-flex items-center gap-2">
            <Sparkles size={18} />
            <span className="text-sm">
              Every purchase brings joy and happiness
            </span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              {wishlistItem?.wishProducts.length}
            </p>
            <p className="text-xs text-gray-500">Total Items</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {
                wishlistItem?.wishProducts.filter(
                  (item) => item.status === "purchased"
                ).length
              }
            </p>
            <p className="text-xs text-gray-500">Purchased</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">
              {
                wishlistItem?.wishProducts.filter(
                  (item) => item.status === "reserved"
                ).length
              }
            </p>
            <p className="text-xs text-gray-500">Reserved</p>
          </div>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-orange-200 mb-8">
          <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="bg-orange-100 p-2 rounded-full">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Make someone's day special!</h3>
                <p className="text-sm text-gray-600">
                  Your purchase will bring joy and happiness
                </p>
              </div>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700 whitespace-nowrap">
              Create Your Own Wishlist
            </Button>
          </CardContent>
        </Card>

        {/* Wishlist Items */}
        <div className="space-y-6">
          {wishlistItem?.wishProducts.map((item) => (
            <Card
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div className="sm:w-48 h-48 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-2xl font-bold text-indigo-600 mb-4">
                      {item.price}
                    </p>
                    {/* <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description || "A wonderful gift that will be cherished for years to come."}
                    </p> */}

                    {/* Status */}
                    <div className="mt-6">
                      {/* {item.status === "wished" && ( */}
                      <Button
                        className="w-full sm:w-auto bg-primaryColor hover:bg-indigo-700"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            localStorage.setItem(
                              "selectedItem",
                              JSON.stringify(item)
                            );
                          }
                        }}
                      >
                        <Link
                          href={`/wishlist/item/${item.id}`}
                          className="flex items-center gap-2"
                        >
                          <Gift size={18} />
                          View Item
                        </Link>
                      </Button>
                      {/* )} */}

                      {item.status === "reserved" && (
                        <div className="flex items-center justify-center sm:justify-start space-x-2 py-3 px-4 bg-amber-50 text-amber-800 rounded-lg">
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">Item Reserved</span>
                        </div>
                      )}

                      {item.status === "purchased" && (
                        <div className="flex items-center justify-center sm:justify-start space-x-2 py-3 px-4 bg-green-50 text-green-800 rounded-lg">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Item Purchased</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-10 px-4">
          <CardContent>
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Create Your Own Wishlist
            </h2>
            <p className="mb-6 opacity-90">
              Let your friends and family know what you'd love to receive
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
