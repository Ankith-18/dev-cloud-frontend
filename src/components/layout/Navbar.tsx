import { BellIcon } from '@heroicons/react/24/outline'
import { ProfileDropdown } from './ProfileDropdown'

export function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 right-0 left-64 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1">
          {/* Breadcrumb can go here later */}
        </div>
        
        <div className="flex items-center gap-4 relative">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          {/* ProfileDropdown - now with relative parent */}
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  )
}