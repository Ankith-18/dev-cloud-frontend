"use client"

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { AddFlagModal } from '@/components/flags/AddFlagModal'
import { 
  FlagIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
  XCircleIcon,
  FolderIcon,
  CalendarIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

// ===== ADD THIS TYPE DEFINITION HERE =====
export interface FeatureFlag {
  id: string
  name: string
  description: string
  environment: string
  projectId: number
  projectName: string
  status: 'enabled' | 'disabled'
  createdAt: string
  lastUpdated?: string
  updatedBy?: string
}
// ========================================

// Mock data
const mockProjects = [
  { id: 1, name: 'backend-api' },
  { id: 2, name: 'frontend-app' },
  { id: 3, name: 'auth-service' }
]

const mockFlags = [
  {
    id: '1',
    name: 'new-checkout-flow',
    description: 'Enable new checkout experience with improved UX',
    environment: 'production',
    projectId: 2,
    projectName: 'frontend-app',
    status: 'enabled',
    createdAt: '2024-01-15',
    lastUpdated: '2024-02-10',
    updatedBy: 'John Doe'
  },
  {
    id: '2',
    name: 'dark-mode',
    description: 'Enable dark mode theme across the application',
    environment: 'production',
    projectId: 2,
    projectName: 'frontend-app',
    status: 'enabled',
    createdAt: '2024-01-20',
    lastUpdated: '2024-02-09',
    updatedBy: 'Jane Smith'
  },
  {
    id: '3',
    name: 'beta-features',
    description: 'Enable beta features for early access users',
    environment: 'staging',
    projectId: 1,
    projectName: 'backend-api',
    status: 'disabled',
    createdAt: '2024-01-25'
  },
  {
    id: '4',
    name: 'rate-limiting',
    description: 'Enable rate limiting for API endpoints',
    environment: 'production',
    projectId: 1,
    projectName: 'backend-api',
    status: 'disabled',
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    name: 'debug-mode',
    description: 'Enable verbose logging for debugging',
    environment: 'dev',
    projectId: 3,
    projectName: 'auth-service',
    status: 'enabled',
    createdAt: '2024-02-05',
    lastUpdated: '2024-02-08',
    updatedBy: 'Mike Johnson'
  },
  {
    id: '6',
    name: 'new-auth-flow',
    description: 'Use new OAuth2 authentication flow',
    environment: 'staging',
    projectId: 3,
    projectName: 'auth-service',
    status: 'disabled',
    createdAt: '2024-02-08'
  }
]

export default function FlagsPage() {
  const [flags, setFlags] = useState(mockFlags)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState('all')
  const [environmentFilter, setEnvironmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const itemsPerPage = 5

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
      case 'dev':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
            dev
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {env}
          </span>
        )
    }
  }

  const toggleFlagStatus = (id: string) => {
    setFlags(prev => prev.map(flag => {
      if (flag.id === id) {
        const newStatus = flag.status === 'enabled' ? 'disabled' : 'enabled'
        showNotification('success', `Flag ${flag.name} ${newStatus === 'enabled' ? 'enabled' : 'disabled'} successfully`)
        return {
          ...flag,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0],
          updatedBy: 'Current User'
        }
      }
      return flag
    }))
  }

  const handleDeleteFlag = (id: string) => {
    const flag = flags.find(f => f.id === id)
    if (window.confirm(`Are you sure you want to delete flag "${flag?.name}"? This action cannot be undone.`)) {
      setFlags(prev => prev.filter(flag => flag.id !== id))
      showNotification('success', 'Flag deleted successfully')
    }
  }

  const handleAddFlag = (name: string, description: string, environment: string) => {
    const project = mockProjects[0]
    const newFlag = {
      id: Date.now().toString(),
      name,
      description,
      environment,
      projectId: project.id,
      projectName: project.name,
      status: 'disabled' as const,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setFlags(prev => [newFlag, ...prev])
    showNotification('success', 'Feature flag created successfully')
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  // Get unique values for filters
  const projects = ['all', ...new Set(flags.map(f => f.projectName))]
  const environments = ['all', ...new Set(flags.map(f => f.environment))]

  // Filter and search flags
  const filteredFlags = flags.filter(flag => {
    const matchesProject = projectFilter === 'all' || flag.projectName === projectFilter
    const matchesEnvironment = environmentFilter === 'all' || flag.environment === environmentFilter
    const matchesStatus = statusFilter === 'all' || flag.status === statusFilter
    const matchesSearch = searchTerm === '' || 
      flag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flag.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesProject && matchesEnvironment && matchesStatus && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredFlags.length / itemsPerPage)
  const paginatedFlags = filteredFlags.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feature Flags</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage feature flags across all environments to control feature rollout
              </p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} size="lg">
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Flag
            </Button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className={`mb-4 p-4 rounded-lg flex items-center space-x-3 ${
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

        {/* Filters and Search Bar */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search flags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          <div>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              {projects.map(project => (
                <option key={project} value={project}>
                  {project === 'all' ? 'All Projects' : project}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={environmentFilter}
              onChange={(e) => setEnvironmentFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              {environments.map(env => (
                <option key={env} value={env}>
                  {env === 'all' ? 'All Environments' : env.charAt(0).toUpperCase() + env.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        {/* Results Stats */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">
              {paginatedFlags.length}
            </span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredFlags.length}
            </span> flags
          </div>
          {(projectFilter !== 'all' || environmentFilter !== 'all' || statusFilter !== 'all' || searchTerm) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setProjectFilter('all')
                setEnvironmentFilter('all')
                setStatusFilter('all')
                setSearchTerm('')
              }}
              className="text-red-600 hover:text-red-700"
            >
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Flags Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Flag Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Environment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedFlags.map((flag) => (
                  <tr key={flag.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FlagIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                          {flag.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                        {flag.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getEnvironmentBadge(flag.environment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {flag.projectName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFlagStatus(flag.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          flag.status === 'enabled'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {flag.status === 'enabled' ? (
                          <>
                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                            Enabled
                          </>
                        ) : (
                          <>
                            <XCircleIcon className="h-3 w-3 mr-1" />
                            Disabled
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {flag.lastUpdated 
                          ? new Date(flag.lastUpdated).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })
                          : new Date(flag.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })
                        }
                        {flag.updatedBy && (
                          <span className="ml-2 text-xs text-gray-400">
                            by {flag.updatedBy}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFlagStatus(flag.id)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/50"
                          title={flag.status === 'enabled' ? 'Disable' : 'Enable'}
                        >
                          <ArrowPathIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFlag(flag.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                          title="Delete"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedFlags.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <FlagIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400 mb-4">No feature flags found</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setProjectFilter('all')
                          setEnvironmentFilter('all')
                          setStatusFilter('all')
                          setSearchTerm('')
                        }}
                      >
                        Clear Filters
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Flag Modal */}
        <AddFlagModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddFlag}
          projects={mockProjects}
        />
      </div>
    </div>
  )
}