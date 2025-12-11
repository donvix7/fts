import Header from '@/components/Header'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  return (
    <div>
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="section-title">Our Collection</h1>
          <p className="text-center max-w-2xl mx-auto mb-12 text-lg">
            Discover our exclusive collection of premium African-inspired fashion pieces, 
            each telling a story of heritage and craftsmanship.
          </p>
          <ProductGrid />
        </div>
      </div>
      <Footer />
    </div>
  )
}