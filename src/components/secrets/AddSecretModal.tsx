"use client"

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface AddSecretModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (key: string, value: string, environment: string) => void
  projects: { id: number; name: string }[]
}

export function AddSecretModal({ isOpen, onClose, onAdd, projects }: AddSecretModalProps) {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [environment, setEnvironment] = useState('dev')
  const [projectId, setProjectId] = useState<number>(projects[0]?.id || 0)
  const [showValue, setShowValue] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      onAdd(key, value, environment)
      setKey('')
      setValue('')
      setEnvironment('dev')
      setIsLoading(false)
      onClose()
    }, 500)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Secret">
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
          <label htmlFor="key" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Secret Key <span className="text-red-500">*</span>
          </label>
          <input
            id="key"
            type="text"
            required
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase().replace(/[^a-zA-Z0-9]/g, '_'))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., DATABASE_URL, API_KEY"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Use uppercase letters and underscores
          </p>
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Secret Value <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="value"
              type={showValue ? 'text' : 'password'}
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="••••••••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowValue(!showValue)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              {showValue ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Secret'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}