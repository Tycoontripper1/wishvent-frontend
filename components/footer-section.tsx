"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

// Using simple div icons instead of external libraries to avoid conflicts
const SocialIcon = ({ name, children }: { name: string; children: React.ReactNode }) => (
  <a
    href="#"
    className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primaryColor transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
    aria-label={name}
  >
    {children}
  </a>
)

const navigationLinks = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#about" },
  { name: "Wishlist", href: "#wishlist" },
  { name: "FAQs", href: "#faq" },
]

const footerLinks = [
  { name: "Terms of Service", href: "#" },
  { name: "Privacy Policy", href: "#" },
]

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (ctaRef.current) observer.observe(ctaRef.current)
    if (linksRef.current) observer.observe(linksRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-primaryColor to-purple-800 relative overflow-hidden opacity-0"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 border border-white rounded-full"></div>
      </div>

      {/* Main CTA Section */}
      <div ref={ctaRef} className="container mx-auto px-4 md:px-6 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-12 opacity-0">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-12 animate-slide-down">
            <h3 className="text-lg md:text-xl font-bold text-[#9F1AB1] mb-6 tracking-wider">DOWNLOAD NOW!</h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-zilla font-bold text-white mb-6 md:mb-8 leading-tight">
              Start Creating Your Perfect Wishlist Today
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-zilla">
              Join thousands of users who have transformed their gift-giving experience. Create, share, and receive the
              perfect gifts with our intuitive wishlist platform designed for every special occasion.
            </p>
          </div>

          {/* Download Button */}
          <div className="">
            <Button
              size="lg"
              className="bg-white text-lightPurple hover:bg-gray-100 px-12 md:px-16 py-6 md:py-8 text-xl md:text-2xl font-bold rounded-[8px] shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              Download App
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Links Section */}
      <div ref={linksRef} className="border-t border-purple-500/30 opacity-0">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="flex md:flex-row flex-col justify-between gap-6 items-center pb-8 ">
                      {/* Brand Logo */}
          <div className="text-center ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-300 mb-4">
              Wish<span className="text-white">Vent</span>
              <span className="text-purple-200">.</span>
            </h1>
          </div>
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {navigationLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white text-lg md:text-xl font-medium hover:text-purple-200 transition-colors duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 md:gap-8  ">
            <SocialIcon name="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </SocialIcon>
            <SocialIcon name="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </SocialIcon>
            <SocialIcon name="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z" />
              </svg>
            </SocialIcon>
            <SocialIcon name="YouTube">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </SocialIcon>
          </div>


          </div>

          {/* Bottom Links and Copyright */}
          <div className="border-t border-purple-500/30 pt-8 md:pt-6 flex md:flex-row justify-between gap-12 flex-col">
            <div className="flex flex-row justify-center items-center gap-6 md:gap-8 mb-6">
              {footerLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/80 text-sm md:text-base hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="text-center">
              <p className="text-white/70 text-sm md:text-base">© 2025 Wishvent. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-5 w-2 h-2 bg-white rounded-full animate-ping"></div>
    </footer>
  )
}
