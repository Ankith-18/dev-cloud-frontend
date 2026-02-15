"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { 
  ArrowLeftIcon,
  CubeIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  KeyIcon,
  FlagIcon,
  ServerIcon,
  PlusIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { AddEnvironmentModal } from "@/components/environments/AddEnvironmentModal"

// Define types directly
interface Environment {
  id: string
  name: string
  description?: string
  status: 'active' | 'inactive'
  createdAt: string
  lastDeployed?: string
}

interface Project {
  id: number
  name: string
  description: string
  visibility: 'public' | 'private'
  environments: Environment[]
  createdAt: string
  status: 'active' | 'inactive'
}

// Mock data
const mockProject: Project = {
  id: 1,
  name: 'backend-api',
  description: 'Main backend API for the platform',
  visibility: 'private',
  environments: [
    { 
      id: '1', 
      name: 'dev', 
      description: 'Development environment for testing',
      status: 'active', 
      createdAt: '2024-01-15',
      lastDeployed: '2024-02-10'
    },
    { 
      id: '2', 
      name: 'staging', 
      description: 'Staging environment for pre-production',
      status: 'active', 
      createdAt: '2024-01-15',
      lastDeployed: '2024-02-09'
    },
    { 
      id: '3', 
      name: 'production', 
      description: 'Production environment',
      status: 'active', 
      createdAt: '2024-01-15',
      lastDeployed: '2024-02-08'
    }
  ],
  createdAt: '2024-01-15',
  status: 'active'
}

const tabs = [
  { id: 'overview', name: 'Overview', icon: CubeIcon },
  { id: 'environments', name: 'Environments', icon: ServerIcon },
  { id: 'pipelines', name: 'Pipelines', icon: RocketLaunchIcon },
  { id: 'logs', name: 'Logs', icon: DocumentTextIcon },
  { id: 'secrets', name: 'Secrets', icon: KeyIcon },
  { id: 'flags', name: 'Feature Flags', icon: FlagIcon },
]

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddEnvModalOpen, setIsAddEnvModalOpen] = useState(false)
  const [projectId, setProjectId] = useState<string | null>(null)

  // Unwrap params Promise
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params
      setProjectId(resolvedParams.id)
    }
    unwrapParams()
  }, [params])

  // Fetch project data
  useEffect(() => {
    if (!projectId) return
    
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        setProject(mockProject)
        setError(null)
      } catch (err) {
        setError('Failed to load project')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  const handleAddEnvironment = (name: string, description: string) => {
    if (!project) return
    
    const newEnv: Environment = {
      id: Date.now().toString(),
      name,
      description,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    }
    setProject({
      ...project,
      environments: [...project.environments, newEnv]
    })
  }

  const handleDeleteEnvironment = (envId: string) => {
    if (!project) return
    
    if (confirm('Are you sure you want to delete this environment?')) {
      setProject({
        ...project,
        environments: project.environments.filter(env => env.id !== envId)
      })
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading project details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !project) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">{error || 'Project not found'}</p>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back button and title */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {project.name}
        </h1>
        <span className={`px-2 py-1 text-xs rounded-full ${
          project.status === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Project description */}
      <p className="text-gray-600 dark:text-gray-400">
        {project.description}
      </p>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }
              `}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Environments</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.environments.length}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Pipelines</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Deployments</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Pipeline Runs
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Pipeline #{i}
                    </span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Success
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'environments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Environments
              </h3>
              <Button onClick={() => setIsAddEnvModalOpen(true)}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Environment
              </Button>
            </div>

            <div className="grid gap-4">
              {project.environments.map((env) => (
                <div 
                  key={env.id} 
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                          {env.name}
                        </h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          env.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {env.status}
                        </span>
                      </div>
                      {env.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {env.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" />
                          Created: {env.createdAt}
                        </span>
                        {env.lastDeployed && (
                          <span className="flex items-center gap-1">
                            <CheckCircleIcon className="h-3 w-3" />
                            Last deployed: {env.lastDeployed}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Deploy
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteEnvironment(env.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {project.environments.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-gray-500 dark:text-gray-400">No environments yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'pipelines' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pipelines
              </h3>
              <Button onClick={() => window.location.href = '/pipelines'}>
                <PlusIcon className="h-4 w-4 mr-2" />
                View All Pipelines
              </Button>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Pipeline #{i}</h4>
                      <p className="text-sm text-gray-500">Status: Success</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.href = `/pipelines/${i}`}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Logs</h3>
            <p className="text-gray-500">Log viewer coming soon...</p>
          </div>
        )}

        {activeTab === 'secrets' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Secrets</h3>
            <p className="text-gray-500">Secret management coming soon...</p>
          </div>
        )}

        {activeTab === 'flags' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Feature Flags</h3>
            <p className="text-gray-500">Feature flags coming soon...</p>
          </div>
        )}
      </div>

      <AddEnvironmentModal 
        isOpen={isAddEnvModalOpen}
        onClose={() => setIsAddEnvModalOpen(false)}
        onAdd={handleAddEnvironment}
      />
    </div>
  )
}