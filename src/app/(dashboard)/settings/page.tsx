"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { 
  UserIcon,
  KeyIcon,
  ClipboardIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  TrashIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  CreditCardIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  CodeBracketIcon,
  CubeIcon,
  PuzzlePieceIcon,
  DocumentTextIcon,
  LinkIcon,
  CameraIcon,
  PencilIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'

// Mock user data
const mockUser = {
  name: 'Ankit Kumar',
  username: 'Ankit-18',
  email: 'ankit.kumar@example.com',
  verifiedEmails: [
    'ankit.kumar@example.com',
    'ankit@devcloud.com',
    'ankitkr3012005@gmail.com'
  ],
  bio: 'CSE Student | Open Source Learner | Full Stack Developer',
  pronouns: 'he/him',
  location: 'India',
  url: 'https://github.com/Ankit-18',
  company: 'DevCloud',
  twitter: '@ankit_dev',
  profilePicture: 'https://ui-avatars.com/api/?name=Ankit+Kumar&background=6366f1&color=fff&size=128',
  socialAccounts: [
    { platform: 'GitHub', url: 'https://github.com/Ankit-18', username: 'Ankit-18' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ankit-kumar-b14ba2289/', username: 'ankit-kumar-b14ba2289' },
    { platform: 'LeetCode', url: 'https://leetcode.com/u/ankitkr3012005/', username: 'ankitkr3012005' },
    { platform: 'Twitter', url: 'https://twitter.com/ankit_dev', username: 'ankit_dev' }
  ],
  createdAt: '2024-01-15',
  role: 'Developer',
  organization: 'DevCloud Inc.'
}

// Mock API keys
const mockApiKeys = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'dc_prod_8f7d3a2b1c9e5f6g7h8i9j0k',
    createdAt: '2024-01-15',
    lastUsed: '2024-02-14',
    expiresAt: '2025-01-15',
    environment: 'production',
    permissions: ['read', 'write', 'delete']
  },
  {
    id: '2',
    name: 'Staging API Key',
    key: 'dc_staging_1a2b3c4d5e6f7g8h9i0j1k2l',
    createdAt: '2024-01-20',
    lastUsed: '2024-02-13',
    expiresAt: '2025-01-20',
    environment: 'staging',
    permissions: ['read', 'write']
  },
  {
    id: '3',
    name: 'Development API Key',
    key: 'dc_dev_9z8y7x6w5v4u3t2s1r0q9p8o',
    createdAt: '2024-02-01',
    lastUsed: '2024-02-15',
    expiresAt: '2025-02-01',
    environment: 'dev',
    permissions: ['read']
  }
]

// Mock sessions
const mockSessions = [
  {
    id: '1',
    device: 'Chrome on Windows',
    location: 'Bangalore, India',
    ip: '192.168.1.100',
    lastActive: '2 minutes ago',
    current: true
  },
  {
    id: '2',
    device: 'Safari on iPhone',
    location: 'Mumbai, India',
    ip: '192.168.1.101',
    lastActive: '2 hours ago',
    current: false
  },
  {
    id: '3',
    device: 'Firefox on macOS',
    location: 'Delhi, India',
    ip: '192.168.1.102',
    lastActive: '1 day ago',
    current: false
  }
]

// Mock organizations
const mockOrganizations = [
  { id: '1', name: 'DevCloud', role: 'Owner', members: 12, repositories: 45 },
  { id: '2', name: 'OpenSource Community', role: 'Member', members: 128, repositories: 23 },
  { id: '3', name: 'Campus Club', role: 'Admin', members: 34, repositories: 8 }
]

// Mock repositories
const mockRepositories = [
  { id: '1', name: 'dev-cloud-frontend', private: false, language: 'TypeScript', updated: '2 days ago' },
  { id: '2', name: 'api-gateway', private: true, language: 'Go', updated: '1 week ago' },
  { id: '3', name: 'auth-service', private: true, language: 'Python', updated: '3 days ago' },
  { id: '4', name: 'learning-resources', private: false, language: 'Markdown', updated: '2 weeks ago' }
]

type SettingsTab = 'profile' | 'account' | 'appearance' | 'notifications' | 'billing' | 'emails' | 'password' | 'sessions' | 'ssh' | 'organizations' | 'repositories' | 'packages' | 'api-keys'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isGeneratingKey, setIsGeneratingKey] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyEnvironment, setNewKeyEnvironment] = useState('dev')
  const [showNewKeyForm, setShowNewKeyForm] = useState(false)
  const [primaryEmail, setPrimaryEmail] = useState(mockUser.email)
  const [profileForm, setProfileForm] = useState({
    name: mockUser.name,
    bio: mockUser.bio,
    pronouns: mockUser.pronouns,
    location: mockUser.location,
    url: mockUser.url,
    company: mockUser.company,
    twitter: mockUser.twitter
  })

  const getEnvironmentBadge = (env: string) => {
    switch (env) {
      case 'production':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
            prod
          </span>
        )
      case 'staging':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>
            staging
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
            dev
          </span>
        )
    }
  }

  const copyToClipboard = async (id: string, text: string, type: 'key' | 'email') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'key') {
        setCopiedKey(id)
      } else {
        setCopiedEmail(id)
      }
      setNotification({ type: 'success', message: 'Copied to clipboard' })
      setTimeout(() => {
        setCopiedKey(null)
        setCopiedEmail(null)
        setNotification(null)
      }, 2000)
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to copy' })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleDeleteKey = (id: string) => {
    if (window.confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      setNotification({ type: 'success', message: 'API key deleted successfully' })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGeneratingKey(true)
    
    setTimeout(() => {
      setNotification({ type: 'success', message: `New API key "${newKeyName}" generated successfully` })
      setNewKeyName('')
      setNewKeyEnvironment('dev')
      setShowNewKeyForm(false)
      setIsGeneratingKey(false)
      setTimeout(() => setNotification(null), 3000)
    }, 1500)
  }

  const handleProfileUpdate = () => {
    setNotification({ type: 'success', message: 'Profile updated successfully' })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSetPrimaryEmail = (email: string) => {
    setPrimaryEmail(email)
    setNotification({ type: 'success', message: `Primary email set to ${email}` })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleDeleteEmail = (email: string) => {
    if (window.confirm(`Are you sure you want to remove ${email}?`)) {
      setNotification({ type: 'success', message: 'Email removed successfully' })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleSignOutSession = (sessionId: string) => {
    setNotification({ type: 'success', message: 'Session signed out successfully' })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSignOutAllSessions = () => {
    if (window.confirm('Are you sure you want to sign out all other sessions?')) {
      setNotification({ type: 'success', message: 'All other sessions signed out' })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  // Navigation sections organized like GitHub
  const navigationSections = [
    {
      title: 'Personal settings',
      items: [
        { id: 'profile', name: 'Public profile', icon: UserIcon },
        { id: 'account', name: 'Account', icon: ShieldCheckIcon },
        { id: 'appearance', name: 'Appearance', icon: PaintBrushIcon },
        { id: 'notifications', name: 'Notifications', icon: BellIcon },
      ]
    },
    {
      title: 'Access',
      items: [
        { id: 'billing', name: 'Billing and licensing', icon: CreditCardIcon },
        { id: 'emails', name: 'Emails', icon: EnvelopeIcon },
        { id: 'password', name: 'Password and authentication', icon: LockClosedIcon },
        { id: 'sessions', name: 'Sessions', icon: ComputerDesktopIcon },
        { id: 'ssh', name: 'SSH and GPG keys', icon: KeyIcon },
        { id: 'organizations', name: 'Organizations', icon: BuildingOfficeIcon },
      ]
    },
    {
      title: 'Code, planning, and automation',
      items: [
        { id: 'repositories', name: 'Repositories', icon: CubeIcon },
        { id: 'packages', name: 'Packages', icon: PuzzlePieceIcon },
        { id: 'api-keys', name: 'API Keys', icon: KeyIcon },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with user info */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">{mockUser.name}</span>
              <span className="mx-2">·</span>
              <span className="text-gray-500 dark:text-gray-400">{mockUser.username}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <DocumentTextIcon className="h-4 w-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline" size="sm">
              <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
              API Reference
            </Button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            notification.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            ) : (
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            )}
            <p className={`text-sm ${
              notification.type === 'success' 
                ? 'text-green-700 dark:text-green-300'
                : 'text-red-700 dark:text-red-300'
            }`}>
              {notification.message}
            </p>
          </div>
        )}

        {/* Main content with sidebar navigation */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <nav className="space-y-6">
              {navigationSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id as SettingsTab)}
                          className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                            activeTab === item.id
                              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 font-medium'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <item.icon className={`h-4 w-4 mr-3 ${
                            activeTab === item.id
                              ? 'text-blue-500 dark:text-blue-400'
                              : 'text-gray-400 dark:text-gray-500'
                          }`} />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Main Settings Content */}
          <div className="flex-1">
            {/* Public Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Public profile</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Your profile information will be visible to other users
                    </p>
                  </div>
                  <div className="p-6">
                    {/* Profile Picture */}
                    <div className="flex items-start gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                          <img 
                            src={mockUser.profilePicture} 
                            alt={profileForm.name}
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-gray-800 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                          <CameraIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Profile picture</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          Your profile picture will appear where you contribute or are mentioned.
                        </p>
                        <Button variant="outline" size="sm">Upload new picture</Button>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <form className="space-y-4 pt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Your name may appear around the platform where you contribute.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Public email
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                          <option>Select a verified email to display</option>
                          {mockUser.verifiedEmails.map(email => (
                            <option key={email} value={email}>{email}</option>
                          ))}
                        </select>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          You can manage verified email addresses in your{' '}
                          <button onClick={() => setActiveTab('emails')} className="text-blue-600 hover:underline">
                            email settings
                          </button>
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Bio
                        </label>
                        <textarea
                          rows={3}
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="Tell us about yourself"
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          You can @mention other users and organizations to link to them.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Pronouns
                        </label>
                        <input
                          type="text"
                          value={profileForm.pronouns}
                          onChange={(e) => setProfileForm({...profileForm, pronouns: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder="e.g., he/him, she/her, they/them"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          URL
                        </label>
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-l-md">
                            <LinkIcon className="h-4 w-4" />
                          </span>
                          <input
                            type="url"
                            value={profileForm.url}
                            onChange={(e) => setProfileForm({...profileForm, url: e.target.value})}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="https://your-website.com"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button onClick={handleProfileUpdate}>
                          Update profile
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Social Accounts */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Social accounts</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {mockUser.socialAccounts.map((account) => (
                      <div key={account.platform} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                            <GlobeAltIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{account.platform}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{account.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <a href={account.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                          </a>
                          <Button variant="ghost" size="sm">Disconnect</Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="mt-2">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Connect social account
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Emails Tab */}
            {activeTab === 'emails' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email addresses</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage your email addresses and notification preferences
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {mockUser.verifiedEmails.map((email) => (
                      <div key={email} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
                        <div className="flex items-center space-x-3">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">{email}</span>
                          {email === primaryEmail && (
                            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                              Primary
                            </span>
                          )}
                          {email.endsWith('gmail.com') && (
                            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(email, email, 'email')}
                          >
                            {copiedEmail === email ? (
                              <CheckCircleIcon className="h-4 w-4 text-green-500" />
                            ) : (
                              <ClipboardIcon className="h-4 w-4" />
                            )}
                          </Button>
                          {email !== primaryEmail && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSetPrimaryEmail(email)}
                              >
                                Set as primary
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteEmail(email)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button variant="outline">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add email address
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active sessions</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage your active sessions across devices
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSignOutAllSessions}>
                      Sign out all other sessions
                    </Button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {mockSessions.map((session) => (
                    <div key={session.id} className="flex items-start justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div className="flex items-start space-x-3">
                        <ComputerDesktopIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {session.device}
                            </p>
                            {session.current && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                Current session
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {session.location} · {session.ip}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Last active: {session.lastActive}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSignOutSession(session.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Sign out
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizations Tab */}
            {activeTab === 'organizations' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Organizations</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Organizations you belong to
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  {mockOrganizations.map((org) => (
                    <div key={org.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div className="flex items-center space-x-3">
                        <BuildingOfficeIcon className="h-8 w-8 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{org.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {org.role} · {org.members} members · {org.repositories} repositories
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Repositories Tab */}
            {activeTab === 'repositories' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Repositories</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Your personal repositories
                      </p>
                    </div>
                    <Button size="sm">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      New repository
                    </Button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {mockRepositories.map((repo) => (
                    <div key={repo.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div className="flex items-center space-x-3">
                        <CubeIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{repo.name}</p>
                            {repo.private ? (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                                Private
                              </span>
                            ) : (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                Public
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {repo.language} · Updated {repo.updated}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* API Keys Tab */}
            {activeTab === 'api-keys' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">API Keys</h2>
                  <Button onClick={() => setShowNewKeyForm(!showNewKeyForm)}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>

                {showNewKeyForm && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Generate New API Key</h3>
                    <form onSubmit={handleGenerateKey} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Key Name
                          </label>
                          <input
                            type="text"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                            placeholder="e.g., Production API Key"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Environment
                          </label>
                          <select
                            value={newKeyEnvironment}
                            onChange={(e) => setNewKeyEnvironment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="dev">Development</option>
                            <option value="staging">Staging</option>
                            <option value="production">Production</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <Button type="button" variant="outline" onClick={() => setShowNewKeyForm(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isGeneratingKey}>
                          {isGeneratingKey ? 'Generating...' : 'Generate Key'}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            API Key
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Environment
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Permissions
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Created
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {mockApiKeys.map((apiKey) => (
                          <tr key={apiKey.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <KeyIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {apiKey.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <code className="text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700">
                                  {visibleKeys.has(apiKey.id) ? apiKey.key : '••••••••••••••••'}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleKeyVisibility(apiKey.id)}
                                  className="p-1"
                                >
                                  {visibleKeys.has(apiKey.id) ? 
                                    <EyeSlashIcon className="h-4 w-4 text-gray-500" /> : 
                                    <EyeIcon className="h-4 w-4 text-gray-500" />
                                  }
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(apiKey.id, apiKey.key, 'key')}
                                  className="p-1"
                                >
                                  {copiedKey === apiKey.id ? 
                                    <CheckCircleIcon className="h-4 w-4 text-green-500" /> : 
                                    <ClipboardIcon className="h-4 w-4 text-gray-500" />
                                  }
                                </Button>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getEnvironmentBadge(apiKey.environment)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-1">
                                {apiKey.permissions.map(perm => (
                                  <span key={perm} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded">
                                    {perm}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(apiKey.createdAt).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteKey(apiKey.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {['appearance', 'notifications', 'billing', 'password', 'ssh', 'packages'].includes(activeTab) && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                {activeTab === 'appearance' && <PaintBrushIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />}
                {activeTab === 'notifications' && <BellIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />}
                {activeTab === 'billing' && <CreditCardIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />}
                {activeTab === 'password' && <LockClosedIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />}
                {activeTab === 'ssh' && <KeyIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />}
                {activeTab === 'packages' && <PuzzlePieceIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />}
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  This section is coming soon. Check back later!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}