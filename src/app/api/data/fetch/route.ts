import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Simulate fetching data from database
    // In production, this would fetch from your actual data source
    const data = {
      revenue: [12000, 15000, 13500, 18000, 16500, 22000, 25000, 21000, 26000, 28000, 24000, 30000],
      users: [150, 180, 165, 220, 195, 280, 320, 290, 350, 380, 340, 420],
      conversion: [2.1, 2.3, 2.0, 2.8, 2.5, 3.1, 3.4, 3.0, 3.6, 3.8, 3.5, 4.2],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Data Fetch Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}