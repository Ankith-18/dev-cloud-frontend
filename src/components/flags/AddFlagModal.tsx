"use client"

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { FlagIcon } from '@heroicons/react/24/outline'

interface AddFlagModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (name: string, description: string, environment: string) => void
  projects: { id: number; name: string }[]
}

export function AddFlagModal({ isOpen, onClose, onAdd, projects }: AddFlagModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [environment, setEnvironment] = useState('dev')
  const [projectId, setProjectId] = useState<number>(projects[0]?.id || 0)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      onAdd(name, description, environment)
      setName('')
      setDescription('')
      setEnvironment('dev')
      setIsLoading(false)
      onClose()
    }, 500)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Feature Flag">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project <span className="text-red-500">*</span>
          </label>
          <select
            id="project"
            value={projectId}
            onChange={(e) => setProjectId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          >
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="environment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Environment <span className="text-red-500">*</span>
          </label>
          <select
            id="environment"
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="dev">Development (dev)</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Flag Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., new-checkout-flow, enable-dark-mode"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Use lowercase letters and hyphens
          </p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="What does this feature flag control?"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Flag'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}