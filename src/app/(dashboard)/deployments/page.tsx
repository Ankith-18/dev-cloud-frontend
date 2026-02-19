"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { 
  RocketLaunchIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ClockIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
  FunnelIcon,
  XMarkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

// Mock data
const mockDeployments = [
  {
    id: '1',
    projectId: 1,
    projectName: 'backend-api',
    environment: 'production',
    status: 'success',
    version: 'v2.1.0',
    url: 'https://api.example.com',
    deployedAt: '2024-02-15T10:30:00Z',
    deployedBy: 'John Doe'
  },
  {
    id: '2',
    projectId: 1,
    projectName: 'backend-api',
    environment: 'staging',
    status: 'running',
    version: 'v2.2.0-rc.1',
    url: 'https://staging-api.example.com',
    deployedAt: '2024-02-15T11:45:00Z',
    deployedBy: 'Jane Smith'
  },
  {
    id: '3',
    projectId: 2,
    projectName: 'frontend-app',
    environment: 'production',
    status: 'failed',
    version: 'v1.5.0',
    url: 'https://app.example.com',
    deployedAt: '2024-02-15T09:15:00Z',
    deployedBy: 'John Doe'
  },
  {
    id: '4',
    projectId: 3,
    projectName: 'auth-service',
    environment: 'dev',
    status: 'pending',
    version: 'v0.9.0',
    url: 'https://auth.example.com',
    deployedAt: '2024-02-15T12:00:00Z',
    deployedBy: 'Mike Johnson'
  },
  {
    id: '5',
    projectId: 2,
    projectName: 'frontend-app',
    environment: 'staging',
    status: 'success',
    version: 'v1.6.0',
    url: 'https://staging-app.example.com',
    deployedAt: '2024-02-14T14:20:00Z',
    deployedBy: 'Jane Smith'
  }
]

export default function DeploymentsPage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState('all')
  const [environmentFilter, setEnvironmentFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      case 'running':
        return <ArrowPathIcon className="h-5 w-5 text-blue-500 animate-spin" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const handleRedeploy = (deploymentId: string) => {
    alert(`Redeploying deployment ${deploymentId}`)
    // In real app: router.push(`/deployments/${deploymentId}/redeploy`)
  }

  const handleViewLogs = (deploymentId: string) => {
    router.push(`/logs?deployment=${deploymentId}`)
  }

  // Get unique environments for filter
  const environments = ['all', ...new Set(mockDeployments.map(d => d.environment))]

  // Filter deployments
  const filteredDeployments = mockDeployments.filter(deployment => {
    if (statusFilter !== 'all' && deployment.status !== statusFilter) return false
    if (environmentFilter !== 'all' && deployment.environment !== environmentFilter) return false
    return true
  })

  // Reset all filters
  const resetFilters = () => {
    setStatusFilter('all')
    setEnvironmentFilter('all')
  }

  // Check if any filter is active
  const isFilterActive = statusFilter !== 'all' || environmentFilter !== 'all'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deployments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Monitor and manage all deployments across environments
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <FunnelIcon className="h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
            {isFilterActive && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-red-600 hover:text-red-700"
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {['all', 'success', 'failed', 'running', 'pending'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 text-sm rounded-full capitalize transition-colors ${
                      statusFilter === status
                        ? status === 'all' 
                          ? 'bg-blue-500 text-white'
                          : status === 'success'
                          ? 'bg-green-500 text-white'
                          : status === 'failed'
                          ? 'bg-red-500 text-white'
                          : status === 'running'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-500 text-white'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Environment
              </label>
              <div className="flex flex-wrap gap-2">
                {environments.map((env) => (
                  <button
                    key={env}
                    onClick={() => setEnvironmentFilter(env)}
                    className={`px-3 py-1.5 text-sm rounded-full capitalize transition-colors ${
                      environmentFilter === env
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {isFilterActive && !showFilters && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Active filters:</span>
          {statusFilter !== 'all' && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs">
              Status: {statusFilter}
            </span>
          )}
          {environmentFilter !== 'all' && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-xs">
              Environment: {environmentFilter}
            </span>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-red-600 hover:text-red-700 text-xs"
          >
            Clear
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredDeployments.length} of {mockDeployments.length} deployments
      </div>

      {/* Deployments List */}
      <div className="space-y-4">
        {filteredDeployments.map((deployment) => (
          <div 
            key={deployment.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  {getStatusIcon(deployment.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {deployment.projectName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Version {deployment.version} • {deployment.environment}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getStatusColor(deployment.status)}`}>
                      {deployment.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Deployed At</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {new Date(deployment.deployedAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Deployed By</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {deployment.deployedBy}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Environment</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {deployment.environment}
                    </p>
                  </div>
                </div>

                {deployment.url && (
                  <div className="mt-3 flex items-center gap-2">
                    <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                    <a 
                      href={deployment.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 flex items-center gap-1"
                    >
                      {deployment.url}
                      <ArrowTopRightOnSquareIcon className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRedeploy(deployment.id)}
                >
                  <RocketLaunchIcon className="h-4 w-4 mr-1" />
                  Redeploy
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewLogs(deployment.id)}
                >
                  <DocumentTextIcon className="h-4 w-4 mr-1" />
                  View Logs
                </Button>
              </div>
            </div>
          </div>
        ))}

        {filteredDeployments.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <RocketLaunchIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No deployments match your filters</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={resetFilters}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}