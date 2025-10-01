'use client'

import React from 'react'
import { Music, Cloud, Award, MapPin, Building, Calendar } from 'lucide-react'
import { GitHubUser } from '@/types/github'
import { 
  generateSpotifyUrl, 
  generateWeatherUrl, 
  generateCustomBadges,
  generateProfileViewsUrl
} from '@/lib/github'

interface SocialWidgetsProps {
  user: GitHubUser
}

interface InfoCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  gradient: string
  textColor: string
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, gradient, textColor }) => (
  <div className={`${gradient} text-white p-4 rounded-xl`}>
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className={`${textColor} text-sm`}>{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  </div>
)

const WidgetSection: React.FC<{
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}> = ({ title, icon, children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    {children}
  </div>
)

const ImageWithFallback: React.FC<{
  src: string
  alt: string
  className?: string
  fallbackMessage?: string
}> = ({ src, alt, className = '', fallbackMessage }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.style.display = 'none'
  }

  return (
    <div className="text-center">
      <img 
        src={src}
        alt={alt}
        className={`mx-auto ${className}`}
        loading="lazy"
        onError={handleError}
      />
      {fallbackMessage && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {fallbackMessage}
        </p>
      )}
    </div>
  )
}

export default function SocialWidgets({ user }: SocialWidgetsProps) {
  const badges = generateCustomBadges(user)

  const infoCards = [
    user.location && {
      icon: <MapPin className="h-6 w-6" />,
      label: 'Location',
      value: user.location,
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
      textColor: 'text-blue-100'
    },
    user.company && {
      icon: <Building className="h-6 w-6" />,
      label: 'Company',
      value: user.company.replace('@', ''),
      gradient: 'bg-gradient-to-r from-green-500 to-green-600',
      textColor: 'text-green-100'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      label: 'Joined GitHub',
      value: new Date(user.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }),
      gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
      textColor: 'text-purple-100'
    },
    {
      icon: <Award className="h-6 w-6" />,
      label: 'Public Repos',
      value: user.public_repos,
      gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-100'
    }
  ].filter(Boolean) as InfoCardProps[]

  return (
    <div className="space-y-6">
      {/* Custom Badges */}
      <WidgetSection
        title="Profile Badges"
        icon={<Award className="h-5 w-5 text-yellow-500" />}
      >
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <img 
              key={index}
              src={badge}
              alt={`Badge ${index + 1}`}
              className="h-7"
              loading="lazy"
            />
          ))}
        </div>
      </WidgetSection>

      {/* Profile Analytics */}
      <WidgetSection title="Profile Analytics" icon={<Award className="h-5 w-5 text-pink-500" />}>
        <ImageWithFallback
          src={generateProfileViewsUrl(user.login)}
          alt="Profile Views"
        />
      </WidgetSection>

      {/* Spotify Widget */}
      <WidgetSection
        title="Currently Playing"
        icon={<Music className="h-5 w-5 text-green-500" />}
      >
        <ImageWithFallback
          src={generateSpotifyUrl()}
          alt="Spotify Currently Playing"
          className="rounded-lg max-w-full"
          fallbackMessage="Note: Requires Spotify integration"
        />
      </WidgetSection>

      {/* Weather Widget */}
      {user.location && (
        <WidgetSection
          title={`Weather in ${user.location}`}
          icon={<Cloud className="h-5 w-5 text-blue-500" />}
        >
          <ImageWithFallback
            src={generateWeatherUrl(user.location)}
            alt={`Weather in ${user.location}`}
            className="rounded-lg max-w-full"
          />
        </WidgetSection>
      )}

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoCards.map((card, index) => (
          <InfoCard key={index} {...card} />
        ))}
      </div>
    </div>
  )
}