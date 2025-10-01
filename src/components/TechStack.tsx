'use client'

import React from 'react'
import { Code, Zap, Star, Layers } from 'lucide-react'
import { LanguageStats } from '@/types/github'
import { generateTechStackUrl } from '@/lib/github'

interface TechStackProps {
  languages: LanguageStats
  theme: string
}

export default function TechStack({ languages, theme }: TechStackProps) {
  const topLanguages = Object.keys(languages).slice(0, 8)

  return (
    <div className="space-y-6">
      {/* Tech Stack Icons */}
      <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-2xl border border-blue-100 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Code className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tech Stack
          </span>
        </h3>
        <div className="text-center">
          <img 
            src={generateTechStackUrl(topLanguages, theme)}
            alt="Tech Stack"
            className="mx-auto transform hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </div>

      {/* Language Progress Bars */}
      <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-2xl border border-green-100 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Language Distribution
          </span>
        </h3>
        <div className="space-y-5">
          {Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6)
            .map(([lang, percentage], index) => (
              <div key={lang} className="space-y-3 group">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {lang}
                  </span>
                  <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transform transition-all duration-1000 ease-out group-hover:scale-y-110 ${
                      index === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25' :
                      index === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/25' :
                      index === 2 ? 'bg-gradient-to-r from-yellow-500 to-amber-500 shadow-lg shadow-yellow-500/25' :
                      index === 3 ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/25' :
                      index === 4 ? 'bg-gradient-to-r from-purple-500 to-violet-500 shadow-lg shadow-purple-500/25' :
                      'bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg shadow-pink-500/25'
                    }`}
                    style={{ 
                      width: `${Math.max(percentage, 5)}%`,
                      transform: 'translateX(0)'
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Skills Rating */}
      <div className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-2xl border border-yellow-100 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
            <Star className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Skill Levels
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 6)
            .map(([lang, percentage]) => {
              const skillLevel = 
                percentage > 20 ? 'Expert' :
                percentage > 10 ? 'Advanced' :
                percentage > 5 ? 'Intermediate' :
                'Beginner'
              
              const skillColor = 
                skillLevel === 'Expert' ? 'from-green-500 to-emerald-600' :
                skillLevel === 'Advanced' ? 'from-blue-500 to-cyan-600' :
                skillLevel === 'Intermediate' ? 'from-yellow-500 to-amber-600' :
                'from-gray-500 to-gray-600'
              
              const bgColor =
                skillLevel === 'Expert' ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800' :
                skillLevel === 'Advanced' ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800' :
                skillLevel === 'Intermediate' ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800' :
                'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200 dark:border-gray-800'
              
              return (
                <div 
                  key={lang} 
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transform hover:scale-105 hover:shadow-lg transition-all duration-300 ${bgColor}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-gradient-to-r ${skillColor} rounded-lg shadow-md`}>
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {lang}
                    </span>
                  </div>
                  <span className={`text-sm font-extrabold bg-gradient-to-r ${skillColor} bg-clip-text text-transparent`}>
                    {skillLevel}
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}