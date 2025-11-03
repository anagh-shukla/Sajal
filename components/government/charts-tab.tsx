"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3, LucidePieChart, Download } from "lucide-react"
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"

// Mock data for charts
const weeklyData = [
  { week: "Week 1", cases: 45, recovered: 42, active: 3 },
  { week: "Week 2", cases: 52, recovered: 48, active: 7 },
  { week: "Week 3", cases: 38, recovered: 35, active: 10 },
  { week: "Week 4", cases: 61, recovered: 55, active: 16 },
]

const monthlyData = [
  { month: "Oct", cases: 180, recovered: 165, active: 15 },
  { month: "Nov", cases: 220, recovered: 200, active: 35 },
  { month: "Dec", cases: 196, recovered: 180, active: 51 },
  { month: "Jan", cases: 245, recovered: 220, active: 76 },
]

const diseaseBreakdown = [
  { disease: "Fever", cases: 89, percentage: 36 },
  { disease: "Diarrhea", cases: 67, percentage: 27 },
  { disease: "Respiratory", cases: 45, percentage: 18 },
  { disease: "Skin Issues", cases: 32, percentage: 13 },
  { disease: "Others", cases: 15, percentage: 6 },
]

const ageGroupData = [
  { group: "0-5 years", cases: 45, percentage: 18 },
  { group: "6-18 years", cases: 62, percentage: 25 },
  { group: "19-35 years", cases: 78, percentage: 31 },
  { group: "36-60 years", cases: 52, percentage: 21 },
  { group: "60+ years", cases: 11, percentage: 5 },
]

export function ChartsTab() {
  const [timeRange, setTimeRange] = useState("monthly")
  const [chartType, setChartType] = useState("cases")

  const currentData = timeRange === "weekly" ? weeklyData : monthlyData

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Health Analytics Dashboard
          </CardTitle>
          <CardDescription>Visualize health trends and patterns across your jurisdiction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly View</SelectItem>
                  <SelectItem value="monthly">Monthly View</SelectItem>
                </SelectContent>
              </Select>

              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Chart Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cases">Cases Trend</SelectItem>
                  <SelectItem value="recovery">Recovery Rate</SelectItem>
                  <SelectItem value="comparison">Comparison</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export Charts
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {timeRange === "weekly" ? "Weekly" : "Monthly"} Cases Trend
            </CardTitle>
            <CardDescription>Track health cases over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={timeRange === "weekly" ? "week" : "month"} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="recovered" stackId="a" fill="#22c55e" name="Recovered" />
                  <Bar dataKey="active" stackId="a" fill="#ef4444" name="Active" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucidePieChart className="w-5 h-5" />
              Disease Breakdown
            </CardTitle>
            <CardDescription>Distribution of health cases by disease type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={diseaseBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cases"
                  >
                    {diseaseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recovery Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Recovery Rate Trend</CardTitle>
            <CardDescription>Track recovery rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={timeRange === "weekly" ? "week" : "month"} />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      `${(((value as number) / (currentData.find((d) => d.recovered === value)?.cases || 1)) * 100).toFixed(1)}%`,
                      "Recovery Rate",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="recovered"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Age Group Distribution Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Age Group Distribution</CardTitle>
            <CardDescription>Cases distribution across different age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ageGroupData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="group" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="cases" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Health Metrics</CardTitle>
          <CardDescription>Important health indicators and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-2xl font-bold text-green-800">94.2%</p>
              <p className="text-sm text-green-600">Recovery Rate</p>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-2xl font-bold text-blue-800">3.2</p>
              <p className="text-sm text-blue-600">Avg Days to Recovery</p>
              <p className="text-xs text-muted-foreground">-0.5 days improvement</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-2xl font-bold text-orange-800">12</p>
              <p className="text-sm text-orange-600">Active Outbreaks</p>
              <p className="text-xs text-muted-foreground">3 new this week</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-2xl font-bold text-purple-800">89%</p>
              <p className="text-sm text-purple-600">Water Quality Safe</p>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
