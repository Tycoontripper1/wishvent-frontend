"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { steps } from "@/constants/data"
import content from "@/assets/images/Content.png"


const StepItem = ({ step, index, isLast }: { step: any; index: number; isLast: boolean }) => {
  const stepRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-left")
          }
        })
      },
      { threshold: 0.3 },
    )

    if (stepRef.current) {
      observer.observe(stepRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={stepRef}
      className="flex items-start opacity-0 translate-x-8"
      style={{ animationDelay: `${index * 300}ms` }}
    >
      {/* Step Number */}
      <div className="flex-shrink-0 mr-4 md:mr-6">
        <div
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-xl font-bold transition-all duration-500 ${
            step.isHighlighted
              ? "bg-white text-primaryColor shadow-lg"
              : "bg-[#821890]/70 text-white border-2 border-purple-400"
          }`}
        >
          {step.number}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white text-lg md:text-xl font-medium leading-relaxed pr-4">{step.title}</h3>

        {/* Connecting Line */}
        {!isLast && (
          <div className="ml-6 md:ml-7 mt-4 mb-6">
            <div className="w-0.5 h-8 md:h-12 bg-purple-400 opacity-60 animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    if (mockupRef.current) {
      observer.observe(mockupRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 lg:py-32 bg-[#47104C] relative overflow-hidden opacity-0"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-slide-down font-zilla">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#9F1AB1] mb-4">How It Works</h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl  text-white mb-6 leading-tight">
            Few Easy Steps to Create a Wishlist
          </h3>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Discover how simple it is to create, customize, and share your perfect wishlist. From registration to
            receiving gifts, our streamlined process makes gift-giving effortless and enjoyable for everyone involved.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Steps Section */}
          <div className="order-2 lg:order-1">
            <Card className="bg-primaryColor border-purple-400/30 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <StepItem key={step.number} step={step} index={index} isLast={index === steps.length - 1} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Mockup Section */}
          <div className="order-1 lg:order-2">
            <div ref={mockupRef} className="relative opacity-0 translate-y-8">
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-4 md:p-6">
                  {/* Success Messages */}
                 

                  {/* App Interface Mockup */}
                  <div className="relative">
                    <div className="bg-gray-100 rounded-lg p-4 min-h-[300px] overflow-hidden">
                      <Image
                        src={content}
                        alt="how-image"
                        width={400}
                        height={600}
                        className="w-full h-auto rounded-lg"
                        priority
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating decoration */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-70"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
