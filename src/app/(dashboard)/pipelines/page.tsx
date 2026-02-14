"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { PipelineCard } from '@/components/pipelines/PipelineCard'
import { 
  FunnelIcon, 
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import type { Pipeline } from '@/types'

// Mock data - will be replaced with API calls
const mockPipelines: Pipeline[] = [
  {
    id: '1',
    name: 'Build and Test',
    projectId: 1,
    projectName: 'backend-api',
    status: 'success',
    trigger: 'git push',
    branch: 'main',
    duration: 45,
    steps: [
      { name: 'Build', status: 'success' },
      { name: 'Test', status: 'success' },
      { name: 'Deploy', status: 'success' }
    ],
    createdAt: '2024-02-10T10:30:00Z'
  },
  {
    id: '2',
    name: 'Integration Tests',
    projectId: 1,
    projectName: 'backend-api',
    status: 'failed',
    trigger: 'manual',
    branch: 'feature/auth',
    duration: 23,
    steps: [
      { name: 'Build', status: 'success' },
      { name: 'Test', status: 'failed' },
      { name: 'Deploy', status: 'pending' }
    ],
    createdAt: '2024-02-10T09:15:00Z'
  },
  {
    id: '3',
    name: 'Production Deploy',
    projectId: 2,
    projectName: 'frontend-app',
    status: 'running',
    trigger: 'manual',
    branch: 'main',
    duration: 12,
    steps: [
      { name: 'Build', status: 'success' },
      { name: 'Test', status: 'running' },
      { name: 'Deploy', status: 'pending' }
    ],
    createdAt: '2024-02-10T11:00:00Z'
  },
  {
    id: '4',
    name: 'Deploy to Staging',
    projectId: 3,
    projectName: 'auth-service',
    status: 'pending',
    trigger: 'schedule',
    branch: 'develop',
    steps: [
      { name: 'Build', status: 'pending' },
      { name: 'Test', status: 'pending' },
      { name: 'Deploy', status: 'pending' }
    ],
    createdAt: '2024-02-10T12:00:00Z'
  }
]

export default function PipelinesPage() {
  const [filter, setFilter] = useState('all')
  const [pipelines, setPipelines] = useState(mockPipelines)

  const filteredPipelines = pipelines.filter(pipeline => {
    if (filter === 'all') return true
    return pipeline.status === filter
  })

  const getStatusCount = (status: string) => {
    return pipelines.filter(p => p.status === status).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pipelines</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          View and manage all CI/CD pipelines
        </p>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({pipelines.length})
        </Button>
        <Button
          variant={filter === 'running' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('running')}
          className="flex items-center gap-1"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Running ({getStatusCount('running')})
        </Button>
        <Button
          variant={filter === 'success' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('success')}
          className="flex items-center gap-1"
        >
          <CheckCircleIcon className="h-4 w-4" />
          Success ({getStatusCount('success')})
        </Button>
        <Button
          variant={filter === 'failed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('failed')}
          className="flex items-center gap-1"
        >
          <XCircleIcon className="h-4 w-4" />
          Failed ({getStatusCount('failed')})
        </Button>
        <Button
          variant={filter === 'pending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('pending')}
          className="flex items-center gap-1"
        >
          <ClockIcon className="h-4 w-4" />
          Pending ({getStatusCount('pending')})
        </Button>
      </div>

      {/* Pipelines List */}
      <div className="space-y-3">
        {filteredPipelines.map((pipeline) => (
          <PipelineCard
            key={pipeline.id}
            pipeline={pipeline}
            onRun={() => alert(`Running pipeline: ${pipeline.name}`)}
            onViewDetails={() => window.location.href = `/pipelines/${pipeline.id}`}
          />
        ))}

        {filteredPipelines.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">No pipelines found</p>
          </div>
        )}
      </div>
    </div>
  )
}