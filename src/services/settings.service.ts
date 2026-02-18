import { api } from './api'

export interface UserProfile {
  name: string
  email: string
  bio?: string
  company?: string
  location?: string
  url?: string
  twitter?: string
}

export interface ApiKey {
  id: string
  name: string
  key: string
  environment: string
  createdAt: string
  lastUsed?: string
  permissions: string[]
}

export interface Session {
  id: string
  device: string
  location: string
  ip: string
  lastActive: string
  current: boolean
}

export const settingsService = {
  // Profile
  async getProfile(): Promise<UserProfile> {
    const response = await api.get('/user/profile')
    return response.data
  },

  async updateProfile(data: UserProfile): Promise<UserProfile> {
    const response = await api.put('/user/profile', data)
    return response.data
  },

  // API Keys
  async getApiKeys(): Promise<ApiKey[]> {
    const response = await api.get('/api-keys')
    return response.data.keys
  },

  async generateApiKey(name: string, environment: string): Promise<ApiKey> {
    const response = await api.post('/api-keys', { name, environment })
    return response.data
  },

  async deleteApiKey(id: string): Promise<void> {
    await api.delete(`/api-keys/${id}`)
  },

  // Sessions
  async getSessions(): Promise<Session[]> {
    const response = await api.get('/user/sessions')
    return response.data.sessions
  },

  async revokeSession(id: string): Promise<void> {
    await api.delete(`/user/sessions/${id}`)
  },

  async revokeAllSessions(): Promise<void> {
    await api.delete('/user/sessions')
  }
}