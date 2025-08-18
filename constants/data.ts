 import choose1 from "@/assets/images/choose1.png"
 import choose2 from "@/assets/images/App QR Code.png"
 import choose3 from "@/assets/images/App QR Code (1).png"
 import birthday from "@/assets/images/birthday.png"
 import wedding from "@/assets/images/wedding.png"
 import christmas from "@/assets/images/christmas.png"
 
 
 
 export const features = [
  {
    id: "group-gifting",
    title: "Group Gifting",
    description:
      "From birthdays to weddings, baby showers to holidays — we help you curate the perfect wishlist for any moment that matters.",
    illustration: choose1,
    bgColor: "bg-purple-600",
    textColor: "text-white",
    buttonStyle: "bg-white text-purple-600 hover:bg-gray-100",
    cardStyle: "bg-lightPurple border-purple-600",
  },
  {
    id: "personalized",
    title: "Personalized & Simple",
    description:
      "From birthdays to weddings, baby showers to holidays — we help you curate the perfect wishlist for any moment that matters.",
    illustration: choose2,
    bgColor: "bg-white",
    textColor: "text-gray-900",
    buttonStyle: "bg-purple-600 text-white hover:bg-purple-700",
    cardStyle: "bg-white border-gray-200",
  },
  {
    id: "occasion-ready",
    title: "Occasion-Ready, Always",
    description:
      "From birthdays to weddings, baby showers to holidays — we help you curate the perfect wishlist for any moment that matters.",
    illustration: choose3,
    bgColor: "bg-purple-600",
    textColor: "text-white",
    buttonStyle: "bg-white text-purple-600 hover:bg-gray-100",
    cardStyle: "bg-lightPurple border-purple-600",
  },
]



export const categories = [
  {
    id: "wedding",
    title: "Wedding Anniversary",
    image: wedding,
    alt: "Wedding couple in black and white",
  },
  {
    id: "christmas",
    title: "Christmas Celebration",
    image: christmas,
    alt: "Christmas gifts and decorations",
  },
  {
    id: "birthday",
    title: "Birthday Celebration",
    image: birthday,
    alt: "Birthday celebration with friends",
  },
]

export const steps = [
  {
    number: 1,
    title: "Register and create your wishlist",
    isHighlighted: false,
  },
  {
    number: 2,
    title: "Customize and select items from store",
    isHighlighted: false,
  },
  {
    number: 3,
    title: "Fill your details and share link with friends",
    isHighlighted: true,
  },
  {
    number: 4,
    title: "Receive your gifts with joy!!",
    isHighlighted: true,
  },
]