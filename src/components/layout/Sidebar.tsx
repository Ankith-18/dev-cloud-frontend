import Link from "next/link"
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
  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-8">DevCloud</h1>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}