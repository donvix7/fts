import { FaInstagram, FaPinterest, FaFacebook, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    { 
      category: 'Shop', 
      links: ['New Arrivals', 'Collections', 'Best Sellers', 'Sale']
    },
    { 
      category: 'Brand', 
      links: ['Our Story', 'Artisans', 'Sustainability', 'Journal']
    },
    { 
      category: 'Support', 
      links: ['Contact Us', 'Shipping Info', 'Returns', 'Size Guide']
    },
    { 
      category: 'Legal', 
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
    }
  ]

  const socialLinks = [
    { icon: <FaInstagram />, label: 'Instagram', href: 'https://instagram.com' },
    { icon: <FaPinterest />, label: 'Pinterest', href: 'https://pinterest.com' },
    { icon: <FaFacebook />, label: 'Facebook', href: 'https://facebook.com' },
    { icon: <FaTwitter />, label: 'Twitter', href: 'https://twitter.com' }
  ]

  const paymentMethods = ['Visa', 'Mastercard', 'PayPal']
  const additionalLinks = [
    'Accessibility Statement',
    'Modern Slavery Statement', 
    'Carbon Neutral Initiative',
    'Artisan Partnerships'
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Top accent line - simplified */}
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500"></div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link 
              href="/" 
              className="text-3xl lg:text-4xl font-cormorant font-bold text-white inline-block mb-4 hover:text-yellow-300 transition-colors"
              aria-label="From This Side - Home"
            >
              From This Side
              <span className="text-yellow-400 text-2xl lg:text-3xl">®</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md text-base lg:text-lg leading-relaxed">
              A luxury fashion brand celebrating African heritage through contemporary design. 
              Each piece is a testament to traditional craftsmanship and modern elegance.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-gray-600 
                           text-white hover:bg-yellow-500 hover:text-gray-900 
                           hover:border-yellow-500 transition-all duration-200 rounded-full"
                  aria-label={`Follow us on ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.category}>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                {section.category}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-yellow-300 transition-colors block py-1"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 lg:my-12 border-t border-gray-800"></div>

        {/* Bottom section - optimized */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <div className="text-gray-400 text-sm lg:text-base text-center lg:text-left">
            © {currentYear} From This Side Luxury Fashion. All rights reserved.
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Secure payments */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Secure payments:</span>
              <div className="flex space-x-2">
                {paymentMethods.map((method) => (
                  <div 
                    key={method}
                    className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300"
                    aria-label={`Accepts ${method}`}
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Crafted with love */}
            <div className="text-gray-400 text-sm flex items-center">
              <span className="mr-1">Crafted with</span>
              <span className="text-yellow-400" aria-label="love">♥</span>
              <span className="ml-1">from Africa</span>
            </div>
          </div>
        </div>

        {/* Additional links */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {additionalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-yellow-300 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600"></div>
    </footer>
  )
}

export default Footer