"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ArrowLeft,
  Share2,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Gift,
  User,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  CalendarCheck,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetAllWishlists } from "@/services/wishlist";
import { WishlistDetails, WishProduct } from "@/constants/interface";
import AppDownloadBanner from "@/components/app-download-banner";
import GiftPurchaseModal from "@/components/gift-purchase-modal";
import RSVPModal from "@/components/rsvp-modal";

// ─── Countdown hook ──────────────────────────────────────────────────────────
function useCountdown(targetDate: string | undefined) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    if (!targetDate) return;
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, minutes, seconds, expired: false });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-1.5 shadow-inner">
        <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-white/80 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    wished: { label: "Available", cls: "bg-green-100 text-green-700 border-green-200" },
    reserved: { label: "Reserved", cls: "bg-amber-100 text-amber-700 border-amber-200" },
    purchased: { label: "Purchased", cls: "bg-gray-100 text-gray-500 border-gray-200" },
  };
  const { label, cls } = map[status] ?? map.wished;
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      {label}
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
const THEME_COLOR = "#821890";

export default function EventGuestViewPage() {
  const { id } = useParams();
  const { data: wish, loading, error } = useGetAllWishlists(id as string);
  const wishlistItem: WishlistDetails | undefined = wish?.data?.details;

  // State
  const [showBanner, setShowBanner] = useState(true);
  const [selectedItem, setSelectedItem] = useState<WishProduct | null>(null);
  const [showRSVP, setShowRSVP] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedLocally, setSavedLocally] = useState(false);

  // Save to local storage once loaded
  useEffect(() => {
    if (typeof window !== "undefined" && wishlistItem && !savedLocally) {
      localStorage.setItem("wishlistDetails", JSON.stringify(wishlistItem));
      setSavedLocally(true);
    }
  }, [wishlistItem, savedLocally]);

  // Countdown
  const countdown = useCountdown(wishlistItem?.expirationDate);

  // Share
  const handleShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({
          title: wishlistItem?.title ?? "WishVent Event",
          text: `Check out this event wishlist on WishVent!`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  }, [wishlistItem]);

  // ─── Loading ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center px-6">
          <div
            className="w-16 h-16 rounded-full border-4 border-t-transparent animate-spin mx-auto mb-5"
            style={{ borderColor: `${THEME_COLOR}40`, borderTopColor: THEME_COLOR }}
          />
          <p className="text-lg font-semibold text-gray-700">Loading event...</p>
          <p className="text-sm text-gray-400 mt-1">
            Please wait while we fetch the details
          </p>
        </div>
      </div>
    );
  }

  // ─── Error ──────────────────────────────────────────────────────────────
  if (error || !wishlistItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 px-6">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-9 h-9 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Event Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            This wishlist may have expired or the link is incorrect.
          </p>
          <a
            href="https://wishvent.app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shadow-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: THEME_COLOR }}
          >
            <ExternalLink className="w-4 h-4" />
            Visit WishVent
          </a>
        </div>
      </div>
    );
  }

  // ─── Derived data ──────────────────────────────────────────────────────
  const hostName =
    wishlistItem.deliveryDetails?.fullName ||
    wishlistItem.deliveryDetails?.email ||
    "The Host";

  const products = wishlistItem.wishProducts || [];
  const totalItems = products.length;
  const purchasedCount = products.filter(
    (p) => p.status === "purchased"
  ).length;
  const availableCount = products.filter(
    (p) => p.status === "wished"
  ).length;

  const formattedDate = wishlistItem.expirationDate
    ? new Date(wishlistItem.expirationDate).toLocaleDateString("en-NG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      {/* ── App Download Banner ─────────────────────────────────────────── */}
      {showBanner && (
        <AppDownloadBanner
          themeColor={THEME_COLOR}
          onDismiss={() => setShowBanner(false)}
        />
      )}

      {/* ── Gift Purchase Modal ─────────────────────────────────────────── */}
      {selectedItem && (
        <GiftPurchaseModal
          item={selectedItem}
          wishlistId={wishlistItem.id}
          themeColor={THEME_COLOR}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* ── RSVP Modal ──────────────────────────────────────────────────── */}
      {showRSVP && (
        <RSVPModal
          eventTitle={wishlistItem.title}
          wishlistId={wishlistItem.id}
          themeColor={THEME_COLOR}
          onClose={() => setShowRSVP(false)}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* ── Sticky Header ──────────────────────────────────────────────── */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Button>
            </Link>
            <div className="text-center flex-1 px-3">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                WishVent Event
              </p>
              <h1 className="text-sm font-bold text-gray-900 truncate">
                {wishlistItem.title}
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-purple-50"
              onClick={handleShare}
              title="Share"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Share2 className="w-5 h-5 text-gray-700" />
              )}
            </Button>
          </div>
        </header>

        {/* ── Hero Section ───────────────────────────────────────────────── */}
        <div
          className="relative"
          style={{
            background: `linear-gradient(135deg, ${THEME_COLOR}, #b83cc7)`,
          }}
        >
          {/* Event poster */}
          {wishlistItem.image ? (
            <div className="relative h-56 sm:h-72 overflow-hidden">
              <Image
                src={wishlistItem.image}
                alt={wishlistItem.title}
                fill
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
            </div>
          ) : (
            <div className="h-10" />
          )}

          {/* Overlay content */}
          <div
            className={`${wishlistItem.image ? "absolute inset-0" : ""} flex flex-col justify-end px-5 pb-8 pt-6`}
          >
            <div className="max-w-3xl mx-auto w-full">
              {/* Category badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold uppercase tracking-wide mb-3">
                <Sparkles className="w-3 h-3" />
                {wishlistItem.status === "public" ? "Public Event" : "Private Event"}
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight">
                {wishlistItem.title}
              </h2>
              {wishlistItem.description && (
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mt-1 mb-4 line-clamp-2">
                  {wishlistItem.description}
                </p>
              )}

              {/* Host pill */}
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 w-fit">
                <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white text-xs font-medium">
                  Hosted by <span className="font-bold">{hostName}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Strip ────────────────────────────────────────────────── */}
        <div className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-3xl mx-auto px-4 py-3 grid grid-cols-3 gap-2 text-center">
            <div>
              <p
                className="text-xl font-bold"
                style={{ color: THEME_COLOR }}
              >
                {totalItems}
              </p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Total Gifts
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-green-600">{purchasedCount}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Purchased
              </p>
            </div>
            <div>
              <p className="text-xl font-bold text-blue-600">{availableCount}</p>
              <p className="text-xs text-gray-400 font-medium mt-0.5">
                Available
              </p>
            </div>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

          {/* ── Countdown Timer ──────────────────────────────────────── */}
          {wishlistItem.expirationDate && !countdown.expired && (
            <div
              className="rounded-2xl p-5 text-center shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${THEME_COLOR}, #b83cc7)`,
              }}
            >
              <p className="text-white/80 text-xs uppercase tracking-widest font-medium mb-3">
                Ends In
              </p>
              <div className="flex items-center justify-center gap-3 sm:gap-5">
                <CountdownUnit value={countdown.days} label="Days" />
                <span className="text-white text-2xl font-light pb-5">:</span>
                <CountdownUnit value={countdown.hours} label="Hours" />
                <span className="text-white text-2xl font-light pb-5">:</span>
                <CountdownUnit value={countdown.minutes} label="Mins" />
                <span className="text-white text-2xl font-light pb-5">:</span>
                <CountdownUnit value={countdown.seconds} label="Secs" />
              </div>
            </div>
          )}

          {countdown.expired && wishlistItem.expirationDate && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
              <p className="text-red-600 font-semibold text-sm">
                This wishlist has expired
              </p>
            </div>
          )}

          {/* ── Event Details Card ───────────────────────────────────── */}
          {(formattedDate || wishlistItem.deliveryDetails?.address) && (
            <Card className="rounded-2xl shadow-sm overflow-hidden border-0">
              <div
                className="h-1"
                style={{ backgroundColor: THEME_COLOR }}
              />
              <CardContent className="p-5">
                <h3 className="font-bold text-gray-900 text-base mb-4">
                  Event Details
                </h3>
                <div className="space-y-3">
                  {formattedDate && (
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${THEME_COLOR}15` }}
                      >
                        <Calendar
                          className="w-4 h-4"
                          style={{ color: THEME_COLOR }}
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                          Date
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">
                          {formattedDate}
                        </p>
                      </div>
                    </div>
                  )}

                  {wishlistItem.deliveryDetails?.address && (
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${THEME_COLOR}15` }}
                      >
                        <MapPin
                          className="w-4 h-4"
                          style={{ color: THEME_COLOR }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                          Location
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5 break-words">
                          {wishlistItem.deliveryDetails.address}
                        </p>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(
                            wishlistItem.deliveryDetails.address
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs mt-1 font-semibold"
                          style={{ color: THEME_COLOR }}
                        >
                          Open in Maps
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Host Section ─────────────────────────────────────────── */}
          <Card className="rounded-2xl shadow-sm border-0">
            <CardContent className="p-5">
              <h3 className="font-bold text-gray-900 text-base mb-4">
                Your Host
              </h3>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm text-white text-xl font-bold"
                  style={{ backgroundColor: THEME_COLOR }}
                >
                  {hostName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-base">{hostName}</p>
                  {wishlistItem.deliveryDetails?.email && (
                    <p className="text-sm text-gray-400 mt-0.5">
                      {wishlistItem.deliveryDetails.email}
                    </p>
                  )}
                  <span
                    className="inline-block mt-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${THEME_COLOR}15`,
                      color: THEME_COLOR,
                    }}
                  >
                    Event Organizer
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── RSVP Card ────────────────────────────────────────────── */}
          <Card className="rounded-2xl shadow-sm border-0 overflow-hidden">
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{
                background: `linear-gradient(135deg, ${THEME_COLOR}10, ${THEME_COLOR}05)`,
                borderBottom: `1px solid ${THEME_COLOR}20`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${THEME_COLOR}20` }}
                >
                  <CalendarCheck
                    className="w-5 h-5"
                    style={{ color: THEME_COLOR }}
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Will you attend?
                  </p>
                  <p className="text-xs text-gray-500">
                    Let the host know your plans
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowRSVP(true)}
                className="text-white text-sm font-semibold px-4 h-9 rounded-xl shadow-sm"
                style={{ backgroundColor: THEME_COLOR }}
              >
                RSVP
              </Button>
            </div>
          </Card>

          {/* ── Wishlist Items ───────────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <Gift className="w-5 h-5" style={{ color: THEME_COLOR }} />
                Gift Wishlist
              </h3>
              <span className="text-sm text-gray-400">
                {availableCount} available
              </span>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No gifts added yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Check back later!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {products.map((item) => {
                  const isPurchased = item.status === "purchased";
                  const isReserved = item.status === "reserved";
                  const isAvailable = !isPurchased && !isReserved;

                  return (
                    <Card
                      key={item.id}
                      className={`rounded-2xl shadow-sm border-0 overflow-hidden transition-all ${
                        isPurchased ? "opacity-60" : "hover:shadow-md"
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-stretch">
                          {/* Image */}
                          <div className="w-28 sm:w-36 h-32 sm:h-36 relative flex-shrink-0 bg-gray-100">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className={`object-cover ${
                                  isPurchased ? "grayscale" : ""
                                }`}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Gift className="w-8 h-8 text-gray-300" />
                              </div>
                            )}
                            {isPurchased && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                            <div>
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 flex-1">
                                  {item.name}
                                </h4>
                                <StatusBadge status={item.status} />
                              </div>
                              <p
                                className="text-base font-bold mt-1"
                                style={{ color: THEME_COLOR }}
                              >
                                {item.price}
                              </p>
                            </div>

                            <div className="mt-3">
                              {isAvailable && (
                                <Button
                                  onClick={() => {
                                    localStorage.setItem(
                                      "selectedItem",
                                      JSON.stringify(item)
                                    );
                                    setSelectedItem(item);
                                  }}
                                  className="h-9 text-white text-xs font-semibold rounded-xl px-4 shadow-sm"
                                  style={{ backgroundColor: THEME_COLOR }}
                                >
                                  <Gift className="w-3.5 h-3.5 mr-1.5" />
                                  Gift This
                                </Button>
                              )}

                              {isReserved && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                                  <span className="text-xs font-semibold text-amber-600">
                                    Reserved
                                  </span>
                                </div>
                              )}

                              {isPurchased && (
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                  <span className="text-xs font-semibold text-green-600">
                                    Already Gifted
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Progress bar ─────────────────────────────────────────── */}
          {totalItems > 0 && (
            <Card className="rounded-2xl shadow-sm border-0">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Gifting Progress
                  </h4>
                  <span className="text-xs text-gray-500 font-medium">
                    {purchasedCount} / {totalItems} gifted
                  </span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.round((purchasedCount / totalItems) * 100)}%`,
                      backgroundColor: THEME_COLOR,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {Math.round((purchasedCount / totalItems) * 100)}% of the
                  wishlist has been gifted
                </p>
              </CardContent>
            </Card>
          )}

          {/* ── Bottom CTA ───────────────────────────────────────────── */}
          <Card
            className="rounded-2xl shadow-sm border-0 text-white text-center py-8 px-4 overflow-hidden relative"
            style={{
              background: `linear-gradient(135deg, ${THEME_COLOR}, #b83cc7)`,
            }}
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />
            <CardContent className="relative z-10">
              <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <h2 className="text-xl font-bold mb-1">Create Your Own</h2>
              <p className="text-white/80 text-sm mb-5">
                Share your wishlist &amp; make birthdays, weddings and events
                unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wishvent.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ color: THEME_COLOR }}
                >
                  Get Started Free
                </a>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-semibold text-white border border-white/30 transition-colors hover:bg-white/30"
                >
                  {copied ? (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" /> Share Link
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="h-4" />
        </div>
      </div>
    </>
  );
}
