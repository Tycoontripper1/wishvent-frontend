"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const illustrationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (contentRef.current) observer.observe(contentRef.current)
    if (illustrationRef.current) observer.observe(illustrationRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      style={{
    background: 'linear-gradient(to bottom, #FFF9B0 30%, #E205FF 80%, #FFF9B0 30%)'
  }}
      className="min-h-screen  relative overflow-hidden pt-16 md:pt-20 w-full"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 md:w-32 md:h-32 border border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-16 w-16 h-16 md:w-20 md:h-20 border border-white rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 md:w-24 md:h-24 border border-white rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 md:w-16 md:h-16 border border-white rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl w-full">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] w-full">
          {/* Hero Content */}
          <div
            ref={contentRef}
            className="text-center max-w-4xl mx-auto mb-8 md:mb-12 opacity-0 translate-y-8 w-full px-4"
          >
            {/* Hashtag */}
            <div className="mb-6 md:mb-8 animate-slide-down">
              <span className="text-xl md:text-base font-zilla   text-gray-700 tracking-wider leading-10 ">#WISHFULMOMENTS</span>
            </div>

            {/* Main Headline */}
            <div className="mb-6 md:mb-8">
              <h1 className="font-zilla font-semibold text-[28px]  md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-4 break-words">
                <span className="text-gray-900">Create a </span>
                <span className="text-purple-600 animate-pulse font-bold">Wishlist</span>
                <span className="text-gray-900"> for </span>
                <span className="text-purple-600">any</span>
                <br />
                <span className="text-purple-600 font-bold">Occasion</span>
                <span className="text-gray-900"> and Share it</span>
                <br />
                <span className="text-gray-900">effortlessly. One link,</span>
                <br />
                <span className="text-gray-900">every </span>
                <span className="text-purple-600 italic font-light">wish</span>
                <span className="text-gray-900">...</span>
              </h1>
            </div>

            {/* CTA Button */}
            <div className="mb-8 md:mb-12">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 text-base md:text-lg lg:text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-bounce-subtle"
              >
                Get Started - It's Free
              </Button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div
            ref={illustrationRef}
            className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto opacity-0 translate-y-8 w-full px-4"
          >
            <div className="relative w-full">
              <Image
                src="/images/hero-illustration.png"
                alt="Diverse group of happy people celebrating together - WishVent community"
                width={600}
                height={400}
                className="w-full h-auto animate-float max-w-full"
                priority
              />

              {/* Floating elements around illustration */}
              <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full animate-bounce opacity-70"></div>
              <div className="absolute -top-1 -right-3 md:-top-2 md:-right-6 w-4 h-4 md:w-6 md:h-6 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-3 md:-bottom-4 md:-left-6 w-8 h-8 md:w-10 md:h-10 bg-pink-400 rounded-full animate-ping opacity-60"></div>
              <div className="absolute -bottom-1 -right-2 md:-bottom-2 md:-right-4 w-5 h-5 md:w-7 md:h-7 bg-yellow-300 rounded-full animate-bounce-slow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden">
        <svg className="w-full h-12 md:h-16 lg:h-24 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}
