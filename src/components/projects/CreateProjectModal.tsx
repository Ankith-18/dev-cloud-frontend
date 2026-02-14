"use client"

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { GlobeAltIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

interface CreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateProject: (projectData: {
    name: string
    description: string
    visibility: 'public' | 'private'
    defaultEnvironment: string
  }) => void
}

export function CreateProjectModal({ 
  isOpen, 
  onClose, 
  onCreateProject 
}: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'private'>('private')
  const [environment, setEnvironment] = useState('dev')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      onCreateProject({
        name: projectName,
        description,
        visibility,
        defaultEnvironment: environment
      })
      setProjectName('')
      setDescription('')
      setVisibility('private')
      setEnvironment('dev')
      setIsLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Project Name */}
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            id="projectName"
            type="text"
            required
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="my-awesome-project"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Must be unique and lowercase. Use hyphens for spaces.
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Describe what this project is about..."
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Visibility
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setVisibility('private')}
              className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-md transition-colors ${
                visibility === 'private'
                  ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200'
                  : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <LockClosedIcon className="h-4 w-4" />
              <span className="text-sm">Private</span>
            </button>
            <button
              type="button"
              onClick={() => setVisibility('public')}
              className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-md transition-colors ${
                visibility === 'public'
                  ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200'
                  : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <GlobeAltIcon className="h-4 w-4" />
              <span className="text-sm">Public</span>
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {visibility === 'private' 
              ? 'Only you and team members can access this project' 
              : 'Anyone can view this project'}
          </p>
        </div>

        {/* Default Environment */}
        <div>
          <label htmlFor="environment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Default Environment <span className="text-red-500">*</span>
          </label>
          <select
            id="environment"
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="dev">Development (dev)</option>
            <option value="staging">Staging</option>
            <option value="prod">Production</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}