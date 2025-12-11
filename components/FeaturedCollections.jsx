'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import { FaArrowRight } from 'react-icons/fa'

const FeaturedCollections = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const collections = [
    {
      id: 1,
      name: 'Kente Elegance Collection',
      description: 'Modern interpretations of traditional Ghanaian Kente patterns in premium silk',
      price: 895,
      originalPrice: 1200,
      category: 'Evening Wear',
      imageColor: 'from-kente-yellow to-kente-red',
      limitedEdition: true,
      artisan: 'Master Weaver Kwame',
      materials: ['Handwoven Silk', '24k yellow-700 Thread', 'Swiss Lace'],
      rating: 4.9,
      reviewCount: 48
    },
    {
      id: 2,
      name: 'Adinkra Heritage',
      description: 'Luxury apparel featuring hand-embroidered traditional West African symbols',
      price: 720,
      originalPrice: 950,
      category: 'Tailoring',
      imageColor: 'from-black to-earth-brown',
      limitedEdition: false,
      artisan: 'Artisan Collective',
      materials: ['Italian Wool', 'French Linen', 'Hand Embroidery'],
      rating: 4.8,
      reviewCount: 36
    },
    {
      id: 3,
      name: 'Bogolan Artisanal',
      description: 'Malian mud cloth techniques reimagined in contemporary luxury fabrics',
      price: 1250,
      originalPrice: 1500,
      category: 'Statement Pieces',
      imageColor: 'from-kente-blue to-kente-green',
      limitedEdition: true,
      artisan: 'Mud Cloth Masters',
      materials: ['Organic Cotton', 'Natural Dyes', 'Hand-painted'],
      rating: 5.0,
      reviewCount: 24
    },
    {
      id: 4,
      name: 'Dashiki Haute Couture',
      description: 'Bespoke dashiki designs with couture finishing and Swarovski crystals',
      price: 1650,
      originalPrice: 2200,
      category: 'Couture',
      imageColor: 'from-yellow-700 to-kente-red',
      limitedEdition: true,
      artisan: 'Couturier Amara',
      materials: ['French Silk', 'Swarovski Crystals', 'Hand Beading'],
      rating: 4.9,
      reviewCount: 31
    },
    {
      id: 5,
      name: 'Ndebele Beadwork',
      description: 'Inspired by South African Ndebele beadwork patterns in luxury cashmere',
      price: 980,
      category: 'Knitwear',
      imageColor: 'from-purple-600 to-pink-600',
      limitedEdition: true,
      artisan: 'Beadwork Artisans',
      materials: ['Mongolian Cashmere', 'Glass Beads', 'Silk Thread'],
      rating: 4.7,
      reviewCount: 28
    },
    {
      id: 6,
      name: 'Tuareg Silver Collection',
      description: 'Nomadic Tuareg silver jewelry motifs translated into textile art',
      price: 1450,
      category: 'Limited Edition',
      imageColor: 'from-slate-800 to-slate-600',
      limitedEdition: true,
      artisan: 'Tuareg Silversmiths',
      materials: ['Silver Thread', 'Japanese Denim', 'Hand Tooling'],
      rating: 4.9,
      reviewCount: 19
    },
    {
      id: 7,
      name: 'Yoruba Aso Oke',
      description: 'Traditional Yoruba weaving techniques in contemporary silhouettes',
      price: 850,
      category: 'Daywear',
      imageColor: 'from-emerald-700 to-teal-600',
      limitedEdition: false,
      artisan: 'Yoruba Weavers',
      materials: ['Handwoven Cotton', 'Metallic Thread', 'Silk Blend'],
      rating: 4.8,
      reviewCount: 42
    },
    {
      id: 8,
      name: 'Maasai Shuka',
      description: 'Iconic Maasai patterns in luxury wool and cashmere blends',
      price: 920,
      category: 'Outerwear',
      imageColor: 'from-red-800 to-orange-600',
      limitedEdition: false,
      artisan: 'Maasai Cooperative',
      materials: ['Merino Wool', 'Cashmere Blend', 'Vegetable Dyes'],
      rating: 4.7,
      reviewCount: 39
    }
  ]

  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'limited', name: 'Limited Edition' },
    { id: 'couture', name: 'Haute Couture' },
    { id: 'evening', name: 'Evening Wear' },
    { id: 'tailoring', name: 'Tailoring' }
  ]

  const filteredCollections = activeFilter === 'all' 
    ? collections 
    : collections.filter(item => {
        if (activeFilter === 'limited') return item.limitedEdition
        if (activeFilter === 'couture') return item.category === 'Couture'
        if (activeFilter === 'evening') return item.category === 'Evening Wear'
        if (activeFilter === 'tailoring') return item.category === 'Tailoring'
        return true
      })

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Premium Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-white to-cream/30"></div>
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234A2C2A' fill-opacity='0.4'%3E%3Cpath d='M40 100c0-22.1 17.9-40 40-40 8.3 0 16.1 2.5 22.5 6.8 3.5-9.5 12.5-16.8 23.5-16.8 13.8 0 25 11.2 25 25 0 6.1-2.2 11.7-5.8 16 3.6 4.3 5.8 9.9 5.8 16 0 13.8-11.2 25-25 25-11 0-20-7.3-23.5-16.8-6.4 4.3-14.2 6.8-22.5 6.8-22.1 0-40-17.9-40-40z'/%3E%3Cpath d='M100 60c0-22.1 17.9-40 40-40 8.3 0 16.1 2.5 22.5 6.8 3.5-9.5 12.5-16.8 23.5-16.8 13.8 0 25 11.2 25 25 0 6.1-2.2 11.7-5.8 16 3.6 4.3 5.8 9.9 5.8 16 0 13.8-11.2 25-25 25-11 0-20-7.3-23.5-16.8-6.4 4.3-14.2 6.8-22.5 6.8-22.1 0-40-17.9-40-40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '400px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header with yellow-700 Accents */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center justify-center space-x-4 mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-700 to-transparent"></div>
            <span className="text-yellow-700 tracking-[0.3em] text-sm font-light">EXCLUSIVE COLLECTIONS</span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-700 to-transparent"></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-cormorant font-light text-black mb-6">
            Curated <span className="font-semibold">Masterpieces</span>
          </h2>
          
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-light leading-relaxed">
            Each collection represents a collaboration between master artisans and our design atelier, 
            resulting in pieces that transcend fashion to become wearable art.
          </p>
        </div>

        {/* Premium Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 text-sm tracking-wider transition-all duration-500 ${
                activeFilter === category.id
                  ? 'bg-yellow-700 text-black font-medium border border-yellow-700'
                  : 'text-black/70 border border-black/10 hover:border-yellow-700/50 hover:text-yellow-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Premium Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {filteredCollections.slice(0, 4).map((collection) => (
            <ProductCard key={collection.id} product={collection} premium={true} />
          ))}
        </div>

        {/* Limited Edition Badge */}
        <div className="relative flex justify-center items-center mb-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
          </div>
          <div className="relative px-8 py-4 bg-cream border border-yellow-700/30">
            <span className="text-yellow-700 tracking-widest text-sm font-medium">
              LIMITED EDITION PIECES • ONLY 20-50 PRODUCED WORLDWIDE
            </span>
          </div>
        </div>

        {/* Second Row - For Larger Screens */}
        <div className="hidden lg:grid grid-cols-4 gap-10 mb-20">
          {filteredCollections.slice(4, 8).map((collection) => (
            <ProductCard key={collection.id} product={collection} premium={true} />
          ))}
        </div>

        {/* Premium Footer Section */}
        <div className="text-center relative">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-cormorant font-light text-yellow-700 mb-2">24</div>
                <div className="text-sm text-black/60 tracking-wider">ARTISAN PARTNERS</div>
              </div>
              <div className="h-12 w-px bg-black/20"></div>
              <div className="text-center">
                <div className="text-4xl font-cormorant font-light text-yellow-700 mb-2">180+</div>
                <div className="text-sm text-black/60 tracking-wider">HOURS PER PIECE</div>
              </div>
              <div className="h-12 w-px bg-black/20"></div>
              <div className="text-center">
                <div className="text-4xl font-cormorant font-light text-yellow-700 mb-2">98%</div>
                <div className="text-sm text-black/60 tracking-wider">CLIENT SATISFACTION</div>
              </div>
            </div>

            <p className="text-black/70 italic text-lg font-light mb-8 leading-relaxed">
              "We don't create fashion, we curate heirlooms. Each piece is designed to be passed 
              through generations, telling stories of craftsmanship and heritage."
            </p>
            
            <div className="flex items-center justify-center space-x-4">
              <button className="group relative px-8 py-4 bg-transparent border border-yellow-700 text-yellow-700 
                               overflow-hidden transition-all duration-500 hover:text-black">
                <span className="relative z-10 tracking-wider font-medium">VIEW ALL COLLECTIONS</span>
                <div className="absolute inset-0 bg-yellow-700 transform -translate-x-full group-hover:translate-x-0 
                              transition-transform duration-500"></div>
              </button>
              
              <button className="group flex items-center space-x-2 px-8 py-4 border border-black/20 
                               text-black/70 hover:text-yellow-700 hover:border-yellow-700/50 
                               transition-all duration-300">
                <span className="tracking-wider font-medium">PRIVATE VIEWING</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1 duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-1/4 w-32 h-32 border-l border-t border-yellow-700/20"></div>
      <div className="absolute right-0 bottom-1/4 w-32 h-32 border-r border-b border-yellow-700/20"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-yellow-700/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCollections