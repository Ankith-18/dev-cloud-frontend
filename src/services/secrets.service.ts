import { api } from './api'

export interface Secret {
  id: string
  key: string
  environment: string
  projectId: number
  projectName: string
  createdAt: string
  lastUpdated?: string
}

export interface CreateSecretData {
  key: string
  value: string
  environment: string
  projectId: number
}

export const secretsService = {
  async getAll(projectId?: number, environment?: string): Promise<Secret[]> {
    const response = await api.get('/secrets', { params: { projectId, environment } })
    return response.data.secrets
  },

  async create(data: CreateSecretData): Promise<Secret> {
    const response = await api.post('/secrets', data)
    return response.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/secrets/${id}`)
  }
}