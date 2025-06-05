"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const tabs = [
  { id: "wishlist", label: "Wishlist", active: true },
  { id: "events", label: "Events", active: false },
  { id: "rsvp", label: "RSVP", active: false },
]

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("wishlist")

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-zilla font-bold text-primaryColor mb-4">About Us</h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 font-zilla max-w-2xl mx-auto leading-relaxed">
            Learn more about everything we have for you
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="bg-white rounded-[8px] p-1 shadow-lg border border-[#821890] inline-flex ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 md:px-8 md:py-4 rounded-[8px] text-sm md:text-base font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primaryColor text-white shadow-md"
                    : "text-gray-600 hover:text-primaryColor hover:bg-purple-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mobile App Showcase */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-300 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>

              {/* Phone mockup container */}
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                <Image
                  src="/images/mobile-app-mockup.png"
                  alt="WishVent Mobile App Interface"
                  width={400}
                  height={800}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
              </div>

              {/* Floating elements for desktop */}
              <div className="hidden lg:block">
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
                  ✓ Purchased
                </div>
                <div className="absolute -bottom-4 -left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  My Wishlist
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-zilla">Create Wishlist</h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 font-zilla">
                Transform your gift-giving experience with our intuitive wishlist platform. Whether it's birthdays,
                anniversaries, holidays, or special occasions, create and manage multiple wishlists effortlessly. Share
                with friends and family, track purchases, and never miss a perfect gift opportunity again.
              </p>
            </div>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primaryColor rounded-full"></div>
                <span className="text-gray-700">Multiple Wishlists</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primaryColor rounded-full"></div>
                <span className="text-gray-700">Easy Sharing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primaryColor rounded-full"></div>
                <span className="text-gray-700">Purchase Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primaryColor rounded-full"></div>
                <span className="text-gray-700">Event Management</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-primaryColor hover:bg-purple-700 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Download App
            </Button>
          </div>
        </div>

        {/* Additional Info Cards for Desktop/Tablet */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-16 lg:mt-20">
          <Card className="border-purple-100 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primaryColor text-xl">🎁</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Gifting</h4>
              <p className="text-sm text-gray-600">AI-powered gift recommendations based on preferences</p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primaryColor text-xl">📱</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Mobile First</h4>
              <p className="text-sm text-gray-600">Seamless experience across all your devices</p>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primaryColor text-xl">👥</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Social Sharing</h4>
              <p className="text-sm text-primaryColor">Connect with friends and family effortlessly</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
