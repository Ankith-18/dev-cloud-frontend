import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'

export function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 right-0 left-64">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1">
          {/* Breadcrumb can go here later */}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
            <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
            <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            <span className="text-sm text-gray-700 dark:text-gray-300">John Doe</span>
          </button>
        </div>
      </div>
    </nav>
  )
}