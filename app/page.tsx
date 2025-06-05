import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import CategoriesSection from "@/components/categories-section"
import HowItWorksSection from "@/components/how-it-works-section"
import FAQSection from "@/components/faq-section"
import FooterSection from "@/components/footer-section"

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <FooterSection />
    </main>
  )
}
