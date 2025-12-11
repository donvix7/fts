'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import ProductCard from './ProductCard'

// Enhanced product data with premium details
const PRODUCTS_DATA = [
  {
    id: 1,
    name: 'Kente Silk Haute Couture Gown',
    description: 'Handwoven Kente silk with 24k yellow-700 thread embroidery',
    price: 2850,
    originalPrice: 3800,
    category: 'Evening Wear',
    imageColor: 'from-kente-yellow/90 to-kente-red/90',
    tags: ['limited', 'couture', 'best-seller'],
    materials: ['Silk', 'yellow-700 Thread', 'French Lace'],
    artisan: 'Master Weaver Kwame',
    productionTime: '300 hours',
    limitedEdition: true,
    stock: 8
  },
  {
    id: 2,
    name: 'Adinkra Symbol Tailored Blazer',
    description: 'Italian wool blazer with hand-embroidered Adinkra symbols',
    price: 1420,
    category: 'Formal Wear',
    imageColor: 'from-black/90 to-earth-brown/90',
    tags: ['tailored', 'luxury'],
    materials: ['Italian Wool', 'Mother-of-Pearl Buttons'],
    artisan: 'Tailor Aisha',
    productionTime: '80 hours'
  },
  {
    id: 3,
    name: 'Bogolan Artisanal Leather Jacket',
    description: 'Hand-painted Malian mud cloth on premium leather',
    price: 2675,
    originalPrice: 3200,
    category: 'Outerwear',
    imageColor: 'from-kente-blue/90 to-kente-green/90',
    tags: ['limited', 'hand-painted'],
    materials: ['Full-Grain Leather', 'Natural Dyes'],
    artisan: 'Mud Cloth Masters',
    productionTime: '120 hours',
    limitedEdition: true,
    stock: 12
  },
  {
    id: 4,
    name: 'Modern Dashiki Silk Shirt',
    description: 'Contemporary dashiki in French silk with Swarovski details',
    price: 895,
    category: 'Casual Luxury',
    imageColor: 'from-yellow-700/90 to-kente-red/90',
    tags: ['new', 'casual-luxury'],
    materials: ['French Silk', 'Swarovski Crystals'],
    artisan: 'Design Collective',
    productionTime: '45 hours'
  },
  {
    id: 5,
    name: 'Ankara Print Silk Dress',
    description: 'Vibrant Ankara print in luxury silk with modern cut',
    price: 1320,
    category: 'Daywear',
    imageColor: 'from-kente-green/90 to-kente-blue/90',
    tags: ['best-seller', 'new'],
    materials: ['Silk Charmeuse', 'Hand-Printed'],
    artisan: 'Print Artisans',
    productionTime: '60 hours'
  },
  {
    id: 6,
    name: 'Kente Wool-Cashmere Coat',
    description: 'Winter coat with Kente patterned lining in cashmere blend',
    price: 2720,
    originalPrice: 3400,
    category: 'Outerwear',
    imageColor: 'from-earth-brown/90 to-black/90',
    tags: ['limited', 'luxury'],
    materials: ['Cashmere-Wool Blend', 'Silk Lining'],
    artisan: 'Master Tailors',
    productionTime: '150 hours',
    limitedEdition: true,
    stock: 15
  },
  {
    id: 7,
    name: 'Adire Wrap Silk Skirt',
    description: 'Asymmetrical wrap skirt in hand-dyed Adire silk',
    price: 1280,
    category: 'Skirts',
    imageColor: 'from-yellow-700/90 to-kente-green/90',
    tags: ['hand-dyed', 'new'],
    materials: ['Silk', 'Vegetable Dyes'],
    artisan: 'Adire Artisans',
    productionTime: '75 hours'
  },
  {
    id: 8,
    name: 'Maasai Beaded Evening Gown',
    description: 'Hand-beaded gown with Maasai-inspired patterns',
    price: 4200,
    category: 'Evening Wear',
    imageColor: 'from-kente-red/90 to-yellow-700/90',
    tags: ['couture', 'limited', 'heirloom'],
    materials: ['Silk Organza', 'Glass Beads', 'Silver Thread'],
    artisan: 'Beadwork Masters',
    productionTime: '400 hours',
    limitedEdition: true,
    stock: 5
  }
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured', icon: '★' },
  { value: 'price-asc', label: 'Price: Low to High', icon: '↑' },
  { value: 'price-desc', label: 'Price: High to Low', icon: '↓' },
  { value: 'newest', label: 'New Arrivals', icon: '🆕' },
  { value: 'limited', label: 'Limited Edition', icon: '🎯' },
  { value: 'best-seller', label: 'Best Sellers', icon: '🔥' }
]

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Collections', icon: '🛍️' },
  { value: 'Evening Wear', label: 'Evening Couture', icon: '✨' },
  { value: 'Casual Luxury', label: 'Casual Luxury', icon: '👔' },
  { value: 'Formal Wear', label: 'Formal Tailoring', icon: '🎩' },
  { value: 'Outerwear', label: 'Luxury Outerwear', icon: '🧥' },
  { value: 'Daywear', label: 'Daywear', icon: '👗' },
  { value: 'Skirts', label: 'Skirts & Dresses', icon: '👚' }
]

const ProductGrid = () => {
  const [sortBy, setSortBy] = useState('featured')
  const [category, setCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedTags, setSelectedTags] = useState([])

  // Filter and sort products with premium logic
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...PRODUCTS_DATA]
    
    // Filter by category
    if (category !== 'all') {
      products = products.filter(product => product.category === category)
    }
    
    // Filter by price range
    products = products.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      products = products.filter(product => 
        product.tags && selectedTags.some(tag => product.tags.includes(tag))
      )
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        products.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        products.sort((a, b) => b.id - a.id)
        break
      case 'limited':
        products.sort((a, b) => (b.limitedEdition ? 1 : 0) - (a.limitedEdition ? 1 : 0))
        break
      case 'best-seller':
        products.sort((a, b) => 
          (b.tags?.includes('best-seller') ? 1 : 0) - (a.tags?.includes('best-seller') ? 1 : 0)
        )
        break
      case 'featured':
      default:
        // Featured items first (limited edition, then best sellers, then others)
        products.sort((a, b) => {
          const aScore = (a.limitedEdition ? 3 : 0) + (a.tags?.includes('best-seller') ? 2 : 0) + (a.tags?.includes('new') ? 1 : 0)
          const bScore = (b.limitedEdition ? 3 : 0) + (b.tags?.includes('best-seller') ? 2 : 0) + (b.tags?.includes('new') ? 1 : 0)
          return bScore - aScore
        })
    }
    
    return products
  }, [sortBy, category, priceRange, selectedTags])
  
  // Extract unique tags for filter
  const allTags = useMemo(() => {
    const tags = new Set()
    PRODUCTS_DATA.forEach(product => {
      if (product.tags) {
        product.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags)
  }, [])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedProducts, currentPage, itemsPerPage])
  
  // Handlers
  const handleSortChange = useCallback((value) => {
    setSortBy(value)
    setCurrentPage(1)
  }, [])

  const handleCategoryChange = useCallback((value) => {
    setCategory(value)
    setCurrentPage(1)
  }, [])

  const handleTagToggle = useCallback((tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
    setCurrentPage(1)
  }, [])

  const handlePriceChange = useCallback((min, max) => {
    setPriceRange([min, max])
    setCurrentPage(1)
  }, [])

  const clearFilters = useCallback(() => {
    setSortBy('featured')
    setCategory('all')
    setPriceRange([0, 5000])
    setSelectedTags([])
    setCurrentPage(1)
  }, [])

  // Render pagination with premium styling
  const renderPagination = () => {
    if (totalPages <= 1) return null
    
    const getPageNumbers = () => {
      const delta = 2
      const range = []
      const rangeWithDots = []
      let l = 0

      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
          range.push(i)
        }
      }

      range.forEach(i => {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1)
          } else if (i - l !== 1) {
            rangeWithDots.push('...')
          }
        }
        rangeWithDots.push(i)
        l = i
      })

      return rangeWithDots
    }

    return (
      <div className="mt-12 pt-8 border-t border-yellow-700/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-black/60">
            Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} luxury pieces
          </div>
          
          <nav className="flex items-center space-x-2" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border border-yellow-700/30 
                       text-black hover:border-yellow-700 hover:bg-yellow-700/5 disabled:opacity-30 
                       rounded-lg transition-all group"
              aria-label="Previous page"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
            </button>
            
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-3 text-black/30">
                  ⋯
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center border text-sm rounded-lg transition-all
                           ${currentPage === page 
                             ? 'border-yellow-700 bg-yellow-700 text-black font-semibold shadow-lg' 
                             : 'border-yellow-700/20 text-black hover:border-yellow-700 hover:bg-yellow-700/5'
                           }`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border border-yellow-700/30 
                       text-black hover:border-yellow-700 hover:bg-yellow-700/5 disabled:opacity-30 
                       rounded-lg transition-all group"
              aria-label="Next page"
            >
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </nav>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-black/60">Show:</span>
            <select 
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="text-sm border border-yellow-700/20 bg-white/50 rounded-lg px-2 py-1 focus:outline-none focus:border-yellow-700"
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  // Calculate total value
  const totalCollectionValue = useMemo(() => {
    return filteredAndSortedProducts.reduce((sum, product) => sum + product.price, 0)
  }, [filteredAndSortedProducts])

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="border-b border-yellow-700/10 pb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-cormorant font-light text-black mb-2">
              Curated <span className="font-semibold text-yellow-700">Masterpieces</span>
            </h1>
            <p className="text-black/60 max-w-2xl">
              Discover our exclusive collection of handcrafted luxury pieces, each telling a unique story of heritage and craftsmanship.
            </p>
          </div>
          
          <div className="bg-yellow-700/5 border border-yellow-700/20 rounded-xl p-4 min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-black/60 text-sm">Collection Value</span>
              <span className="text-yellow-700 font-semibold">
                ${totalCollectionValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-black/60 text-sm">Average Craft Time</span>
              <span className="text-yellow-700 font-semibold">150h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Filter Bar */}
      <div className="space-y-6">
        {/* Main filter controls */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sort and category */}
          <div className="flex flex-wrap items-center gap-4">
            {/* View toggle */}
            <div className="flex items-center border border-yellow-700/20 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 transition-all ${viewMode === 'grid' ? 'bg-yellow-700 text-black' : 'text-black/70 hover:bg-yellow-700/5'}`}
                aria-label="Grid view"
              >
                ▦
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 transition-all ${viewMode === 'list' ? 'bg-yellow-700 text-black' : 'text-black/70 hover:bg-yellow-700/5'}`}
                aria-label="List view"
              >
                ☰
              </button>
            </div>
            
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="pl-10 pr-8 py-2.5 bg-white border border-yellow-700/30 text-black 
                         rounded-lg appearance-none cursor-pointer focus:outline-none 
                         focus:border-yellow-700 focus:ring-2 focus:ring-yellow-700/20 min-w-[200px]"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-700">
                {SORT_OPTIONS.find(o => o.value === sortBy)?.icon}
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Category dropdown */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="pl-10 pr-8 py-2.5 bg-white border border-yellow-700/30 text-black 
                         rounded-lg appearance-none cursor-pointer focus:outline-none 
                         focus:border-yellow-700 focus:ring-2 focus:ring-yellow-700/20 min-w-[200px]"
              >
                {CATEGORY_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-700">
                {CATEGORY_OPTIONS.find(c => c.value === category)?.icon}
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-black/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Active filters display */}
          {(category !== 'all' || selectedTags.length > 0 || sortBy !== 'featured' || priceRange[0] > 0 || priceRange[1] < 5000) && (
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-black/60 text-sm">Active:</span>
              {category !== 'all' && (
                <button
                  onClick={() => setCategory('all')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-700/10 text-yellow-700 
                           text-xs rounded-full hover:bg-yellow-700/20 transition-all group"
                >
                  {CATEGORY_OPTIONS.find(c => c.value === category)?.label}
                  <span className="group-hover:scale-110 transition-transform">×</span>
                </button>
              )}
              {selectedTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-700/10 text-yellow-700 
                           text-xs rounded-full hover:bg-yellow-700/20 transition-all group capitalize"
                >
                  {tag.replace('-', ' ')}
                  <span className="group-hover:scale-110 transition-transform">×</span>
                </button>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                <button
                  onClick={() => setPriceRange([0, 5000])}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-700/10 text-yellow-700 
                           text-xs rounded-full hover:bg-yellow-700/20 transition-all group"
                >
                  ${priceRange[0]} - ${priceRange[1]}
                  <span className="group-hover:scale-110 transition-transform">×</span>
                </button>
              )}
              <button
                onClick={clearFilters}
                className="text-black/60 hover:text-yellow-700 text-xs transition-colors ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-black/60 text-sm mr-2">Filter by:</span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-all capitalize ${
                selectedTags.includes(tag)
                  ? 'border-yellow-700 bg-yellow-700 text-black'
                  : 'border-yellow-700/20 text-black/70 hover:border-yellow-700 hover:text-yellow-700'
              }`}
            >
              {tag.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Price range slider */}
        <div className="max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-black/60">Price range</span>
            <span className="text-sm text-yellow-700 font-medium">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <div className="flex gap-4">
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
              className="w-full accent-yellow-700"
            />
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
              className="w-full accent-yellow-700"
            />
          </div>
        </div>
      </div>

      {/* Product Grid/List */}
      {paginatedProducts.length > 0 ? (
        <>
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' : 'space-y-6'}`}>
            {paginatedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                viewMode={viewMode}
                premium={true}
              />
            ))}
          </div>
          
          {/* Premium Pagination */}
          {renderPagination()}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="text-black/20 text-6xl mb-6" aria-hidden="true">
            ✨
          </div>
          <h3 className="text-2xl font-cormorant font-light text-black mb-4">
            No Masterpieces Found
          </h3>
          <p className="text-black/60 mb-8 max-w-md mx-auto">
            Adjust your filters to discover our exclusive collection of handcrafted luxury pieces.
          </p>
          <button
            onClick={clearFilters}
            className="px-8 py-3 bg-yellow-700 text-black font-medium rounded-lg 
                     hover:bg-kente-yellow transition-colors shadow-lg hover:shadow-xl"
          >
            View Entire Collection
          </button>
        </div>
      )}

      {/* Collection Summary */}
      {paginatedProducts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-yellow-700/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/50 border border-yellow-700/10 rounded-xl">
              <div className="text-3xl font-cormorant font-light text-yellow-700 mb-2">
                {filteredAndSortedProducts.length}
              </div>
              <div className="text-black font-medium">Luxury Pieces</div>
              <div className="text-black/60 text-sm mt-1">Handcrafted with care</div>
            </div>
            <div className="text-center p-6 bg-white/50 border border-yellow-700/10 rounded-xl">
              <div className="text-3xl font-cormorant font-light text-yellow-700 mb-2">
                {new Set(filteredAndSortedProducts.map(p => p.artisan)).size}
              </div>
              <div className="text-black font-medium">Master Artisans</div>
              <div className="text-black/60 text-sm mt-1">Direct partnerships</div>
            </div>
            <div className="text-center p-6 bg-white/50 border border-yellow-700/10 rounded-xl">
              <div className="text-3xl font-cormorant font-light text-yellow-700 mb-2">
                {filteredAndSortedProducts.filter(p => p.limitedEdition).length}
              </div>
              <div className="text-black font-medium">Limited Editions</div>
              <div className="text-black/60 text-sm mt-1">Exclusive availability</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductGrid