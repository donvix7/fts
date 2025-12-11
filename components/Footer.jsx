import { FaInstagram, FaPinterest, FaFacebook, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  const footerLinks = {
    'Shop': ['New Arrivals', 'Collections', 'Best Sellers', 'Sale'],
    'Brand': ['Our Story', 'Artisans', 'Sustainability', 'Journal'],
    'Support': ['Contact Us', 'Shipping Info', 'Returns', 'Size Guide'],
    'Legal': ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
  }

  const socialIcons = [
    { icon: <FaInstagram />, label: 'Instagram' },
    { icon: <FaPinterest />, label: 'Pinterest' },
    { icon: <FaFacebook />, label: 'Facebook' },
    { icon: <FaTwitter />, label: 'Twitter' }
  ]

  return (
    <footer className="bg-black text-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-4xl font-cormorant font-bold text-cream inline-block mb-6">
              Adinkra
              <span className="text-yellow-700 text-3xl">®</span>
            </Link>
            <p className="text-cream/70 mb-8 max-w-md">
              A luxury fashion brand celebrating African heritage through contemporary design. 
              Each piece is a testament to traditional craftsmanship and modern elegance.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-cream/30 
                           text-cream hover:bg-yellow-700 hover:text-black 
                           hover:border-yellow-700 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xl font-semibold mb-6 text-yellow-700">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-cream/70 hover:text-yellow-700 hover:pl-2 transition-all duration-300"
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
        <div className="border-t border-cream/20 my-12"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-cream/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Adinkra Luxury Fashion. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="mr-2 text-cream/60">Secure payments:</span>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-cream/20 rounded"></div>
                <div className="w-10 h-6 bg-cream/20 rounded"></div>
                <div className="w-10 h-6 bg-cream/20 rounded"></div>
              </div>
            </div>
            
            <div className="text-cream/60 text-sm">
              Crafted with <span className="text-yellow-700">♥</span> from Africa to the World
            </div>
          </div>
        </div>
      </div>

      {/* Decorative border */}
      <div className="h-1 bg-gradient-to-r from-yellow-700 via-kente-red to-kente-green"></div>
    </footer>
  )
}

export default Footer