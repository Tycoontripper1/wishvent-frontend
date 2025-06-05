import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WishVent - Create Perfect Wishlists",
  description: "Transform your gift-giving experience with our intuitive wishlist platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`} suppressHydrationWarning={true}>
        <div className="min-h-screen overflow-x-hidden">{children}</div>
      </body>
    </html>
  )
}
