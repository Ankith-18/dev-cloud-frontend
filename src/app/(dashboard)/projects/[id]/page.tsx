"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { 
  ArrowLeftIcon,
  CubeIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  KeyIcon,
  FlagIcon,
  ServerIcon
} from '@heroicons/react/24/outline'

// This will be replaced with real data from your friend's API
const mockProject = {
  id: 1,
  name: 'backend-api',
  description: 'Main backend API for the platform',
  visibility: 'private' as const,
  environments: ['dev', 'staging', 'production'],
  createdAt: '2024-01-15',
  status: 'active' as const
}

const tabs = [
  { id: 'overview', name: 'Overview', icon: CubeIcon },
  { id: 'environments', name: 'Environments', icon: ServerIcon },
  { id: 'pipelines', name: 'Pipelines', icon: RocketLaunchIcon },
  { id: 'logs', name: 'Logs', icon: DocumentTextIcon },
  { id: 'secrets', name: 'Secrets', icon: KeyIcon },
  { id: 'flags', name: 'Feature Flags', icon: FlagIcon },
]

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div className="space-y-6">
      {/* Back button and title */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {mockProject.name}
        </h1>
        <span className={`px-2 py-1 text-xs rounded-full ${
          mockProject.status === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {mockProject.status}
        </span>
      </div>

      {/* Project description */}
      <p className="text-gray-600 dark:text-gray-400">
        {mockProject.description}
      </p>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm
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
            {/* Project stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Environments</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockProject.environments.length}
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

            {/* Recent activity */}
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
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Environments
            </h3>
            <div className="space-y-3">
              {mockProject.environments.map((env) => (
                <div key={env} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {env}
                  </span>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pipelines' && (
  <div className="space-y-4">
    {/* Header with Run Pipeline button */}
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Pipelines
      </h3>
      <Button>
        <PlayIcon className="h-4 w-4 mr-2" />
        Run Pipeline
      </Button>
    </div>

    {/* Mock Pipelines List */}
    <div className="space-y-3">
      {[
        {
          id: '1',
          name: 'Build and Test',
          status: 'success',
          trigger: 'git push',
          branch: 'main',
          duration: 45,
          steps: [
            { name: 'Build', status: 'success' },
            { name: 'Test', status: 'success' },
            { name: 'Deploy', status: 'success' }
          ]
        },
        {
          id: '2',
          name: 'Integration Tests',
          status: 'failed',
          trigger: 'manual',
          branch: 'feature/auth',
          duration: 23,
          steps: [
            { name: 'Build', status: 'success' },
            { name: 'Test', status: 'failed' },
            { name: 'Deploy', status: 'pending' }
          ]
        },
        {
          id: '3',
          name: 'Production Deploy',
          status: 'running',
          trigger: 'manual',
          branch: 'main',
          duration: 12,
          steps: [
            { name: 'Build', status: 'success' },
            { name: 'Test', status: 'running' },
            { name: 'Deploy', status: 'pending' }
          ]
        }
      ].map((pipeline) => (
        <PipelineCard
          key={pipeline.id}
          pipeline={{
            id: pipeline.id,
            name: pipeline.name,
            projectId: project.id,
            projectName: project.name,
            status: pipeline.status as any,
            trigger: pipeline.trigger as any,
            branch: pipeline.branch,
            duration: pipeline.duration,
            steps: pipeline.steps as any,
            createdAt: '2024-02-10'
          }}
          onRun={() => alert(`Running pipeline: ${pipeline.name}`)}
          onViewDetails={() => window.location.href = `/pipelines/${pipeline.id}`}
        />
      ))}
    </div>
  </div>
)}

        {activeTab === 'logs' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Logs
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Log viewer will go here
            </p>
          </div>
        )}

        {activeTab === 'secrets' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Secrets
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Secret management will go here
            </p>
          </div>
        )}

        {activeTab === 'flags' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Feature Flags
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Feature flags will go here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}