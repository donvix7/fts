'use client'

import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || status === 'loading') return
    
    setStatus('loading')
    await new Promise(resolve => setTimeout(resolve, 600))
    
    console.log('Premium subscriber:', email)
    setStatus('success')
    setEmail('')
    
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-black to-earth-brown">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="text-yellow-700 text-sm tracking-wider mb-3">EXCLUSIVE ACCESS</div>
            <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
              Join the <span className="text-yellow-700">Inner Circle</span>
            </h2>
            <p className="text-cream/80">
              First access to collections, exclusive stories, and private events.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            {status === 'success' && (
              <div className="mb-4 p-3 bg-green-50/90 border border-green-200 text-green-800 rounded-lg">
                ✓ Welcome! Check your email.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-cream 
                           placeholder-cream/60 rounded-lg focus:outline-none focus:border-yellow-700"
                  required
                  disabled={status === 'loading'}
                />
              </div>
              
              <button
                type="submit"
                disabled={!email.trim() || status === 'loading'}
                className="w-full py-3 bg-yellow-700 text-black font-semibold rounded-lg 
                         hover:bg-kente-yellow disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? 'Joining...' : 'Join Now'}
              </button>
            </form>

            <div className="mt-4 text-cream/50 text-sm">
              No spam. Unsubscribe anytime.
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 flex justify-center gap-6 text-cream/60">
            <div className="text-center">
              <div className="text-xl text-yellow-700">10K+</div>
              <div className="text-xs">Members</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-yellow-700">98%</div>
              <div className="text-xs">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-yellow-700">24h</div>
              <div className="text-xs">Early Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter