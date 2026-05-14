'use client'

import { useId } from 'react'

export function Divider() {
  // useId gives a unique ID per instance, preventing SVG gradient ID collisions
  const uid = useId().replace(/:/g, '')

  return (
    <div className="relative z-10">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="flex justify-center py-2 opacity-75">
        <svg width="280" height="22" viewBox="0 0 280 22" fill="none" aria-hidden>
          <line x1="0"   y1="11" x2="110" y2="11" stroke={`url(#a${uid})`} strokeWidth="1" />
          <text x="140"  y="16"  textAnchor="middle" fill="#c9a84c" fontSize="14" fontFamily="serif">✦</text>
          <circle cx="122" cy="11" r="2" fill="#c9a84c" opacity=".6" />
          <circle cx="158" cy="11" r="2" fill="#c9a84c" opacity=".6" />
          <line x1="170" y1="11" x2="280" y2="11" stroke={`url(#b${uid})`} strokeWidth="1" />
          <defs>
            <linearGradient id={`a${uid}`} x1="0" y1="0" x2="110" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#c9a84c" stopOpacity="0"  />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity=".7" />
            </linearGradient>
            <linearGradient id={`b${uid}`} x1="170" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#c9a84c" stopOpacity=".7" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0"  />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
