'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error for debugging/monitoring
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="text-6xl mb-6">⚠️</div>
      <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        An unexpected error occurred. Please try again or return to the home page.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
        >
          Try again
        </button>
        <a
          href="/"
          className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}