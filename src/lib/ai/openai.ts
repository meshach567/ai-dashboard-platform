import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AnalysisRequest {
  data: number[]
  labels: string[]
  metric: string
}

export interface InsightResponse {
  trends: string[]
  anomalies: string[]
  predictions: string[]
  recommendations: string[]
}

export async function analyzeData(request: AnalysisRequest): Promise<InsightResponse> {
  const prompt = `
    Analyze the following ${request.metric} data:
    Data: ${request.data.join(', ')}
    Labels: ${request.labels.join(', ')}
    
    Provide insights in the following format:
    1. Key trends identified
    2. Any anomalies or outliers
    3. Predictions for next period
    4. Actionable recommendations
    
    Response should be JSON format with arrays for trends, anomalies, predictions, and recommendations.
  `

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a data analyst expert. Provide concise, actionable insights in JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('No response from OpenAI')

    return JSON.parse(content) as InsightResponse
  } catch (error) {
    console.error('OpenAI Analysis Error:', error)
    throw new Error('Failed to analyze data with AI')
  }
}

export async function generateTrends(data: number[]): Promise<number[]> {
  // Simple trend prediction using linear regression
  const n = data.length
  if (n < 2) return data

  const x = Array.from({ length: n }, (_, i) => i)
  const sumX = x.reduce((a, b) => a + b, 0)
  const sumY = data.reduce((a, b) => a + b, 0)
  const sumXY = x.reduce((sum, xi, i) => sum + xi * data[i], 0)
  const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0)

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  // Predict next 3 periods
  const predictions = []
  for (let i = n; i < n + 3; i++) {
    predictions.push(Math.max(0, slope * i + intercept))
  }

  return predictions
}