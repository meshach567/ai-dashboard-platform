export interface DashboardMetrics {
  revenue: number[]
  users: number[]
  conversion: number[]
  labels: string[]
  lastUpdated: Date
}

export interface AIInsight {
  id: string
  type: 'trend' | 'anomaly' | 'prediction' | 'recommendation'
  title: string
  description: string
  confidence: number
  timestamp: Date
  priority: 'low' | 'medium' | 'high'
  actionable: boolean
}

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'viewer'
  lastLogin: Date
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
  dashboardLayout: string[]
  defaultDateRange: string
}