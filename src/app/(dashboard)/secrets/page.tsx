"use client"

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { AddSecretModal } from '@/components/secrets/AddSecretModal'
import { 
  KeyIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardIcon,
  CheckCircleIcon,
  FolderIcon,
  CalendarIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

// Mock data
const mockProjects = [
  { id: 1, name: 'backend-api' },
  { id: 2, name: 'frontend-app' },
  { id: 3, name: 'auth-service' },
  { id: 4, name: 'payment-service' },
  { id: 5, name: 'notification-service' }
]

const mockSecrets = [
  {
    id: '1',
    key: 'DATABASE_URL',
    value: 'postgresql://user:pass@localhost:5432/db',
    environment: 'production',
    projectId: 1,
    projectName: 'backend-api',
    createdAt: '2024-01-15',
    lastUpdated: '2024-02-10'
  },
  {
    id: '2',
    key: 'REDIS_URL',
    value: 'redis://localhost:6379',
    environment: 'production',
    projectId: 1,
    projectName: 'backend-api',
    createdAt: '2024-01-15',
    lastUpdated: '2024-02-09'
  },
  {
    id: '3',
    key: 'API_KEY',
    value: 'sk_live_123456789abcdef',
    environment: 'staging',
    projectId: 2,
    projectName: 'frontend-app',
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    key: 'JWT_SECRET',
    value: 'super-secret-jwt-key-2024',
    environment: 'production',
    projectId: 3,
    projectName: 'auth-service',
    createdAt: '2024-02-01'
  },
  {
    id: '5',
    key: 'STRIPE_KEY',
    value: 'pk_test_abcdef123456',
    environment: 'dev',
    projectId: 2,
    projectName: 'frontend-app',
    createdAt: '2024-02-05'
  },
  {
    id: '6',
    key: 'AWS_ACCESS_KEY',
    value: 'AKIAIOSFODNN7EXAMPLE',
    environment: 'production',
    projectId: 4,
    projectName: 'payment-service',
    createdAt: '2024-02-08'
  },
  {
    id: '7',
    key: 'AWS_SECRET_KEY',
    value: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    environment: 'production',
    projectId: 4,
    projectName: 'payment-service',
    createdAt: '2024-02-08'
  },
  {
    id: '8',
    key: 'SENDGRID_API_KEY',
    value: 'SG.examplekey123456789',
    environment: 'staging',
    projectId: 5,
    projectName: 'notification-service',
    createdAt: '2024-02-09'
  }
]

export default function SecretsPage() {
  const [secrets, setSecrets] = useState(mockSecrets)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [copyError, setCopyError] = useState<string | null>(null)
  const [projectFilter, setProjectFilter] = useState('all')
  const [environmentFilter, setEnvironmentFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectAll, setSelectAll] = useState(false)
  const [selectedSecrets, setSelectedSecrets] = useState<Set<string>>(new Set())
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

  const toggleSecretVisibility = (id: string) => {
    setVisibleSecrets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const copyToClipboard = useCallback(async (id: string, value: string) => {
    try {
      if (!navigator?.clipboard) {
        throw new Error('Clipboard API not available')
      }
      
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      setCopyError(null)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      setCopyError('Failed to copy to clipboard')
      setTimeout(() => setCopyError(null), 3000)
    }
  }, [])

  const handleDeleteSecret = (id: string) => {
    if (window.confirm('Are you sure you want to delete this secret? This action cannot be undone.')) {
      setSecrets(prev => prev.filter(secret => secret.id !== id))
      setSelectedSecrets(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handleBulkDelete = () => {
    if (selectedSecrets.size === 0) return
    
    if (window.confirm(`Are you sure you want to delete ${selectedSecrets.size} selected secrets? This action cannot be undone.`)) {
      setSecrets(prev => prev.filter(secret => !selectedSecrets.has(secret.id)))
      setSelectedSecrets(new Set())
      setSelectAll(false)
    }
  }

  const handleAddSecret = (key: string, value: string, environment: string) => {
    const project = mockProjects[0]
    const newSecret = {
      id: Date.now().toString(),
      key,
      value,
      environment,
      projectId: project.id,
      projectName: project.name,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setSecrets(prev => [newSecret, ...prev])
  }

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedSecrets(new Set())
    } else {
      setSelectedSecrets(new Set(filteredSecrets.map(s => s.id)))
    }
    setSelectAll(!selectAll)
  }

  const toggleSelectSecret = (id: string) => {
    setSelectedSecrets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Get unique values for filters
  const projects = ['all', ...new Set(secrets.map(s => s.projectName))]
  const environments = ['all', ...new Set(secrets.map(s => s.environment))]

  // Filter and search secrets
  const filteredSecrets = secrets.filter(secret => {
    const matchesProject = projectFilter === 'all' || secret.projectName === projectFilter
    const matchesEnvironment = environmentFilter === 'all' || secret.environment === environmentFilter
    const matchesSearch = searchTerm === '' || 
      secret.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      secret.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      secret.value.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesProject && matchesEnvironment && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredSecrets.length / itemsPerPage)
  const paginatedSecrets = filteredSecrets.slice(
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Secrets</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage environment variables and sensitive data securely across all projects
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {selectedSecrets.size > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBulkDelete}
                  className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/50"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Selected ({selectedSecrets.size})
                </Button>
              )}
              <Button onClick={() => setIsAddModalOpen(true)} size="lg">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Secret
              </Button>
            </div>
          </div>
        </div>

        {/* Error Toast */}
        {copyError && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700 dark:text-red-300">{copyError}</p>
          </div>
        )}

        {/* Filters and Search Bar */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by key, project, or value..."
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
        </div>

        {/* Results Stats */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">
              {paginatedSecrets.length}
            </span> of{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredSecrets.length}
            </span> secrets
          </div>
          {(projectFilter !== 'all' || environmentFilter !== 'all' || searchTerm) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setProjectFilter('all')
                setEnvironmentFilter('all')
                setSearchTerm('')
              }}
              className="text-red-600 hover:text-red-700"
            >
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Secrets Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectAll && paginatedSecrets.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Secret Key
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Environment
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Project
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
                {paginatedSecrets.map((secret) => (
                  <tr 
                    key={secret.id} 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedSecrets.has(secret.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedSecrets.has(secret.id)}
                        onChange={() => toggleSelectSecret(secret.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <KeyIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                          {secret.key}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <code className="text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700">
                          {visibleSecrets.has(secret.id) ? secret.value : '••••••••••••••••'}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSecretVisibility(secret.id)}
                          className="p-1"
                          title={visibleSecrets.has(secret.id) ? 'Hide' : 'Show'}
                        >
                          {visibleSecrets.has(secret.id) ? 
                            <EyeSlashIcon className="h-4 w-4 text-gray-500" /> : 
                            <EyeIcon className="h-4 w-4 text-gray-500" />
                          }
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(secret.id, secret.value)}
                          className="p-1"
                          title="Copy"
                        >
                          {copiedId === secret.id ? 
                            <CheckCircleIcon className="h-4 w-4 text-green-500" /> : 
                            <ClipboardIcon className="h-4 w-4 text-gray-500" />
                          }
                        </Button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getEnvironmentBadge(secret.environment)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {secret.projectName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(secret.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSecret(secret.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/50"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}

                {paginatedSecrets.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <KeyIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400 mb-4">No secrets found</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setProjectFilter('all')
                          setEnvironmentFilter('all')
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

        {/* Add Secret Modal */}
        <AddSecretModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddSecret}
          projects={mockProjects}
        />
      </div>
    </div>
  )
}