"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { 
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  PlayIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

// Mock data
const mockPipeline = {
  id: '1',
  name: 'Build and Test',
  projectName: 'backend-api',
  status: 'failed',
  trigger: 'git push',
  branch: 'main',
  commit: '8f3b8a1',
  duration: 45,
  steps: [
    { 
      name: 'Build', 
      status: 'success', 
      duration: 12,
      logs: 'npm install\nnpm run build\nBuild completed successfully'
    },
    { 
      name: 'Test', 
      status: 'failed', 
      duration: 8,
      logs: 'npm test\n> backend-api@1.0.0 test\n> jest\n\nFAIL src/api.test.ts\n  ✕ should return user data\n\nTest suite failed to run'
    },
    { 
      name: 'Deploy', 
      status: 'pending', 
      duration: 0,
      logs: 'Waiting for tests to pass...'
    }
  ],
  createdAt: '2024-02-10T10:30:00Z',
  completedAt: '2024-02-10T11:15:00Z'
}

export default function PipelineDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedStep, setSelectedStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pipeline, setPipeline] = useState<typeof mockPipeline | null>(null)
  const [pipelineId, setPipelineId] = useState<string | null>(null)

  // Unwrap params Promise
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params
      setPipelineId(resolvedParams.id)
    }
    unwrapParams()
  }, [params])

  // Fetch pipeline data
  useEffect(() => {
    if (!pipelineId) return
    
    const fetchPipeline = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        setPipeline(mockPipeline)
        setError(null)
      } catch (err) {
        setError('Failed to load pipeline data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPipeline()
  }, [pipelineId])

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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading pipeline details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !pipeline) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">{error || 'Pipeline not found'}</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  // Rest of your component remains the same...
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Pipelines
        </Button>
      </div>

      {/* Pipeline Title and Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {pipeline.name}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Project: {pipeline.projectName}</span>
              <span>Trigger: {pipeline.trigger}</span>
              <span>Branch: {pipeline.branch}</span>
              <span>Commit: {pipeline.commit}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 text-sm rounded-full ${
              pipeline.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              pipeline.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              pipeline.status === 'running' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}>
              {pipeline.status}
            </span>
            <Button>
              <PlayIcon className="h-4 w-4 mr-2" />
              Run Again
            </Button>
          </div>
        </div>
      </div>

      {/* Step-by-step execution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Steps List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Steps</h2>
          {pipeline.steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setSelectedStep(index)}
              className={`w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-2 transition-colors ${
                selectedStep === index 
                  ? 'border-blue-500' 
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(step.status)}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{step.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Duration: {step.duration}s
                    </p>
                  </div>
                </div>
                {step.status === 'failed' && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    Failed
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Step Logs */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Logs: {pipeline.steps[selectedStep].name}
                </h2>
                <Button variant="outline" size="sm">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  Download Logs
                </Button>
              </div>
            </div>
            <div className="p-4">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {pipeline.steps[selectedStep].logs}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Execution Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Started</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {new Date(pipeline.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {pipeline.completedAt ? new Date(pipeline.completedAt).toLocaleTimeString() : '-'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Duration</p>
            <p className="font-medium text-gray-900 dark:text-white">{pipeline.duration}s</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Triggered By</p>
            <p className="font-medium text-gray-900 dark:text-white">Git Push</p>
          </div>
        </div>
      </div>
    </div>
  )
}