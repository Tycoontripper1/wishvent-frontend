"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Minus } from "lucide-react"

const faqData = [
  {
    id: 1,
    question: "How do I create my first wishlist on Wishvent?",
    answer:
      "Creating your first wishlist is simple! Just register for an account, click 'Create Wishlist', choose your occasion, and start adding items from our partner stores or by sharing links to products you love.",
    isOpen: true,
  },
  {
    id: 2,
    question: "Can I share my wishlist with friends and family?",
    answer:
      "You can share your wishlist via a unique link, email, or social media. Your friends and family can view your wishlist and purchase items directly, with automatic updates to prevent duplicate gifts.",
    isOpen: false,
  },
  {
    id: 3,
    question: "Is Wishvent free to use?",
    answer:
      "Yes, Wishvent is completely free for creating and sharing wishlists. We earn a small commission from partner retailers when purchases are made through our platform, but this doesn't affect your prices.",
    isOpen: false,
  },
  {
    id: 4,
    question: "How do I know if someone purchased an item from my wishlist?",
    answer:
      "You'll receive instant notifications when items are purchased from your wishlist. The item will be marked as 'purchased' to prevent duplicates, and you can see who bought it if they choose to share their information.",
    isOpen: false,
  },
  {
    id: 5,
    question: "Can I create multiple wishlists for different occasions?",
    answer:
      "Yes! You can create unlimited wishlists for birthdays, weddings, holidays, baby showers, or any special occasion. Each wishlist can be customized with its own theme and shared separately.",
    isOpen: false,
  },
]

const FAQItem = ({
  faq,
  isOpen,
  onToggle,
  index,
}: { faq: any; isOpen: boolean; onToggle: () => void; index: number }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.2 },
    )

    if (itemRef.current) {
      observer.observe(itemRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={itemRef}
      className="border-b border-gray-200 last:border-b-0 opacity-0 translate-y-4"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 md:py-8 flex items-start justify-between text-left hover:bg-yellow-50/50 transition-colors duration-200 group"
      >
        <div className="flex-1 pr-4">
          <h3
            className={`text-lg md:text-xl font-medium leading-relaxed transition-colors duration-200 ${
              isOpen ? "text-purple-600" : "text-gray-900 group-hover:text-purple-600"
            }`}
          >
            {faq.question}
          </h3>
        </div>
        <div className="flex-shrink-0 ml-4">
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen
                ? "bg-lightPurple text-white transform rotate-180"
                : "bg-gray-100 text-lightPurple group-hover:bg-purple-100 group-hover:text-purple-600"
            }`}
          >
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
          </div>
        </div>
      </button>

      {/* Answer Content */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-6 md:pb-8 pr-12 md:pr-16">
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState(faqData)
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

  const toggleFAQ = (id: number) => {
    setFaqs(
      faqs.map((faq) => ({
        ...faq,
        isOpen: faq.id === id ? !faq.isOpen : faq.isOpen,
      })),
    )
  }

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 font-zilla md:py-24 lg:py-32 bg-gradient-to-b  from-yellow-50 to-yellow-100 relative overflow-hidden opacity-0"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-slide-down">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-lightPurple mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-900 max-w-3xl mx-auto leading-tight font-medium">
            Get answers to all the questions you have about Wishvent.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl shadow-xl border px-6 border-yellow-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.id} faq={faq} isOpen={faq.isOpen} onToggle={() => toggleFAQ(faq.id)} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
