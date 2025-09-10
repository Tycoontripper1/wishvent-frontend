"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SuccessModal from "@/components/success-modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import Image from "next/image";
import { DeliveryDetails } from "@/constants/interface";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("flutterwave");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
  });

  // Get cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = useSelector((state: RootState) => state.cart.total);

  // Delivery infos from localStorage (client-side only)
  const [deliveryInfos, setDeliveryInfos] = useState<DeliveryDetails | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("wishlistDetails");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDeliveryInfos(parsed.deliveryDetails || null);
      } catch (err) {
        console.error("Failed to parse wishlistDetails", err);
      }
    }
  }, []);

  const [senderInfo, setSenderInfo] = useState({
    fullName: "",
    email: "",
  });

  // Calculate order summary based on cart data
  const orderSummary = {
    subTotal: cartTotal,
    shippingFee: 2500,
    serviceCharge: 1000,
    total: cartTotal + 2500 + 1000,
  };

  // Validate form fields
  const validateForm = () => {
    const errors = { fullName: "", email: "" };
    let isValid = true;

    if (!senderInfo.fullName.trim()) {
      errors.fullName = "Full name is required";
      isValid = false;
    }

    if (!senderInfo.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(senderInfo.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 3000);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push("/");
  };

  const isFormValid =
    senderInfo.fullName.trim() &&
    senderInfo.email.trim() &&
    /\S+@\S+\.\S+/.test(senderInfo.email);

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
        {/* Order Items Summary */}
        {cartItems.length > 0 && (
          <Card className="bg-white border border-gray-200 rounded-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Order Items ({cartItems.length})
              </h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-2 border border-gray-100 rounded-lg"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-primaryColor font-semibold">
                          ₦{item.price.toLocaleString()}
                        </span>
                        <span className="text-gray-600 text-sm">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sender's Information */}
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Sender's Information <span className="text-red-500">*</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={senderInfo.fullName}
                  onChange={(e) =>
                    setSenderInfo({ ...senderInfo, fullName: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full"
                  required
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  value={senderInfo.email}
                  onChange={(e) =>
                    setSenderInfo({ ...senderInfo, email: e.target.value })
                  }
                  placeholder="Enter your email address"
                  className="w-full"
                  type="email"
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Delivery Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  value={deliveryInfos?.fullName || ""}
                  className="w-full bg-gray-100"
                  readOnly
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  value={deliveryInfos?.email || ""}
                  className="w-full bg-gray-100"
                  readOnly
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Input
                  value={deliveryInfos?.phone || ""}
                  className="w-full bg-gray-100"
                  readOnly
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <Input
                  value={deliveryInfos?.address || ""}
                  className="w-full bg-gray-100"
                  readOnly
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-4">
              Payment Information
            </h3>

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
                    className="custom-radio"
                  />
                  <label
                    htmlFor="flutterwave"
                    className="flex-1 flex items-center justify-between"
                  >
                    <span className="font-medium">Flutterwave</span>
                    <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                      Flutterwave
                    </div>
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
                    className="custom-radio"
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
          disabled={isProcessing || !isFormValid}
          className="w-full bg-primaryColor hover:bg-primaryColor/70 text-white py-4 rounded-lg font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isProcessing
            ? "Processing..."
            : `Pay ₦${orderSummary.total.toLocaleString()}.00`}
        </Button>
      </div>

      <div className="h-20"></div>

      <SuccessModal isOpen={showSuccessModal} onClose={handleModalClose} />

      {cartItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Add some items to your cart before checkout
            </p>
            <Link href="/wishlist/details">
              <Button className="bg-primaryColor hover:bg-purple-700 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
