// Background sync for offline actions
export const registerBackgroundSync = () => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      // Register sync for cart items
      registration.sync.register('sync-cart')
        .then(() => console.log('Background sync registered'))
        .catch(err => console.error('Background sync failed:', err))
    })
  }
}

// Sync offline cart when back online
export const syncOfflineCart = async () => {
  const offlineCart = JSON.parse(localStorage.getItem('offline-cart') || '[]')
  
  if (offlineCart.length > 0) {
    try {
      // Send each item to server
      for (const item of offlineCart) {
        await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        })
      }
      
      // Clear offline cart
      localStorage.removeItem('offline-cart')
      console.log('Offline cart synced successfully')
      
    } catch (error) {
      console.error('Failed to sync offline cart:', error)
    }
  }
}