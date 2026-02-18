import { api } from './api'

export interface Deployment {
  id: string
  projectId: number
  projectName: string
  environment: string
  status: 'pending' | 'running' | 'success' | 'failed'
  version: string
  url?: string
  deployedAt: string
  deployedBy: string
}

export const deploymentsService = {
  async getAll(filters?: { projectId?: number; environment?: string }): Promise<Deployment[]> {
    const response = await api.get('/deployments', { params: filters })
    return response.data.deployments
  },

  async redeploy(id: string): Promise<Deployment> {
    const response = await api.post(`/deployments/${id}/redeploy`)
    return response.data
  }
}