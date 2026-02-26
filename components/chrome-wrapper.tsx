"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import FooterSection from "@/components/footer-section";

/**
 * Conditionally renders the global Header and Footer.
 * These are hidden for standalone pages (e.g. the wishlist guest view)
 * that ship their own nav.
 */
export default function ChromeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Suppress global chrome for wishlist guest view pages
  const isStandalone =
    pathname?.startsWith("/wishlist/") &&
    pathname !== "/wishlist" &&
    pathname !== "/wishlist/details";

  return (
    <>
      {!isStandalone && <Header />}
      <div className="min-h-screen overflow-x-hidden">{children}</div>
      {!isStandalone && <FooterSection />}
    </>
  );
}
