import { api } from './api'

// Define API_BASE_URL - you can get it from the api module or define it here
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post('/auth/signup', data)
    return response.data
  },

  async loginWithGithub(): Promise<void> {
    window.location.href = `${API_BASE_URL}/auth/github`
  },

  async loginWithGoogle(): Promise<void> {
    window.location.href = `${API_BASE_URL}/auth/google`
  },

  logout(): void {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
}