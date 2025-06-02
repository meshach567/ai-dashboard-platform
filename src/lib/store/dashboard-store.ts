import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface DashboardData {
  revenue: number[]
  users: number[]
  conversion: number[]
  labels: string[]
}

interface AIInsight {
  id: string
  type: 'trend' | 'anomaly' | 'prediction'
  title: string
  description: string
  confidence: number
  timestamp: Date
}

interface DashboardState {
  data: DashboardData
  insights: AIInsight[]
  isLoading: boolean
  error: string | null
  
  // Actions
  setData: (data: DashboardData) => void
  addInsight: (insight: AIInsight) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchData: () => Promise<void>
  generateInsights: () => Promise<void>
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      data: {
        revenue: [],
        users: [],
        conversion: [],
        labels: []
      },
      insights: [],
      isLoading: false,
      error: null,

      setData: (data) => set({ data }),
      addInsight: (insight) => set((state) => ({ 
        insights: [...state.insights, insight] 
      })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      fetchData: async () => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/data/fetch')
          if (!response.ok) throw new Error('Failed to fetch data')
          const data = await response.json()
          set({ data, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      },

      generateInsights: async () => {
        const { data } = get()
        set({ isLoading: true })
        try {
          const response = await fetch('/api/ai/insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
          })
          if (!response.ok) throw new Error('Failed to generate insights')
          const insights = await response.json()
          set({ insights, isLoading: false })
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false })
        }
      }
    }),
    { name: 'dashboard-store' }
  )
)