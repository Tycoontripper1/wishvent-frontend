"use client"

import { useState } from "react"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import SuccessModal from "@/components/success-modal"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("flutterwave")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSenderInfo, setShowSenderInfo] = useState(true)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Form data
  const [senderInfo, setSenderInfo] = useState({
    fullName: "Olamide Yomi",
    email: "olamide@gmail.com",
  })

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "Ayomide Bright",
    email: "ayomide@gmail.com",
    phone: "+234701093843",
    address: "05 Westhall Rd, Santa Ilorin",
  })

  const orderSummary = {
    subTotal: 23000,
    shippingFee: 2500,
    serviceCharge: 1000,
    total: 26500,
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowSuccessModal(true)
    }, 3000)
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    // Redirect to home or order history
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Add Your Information - Collapsible */}
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-0">
            <button
              onClick={() => setShowSenderInfo(!showSenderInfo)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <span className="font-semibold text-gray-900">Add Your Information</span>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${showSenderInfo ? "rotate-90" : ""}`}
              />
            </button>
          </CardContent>
        </Card>

        {/* Sender's Information */}
        {showSenderInfo && (
          <Card className="bg-white border border-gray-200 rounded-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Sender's Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    value={senderInfo.fullName}
                    onChange={(e) => setSenderInfo({ ...senderInfo, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    value={senderInfo.email}
                    onChange={(e) => setSenderInfo({ ...senderInfo, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Delivery Information */}
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Delivery Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input
                  value={deliveryInfo.fullName}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, fullName: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input
                  value={deliveryInfo.email}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <Input
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Information</h3>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Pay With</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="flutterwave"
                    name="payment"
                    value="flutterwave"
                    checked={paymentMethod === "flutterwave"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-purple-600"
                  />
                  <label htmlFor="flutterwave" className="flex-1 flex items-center justify-between">
                    <span className="font-medium">Flutterwave</span>
                    <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Flutterwave</div>
                  </label>
                </div>

                <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="paystack"
                    name="payment"
                    value="paystack"
                    checked={paymentMethod === "paystack"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-purple-600"
                  />
                  <label htmlFor="paystack" className="flex-1">
                    <span className="font-medium">Paystack</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Sub Total</span>
                  <span>₦{orderSummary.subTotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span>₦{orderSummary.shippingFee.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Charge</span>
                  <span>₦{orderSummary.serviceCharge.toLocaleString()}.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₦{orderSummary.total.toLocaleString()}.00</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold text-lg"
        >
          {isProcessing ? "Processing..." : "Make Payment"}
        </Button>
      </div>

      {/* Bottom spacing for fixed button */}
      <div className="h-20"></div>

      {/* Success Modal */}
      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />
    </div>
  )
}
