import { api } from './api'

export interface Log {
  id: string
  timestamp: string
  service: string
  environment: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
}

export interface LogsQueryParams {
  projectId?: number
  environment?: string
  level?: string
  limit?: number
  cursor?: string
}

export const logsService = {
  async getLogs(params: LogsQueryParams): Promise<{ logs: Log[]; nextCursor?: string }> {
    const response = await api.get('/logs', { params })
    return response.data
  },

  // For real-time logs (WebSocket)
  connectWebSocket(projectId?: number): WebSocket {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080'
    const url = projectId ? `${wsUrl}/logs?projectId=${projectId}` : `${wsUrl}/logs`
    return new WebSocket(url)
  }
}