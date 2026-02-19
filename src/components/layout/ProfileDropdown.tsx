"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  UserIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  KeyIcon
} from '@heroicons/react/24/outline'

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const user = {
    name: 'Ankit Kumar',
    email: 'ankit@devcloud.com',
    avatar: `https://ui-avatars.com/api/?name=Ankit+Kumar&background=6366f1&color=fff&size=128`
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
      >
        <img 
          src={user.avatar} 
          alt={user.name}
          className="h-8 w-8 rounded-full"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:block">
          {user.name}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="p-1">
            <Link
              href="/settings?tab=profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon className="h-4 w-4" />
              <span>Your Profile</span>
            </Link>
            
            <Link
              href="/settings?tab=api-keys"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <KeyIcon className="h-4 w-4" />
              <span>API Keys</span>
            </Link>
            
            <Link
              href="/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Cog6ToothIcon className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}