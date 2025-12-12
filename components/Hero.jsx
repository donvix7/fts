'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight, FaPlay } from 'react-icons/fa'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const heroSlides = [
    {
      title: "Heritage",
      subtitle: "Reimagined",
      description: "Where traditional African craftsmanship meets contemporary luxury fashion.",
      price: "$ 2,850",
      productName: "Kente Silk Couture Gown",
      gradient: "from-yellow-700 via-kente-yellow to-earth-brown",
      accentColor: "yellow-700"
    },
    {
      title: "Artisanal",
      subtitle: "Excellence",
      description: "Handcrafted pieces by master artisans, blending centuries-old techniques with modern design.",
      price: "$ 1,950",
      productName: "From This Side Embroidered Cape",
      gradient: "from-black via-earth-brown to-kente-red",
      accentColor: "kente-red"
    },
    {
      title: "Modern",
      subtitle: "Legacy",
      description: "Contemporary silhouettes that celebrate African heritage through luxury fabrics.",
      price: "$ 3,200",
      productName: "Bogolan Art Jacket",
      gradient: "from-kente-blue via-kente-green to-teal-600",
      accentColor: "kente-blue"
    }
  ]

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Premium Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].gradient} transition-all duration-1000`}></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M60 120c33.137 0 60-26.863 60-60S93.137 0 60 0 0 26.863 0 60s26.863 60 60 60zm0-10c27.614 0 50-22.386 50-50S87.614 10 60 10 10 32.386 10 60s22.386 50 50 50zm0-10c22.091 0 40-17.909 40-40s-17.909-40-40-40-40 17.909-40 40 17.909 40 40 40zm0-10c16.569 0 30-13.431 30-30S76.569 40 60 40 30 53.431 30 70s13.431 30 30 30zm0-10c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '400px'
          }}></div>
        </div>
        
        {/* Animated yellow-700 particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-yellow-700 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 2}s`,
                boxShadow: '0 0 8px 2px rgba(212, 175, 55, 0.5)'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border-t border-l border-white/10 transform -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 border-b border-r border-white/10 transform translate-x-32 translate-y-32"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-10 relative">
            {/* Luxury Tag */}
            <div className="inline-flex items-center space-x-4">
              <div className="w-12 h-px bg-yellow-700"></div>
              <span className="text-yellow-700 tracking-[0.3em] text-sm font-light">HAUTE COUTURE</span>
              <div className="w-12 h-px bg-yellow-700"></div>
            </div>

            {/* Animated Title */}
            <div className="overflow-hidden">
              <h1 className="text-6xl md:text-8xl font-cormorant font-light text-white leading-[0.9] mb-6">
                <div className="overflow-hidden">
                  <div 
                    className="transform transition-all duration-1000 ease-out"
                    style={{
                      transform: `translateY(${currentSlide * -100}%)`,
                      transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {heroSlides.map((slide, index) => (
                      <div key={index} className="h-[1.2em] flex items-center">
                        {slide.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="overflow-hidden mt-2">
                  <div 
                    className="transform transition-all duration-1000 ease-out delay-300"
                    style={{
                      transform: `translateY(${currentSlide * -100}%)`,
                      transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {heroSlides.map((slide, index) => (
                      <div key={index} className="h-[1.2em] flex items-center">
                        <span className="text-yellow-700 font-semibold">{slide.subtitle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </h1>
            </div>

            {/* Description */}
            <div className="overflow-hidden">
              <div 
                className="transform transition-all duration-1000 ease-out delay-500"
                style={{
                  transform: `translateY(${currentSlide * -100}%)`,
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {heroSlides.map((slide, index) => (
                  <div key={index} className="h-full">
                    <p className="text-xl text-white/80 font-light leading-relaxed max-w-xl">
                      {slide.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link 
                href="/products" 
                className="group relative px-10 py-5 bg-yellow-700 text-black font-medium 
                         tracking-wider overflow-hidden transition-all duration-500 
                         hover:bg-white hover:shadow-2xl hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span>DISCOVER COLLECTION</span>
                  <FaArrowRight className="transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full 
                              group-hover:translate-x-0 transition-transform duration-700"></div>
              </Link>
              
              <button className="group px-10 py-5 border-2 border-white/30 text-white 
                               tracking-wider hover:border-yellow-700 hover:text-yellow-700 
                               transition-all duration-500 flex items-center justify-center space-x-3">
                <FaPlay className="text-sm" />
                <span>VIEW STORY</span>
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center space-x-4 pt-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-500 ${
                    currentSlide === index 
                      ? 'w-12 h-1 bg-yellow-700' 
                      : 'w-8 h-1 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            {/* Main Product Display */}
            <div className="relative">
              {/* Floating product card */}
              <div 
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg 
                         border border-white/20 rounded-lg p-8 shadow-2xl transform 
                         transition-all duration-1000 hover:scale-105"
                style={{
                  transform: `translateY(${currentSlide * -100}%)`,
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {heroSlides.map((slide, index) => (
                  <div key={index} className="h-full">
                    {/* Product Image Placeholder */}
                    <div className="relative h-96 mb-8 overflow-hidden rounded">
                      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}>
                        {/* Simulated fabric texture */}
                        <div className="absolute inset-0 opacity-20" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          backgroundSize: '120px'
                        }}></div>
                        
                        {/* yellow-700 thread details */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-48 h-64 border-2 border-yellow-700/30 rounded-lg relative">
                            <div className="absolute inset-2 border border-yellow-700/20 rounded"></div>
                            <div className="absolute inset-4 border border-yellow-700/10 rounded"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent 
                                    opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end justify-center">
                        <button className="mb-8 px-6 py-3 bg-white text-black font-medium 
                                         tracking-wider hover:bg-yellow-700 transition-all duration-300">
                          QUICK VIEW
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="text-center">
                      <h3 className="text-2xl font-cormorant font-semibold text-white mb-2">
                        {slide.productName}
                      </h3>
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <span className="text-yellow-700 text-3xl font-light">{slide.price}</span>
                        <span className="text-white/60 text-sm line-through">$ 3,800</span>
                      </div>
                      <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full">
                        <span className="text-white/80 text-sm tracking-wider">LIMITED: 25/50 REMAINING</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-yellow-700/30 
                            transform -rotate-45"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b border-r border-yellow-700/30 
                            transform -rotate-45"></div>
              
              {/* Price tag floating element */}
              <div className="absolute -right-6 top-1/4 transform rotate-12">
                <div className="bg-yellow-700 text-black px-6 py-3 font-medium tracking-wider 
                              shadow-lg animate-pulse">
                  <div className="text-xs">EXCLUSIVE</div>
                  <div className="text-lg">-30%</div>
                </div>
              </div>
            </div>

            {/* Artisan Signature */}
            <div className="absolute -bottom-8 left-8">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-3 
                            border border-white/20 rounded">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-700 to-earth-brown 
                              flex items-center justify-center">
                  <span className="text-white text-sm font-bold">KW</span>
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Master Weaver Kwame</div>
                  <div className="text-white/60 text-xs">30 Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 
                 flex items-center justify-center border border-white/30 text-white 
                 hover:border-yellow-700 hover:text-yellow-700 hover:bg-white/5 
                 transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 
                 flex items-center justify-center border border-white/30 text-white 
                 hover:border-yellow-700 hover:text-yellow-700 hover:bg-white/5 
                 transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        →
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-white/60 text-sm tracking-wider animate-pulse">EXPLORE</span>
          <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-700 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-cormorant font-light text-yellow-700 mb-1">150+</div>
              <div className="text-white/60 text-sm tracking-wider">ARTISAN PARTNERS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-cormorant font-light text-yellow-700 mb-1">45</div>
              <div className="text-white/60 text-sm tracking-wider">COUNTRIES SERVED</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-cormorant font-light text-yellow-700 mb-1">98%</div>
              <div className="text-white/60 text-sm tracking-wider">CLIENT SATISFACTION</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-cormorant font-light text-yellow-700 mb-1">24</div>
              <div className="text-white/60 text-sm tracking-wider">AWARDS WON</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero