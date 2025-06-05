"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { features } from "@/constants/data"


export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-[#47104C] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
        <div className="absolute top-32 right-16 w-12 h-12 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-8 h-8 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 font-zilla">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Why Choose Us?</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Explore our unique features tailored to meet needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={feature.id}
              className={`${feature.cardStyle} rounded-[24px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0`}
            >
              <CardContent className="p-8 md:p-6 text-center flex-col flex items-center space-y-6">
                {/* Illustration Area */}
                <div className=" mb-8 ">
                   <Image src={feature.illustration} alt="" height={170} />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className={`text-xl md:text-2xl font-bold ${feature.textColor}`}>{feature.title}</h3>
                  <p className={`text-sm md:text-base leading-relaxed ${feature.textColor} opacity-90`}>
                    {feature.description}
                  </p>
                </div>

                {/* CTA Button */}
                <Button
                  className={`${feature.buttonStyle} text-[16px] px-8 py-3 rounded-[8px] font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  Explore Feature
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA for Desktop */}
        <div className="hidden lg:block text-center mt-16">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-4 text-lg font-medium rounded-[8px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Discover All Features
          </Button>
        </div>
      </div>
    </section>
  )
}
