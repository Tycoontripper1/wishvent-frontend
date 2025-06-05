"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { categories } from "@/constants/data"


// Category card component with animations
const CategoryCard = ({ category, index }: { category: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)

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

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] opacity-0 translate-y-8"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="relative aspect-[4/3] group">
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Purple overlay banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#821890] backdrop-blur-sm">
          <div className="p-4">
            <h3 className="text-xl md:text-2xl font-bold text-white">{category.title}</h3>
          </div>
        </div>

        {/* Yellow arc decoration */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 overflow-hidden">
          <div className="w-32 h-16 bg-yellow-400 rounded-t-full transform -translate-y-8 opacity-60 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)

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

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 lg:py-32 bg-white relative overflow-hidden opacity-0">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-slide-down font-zilla">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#821890] mb-4">Categories</h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
            Create your wishlist based on any occasion you want
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3 max-w-6xl mx-auto mb-12">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 px-12 py-6 text-lg font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
          >
            See More
          </Button>
        </div>

        {/* Yellow Arc at Bottom */}
        <div className="mt-16 flex justify-center">
          <div className="w-32 h-16 overflow-hidden">
            <div className="w-64 h-32 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 rounded-t-full transform -translate-y-16 animate-bounce-slow opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
