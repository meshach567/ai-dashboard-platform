'use client'

import { useEffect } from 'react'
import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import StatsCard from '@/components/dashboard/StatsCard'
import RevenueChart from '@/components/charts/RevenueChart'
import InsightsPanel from '@/components/ai/InsightsPanel'
import { useDashboardStore } from '@/lib/store/dashboard-store'

export default function DashboardPage() {
  const { data, fetchData, isLoading } = useDashboardStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const currentRevenue = data.revenue[data.revenue.length - 1] || 0
  const currentUsers = data.users[data.users.length - 1] || 0
  const currentConversion = data.conversion[data.conversion.length - 1] || 0

  const revenueChange = data.revenue.length > 1 
    ? ((currentRevenue - data.revenue[data.revenue.length - 2]) / data.revenue[data.revenue.length - 2] * 100).toFixed(1)
    : '0'

  const userChange = data.users.length > 1
    ? ((currentUsers - data.users[data.users.length - 2]) / data.users[data.users.length - 2] * 100).toFixed(1)
    : '0'

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here&apos;s what&apos;s happening with your business.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value={`$${currentRevenue.toLocaleString()}`}
            change={`${revenueChange > 0 ? '+' : ''}${revenueChange}% from last month`}
            changeType={parseFloat(revenueChange) > 0 ? 'increase' : 'decrease'}
            icon={DollarSign}
          />
          <StatsCard
            title="Active Users"
            value={currentUsers.toLocaleString()}
            change={`${userChange > 0 ? '+' : ''}${userChange}% from last month`}
            changeType={parseFloat(userChange) > 0 ? 'increase' : 'decrease'}
            icon={Users}
          />
          <StatsCard
            title="Conversion Rate"
            value={`${currentConversion}%`}
            change="+0.3% from last month"
            changeType="increase"
            icon={TrendingUp}
          />
          <StatsCard
            title="Growth Score"
            value="87"
            change="+5 points this month"
            changeType="increase"
            icon={Activity}
          />
        </div>

        {/* Charts and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <InsightsPanel />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}