'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ThemePreviewProps {
  theme: string
  username: string
}

interface ThemeColors {
  bg: string
  primary: string
  secondary: string
}

export default function ThemePreview({ theme, username }: ThemePreviewProps) {
  const themeColors: Record<string, ThemeColors> = {
    dark: { bg: '#0d1117', primary: '#58a6ff', secondary: '#21262d' },
    light: { bg: '#ffffff', primary: '#0969da', secondary: '#f6f8fa' },
    tokyonight: { bg: '#1a1b27', primary: '#7aa2f7', secondary: '#24283b' },
    radical: { bg: '#141321', primary: '#fe428e', secondary: '#1e1e2e' },
    dracula: { bg: '#282a36', primary: '#ff79c6', secondary: '#44475a' },
    gruvbox: { bg: '#1d2021', primary: '#b8bb26', secondary: '#3c3836' },
    cobalt: { bg: '#193549', primary: '#1f9ede', secondary: '#1e2124' },
    synthwave: { bg: '#2d1b69', primary: '#e7008a', secondary: '#0f0524' },
    highcontrast: { bg: '#000000', primary: '#ffffff', secondary: '#1a1a1a' },
    ocean: { bg: '#0e1419', primary: '#409eff', secondary: '#1c2128' }
  }

  // Early return for invalid theme
  if (!theme || !themeColors[theme]) {
    return null
  }

  const colors = themeColors[theme]
  const displayName = theme.charAt(0).toUpperCase() + theme.slice(1)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden rounded-lg border border-github-border"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="p-4 space-y-3">
        {/* Header with user avatar and info */}
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-full"
            style={{ background: `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}60)` }}
          />
          <div className="space-y-1">
            <div 
              className="h-3 w-20 rounded"
              style={{ backgroundColor: colors.primary }}
            />
            <div 
              className="h-2 w-16 rounded"
              style={{ backgroundColor: colors.secondary }}
            />
          </div>
        </div>

        {/* Stats preview cards */}
        <div className="grid grid-cols-2 gap-2">
          {[12, 10].map((width, index) => (
            <div
              key={index}
              className="h-16 rounded border p-2"
              style={{
                backgroundColor: colors.secondary,
                borderColor: `${colors.primary}40`
              }}
            >
              <div 
                className="h-2 rounded mb-1"
                style={{ 
                  width: `${width}px`,
                  backgroundColor: colors.primary 
                }}
              />
              <div 
                className="h-1 rounded"
                style={{ 
                  width: `${width - 4}px`,
                  backgroundColor: `${colors.primary}30`
                }}
              />
            </div>
          ))}
        </div>

        {/* Theme name */}
        <div className="text-center">
          <p 
            className="text-xs font-medium"
            style={{ color: colors.primary }}
          >
            {displayName}
          </p>
        </div>
      </div>
      
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )
}