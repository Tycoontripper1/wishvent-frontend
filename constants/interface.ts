// export type WishlistDetails = {
//   id: string;
//   title: string;
//   description: string;
//   status: "public" | "private"; // extend if needed
//   expirationDate: string;
//   deliveryDetails: {
//     email: string;
//     phone: string;
//     address: string;
//   };
// };

// export type WishlistApiResponse = {
//   data: {
//     details: WishlistDetails;
//   };
// };
export interface DeliveryDetails {
  email: string;
  phone: string;
  address: string;
  fullName: string;
}

export interface WishProduct {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: string; // API returns string (₦ values)
  orderId: string | null;
  totalCost: string | null;
  status: string; // e.g. "wished"
  fulfilledBy: string | null;
  variation: string | null;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  wishlistId: string;
}

export interface WishlistDetails {
  id: string;
  title: string;
  description: string;
  image: string;
  status: string; // "public" | "private"
  expirationDate: string;
  deliveryDetails: DeliveryDetails;
  createdAt: string;
  updatedAt: string;
  userId: string;
  wishProducts: WishProduct[];
}

export interface WishlistDetailsResponse {
  status: string; // "success" | "error"
  data: {
    message: string;
    details: WishlistDetails;
  };
}
