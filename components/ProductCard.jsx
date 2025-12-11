'use client'

import { useState, useEffect, useRef } from 'react'

const ProductCard = ({ product, premium = false, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef(null)

  // Safe property access with defaults
  const imageColor = product?.imageColor || 'from-yellow-700/80 to-kente-red/80'
  const name = product?.name || 'Premium Collection'
  const description = product?.description || 'Luxury African-inspired fashion piece'
  const price = product?.price || 0
  const originalPrice = product?.originalPrice
  const category = product?.category || 'Luxury'
  const limitedEdition = product?.limitedEdition || false
  const artisan = product?.artisan || 'Master Artisan'
  const materials = product?.materials || ['Premium Fabric']
  const rating = product?.rating || 4.5
  const reviewCount = product?.reviewCount || 0
  const productionTime = product?.productionTime
  const stock = product?.stock
  const tags = product?.tags || []


  // Add this to your ProductCard component
const [isOnline, setIsOnline] = useState(true)

useEffect(() => {
  setIsOnline(navigator.onLine)
  const handleOnline = () => setIsOnline(true)
  const handleOffline = () => setIsOnline(false)
  
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}, [])

// In your button handlers
const handleAddToCart = async () => {
  if (!isOnline) {
    // Store in local storage for later sync
    const cart = JSON.parse(localStorage.getItem('offline-cart') || '[]')
    cart.push(product)
    localStorage.setItem('offline-cart', JSON.stringify(cart))
    
    alert('Added to cart offline. Will sync when you reconnect.')
    return
  }
  
  // Normal online flow
  // ... your existing code
}

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    
    return () => observer.disconnect()
  }, [])

  // Improved text contrast function
  const getTextColor = (bgColor) => {
    if (bgColor.includes('from-yellow-700') || bgColor.includes('to-yellow-700') || 
        bgColor.includes('from-kente-yellow') || bgColor.includes('to-kente-yellow')) {
      return 'text-black' // Dark text on light backgrounds
    }
    return 'text-cream' // Light text on dark backgrounds
  }

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Grid view optimized for visibility
  const GridView = () => (
    <div 
      ref={cardRef}
      className={`group relative bg-white rounded-xl overflow-hidden transition-all duration-500 
                hover:shadow-2xl hover:-translate-y-1 border border-yellow-700/10
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Section with Badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-start">
        {/* Left side badges */}
        <div className="flex flex-col gap-1">
          {limitedEdition && (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-700/90 text-black 
                          text-[10px] font-semibold tracking-wider rounded-full">
              <span>★</span>
              <span>LIMITED</span>
            </div>
          )}
          {tags.includes('best-seller') && (
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 text-cream 
                          text-[10px] font-semibold tracking-wider rounded-full">
              <span>🔥</span>
              <span>BEST SELLER</span>
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex flex-col gap-1">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm 
                     rounded-full hover:bg-white transition-all duration-300 hover:scale-110"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <span className={isFavorite ? 'text-red-500' : 'text-black/70'}>
              {isFavorite ? '♥' : '♡'}
            </span>
          </button>
          <button 
            className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm 
                     rounded-full hover:bg-white transition-all duration-300 hover:scale-110"
            aria-label="Quick view"
          >
            <span className="text-black/70">👁️</span>
          </button>
        </div>
      </div>

      {/* Product Image Area - Improved Contrast */}
      <div className={`relative h-64 bg-gradient-to-br ${imageColor} overflow-hidden`}>
        {/* Enhanced overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        
        {/* Product Mockup */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className={`w-36 h-48 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 
                         transform transition-transform duration-700 group-hover:scale-105 
                         ${getTextColor(imageColor)}`}>
            {/* Fabric pattern simulation */}
            <div className="absolute inset-2 border border-white/10 rounded"></div>
          </div>
        </div>

        {/* Artisan info - Better visibility */}
        <div className={`absolute bottom-3 left-3 right-3 transition-all duration-500 
                       ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2">
            <div className="text-xs font-medium text-cream">Crafted by</div>
            <div className="text-sm font-semibold text-yellow-700 truncate">{artisan}</div>
          </div>
        </div>
      </div>

      {/* Product Info - Enhanced Text Visibility */}
      <div className="p-4 space-y-3">
        {/* Category and Rating */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-black/70 tracking-wider uppercase">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-700 text-sm">★</span>
            <span className="text-xs text-black/60">
              {rating}/5 • {reviewCount}
            </span>
          </div>
        </div>

        {/* Product Name - Improved Readability */}
        <h3 className="text-lg font-bold text-black leading-tight line-clamp-2">
          {name}
        </h3>

        {/* Description with better contrast */}
        <p className="text-sm text-black leading-relaxed line-clamp-2 min-h-[40px]">
          {description}
        </p>

        {/* Price Section - Clear Visibility */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-yellow-700">
              {formatPrice(price)}
            </div>
            {originalPrice && (
              <div className="flex items-center gap-2">
                <span className="text-sm line-through text-black/40">
                  {formatPrice(originalPrice)}
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Save {formatPrice(originalPrice - price)}
                </span>
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-col gap-1">
            {stock && stock < 10 && (
              <div className="text-xs text-red-600 font-medium">
                Only {stock} left
              </div>
            )}
            {productionTime && (
              <div className="text-xs text-black/50">
                {productionTime}
              </div>
            )}
          </div>
        </div>

        {/* Materials and Actions */}
        <div className="pt-3 border-t border-yellow-700/10">
          {/* Materials tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {materials.slice(0, 2).map((material, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 text-xs bg-yellow-700/10 text-black rounded-full"
              >
                {material}
              </span>
            ))}
            {materials.length > 2 && (
              <span className="px-2 py-1 text-xs text-black/40">
                +{materials.length - 2}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              className="px-3 py-2 bg-yellow-700 text-black font-medium text-sm rounded-lg
                       hover:bg-kente-yellow transition-colors flex items-center justify-center gap-2"
              aria-label="Add to cart"
            >
              <span>🛒</span>
              <span>Add</span>
            </button>
            <button 
              className="px-3 py-2 border border-yellow-700/30 text-yellow-700 font-medium text-sm rounded-lg
                       hover:bg-yellow-700/5 transition-colors flex items-center justify-center gap-2"
              aria-label="View details"
            >
              <span>🔍</span>
              <span>View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <div className={`absolute inset-0 border-2 border-yellow-700/40 rounded-xl pointer-events-none
                     transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  )

  // List view for premium experience
  const ListView = () => (
    <div 
      ref={cardRef}
      className={`group relative bg-white rounded-xl overflow-hidden transition-all duration-500 
                hover:shadow-xl border border-yellow-700/10
                ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className={`relative w-full md:w-1/3 h-64 md:h-auto bg-gradient-to-br ${imageColor}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3">
            {limitedEdition && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-700/90 text-black 
                            text-xs font-semibold tracking-wider rounded-full">
                <span>★</span>
                <span>LIMITED</span>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex gap-1">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm 
                       rounded-full hover:bg-white transition-all duration-300"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <span className={isFavorite ? 'text-red-500' : 'text-black/70'}>
                {isFavorite ? '♥' : '♡'}
              </span>
            </button>
          </div>

          {/* Product Preview */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className={`w-full h-40 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 
                           ${getTextColor(imageColor)}`}></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs font-medium text-black/70 tracking-wider uppercase">
                    {category}
                  </span>
                  <h3 className="text-xl font-bold text-black mt-1">
                    {name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-700">
                    {formatPrice(price)}
                  </div>
                  {originalPrice && (
                    <div className="text-sm line-through text-black/40">
                      {formatPrice(originalPrice)}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-black leading-relaxed">
                {description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-yellow-700/10">
              <div>
                <div className="text-xs text-black/60 mb-1">Artisan</div>
                <div className="text-sm font-medium text-black">{artisan}</div>
              </div>
              <div>
                <div className="text-xs text-black/60 mb-1">Materials</div>
                <div className="text-sm font-medium text-black">
                  {materials.slice(0, 2).join(', ')}
                </div>
              </div>
              <div>
                <div className="text-xs text-black/60 mb-1">Craft Time</div>
                <div className="text-sm font-medium text-black">
                  {productionTime || '60-100h'}
                </div>
              </div>
              <div>
                <div className="text-xs text-black/60 mb-1">Rating</div>
                <div className="text-sm font-medium text-black">
                  {rating}/5 ({reviewCount} reviews)
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 text-xs bg-yellow-700/10 text-black rounded-full capitalize"
                  >
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="px-4 py-2 bg-yellow-700 text-black font-medium rounded-lg
                           hover:bg-kente-yellow transition-colors flex items-center gap-2"
                  aria-label="Add to cart"
                >
                  <span>🛒</span>
                  <span>Add to Cart</span>
                </button>
                <button 
                  className="px-4 py-2 border border-yellow-700/30 text-yellow-700 font-medium rounded-lg
                           hover:bg-yellow-700/5 transition-colors"
                  aria-label="View details"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Return appropriate view based on mode
  if (viewMode === 'list') {
    return <ListView />
  }

  return <GridView />
}

export default ProductCard