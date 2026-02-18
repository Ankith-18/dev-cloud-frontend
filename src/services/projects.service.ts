import { api } from './api'

export interface Project {
  id: number
  name: string
  description: string
  visibility: 'public' | 'private'
  environments: Environment[]
  createdAt: string
  status: 'active' | 'inactive'
}

export interface Environment {
  id: string
  name: string
  description?: string
  status: 'active' | 'inactive'
  createdAt: string
  lastDeployed?: string
}

export interface CreateProjectData {
  name: string
  description: string
  visibility: 'public' | 'private'
  defaultEnvironment: string
}

export const projectsService = {
  async getAll(): Promise<Project[]> {
    const response = await api.get('/projects')
    return response.data.projects
  },

  async getById(id: number): Promise<Project> {
    const response = await api.get(`/projects/${id}`)
    return response.data
  },

  async create(data: CreateProjectData): Promise<Project> {
    const response = await api.post('/projects', data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/projects/${id}`)
  },

  // Environments
  async addEnvironment(projectId: number, name: string, description: string): Promise<Environment> {
    const response = await api.post(`/projects/${projectId}/environments`, { name, description })
    return response.data
  },

  async deleteEnvironment(projectId: number, envId: string): Promise<void> {
    await api.delete(`/projects/${projectId}/environments/${envId}`)
  }
}