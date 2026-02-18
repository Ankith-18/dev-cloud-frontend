import { api } from './api'

export interface FeatureFlag {
  id: string
  name: string
  description: string
  environment: string
  projectId: number
  projectName: string
  status: 'enabled' | 'disabled'
  createdAt: string
  lastUpdated?: string
  updatedBy?: string
}

export interface CreateFlagData {
  name: string
  description: string
  environment: string
  projectId: number
}

export const flagsService = {
  async getAll(filters?: { projectId?: number; environment?: string; status?: string }): Promise<FeatureFlag[]> {
    const response = await api.get('/flags', { params: filters })
    return response.data.flags
  },

  async create(data: CreateFlagData): Promise<FeatureFlag> {
    const response = await api.post('/flags', data)
    return response.data
  },

  async toggle(id: string): Promise<FeatureFlag> {
    const response = await api.put(`/flags/${id}/toggle`)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/flags/${id}`)
  }
}