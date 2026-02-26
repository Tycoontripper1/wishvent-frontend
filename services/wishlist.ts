import { useState, useEffect } from "react";
import axios from "axios";
import {
  WishlistDetailsResponse,
  WishlistDetails,
  GuestCartPayload,
} from "@/constants/interface";

const apiKey = "https://wishvent-backend.sterlingtech.com.ng/api";

// 🔹 Fetch all wishlists (or full response with data/details/items)
export const useGetAllWishlists = (id: string) => {
  const [data, setData] = useState<WishlistDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlists = async (wishlistId: string) => {
      try {
        const response = await axios.get<WishlistDetailsResponse>(
          `${apiKey}/event/${wishlistId}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Fetching wishlists failed");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWishlists(id);
    }
  }, [id]);

  return { data, loading, error };
};

// 🔹 Fetch only a single wishlist's details
export const useGetSingleWishlist = (id: string) => {
  const [data, setData] = useState<WishlistDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlist = async (productId: string) => {
      try {
        const response = await axios.get<{
          data: { details: WishlistDetailsResponse };
        }>(`${apiKey}/peoplestore/product/${productId}`, {
          headers: { "Content-Type": "application/json" },
        });
        setData(response.data.data.details); // 👈 only details
      } catch (err: any) {
        setError(err.response?.data?.message || "Fetching wishlist failed");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWishlist(id);
    }
  }, [id]);

  return { data, loading, error };
};

export const patchGuestCart = async (payload: GuestCartPayload) => {
  try {
    const response = await axios.patch(
      `${"https://api.peoplesstore.ng/api"}/guest/cart/add`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "Updating guest cart failed"
    );
  }
};

// ─── Gift Purchase (notify host) ─────────────────────────────────────────────
export interface GiftPurchasePayload {
  wishlistId: string;
  productId: string;
  gifterName: string;
  gifterEmail: string;
  gifterPhone: string;
  message?: string;
}

export const postGiftPurchase = async (payload: GiftPurchasePayload) => {
  const response = await axios.post(
    `https://wishvent-backend.sterlingtech.com.ng/api/wishlist/gift`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

// ─── RSVP ────────────────────────────────────────────────────────────────────
export interface RSVPPayload {
  wishlistId: string;
  name: string;
  email?: string;
  status: "confirm" | "decline";
}

export const postRSVP = async (payload: RSVPPayload) => {
  const response = await axios.post(
    `https://wishvent-backend.sterlingtech.com.ng/api/wishlist/rsvp`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};
