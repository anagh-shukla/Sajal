"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Droplets, Bell, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const recentCases = [
  {
    id: "C001",
    patient: "Ramesh Kumar",
    age: 45,
    symptoms: "Fever, Headache",
    status: "pending",
    date: "2024-01-15",
    priority: "medium",
  },
  {
    id: "C002",
    patient: "Sunita Devi",
    age: 32,
    symptoms: "Diarrhea, Vomiting",
    status: "verified",
    date: "2024-01-14",
    priority: "high",
  },
  {
    id: "C003",
    patient: "Mohan Singh",
    age: 28,
    symptoms: "Cough, Body ache",
    status: "pending",
    date: "2024-01-13",
    priority: "low",
  },
]

const waterTestResults = [
  {
    location: "Village Well - Center",
    ph: 7.2,
    turbidity: "Low",
    bacteria: "Absent",
    status: "safe",
    date: "2024-01-14",
  },
  {
    location: "Hand Pump - School",
    ph: 6.8,
    turbidity: "Medium",
    bacteria: "Present",
    status: "unsafe",
    date: "2024-01-13",
  },
]

const recentAlerts = [
  {
    title: "Dengue Alert - Increased Cases",
    description: "5 new dengue cases reported in the last week",
    type: "health",
    severity: "high",
    date: "2024-01-15",
  },
  {
    title: "Water Contamination - Hand Pump",
    description: "Bacteria detected in school hand pump water",
    type: "water",
    severity: "critical",
    date: "2024-01-13",
  },
]

export function MiniDashboardTab() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-xs text-green-600">+3 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Cases</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-orange-600">Needs attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Water Tests</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-blue-600">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-red-600">High priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Recent Cases (Last 5)
          </CardTitle>
          <CardDescription>Latest health cases requiring your attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCases.map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {case_.patient} ({case_.age}y)
                    </p>
                    <p className="text-sm text-muted-foreground">{case_.symptoms}</p>
                    <p className="text-xs text-muted-foreground">{case_.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      case_.priority === "high" ? "destructive" : case_.priority === "medium" ? "default" : "secondary"
                    }
                  >
                    {case_.priority}
                  </Badge>
                  <Badge variant={case_.status === "verified" ? "default" : "secondary"}>
                    {case_.status === "verified" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {case_.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full bg-transparent">
              View All Cases
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Quality Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Water Quality Status
            </CardTitle>
            <CardDescription>Recent water test results in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {waterTestResults.map((test, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{test.location}</p>
                    <Badge variant={test.status === "safe" ? "default" : "destructive"}>{test.status}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">pH</p>
                      <p className="font-medium">{test.ph}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Turbidity</p>
                      <p className="font-medium">{test.turbidity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Bacteria</p>
                      <p className="font-medium">{test.bacteria}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{test.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Alerts
            </CardTitle>
            <CardDescription>Important health alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        alert.severity === "critical" ? "bg-red-100" : "bg-orange-100"
                      }`}
                    >
                      <AlertTriangle
                        className={`w-4 h-4 ${alert.severity === "critical" ? "text-red-600" : "text-orange-600"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={alert.severity === "critical" ? "destructive" : "default"} className="text-xs">
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
