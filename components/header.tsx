"use client"

import { useState, useEffect } from "react"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationLinks = [
  { name: "Home", href: "#" },
  { name: "About Us", href: "#about" },
  { name: "Categories", href: "#categories" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "FAQs", href: "#faq" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-20 w-full">
            {/* Logo */}
            <div className="flex-shrink-0 min-w-0">
              <h1
                className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-200 truncate ${
                  isScrolled ? "text-primaryColor" : "text-primaryColor"
                }`}
              >
                Wish<span className="text-purple-800">Vent</span>
                <span className="text-purple-400">..</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 flex-shrink-0">
              {navigationLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap ${
                    isScrolled ? "text-gray-700 hover:text-primaryColor" : "text-gray-700 hover:text-purple-800"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Side - CTA Button and Search */}
            <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <Button
                  size="sm"
                  className="bg-primaryColor hover:bg-purple-700 text-white px-4 lg:px-6 py-2 text-sm rounded-full font-medium transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                >
                  Get Started
                </Button>
              </div>

              {/* Search Icon */}
              <button
                className={`p-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                  isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-700 hover:bg-white/20"
                }`}
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Mobile Hamburger Menu */}
              <button
                onClick={toggleMenu}
                className={`md:hidden p-2 rounded-lg transition-colors duration-200 flex-shrink-0 ${
                  isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-gray-700 hover:bg-white/20"
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMenu} />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 left-0 h-full w-72 max-w-[80vw] bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 md:p-6">
            {/* Menu Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-primaryColor">Menu</h2>
              <button onClick={toggleMenu} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-primaryColor hover:bg-purple-50 rounded-lg transition-all duration-200 transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={toggleMenu}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* CTA Button in Menu */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button
                className="w-full bg-primaryColor hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
                onClick={toggleMenu}
              >
                Get Started - It's Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
