"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { 
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

// Mock log data
const mockLogs = [
  {
    id: 1,
    timestamp: '2024-02-15T10:30:25Z',
    service: 'backend-api',
    environment: 'production',
    level: 'info',
    message: 'Server started successfully on port 3000'
  },
  {
    id: 2,
    timestamp: '2024-02-15T10:31:12Z',
    service: 'backend-api',
    environment: 'production',
    level: 'info',
    message: 'Connected to database postgresql://db:5432/app'
  },
  {
    id: 3,
    timestamp: '2024-02-15T10:32:05Z',
    service: 'auth-service',
    environment: 'staging',
    level: 'warn',
    message: 'Rate limit exceeded for IP 192.168.1.100'
  },
  {
    id: 4,
    timestamp: '2024-02-15T10:33:18Z',
    service: 'backend-api',
    environment: 'production',
    level: 'error',
    message: 'Failed to connect to redis: connection timeout'
  },
  {
    id: 5,
    timestamp: '2024-02-15T10:34:42Z',
    service: 'frontend-app',
    environment: 'production',
    level: 'info',
    message: 'User john.doe@example.com logged in successfully'
  },
  {
    id: 6,
    timestamp: '2024-02-15T10:35:10Z',
    service: 'payment-processor',
    environment: 'dev',
    level: 'debug',
    message: 'Processing payment for order #12345'
  },
  {
    id: 7,
    timestamp: '2024-02-15T10:36:30Z',
    service: 'auth-service',
    environment: 'production',
    level: 'error',
    message: 'JWT token validation failed: token expired'
  },
  {
    id: 8,
    timestamp: '2024-02-15T10:37:55Z',
    service: 'backend-api',
    environment: 'staging',
    level: 'info',
    message: 'Deployment v2.1.0 completed successfully'
  }
]

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [environmentFilter, setEnvironmentFilter] = useState('all')
  const [autoRefresh, setAutoRefresh] = useState(false)

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <InformationCircleIcon className="h-4 w-4 text-blue-500" />
      case 'warn':
        return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <XCircleIcon className="h-4 w-4 text-red-500" />
      case 'debug':
        return <CheckCircleIcon className="h-4 w-4 text-gray-500" />
      default:
        return <DocumentTextIcon className="h-4 w-4 text-gray-400" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info':
        return 'text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30'
      case 'warn':
        return 'text-yellow-700 bg-yellow-50 dark:text-yellow-300 dark:bg-yellow-900/30'
      case 'error':
        return 'text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-900/30'
      case 'debug':
        return 'text-gray-700 bg-gray-50 dark:text-gray-300 dark:bg-gray-900/30'
      default:
        return 'text-gray-700 bg-gray-50 dark:text-gray-300 dark:bg-gray-900/30'
    }
  }

  // Get unique values for filters
  const services = ['all', ...new Set(mockLogs.map(log => log.service))]
  const environments = ['all', ...new Set(mockLogs.map(log => log.environment))]
  const levels = ['all', 'info', 'warn', 'error', 'debug']

  // Filter logs
  const filteredLogs = mockLogs.filter(log => {
    if (levelFilter !== 'all' && log.level !== levelFilter) return false
    if (serviceFilter !== 'all' && log.service !== serviceFilter) return false
    if (environmentFilter !== 'all' && log.environment !== environmentFilter) return false
    if (searchTerm && !log.message.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Logs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and filter system logs across all services
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={autoRefresh ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="flex items-center gap-2"
          >
            <ArrowPathIcon className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto-refresh On' : 'Auto-refresh Off'}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Log Level
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setLevelFilter(level)}
                    className={`px-3 py-1.5 text-sm rounded-full capitalize transition-colors ${
                      levelFilter === level
                        ? level === 'all'
                          ? 'bg-gray-800 text-white dark:bg-gray-600'
                          : level === 'info'
                          ? 'bg-blue-500 text-white'
                          : level === 'warn'
                          ? 'bg-yellow-500 text-white'
                          : level === 'error'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-500 text-white'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {services.map(service => (
                  <option key={service} value={service}>
                    {service === 'all' ? 'All Services' : service}
                  </option>
                ))}
              </select>
            </div>

            {/* Environment Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Environment
              </label>
              <select
                value={environmentFilter}
                onChange={(e) => setEnvironmentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {environments.map(env => (
                  <option key={env} value={env}>
                    {env === 'all' ? 'All Environments' : env}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredLogs.length} of {mockLogs.length} logs
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Environment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Message
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getLevelIcon(log.level)}
                      <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {log.service}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {log.environment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                      {log.message}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No logs match your filters</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm('')
                setLevelFilter('all')
                setServiceFilter('all')
                setEnvironmentFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}