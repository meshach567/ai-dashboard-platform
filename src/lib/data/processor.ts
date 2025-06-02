export interface DataPoint {
  timestamp: Date
  value: number
  category?: string
}

export class DataProcessor {
  static calculateMovingAverage(data: number[], window: number): number[] {
    const result: number[] = []
    
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - window + 1)
      const subset = data.slice(start, i + 1)
      const average = subset.reduce((sum, val) => sum + val, 0) / subset.length
      result.push(average)
    }
    
    return result
  }

  static detectAnomalies(data: number[], threshold: number = 2): number[] {
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length
    const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
    const stdDev = Math.sqrt(variance)
    
    return data.map((value, index) => {
      const zScore = Math.abs((value - mean) / stdDev)
      return zScore > threshold ? index : -1
    }).filter(index => index !== -1)
  }

  static groupByPeriod(data: DataPoint[], period: 'day' | 'week' | 'month'): Record<string, DataPoint[]> {
    return data.reduce((groups, point) => {
      let key: string
      
      switch (period) {
        case 'day':
          key = point.timestamp.toISOString().split('T')[0]
          break
        case 'week':
          const weekStart = new Date(point.timestamp)
          weekStart.setDate(weekStart.getDate() - weekStart.getDay())
          key = weekStart.toISOString().split('T')[0]
          break
        case 'month':
          key = `${point.timestamp.getFullYear()}-${String(point.timestamp.getMonth() + 1).padStart(2, '0')}`
          break
        default:
          key = point.timestamp.toISOString()
      }
      
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(point)
      
      return groups
    }, {} as Record<string, DataPoint[]>)
  }
}