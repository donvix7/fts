'use client'

import { useState, useEffect } from 'react'

const StorySection = () => {
  const [activeStory, setActiveStory] = useState(0)

  const storyPoints = [
    {
      title: 'Artisan Mastery',
      desc: 'Direct partnerships with generational artisans.',
      stat: '150+ Master Artisans'
    },
    {
      title: 'Sustainable Excellence',
      desc: 'Ethically sourced materials and zero-waste production.',
      stat: '100% Sustainable'
    },
    {
      title: 'Contemporary Heritage',
      desc: 'Traditional patterns reimagined for modern luxury.',
      stat: '24 Design Awards'
    },
    {
      title: 'Haute Couture',
      desc: '100-300 hours of craftsmanship per piece.',
      stat: 'Limited Edition'
    }
  ]

  const testimonials = [
    "Each thread carries generations of wisdom.",
    "Fusion of tradition and contemporary design.",
    "Storytelling through fabric and form."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory(prev => (prev + 1) % storyPoints.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="text-yellow-700 text-sm tracking-wider mb-3">HERITAGE & INNOVATION</div>
          <h2 className="text-2xl lg:text-4xl font-bold text-black mb-4">
            Where <span className="text-yellow-700">Tradition</span> Meets{' '}
            <span className="text-yellow-700">Tomorrow</span>
          </h2>
          <p className="text-black/70 max-w-xl mx-auto">
            Convergence of ancestral craftsmanship and contemporary luxury.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Story Points */}
          <div className="space-y-4">
            {storyPoints.map((story, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  activeStory === index 
                    ? 'bg-white shadow border border-yellow-700/20' 
                    : 'bg-white/50 hover:bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    activeStory === index 
                      ? 'bg-yellow-700 text-black font-bold' 
                      : 'bg-yellow-700/10 text-yellow-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-1">{story.title}</h3>
                    <p className="text-black/60 text-sm mb-2">{story.desc}</p>
                    <div className="text-yellow-700 text-xs font-medium">{story.stat}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-white border border-yellow-700/20 rounded-xl p-6">
              {/* Fabric visual */}
              <div className="mb-6">
                <div className="mx-auto w-40 h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-earth-brown/5 rounded"></div>
                  <div className="absolute inset-4 border border-yellow-700/10 rounded"></div>
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="text-center">
                <div className="text-yellow-700 text-xl mb-3">"</div>
                <p className="text-black italic mb-4 min-h-[48px]">
                  {testimonials[activeStory]}
                </p>
                
                {/* Indicators */}
                <div className="flex justify-center gap-1">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStory(index)}
                      className={`w-1.5 h-1.5 rounded-full ${
                        activeStory === index ? 'bg-yellow-700' : 'bg-yellow-700/30'
                      }`}
                      aria-label={`Testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Badge */}
            <div className="absolute -top-3 right-4">
              <div className="bg-yellow-700 text-black text-xs px-3 py-1 font-medium rounded shadow">
                SINCE 1998
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 pt-6 border-t border-yellow-700/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['300+ Hours', '50 Edition', '25 Countries', '98% Clients'].map((stat) => (
              <div key={stat} className="text-center">
                <div className="text-xl text-yellow-700 font-light mb-1">{stat.split(' ')[0]}</div>
                <div className="text-black/60 text-xs">{stat.split(' ')[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection