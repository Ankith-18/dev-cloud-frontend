export interface Environment {
  id: string
  name: string
  description?: string
  status: 'active' | 'inactive'
  createdAt: string
  lastDeployed?: string
}

export interface Project {
  id: number
  name: string
  description: string
  visibility: 'public' | 'private'
  environments: Environment[]
  createdAt: string
  status: 'active' | 'inactive'
}

export interface PipelineStep {
  name: string
  status: 'pending' | 'running' | 'success' | 'failed'
  duration?: number
  logs?: string
}

export interface Pipeline {
  id: string
  name: string
  projectId: number
  projectName: string
  status: 'running' | 'success' | 'failed' | 'pending'
  trigger: 'manual' | 'git push' | 'schedule'
  commit?: string
  branch?: string
  duration?: number
  steps: PipelineStep[]
  createdAt: string
  startedAt?: string
  completedAt?: string
}

export interface Deployment {
  id: string
  pipelineId: string
  projectId: number
  projectName: string
  environment: string
  status: 'pending' | 'running' | 'success' | 'failed'
  version?: string
  url?: string
  createdAt: string
  completedAt?: string
}

export interface Secret {
  id: string
  key: string
  value: string
  environment: string
  projectId: number
  projectName: string
  createdAt: string
  lastUpdated?: string
}