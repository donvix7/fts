'use client'

import { useState, useEffect } from 'react'

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsStandalone(true)
      return
    }

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase()
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
    setIsIOS(isIOSDevice)

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }
    
    setDeferredPrompt(null)
    setIsVisible(false)
  }

  const handleIOSInstructions = () => {
    setIsVisible(false)
    // You could show a modal with iOS instructions here
    alert("To install this app on your iOS device:\n1. Tap the Share button\n2. Scroll down and tap 'Add to Home Screen'\n3. Tap 'Add' in the top right")
  }

  if (isStandalone || !isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fadeInUp">
      <div className="bg-white rounded-xl shadow-2xl border border-gold/20 p-4 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gold to-kente-yellow 
                        rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">✨</span>
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-african-brown mb-1">
              Install From This Side App
            </h3>
            <p className="text-sm text-african-brown/70 mb-3">
              Get the best shopping experience with our app
            </p>
            
            <div className="flex gap-2">
              {isIOS ? (
                <button
                  onClick={handleIOSInstructions}
                  className="flex-1 px-4 py-2 bg-gold text-african-brown font-medium 
                           rounded-lg hover:bg-kente-yellow transition-colors text-sm"
                >
                  Add to Home Screen
                </button>
              ) : (
                <button
                  onClick={handleInstallClick}
                  className="flex-1 px-4 py-2 bg-gold text-african-brown font-medium 
                           rounded-lg hover:bg-kente-yellow transition-colors text-sm"
                >
                  Install App
                </button>
              )}
              
              <button
                onClick={() => setIsVisible(false)}
                className="px-4 py-2 border border-gold/30 text-gold font-medium 
                         rounded-lg hover:bg-gold/5 transition-colors text-sm"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PWAInstallPrompt