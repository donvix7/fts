'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import icons
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

// Constants
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isClient, setIsClient] = useState(false)

  // Darker background with blur - using lighter text
  const headerClasses = useMemo(() => 
    `fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl shadow-xl shadow-black/20' 
        : 'bg-gray-900/90 backdrop-blur-lg'
    }`,
    [isScrolled]
  )

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

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

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

  if (!isClient) {
    return (
      <header className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-xl" style={{ top: '40px' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="h-10 bg-gray-800 animate-pulse rounded"></div>
        </div>
      </header>
    )
  }

  return (
    <>
      {/* Announcement Bar - Light text on dark */}
      <div className="fixed top-0 left-0 right-0 bg-gray-950 z-60">
        <div className="container mx-auto px-4 py-3">
          <div className="text-center">
            <p className="text-white text-sm font-medium tracking-wider truncate">
              {ANNOUNCEMENT_TEXT}
            </p>
          </div>
        </div>
      </div>

      {/* Main Header - Dark Background with Light Text */}
      <header className={headerClasses} style={{ top: '40px' }}>
        <div className="container mx-auto px-4 text-white">
          <div className="flex items-center justify-between py-4">
            {/* Logo - White text */}
            <Link 
              href="/" 
              className="group relative focus:outline-none focus:ring-2 focus:ring-yellow-400/50 rounded-lg p-1"
              aria-label="From This Side Home"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gradient-to-br from-yellow-500 to-yellow-600 
                              rounded-full flex items-center justify-center ring-2 ring-yellow-400/50
                              shadow-lg shadow-yellow-500/20">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-cormorant font-bold text-white 
                                 tracking-tight leading-none">
                    From This Side
                  </span>
                  <span className="text-[10px] text-yellow-200 tracking-widest 
                                  font-medium">
                    Get your fits form this side
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Light Text */}
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
                    className={`flex items-center px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-200 ${
                      activeDropdown === index
                        ? 'text-yellow-300'
                        : 'text-white hover:text-yellow-300'
                    }`}
                    aria-haspopup={item.dropdown ? 'true' : undefined}
                    aria-expanded={activeDropdown === index}
                  >
                    {item.name}
                    {item.dropdown && (
                      <span className="ml-1.5 text-xs opacity-80">▼</span>
                    )}
                  </Link>

                  {/* Dropdown with glassmorphism - Light text */}
                  {item.dropdown && activeDropdown === index && (
                    <div 
                      className="absolute top-full left-0 pt-3"
                      role="menu"
                    >
                      <div className="bg-gray-900/98 backdrop-blur-xl border border-gray-700/80 
                                    shadow-2xl shadow-black/50 rounded-lg min-w-[240px] overflow-hidden
                                    ring-1 ring-gray-600/50">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-6 py-4 text-sm font-medium text-gray-100 
                                     hover:text-white transition-all duration-200
                                     border-b border-gray-800/60 last:border-b-0
                                     hover:bg-gray-800/60 hover:pl-7 group"
                            role="menuitem"
                            onClick={closeMenu}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{dropdownItem.name}</span>
                              {dropdownItem.limited && (
                                <span className="text-[10px] bg-yellow-500/20 text-yellow-200 
                                               px-2 py-1 rounded-full border border-yellow-400/30
                                               font-bold tracking-wider">
                                  LIMITED
                                </span>
                              )}
                            </div>
                            <div className="h-px bg-gradient-to-r from-transparent via-yellow-500/30 
                                          to-transparent w-0 group-hover:w-full transition-all 
                                          duration-300 mt-3"></div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Action Icons - Light Colors */}
            <div className="flex items-center space-x-3">

             

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2.5 text-white hover:text-yellow-300 transition-colors
                         hover:bg-gray-800/60 rounded-lg"
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <IconLoader name="FaTimes" size={22} />
                ) : (
                  <IconLoader name="FaBars" size={22} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Glass effect with Light Text */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/98 backdrop-blur-xl 
                        border-t border-gray-700/80 shadow-2xl shadow-black/50 max-h-[80vh] overflow-y-auto">
            <div className="container mx-auto px-4 py-8">
             

              {/* Mobile Menu Items - Light Text */}
              <nav className="space-y-1 mb-8 text-white" aria-label="Mobile navigation">
                {NAV_ITEMS.map((item) => (
                  <div key={item.name} className="mb-3">
                    <Link
                      href={item.href}
                      className="block px-5 py-4 text-white hover:text-yellow-300 
                               transition-colors rounded-xl hover:bg-gray-800/60
                               border border-transparent hover:border-gray-700/80
                               font-medium text-lg"
                      onClick={closeMenu}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.name}</span>
                        {item.dropdown && (
                          <IconLoader name="FaChevronRight" size={16} className="text-gray-400" />
                        )}
                      </div>
                    </Link>
                    
                    {/* Mobile Dropdown */}
                    {item.dropdown && (
                      <div className="ml-6 mt-2 pl-4 border-l border-gray-700/60 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-5 py-3 text-gray-200 hover:text-white 
                                     transition-colors rounded-lg hover:bg-gray-800/50
                                     text-base font-medium"
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
              <div className="mt-6 pt-6 border-t border-gray-700/60">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <button
                    className="px-6 py-4 border border-yellow-500/50 text-yellow-300 
                             rounded-xl text-center text-base font-semibold hover:bg-yellow-500/10 
                             transition-colors hover:border-yellow-400
                             bg-gradient-to-r from-gray-900/60 to-gray-800/40"
                    onClick={closeMenu}
                  >
                    <Link href="/account">
                    ACCOUNT
                    </Link>
                  </button >
                  <button
                    className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 
                             text-gray-900 rounded-xl text-center text-base font-semibold 
                             hover:from-yellow-400 hover:to-yellow-500 transition-all
                             shadow-lg shadow-yellow-500/30"
                    onClick={closeMenu}
                  >
                    CONSULT
                  </button>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-4 mb-8 text-white">
                  <a href="/contact" className="text-gray-300 hover:text-white text-sm font-medium">
                    Contact Us
                  </a>
                  <a href="/shipping" className="text-gray-300 hover:text-white text-sm font-medium">
                    Shipping Info
                  </a>
                  <a href="/returns" className="text-gray-300 hover:text-white text-sm font-medium">
                    Returns & Exchanges
                  </a>
                  <a href="/sizing" className="text-gray-300 hover:text-white text-sm font-medium">
                    Size Guide
                  </a>
                </div>

                {/* Mobile Footer */}
                <div className="pt-6 border-t border-gray-700/60">
                  <div className="text-center space-y-3">
                    <p className="text-gray-300 text-sm">
                      Need immediate assistance?
                    </p>
                    <a 
                      href="tel:+1234567890" 
                      className="text-white text-xl font-semibold hover:text-yellow-300 block"
                    >
                      +1 (234) 567-890
                    </a>
                    <p className="text-gray-400 text-xs mt-4">
                      Mon-Fri: 9AM-6PM EST • Sat: 10AM-4PM EST
                    </p>
                  </div>
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