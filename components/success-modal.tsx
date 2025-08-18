"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-8 mx-4 max-w-sm w-full shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center text-white hover:bg-purple-900 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Success Illustration */}
        <div className="text-center mb-6">
          <div className="relative mx-auto w-48 h-48 mb-4">
            {/* Mobile Phone */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-gradient-to-b from-purple-200 to-purple-300 rounded-2xl shadow-lg">
              {/* Phone Screen */}
              <div className="m-2 h-28 bg-white rounded-xl flex items-center justify-center">
                {/* Shopping Cart Icon */}
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Checkmark Badge */}
            <div className="absolute top-4 right-8 w-12 h-12 bg-cyan-400 rounded-xl shadow-lg flex items-center justify-center transform rotate-12">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Success Badge */}
            <div className="absolute bottom-8 left-4 w-16 h-16 bg-green-400 rounded-full shadow-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {/* Badge Ribbon */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-green-500 clip-path-ribbon"></div>
            </div>

            {/* Decorative Stars */}
            <div className="absolute top-2 left-8 text-yellow-400 text-lg animate-pulse">⭐</div>
            <div
              className="absolute bottom-4 right-2 text-yellow-400 text-sm animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              ⭐
            </div>
            <div
              className="absolute top-12 left-2 text-yellow-400 text-xs animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              ⭐
            </div>

            {/* Blue Circle Decoration */}
            <div className="absolute bottom-2 right-8 w-6 h-6 bg-blue-400 rounded-full opacity-80"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
            Your order has been placed successfully
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Thank you for choosing us! Feel free to Register to curate your wishlist and explore our products.
          </p>
        </div>

        {/* Done Button */}
        <Button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold text-lg"
        >
          Done
        </Button>
      </div>
    </div>
  )
}
