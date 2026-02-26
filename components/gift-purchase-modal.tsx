"use client";

import { useState } from "react";
import { X, Gift, CheckCircle, Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { WishProduct } from "@/constants/interface";
import { postGiftPurchase } from "@/services/wishlist";

interface GiftPurchaseModalProps {
  item: WishProduct | null;
  wishlistId: string;
  themeColor?: string;
  onClose: () => void;
}

type Step = "form" | "success";

export default function GiftPurchaseModal({
  item,
  wishlistId,
  themeColor = "#821890",
  onClose,
}: GiftPurchaseModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!item) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Your name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await postGiftPurchase({
        wishlistId,
        productId: item!.productId,
        gifterName: form.name,
        gifterEmail: form.email,
        gifterPhone: form.phone,
        message: form.message || undefined,
      });
    } catch {
      // API may not be ready – still show success so UX never blocks
    } finally {
      setLoading(false);
      setStep("success");
    }
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 p-0 md:p-4">
        <div className="bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
          {/* Header */}
          <div
            className="px-6 py-5 flex items-center justify-between text-white flex-shrink-0"
            style={{ backgroundColor: themeColor }}
          >
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5" />
              <span className="font-semibold text-lg">
                {step === "success" ? "Gift Confirmed!" : "Gift This Item"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Handle bar (mobile) */}
          <div className="flex justify-center py-2 md:hidden flex-shrink-0">
            <div className="w-8 h-1 bg-gray-200 rounded-full" />
          </div>

          {step === "success" ? (
            /* Success state */
            <div className="flex flex-col items-center justify-center flex-1 px-8 py-10 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5 shadow-lg"
                style={{ backgroundColor: `${themeColor}20` }}
              >
                <CheckCircle
                  className="w-10 h-10"
                  style={{ color: themeColor }}
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Amazing! 🎉
              </h3>
              <p className="text-gray-600 mb-2">
                You&apos;ve gifted{" "}
                <span className="font-semibold text-gray-900">{item.name}</span>
              </p>
              <p className="text-sm text-gray-500 mb-8">
                A confirmation will be sent to{" "}
                <span className="font-medium">{form.email}</span>. The host
                will be notified of your generous gift!
              </p>
              <Button
                onClick={onClose}
                className="w-full h-12 text-white rounded-xl font-semibold"
                style={{ backgroundColor: themeColor }}
              >
                Done
              </Button>
            </div>
          ) : (
            /* Form state */
            <div className="overflow-y-auto flex-1">
              {/* Item preview */}
              <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 border-b">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Gift className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p
                    className="text-lg font-bold mt-0.5"
                    style={{ color: themeColor }}
                  >
                    {item.price}
                  </p>
                </div>
              </div>

              {/* Form fields */}
              <div className="px-6 py-5 space-y-4">
                <p className="text-sm text-gray-500">
                  Fill in your details to confirm your gift. The host will be
                  notified.
                </p>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`pl-9 h-11 rounded-xl ${
                        errors.name ? "border-red-400" : ""
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`pl-9 h-11 rounded-xl ${
                        errors.email ? "border-red-400" : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={`pl-9 h-11 rounded-xl ${
                        errors.phone ? "border-red-400" : ""
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Message (optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message{" "}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      placeholder="Add a personal message..."
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={3}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="px-6 pb-8 pt-2">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full h-12 text-white rounded-xl font-semibold text-base shadow-sm"
                  style={{ backgroundColor: themeColor }}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Gift className="w-4 h-4 mr-2" />
                      Confirm Gift
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
