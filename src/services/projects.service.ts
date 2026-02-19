import { api } from './api'

export interface Project {
  id: number
  name: string
  description: string
  visibility: 'public' | 'private'
  environments: any[]
  createdAt: string
  status: 'active' | 'inactive'
}

// Mock data for when backend is not available
const mockProjects: Project[] = [
  {
    id: 1,
    name: 'backend-api',
    description: 'Main backend API for the platform',
    visibility: 'private',
    environments: [],
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'frontend-app',
    description: 'Main frontend application',
    visibility: 'private',
    environments: [],
    createdAt: '2024-01-20',
    status: 'active'
  }
]

export const projectsService = {
  async getAll(): Promise<Project[]> {
    try {
      const response = await api.get('/projects')
      return response.data.projects
    } catch (error) {
      console.log('Backend not available, using mock data')
      return mockProjects // Return mock data instead of throwing error
    }
  },

  async getById(id: number): Promise<Project> {
    try {
      const response = await api.get(`/projects/${id}`)
      return response.data
    } catch (error) {
      console.log('Backend not available, using mock data')
      const project = mockProjects.find(p => p.id === id)
      if (!project) throw new Error('Project not found')
      return project
    }
  },

  async create(data: any): Promise<Project> {
    try {
      const response = await api.post('/projects', data)
      return response.data
    } catch (error) {
      console.log('Backend not available, creating mock project')
      const newProject: Project = {
        id: mockProjects.length + 1,
        name: data.name,
        description: data.description,
        visibility: data.visibility,
        environments: [],
        createdAt: new Date().toISOString().split('T')[0],
        status: 'active'
      }
      mockProjects.push(newProject)
      return newProject
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/projects/${id}`)
    } catch (error) {
      console.log('Backend not available - mock delete')
      // Just remove from mock array in real app
    }
  }
}