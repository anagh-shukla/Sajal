"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, FileText, CheckCircle, Clock, Download, Eye } from "lucide-react"
import { useState } from "react"

const workerReports = [
  {
    id: "WR001",
    workerName: "Dr. Rajesh Kumar",
    workerId: "HW001",
    location: "Guwahati, Kamrup",
    reportType: "Weekly Summary",
    casesHandled: 12,
    casesResolved: 10,
    casesPending: 2,
    waterTests: 5,
    alertsRaised: 1,
    submissionDate: "2024-01-15",
    status: "submitted",
    rating: 4.5,
    notes: "Excellent work handling dengue outbreak cases. Quick response time.",
  },
  {
    id: "WR002",
    workerName: "Dr. Priya Nath",
    workerId: "HW002",
    location: "Barpeta, Barpeta",
    reportType: "Monthly Report",
    casesHandled: 28,
    casesResolved: 25,
    casesPending: 3,
    waterTests: 12,
    alertsRaised: 2,
    submissionDate: "2024-01-14",
    status: "reviewed",
    rating: 4.8,
    notes: "Outstanding performance in water quality monitoring and community outreach.",
  },
  {
    id: "WR003",
    workerName: "Dr. Amit Sharma",
    workerId: "HW003",
    location: "Jorhat, Jorhat",
    reportType: "Weekly Summary",
    casesHandled: 18,
    casesResolved: 15,
    casesPending: 3,
    waterTests: 8,
    alertsRaised: 0,
    submissionDate: "2024-01-13",
    status: "pending_review",
    rating: 4.2,
    notes: "Good case resolution rate. Needs improvement in documentation.",
  },
]

export function WorkerReportsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedWorker, setSelectedWorker] = useState<(typeof workerReports)[0] | null>(null)

  const filteredReports = workerReports.filter((report) => {
    const matchesPeriod =
      selectedPeriod === "all" ||
      (selectedPeriod === "weekly" && report.reportType === "Weekly Summary") ||
      (selectedPeriod === "monthly" && report.reportType === "Monthly Report")

    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus

    return matchesPeriod && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "default"
      case "pending_review":
        return "secondary"
      case "reviewed":
        return "default"
      case "approved":
        return "default"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <FileText className="w-4 h-4" />
      case "pending_review":
        return <Clock className="w-4 h-4" />
      case "reviewed":
        return <Eye className="w-4 h-4" />
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-blue-600"
    if (rating >= 3.5) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Workers</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reports Submitted</p>
                <p className="text-2xl font-bold">{workerReports.length}</p>
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
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">
                  {workerReports.filter((r) => r.status === "pending_review").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">4.6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Health Worker Reports
          </CardTitle>
          <CardDescription>Monitor and review health worker performance and reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex gap-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Report Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  <SelectItem value="weekly">Weekly Reports</SelectItem>
                  <SelectItem value="monthly">Monthly Reports</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="pending_review">Pending Review</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Worker Reports ({filteredReports.length})</h3>
          {filteredReports.map((report) => (
            <Card
              key={report.id}
              className={`cursor-pointer transition-colors ${
                selectedWorker?.id === report.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedWorker(report)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(report.status)}
                    <Badge variant={getStatusColor(report.status) as any}>
                      {report.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-medium ${getRatingColor(report.rating)}`}>★ {report.rating}</span>
                  </div>
                </div>

                <h4 className="font-semibold text-sm mb-1">{report.workerName}</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {report.workerId} • {report.location}
                </p>
                <p className="text-sm text-muted-foreground mb-2">{report.reportType}</p>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <p className="font-medium text-blue-600">{report.casesHandled}</p>
                    <p className="text-muted-foreground">Cases</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-green-600">{report.casesResolved}</p>
                    <p className="text-muted-foreground">Resolved</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-orange-600">{report.casesPending}</p>
                    <p className="text-muted-foreground">Pending</p>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Submitted: {report.submissionDate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Details */}
        <div>
          {selectedWorker ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Report Details</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    {selectedWorker.status === "pending_review" && <Button size="sm">Approve</Button>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Worker Name</label>
                      <p className="font-medium">{selectedWorker.workerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Worker ID</label>
                      <p className="font-medium">{selectedWorker.workerId}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Location</label>
                    <p className="font-medium">{selectedWorker.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Report Type</label>
                      <p className="font-medium">{selectedWorker.reportType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Submission Date</label>
                      <p className="font-medium">{selectedWorker.submissionDate}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Performance Metrics</label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-800">{selectedWorker.casesHandled}</p>
                        <p className="text-sm text-blue-600">Cases Handled</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-800">{selectedWorker.casesResolved}</p>
                        <p className="text-sm text-green-600">Cases Resolved</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-800">{selectedWorker.casesPending}</p>
                        <p className="text-sm text-orange-600">Cases Pending</p>
                      </div>
                      <div className="p-3 bg-cyan-50 rounded-lg">
                        <p className="text-2xl font-bold text-cyan-800">{selectedWorker.waterTests}</p>
                        <p className="text-sm text-cyan-600">Water Tests</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Performance Rating</label>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-2xl font-bold ${getRatingColor(selectedWorker.rating)}`}>
                        ★ {selectedWorker.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">/ 5.0</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge variant={getStatusColor(selectedWorker.status) as any}>
                        {selectedWorker.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Supervisor Notes</label>
                    <p className="mt-1 p-3 bg-muted rounded-lg text-sm">{selectedWorker.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a report to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
