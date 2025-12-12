'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import icons (reduces initial bundle size)
const IconLoader = ({ name, size = 20, className = '' }) => {
  const [Icon, setIcon] = useState(null)
  
  useEffect(() => {
    const loadIcon = async () => {
      const { [name]: IconComponent } = await import('react-icons/fa')
      setIcon(() => IconComponent)
    }
    loadIcon()
  }, [name])
  
  return Icon ? <Icon size={size} className={className} /> : null
}

// Constants moved outside component to prevent re-creation
const ANNOUNCEMENT_TEXT = "FREE EXPRESS SHIPPING ON ORDERS OVER $1,000 • COMPLIMENTARY ALTERATIONS"

const NAV_ITEMS = [
  { 
    name: 'Collections', 
    href: '/products',
    dropdown: [
      { name: 'Haute Couture', href: '/collections/couture', limited: true },
      { name: 'Ready-to-Wear', href: '/collections/ready-to-wear' },
      { name: 'Limited Editions', href: '/collections/limited', limited: true },
      { name: 'Archival Pieces', href: '/collections/archival' }
    ]
  },
  { 
    name: 'Designers', 
    href: '/designers',
    dropdown: [
      { name: 'Master Artisans', href: '/designers/artisans' },
      { name: 'Emerging Talent', href: '/designers/emerging' },
      { name: 'Collaborations', href: '/designers/collaborations' }
    ]
  },
  { 
    name: 'Craftsmanship', 
    href: '/craftsmanship',
    dropdown: [
      { name: 'Traditional Techniques', href: '/craftsmanship/techniques' },
      { name: 'Material Sourcing', href: '/craftsmanship/materials' },
      { name: 'Artisan Stories', href: '/craftsmanship/stories' }
    ]
  },
  { name: 'Journal', href: '/journal' },
  { name: 'Private Client', href: '/private-client', premium: true },
]

const Header = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isClient, setIsClient] = useState(false)

  // Memoized values
  const headerClasses = useMemo(() => 
    `fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-cream/95 backdrop-blur-md shadow-sm' 
        : 'bg-transparent backdrop-blur-sm'
    }`,
    [isScrolled]
  )

  // Handlers
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)
  }, [])

  const handleDropdownEnter = useCallback((index) => {
    setActiveDropdown(index)
  }, [])

  const handleDropdownLeave = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev)
  }, [])

  // Close menu on route change
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Effects
  useEffect(() => {
    setIsClient(true)
    
    const handleScrollThrottled = () => {
      let ticking = false
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScrollThrottled, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled)
    }
  }, [handleScroll])

  // Close dropdowns on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        setIsSearchOpen(false)
        setActiveDropdown(null)
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Don't render on server
  if (!isClient) {
    return (
      <header className={headerClasses} style={{ top: '40px' }}>
        {/* Skeleton loader */}
        <div className="container mx-auto px-4 py-4">
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </header>
    )
  }

  return (
    <>
      {/* Optimized Top Announcement Bar - Only text, no icons */}
      <div className="fixed top-0 left-0 right-0 bg-black z-60">
        <div className="container mx-auto px-4 py-2">
          <div className="text-center">
            <p className="text-cream text-sm tracking-wider truncate">
              {ANNOUNCEMENT_TEXT}
            </p>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={headerClasses} style={{ top: '40px' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo - Optimized */}
            <Link 
              href="/" 
              className="group relative focus:outline-none focus:ring-2 focus:ring-yellow-700/30 rounded"
              aria-label="From This Side Home"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-700 to-earth-brown 
                              rounded-full flex items-center justify-center">
                  <span className="text-cream font-bold text-sm">A</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-cormorant font-bold text-black 
                                 tracking-tight leading-none">
                    From This Side
                  </span>
                  <span className="text-[10px] text-black/60 tracking-widest 
                                  font-light">
                    HAUTE COUTURE
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center" aria-label="Main navigation">
              {NAV_ITEMS.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(index)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm tracking-wider transition-colors duration-200 ${
                      activeDropdown === index
                        ? 'text-yellow-700'
                        : 'text-black hover:text-yellow-700'
                    }`}
                    aria-haspopup={item.dropdown ? 'true' : undefined}
                    aria-expanded={activeDropdown === index}
                  >
                    {item.name}
                    {item.dropdown && (
                      <span className="ml-1 text-xs">▼</span>
                    )}
                  </Link>

                  {/* Dropdown Menu - Lazy loaded */}
                  {item.dropdown && activeDropdown === index && (
                    <div 
                      className="absolute top-full left-0 pt-2"
                      role="menu"
                    >
                      <div className="bg-cream border border-yellow-700/20 shadow-lg 
                                    rounded min-w-[200px] overflow-hidden">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-3 text-sm text-black 
                                     hover:bg-yellow-700/5 hover:text-yellow-700 transition-colors
                                     border-b border-yellow-700/10 last:border-b-0"
                            role="menuitem"
                            onClick={closeMenu}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={toggleSearch}
                  className="p-2 text-black/70 hover:text-yellow-700 transition-colors"
                  aria-label="Search"
                >
                  <IconLoader name="FaSearch" size={18} />
                </button>
                
                {/* Search Overlay */}
                {isSearchOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-cream border 
                                border-yellow-700/20 shadow-lg rounded w-64 p-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-3 py-2 bg-white border border-yellow-700/30 
                                 text-black placeholder-black/40 
                                 focus:outline-none focus:border-yellow-700 rounded text-sm"
                        autoFocus
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Favorites */}
              <button 
                className="p-2 text-black/70 hover:text-yellow-700 transition-colors relative"
                aria-label="Favorites"
              >
                <IconLoader name="FaHeart" size={18} />
                <span className="absolute -top-1 -right-1 bg-kente-red text-cream text-[10px] 
                               w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Account - Hidden on mobile */}
              <Link
                href="/account"
                className="hidden md:flex items-center space-x-1 p-2 text-black/70 
                         hover:text-yellow-700 transition-colors"
                aria-label="Account"
              >
                <div className="w-7 h-7 rounded-full border border-yellow-700/30 
                              flex items-center justify-center">
                  <IconLoader name="FaUser" size={12} />
                </div>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 text-black/70 hover:text-yellow-700 transition-colors relative"
                aria-label="Shopping Cart"
              >
                <IconLoader name="FaShoppingBag" size={18} />
                <span className="absolute -top-1 -right-1 bg-yellow-700 text-black text-[10px] 
                               w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 text-black/70 hover:text-yellow-700 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <IconLoader name="FaTimes" size={20} />
                ) : (
                  <IconLoader name="FaBars" size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Simplified */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-cream border-t 
                        border-yellow-700/20 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              {/* Search in mobile */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-3 bg-white border border-yellow-700/30 
                             text-black placeholder-black/40 
                             focus:outline-none focus:border-yellow-700 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Mobile Menu Items */}
              <nav className="space-y-1" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-3 py-3 text-black hover:text-yellow-700 
                               transition-colors border-b border-yellow-700/10"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Mobile Dropdown */}
                    {item.dropdown && (
                      <div className="ml-4">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-3 py-2 text-sm text-black/70 
                                     hover:text-yellow-700 transition-colors"
                            onClick={closeMenu}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-6 pt-4 border-t border-yellow-700/20">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/account"
                    className="px-4 py-3 border border-yellow-700 text-yellow-700 rounded-lg 
                             text-center text-sm hover:bg-yellow-700 hover:text-black 
                             transition-colors"
                    onClick={closeMenu}
                  >
                    ACCOUNT
                  </Link>
                  <button
                    className="px-4 py-3 bg-yellow-700 text-black rounded-lg 
                             text-center text-sm hover:bg-kente-yellow transition-colors"
                    onClick={closeMenu}
                  >
                    CONSULT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header