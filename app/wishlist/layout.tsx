import type React from "react";

// This layout intentionally omits the global Header and FooterSection
// so the event guest view page can render as a standalone PWA-like page.
export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
