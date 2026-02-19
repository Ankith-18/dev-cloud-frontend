"use client"

import { useRouter, usePathname } from 'next/navigation'
import { 
  HomeIcon, 
  CubeIcon, 
  RocketLaunchIcon,
  CommandLineIcon,
  DocumentTextIcon,
  KeyIcon,
  FlagIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Projects', href: '/projects', icon: CubeIcon },
  { name: 'Pipelines', href: '/pipelines', icon: RocketLaunchIcon },
  { name: 'Deployments', href: '/deployments', icon: CommandLineIcon },
  { name: 'Logs', href: '/logs', icon: DocumentTextIcon },
  { name: 'Secrets', href: '/secrets', icon: KeyIcon },
  { name: 'Feature Flags', href: '/flags', icon: FlagIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (href: string) => {
    console.log('Navigating to:', href) // Debug: Check if this logs
    router.push(href)
  }

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-8">DevCloud</h1>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}