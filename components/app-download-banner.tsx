"use client";

import { useState } from "react";
import { X, Smartphone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppDownloadBannerProps {
  themeColor?: string;
  onDismiss: () => void;
}

export default function AppDownloadBanner({
  themeColor = "#821890",
  onDismiss,
}: AppDownloadBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  const handleDownload = () => {
    const isIOS = /iphone|ipad|ipod/i.test(
      typeof navigator !== "undefined" ? navigator.userAgent : ""
    );
    const url = isIOS
      ? "https://apps.apple.com/app/wishvent"
      : "https://play.google.com/store/apps/details?id=com.b_laj.wishvent2";
    window.open(url, "_blank");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
        onClick={handleDismiss}
      />

      {/* Bottom sheet banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out`}
        style={{ transform: isVisible ? "translateY(0)" : "translateY(100%)" }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close banner"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="px-6 pb-8 pt-4">
          {/* Icon + heading */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{ backgroundColor: themeColor }}
            >
              <Smartphone className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                You&apos;re viewing on WishVent
              </p>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">
                Get the full experience
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Create wishlists, buy gifts & track events in the app.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-5" />

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleDownload}
              className="w-full h-12 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm"
              style={{ backgroundColor: themeColor }}
            >
              <ExternalLink className="w-4 h-4" />
              Download the App
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="w-full h-12 font-semibold rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Continue Here
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
