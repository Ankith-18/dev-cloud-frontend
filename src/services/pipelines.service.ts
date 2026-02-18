import { api } from './api'

export interface Pipeline {
  id: string
  name: string
  projectId: number
  projectName: string
  status: 'running' | 'success' | 'failed' | 'pending'
  trigger: 'manual' | 'git push' | 'schedule'
  branch?: string
  commit?: string
  duration?: number
  steps: PipelineStep[]
  createdAt: string
}

export interface PipelineStep {
  name: string
  status: 'pending' | 'running' | 'success' | 'failed'
  duration?: number
  logs?: string
}

export const pipelinesService = {
  async getAll(projectId?: number): Promise<Pipeline[]> {
    const url = projectId ? `/projects/${projectId}/pipelines` : '/pipelines'
    const response = await api.get(url)
    return response.data.pipelines
  },

  async getById(id: string): Promise<Pipeline> {
    const response = await api.get(`/pipelines/${id}`)
    return response.data
  },

  async run(projectId: number, branch?: string): Promise<Pipeline> {
    const response = await api.post('/pipelines', { projectId, branch })
    return response.data
  }
}