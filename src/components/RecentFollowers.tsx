'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Eye, Users, Heart, Star } from 'lucide-react'
import { GitHubUser } from '@/types/github'

interface Follower {
  login: string
  id: number
  avatar_url: string
  html_url: string
  type: string
}

interface RecentFollowersProps {
  username: string
  user: GitHubUser
}

// Utility functions
const escapeUrlForXml = (url: string): string => {
  return url.replace(/&/g, '&amp;')
}

const getFollowerCount = async (username: string): Promise<string> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`)
    if (response.ok) {
      const userData = await response.json()
      return userData.followers.toLocaleString()
    }
  } catch (error) {
    console.error('Error fetching follower count:', error)
  }
  return 'many amazing'
}

const FollowerSkeleton = () => (
  <div className="flex flex-col items-center space-y-2">
    <div className="w-16 h-16 bg-github-border rounded-full animate-pulse" />
    <div className="w-12 h-3 bg-github-border rounded animate-pulse" />
  </div>
)

const FollowerAvatar = ({ follower, index }: { follower: Follower; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="flex flex-col items-center space-y-2 group"
  >
    <div className="relative">
      <img
        src={`${follower.avatar_url}&s=80`}
        alt={follower.login}
        className="w-16 h-16 rounded-full border-2 border-github-border group-hover:border-github-accent transition-colors cursor-pointer"
        onClick={() => window.open(follower.html_url, '_blank')}
        loading="lazy"
      />
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-github-success rounded-full border-2 border-github-card flex items-center justify-center">
        <Heart size={10} className="text-white" />
      </div>
    </div>
    <span className="text-xs text-github-text truncate w-full text-center font-medium">
      {follower.login}
    </span>
  </motion.div>
)

const UserStats = ({ user }: { user: GitHubUser }) => (
  <div className="flex justify-center gap-4 pt-3 border-t border-github-border">
    <div className="text-center">
      <div className="text-lg font-bold text-github-accent">{user.followers}</div>
      <div className="text-xs text-github-muted">Followers</div>
    </div>
    <div className="text-center">
      <div className="text-lg font-bold text-green-400">{user.following}</div>
      <div className="text-xs text-github-muted">Following</div>
    </div>
    <div className="text-center">
      <div className="text-lg font-bold text-yellow-400">{user.public_repos}</div>
      <div className="text-xs text-github-muted">Repos</div>
    </div>
  </div>
)

const CommunityMessage = ({ user }: { user: GitHubUser }) => (
  <div className="text-center p-3 bg-github-accent/5 rounded-lg">
    <p className="text-sm text-github-text">
      🌟 <strong>Amazing community!</strong> Join {user.followers} developers following {user.name || user.login}
    </p>
    <div className="flex justify-center gap-2 mt-2">
      <span className="text-xs bg-github-success/20 text-github-success px-2 py-1 rounded-full">
        +{Math.floor(user.followers / 10)} this month
      </span>
      <span className="text-xs bg-github-accent/20 text-github-accent px-2 py-1 rounded-full">
        Growing fast! 🚀
      </span>
    </div>
  </div>
)

export default function RecentFollowers({ username, user }: RecentFollowersProps) {
  const [followers, setFollowers] = useState<Follower[]>([])
  const [loading, setLoading] = useState(false)
  const [showFollowers, setShowFollowers] = useState(false)

  const fetchRecentFollowers = useCallback(async () => {
    if (followers.length > 0) return
    
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/followers?per_page=10&sort=created`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GitHub-README-Generator'
          }
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        setFollowers(data.slice(0, 8))
      }
    } catch (error) {
      console.error('Error fetching followers:', error)
    } finally {
      setLoading(false)
    }
  }, [username, followers.length])

  useEffect(() => {
    if (showFollowers) {
      fetchRecentFollowers()
    }
  }, [showFollowers, fetchRecentFollowers])

  const generateFollowerReadmeSection = (): string => {
    if (followers.length === 0) return ''

    let section = `## 👥 Recent Visitors & Followers\n\n`
    section += `<div align="center">\n\n`
    section += `### 🌟 Thanks for visiting! Here are some amazing developers who follow me:\n\n`
    
    section += `<table>\n<tr>\n`
    followers.slice(0, 5).forEach((follower) => {
      section += `<td align="center">\n`
      section += `<a href="${follower.html_url}">\n`
      section += `<img src="${follower.avatar_url}" width="80" height="80" style="border-radius: 50%; border: 3px solid #58a6ff;" alt="${follower.login}" />\n`
      section += `<br/>\n`
      section += `<sub><b>${follower.login}</b></sub>\n`
      section += `</a>\n`
      section += `</td>\n`
    })
    section += `</tr>\n</table>\n\n`
    
    section += `### 💝 Join our amazing community!\n\n`
    const safeFollowUrl = `https://img.shields.io/github/followers/${encodeURIComponent(username)}?label=Follow&style=social`
    const safeStarUrl = `https://img.shields.io/github/stars/${encodeURIComponent(username)}?style=social`
    section += `[![Follow](${escapeUrlForXml(safeFollowUrl)})](https://github.com/${username})\n`
    section += `[![Star](${escapeUrlForXml(safeStarUrl)})](https://github.com/${username}?tab=repositories)\n\n`
    
    section += `</div>\n\n`
    
    return section
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => setShowFollowers(!showFollowers)}
        className="flex items-center gap-2 px-4 py-2 bg-github-accent/10 hover:bg-github-accent/20 text-github-accent rounded-lg transition-colors w-full justify-center"
      >
        <Users size={16} />
        {showFollowers ? 'Hide Followers Preview' : 'Show Recent Followers'}
        <span className="text-xs bg-github-accent text-white px-2 py-1 rounded-full">
          {user.followers}
        </span>
      </button>

      {showFollowers && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="github-card p-4 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <Eye className="text-github-accent" size={18} />
            <h3 className="text-lg font-semibold text-github-text">Recent Followers</h3>
            {loading && (
              <div className="w-4 h-4 border-2 border-github-accent border-t-transparent rounded-full animate-spin" />
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <FollowerSkeleton key={i} />
              ))}
            </div>
          ) : followers.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {followers.map((follower, index) => (
                  <FollowerAvatar key={follower.id} follower={follower} index={index} />
                ))}
              </div>
              
              <UserStats user={user} />
              <CommunityMessage user={user} />
            </div>
          ) : (
            <div className="text-center text-github-muted py-4">
              <Users size={32} className="mx-auto mb-2 opacity-50" />
              <p>No followers data available</p>
            </div>
          )}
        </motion.div>
      )}

      <div className="hidden">
        {generateFollowerReadmeSection()}
      </div>
    </div>
  )
}

// Enhanced README section generator
export const getFollowersReadmeSection = async (username: string): Promise<string> => {
  let section = `## 👥 Recent Profile Visitors\n\n<div align="center">\n\n`
  
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/followers?per_page=8&sort=created`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-README-Generator'
        }
      }
    )
    
    if (response.ok) {
      const followers: Follower[] = await response.json()
      
      if (followers.length > 0) {
        section += `### 🌟 Thanks for visiting! Meet some amazing developers who recently followed me:\n\n`
        
        section += `<table>\n`
        
        // First row
        section += `<tr>\n`
        followers.slice(0, 4).forEach((follower) => {
          section += `<td align="center" width="25%">\n`
          section += `<a href="${follower.html_url}" target="_blank">\n`
          section += `<img src="${follower.avatar_url}?s=80" width="80" height="80" style="border-radius: 50%; border: 3px solid #58a6ff; box-shadow: 0 4px 8px rgba(88, 166, 255, 0.3);" alt="${follower.login}" />\n`
          section += `<br/>\n`
          section += `<sub><b style="font-size: 12px; color: #58a6ff;">${follower.login}</b></sub>\n`
          section += `</a>\n`
          section += `</td>\n`
        })
        section += `</tr>\n`
        
        // Second row
        if (followers.length > 4) {
          section += `<tr>\n`
          followers.slice(4, 8).forEach((follower) => {
            section += `<td align="center" width="25%">\n`
            section += `<a href="${follower.html_url}" target="_blank">\n`
            section += `<img src="${follower.avatar_url}?s=80" width="80" height="80" style="border-radius: 50%; border: 3px solid #58a6ff; box-shadow: 0 4px 8px rgba(88, 166, 255, 0.3);" alt="${follower.login}" />\n`
            section += `<br/>\n`
            section += `<sub><b style="font-size: 12px; color: #58a6ff;">${follower.login}</b></sub>\n`
            section += `</a>\n`
            section += `</td>\n`
          })
          section += `</tr>\n`
        }
        
        section += `</table>\n\n`
        
        try {
          const followerCount = await getFollowerCount(username)
          section += `### 💝 Join our growing community of ${followerCount} developers!\n\n`
        } catch {
          section += `### 💝 Join our amazing developer community!\n\n`
        }
      } else {
        section += `### 🌟 Building an amazing developer community!\n\n`
        section += `<p align="center">\n`
        section += `<img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="200" alt="Waving hand" />\n`
        section += `</p>\n\n`
        section += `### 🚀 Be the first to follow and join the journey!\n\n`
      }
    } else {
      section += `### 🌟 Thanks for visiting my GitHub profile!\n\n`
      section += `<p align="center">\n`
      section += `<img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="200" alt="Welcome" />\n`
      section += `</p>\n\n`
      section += `### 🚀 Let's connect and build something amazing together!\n\n`
    }
    
    // Follow button section
    section += `<p align="center">\n`
    const safeFollowersBadgeUrl = `https://img.shields.io/github/followers/${encodeURIComponent(username)}?label=${encodeURIComponent(`Follow @${username}`)}&style=for-the-badge&logo=github&logoColor=white&labelColor=black&color=blue`
    section += `<a href="https://github.com/${username}?tab=followers" target="_blank">\n`
    section += `<img src="${escapeUrlForXml(safeFollowersBadgeUrl)}" alt="Follow ${username}"/>\n`
    section += `</a>\n`
    section += `</p>\n\n`
    
    // Typing animation
    section += `<p align="center">\n`
    const engagementTexts = [
      '👋 New friends are always welcome!',
      '🚀 Let\'s build something amazing together!',
      '💻 Open to collaboration and new ideas!',
      '🌟 Thanks for visiting my profile!'
    ]
    const engagementUrl = `https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&duration=2000&pause=1000&color=58A6FF&background=00000000&center=true&vCenter=true&random=false&width=500&lines=${encodeURIComponent(engagementTexts.join(';'))}`
    section += `<img src="${escapeUrlForXml(engagementUrl)}" alt="Typing SVG" />\n`
    section += `</p>\n\n`
    
  } catch (error) {
    console.error('Error generating followers section:', error)
    
    // Fallback section
    section += `### 🌟 Thanks for visiting my profile!\n\n`
    section += `<p align="center">\n`
    section += `<img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="200" alt="Welcome" />\n`
    section += `</p>\n\n`
    section += `### 💻 Let's connect and build something awesome!\n\n`
    
    section += `<p align="center">\n`
    const fallbackBadgeUrl = `https://img.shields.io/badge/Follow-${encodeURIComponent(username)}-blue?style=for-the-badge&logo=github&logoColor=white`
    section += `<a href="https://github.com/${username}" target="_blank">\n`
    section += `<img src="${escapeUrlForXml(fallbackBadgeUrl)}" alt="Follow ${username}"/>\n`
    section += `</a>\n`
    section += `</p>\n\n`
  }
  
  section += `</div>\n\n`
  return section
}