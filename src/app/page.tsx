import { DollarSign, Users, TrendingUp, Activity } from 'lucide-react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import StatsCard from '@/components/dashboard/StatsCard'
import RevenueChart from '@/components/charts/RevenueChart'
import InsightsPanel from '@/components/ai/InsightsPanel'

export default function Home() {
  // Example static data for demonstration
  const currentRevenue = 125000
  const currentUsers = 3200
  const currentConversion = 4.7
  const revenueChange = 8.2
  const userChange = 2.5

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome! Here&apos;s a summary of your AI platform activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Revenue"
            value={`$${currentRevenue.toLocaleString()}`}
            change={`+${revenueChange}% from last month`}
            changeType="increase"
            icon={DollarSign}
          />
          <StatsCard
            title="Active Users"
            value={currentUsers.toLocaleString()}
            change={`+${userChange}% from last month`}
            changeType="increase"
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