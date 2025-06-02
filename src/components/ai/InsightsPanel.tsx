'use client'

import { useEffect } from 'react'
import { Brain, TrendingUp, AlertTriangle, Zap } from 'lucide-react'
import { useDashboardStore } from '@/lib/store/dashboard-store'

const insightIcons = {
  trend: TrendingUp,
  anomaly: AlertTriangle,
  prediction: Zap
}

export default function InsightsPanel() {
  const { insights, isLoading, generateInsights } = useDashboardStore()

  useEffect(() => {
    generateInsights()
  }, [generateInsights])

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Brain className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Insights
          </h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Brain className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Insights
          </h3>
        </div>
        <button
          onClick={generateInsights}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {insights.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No insights available. Click refresh to generate AI insights.
          </p>
        ) : (
          insights.map((insight) => {
            const Icon = insightIcons[insight.type]
            return (
              <div 
                key={insight.id}
                className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {insight.description}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Confidence: {Math.round(insight.confidence * 100)}%</span>
                    <span className="mx-2">•</span>
                    <span>{insight.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}