import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { generateTrends } from '@/lib/ai/openai'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, periods = 3 } = await request.json()
    
    if (!Array.isArray(data) || data.length < 2) {
      return NextResponse.json(
        { error: 'Invalid data format. Array with at least 2 points required.' },
        { status: 400 }
      )
    }

    const predictions = await generateTrends(data)
    
    return NextResponse.json({
      success: true,
      data: {
        predictions: predictions.slice(0, periods),
        confidence: 0.75,
        model: 'linear_regression',
        generatedAt: new Date()
      }
    })
  } catch (error) {
    console.error('Prediction error:', error)
    return NextResponse.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    )
  }
}