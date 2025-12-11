import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedCollections from '@/components/FeaturedCollections'
import StorySection from '@/components/StorySection'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import OfflineIndicator from '@/components/OfflineIndicator'

export default function Home() {
  return (
    <div>
      <OfflineIndicator />
      <Header />
      <Hero />
      <FeaturedCollections />
      <StorySection />
      <Newsletter />
      <Footer />
      <PWAInstallPrompt />
    </div>
  )
}