import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { analyzeData, generateTrends } from '@/lib/ai/openai'

export async function POST(request: NextRequest) {
  try {
    const { userId, redirectToSignIn } = await auth()
    if (!userId) return redirectToSignIn();
      // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    

    const { data } = await request.json()
    
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }

    const insights = []

    // Analyze revenue trends
    if (data.revenue && data.labels) {
      const revenueAnalysis = await analyzeData({
        data: data.revenue,
        labels: data.labels,
        metric: 'revenue'
      })

      insights.push({
        id: `revenue-${Date.now()}`,
        type: 'trend',
        title: 'Revenue Analysis',
        description: revenueAnalysis.trends[0] || 'No significant trends detected',
        confidence: 0.85,
        timestamp: new Date()
      })

      // Generate predictions
      const predictions = await generateTrends(data.revenue)
      insights.push({
        id: `prediction-${Date.now()}`,
        type: 'prediction',
        title: 'Revenue Forecast',
        description: `Predicted values: ${predictions.map(p => p.toFixed(0)).join(', ')}`,
        confidence: 0.75,
        timestamp: new Date()
      })
    }

    // Analyze user growth
    if (data.users) {
      const userTrends = await generateTrends(data.users)
      insights.push({
        id: `users-${Date.now()}`,
        type: 'trend',
        title: 'User Growth Trend',
        description: `User growth showing ${userTrends[0] > data.users[data.users.length - 1] ? 'upward' : 'downward'} trajectory`,
        confidence: 0.80,
        timestamp: new Date()
      })
    }

    return NextResponse.json(insights)
  } catch (error) {
    console.error('AI Insights Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}