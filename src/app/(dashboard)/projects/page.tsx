"use client"

import { Button } from "@/components/ui/Button"
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, LockClosedIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { useState } from "react"
import { CreateProjectModal } from "@/components/projects/CreateProjectModal"


// This will be replaced with real data from your friend's API
const mockProjects = [
  { id: 1, name: 'backend-api', environments: 3, createdAt: '2024-01-15', status: 'active', visibility: 'private' },
  { id: 2, name: 'frontend-app', environments: 2, createdAt: '2024-01-20', status: 'active', visibility: 'private' },
  { id: 3, name: 'auth-service', environments: 3, createdAt: '2024-02-01', status: 'inactive', visibility: 'public' },
  { id: 4, name: 'payment-processor', environments: 2, createdAt: '2024-02-10', status: 'active', visibility: 'private' },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState(mockProjects)

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateProject = (projectData: {
    name: string
    description: string
    visibility: 'public' | 'private'
    defaultEnvironment: string
  }) => {
    // This will be replaced with actual API call
    const newProject = {
      id: projects.length + 1,
      name: projectData.name,
      description: projectData.description,
      visibility: projectData.visibility,
      environments: 1,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active' as const
    }
    setProjects([newProject, ...projects])
  }

  return (
    <div className="space-y-6">
      {/* Header with title and create button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage all your projects and environments
          </p>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          New Project
        </Button>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filter
        </Button>
      </div>

      {/* Projects Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Visibility
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Environments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {project.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {project.visibility === 'private' ? (
                        <LockClosedIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <GlobeAltIcon className="h-4 w-4 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {project.visibility}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {project.environments} {project.environments === 1 ? 'environment' : 'environments'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {project.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mr-2 hover:bg-blue-50 dark:hover:bg-blue-900"
                        onClick={() => window.location.href = `/projects/${project.id}`}
                        >
                        View
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No projects found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  )
}