"use client"

import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

interface AddEnvironmentModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (name: string, description: string) => void
}

export function AddEnvironmentModal({ isOpen, onClose, onAdd }: AddEnvironmentModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      onAdd(name, description)
      setName('')
      setDescription('')
      setIsLoading(false)
      onClose()
    }, 500)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Environment">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="envName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Environment Name <span className="text-red-500">*</span>
          </label>
          <input
            id="envName"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., staging, production"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Use lowercase letters and hyphens
          </p>
        </div>

        <div>
          <label htmlFor="envDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="envDescription"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="What is this environment for?"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Environment'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}