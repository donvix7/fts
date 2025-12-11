'use client'

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📶</div>
        <h1 className="text-3xl font-bold text-african-brown mb-4">
          You're Offline
        </h1>
        <p className="text-african-brown/70 mb-8">
          It looks like you've lost your connection. Please check your network and try again.
        </p>
        <div className="space-y-4">
          <div className="bg-white/50 p-4 rounded-lg border border-gold/20">
            <h3 className="font-semibold text-gold mb-2">While you're offline:</h3>
            <ul className="text-sm text-african-brown/70 space-y-1">
              <li>• Browse previously viewed products</li>
              <li>• Review your saved items</li>
              <li>• Read artisan stories</li>
            </ul>
          </div>
          <button
            onClick={handleRetry}
            className="w-full py-3 bg-gold text-african-brown font-semibold rounded-lg 
                     hover:bg-kente-yellow transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  )
}