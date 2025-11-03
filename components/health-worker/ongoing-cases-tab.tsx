"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Eye, CheckCircle, Clock, AlertTriangle, Users } from "lucide-react"

const cases = [
  {
    id: "C001",
    patient: "Ramesh Kumar",
    age: 45,
    gender: "Male",
    symptoms: "Fever, Headache, Body ache",
    location: "Village Center, Ward 3",
    reportedDate: "2024-01-15",
    reportedBy: "Community User",
    status: "pending",
    priority: "medium",
    notes: "Patient reports fever for 3 days, temperature 101°F",
    contact: "+91-98765-43210",
  },
  {
    id: "C002",
    patient: "Sunita Devi",
    age: 32,
    gender: "Female",
    symptoms: "Diarrhea, Vomiting, Dehydration",
    location: "Near School, Ward 1",
    reportedDate: "2024-01-14",
    reportedBy: "Community User",
    status: "verified",
    priority: "high",
    notes: "Severe dehydration, needs immediate attention",
    contact: "+91-98765-43211",
  },
  {
    id: "C003",
    patient: "Mohan Singh",
    age: 28,
    gender: "Male",
    symptoms: "Cough, Body ache, Fatigue",
    location: "Market Area, Ward 2",
    reportedDate: "2024-01-13",
    reportedBy: "Health Worker",
    status: "under-treatment",
    priority: "low",
    notes: "Mild symptoms, prescribed basic medication",
    contact: "+91-98765-43212",
  },
  {
    id: "C004",
    patient: "Priya Sharma",
    age: 25,
    gender: "Female",
    symptoms: "Skin rash, Itching",
    location: "Residential Area, Ward 4",
    reportedDate: "2024-01-12",
    reportedBy: "Community User",
    status: "resolved",
    priority: "low",
    notes: "Allergic reaction, resolved with antihistamines",
    contact: "+91-98765-43213",
  },
]

export function OngoingCasesTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedCase, setSelectedCase] = useState<(typeof cases)[0] | null>(null)

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleVerifyCase = (caseId: string) => {
    alert(`Case ${caseId} has been verified and forwarded to district health office.`)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "verified":
        return <CheckCircle className="w-4 h-4" />
      case "under-treatment":
        return <AlertTriangle className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "verified":
        return "default"
      case "under-treatment":
        return "default"
      case "resolved":
        return "default"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Case Management</CardTitle>
          <CardDescription>Review and verify health cases reported in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name or case ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="under-treatment">Under Treatment</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{case_.patient}</h3>
                      <Badge variant="outline">{case_.id}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                      <p>
                        <strong>Age:</strong> {case_.age} years, {case_.gender}
                      </p>
                      <p>
                        <strong>Location:</strong> {case_.location}
                      </p>
                      <p>
                        <strong>Reported:</strong> {case_.reportedDate}
                      </p>
                      <p>
                        <strong>By:</strong> {case_.reportedBy}
                      </p>
                    </div>
                    <p className="text-sm mb-3">
                      <strong>Symptoms:</strong> {case_.symptoms}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(case_.status) as any} className="gap-1">
                        {getStatusIcon(case_.status)}
                        {case_.status.replace("-", " ")}
                      </Badge>
                      <Badge variant={getPriorityColor(case_.priority) as any}>{case_.priority} priority</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedCase(case_)}>
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Case Details - {selectedCase?.id}</DialogTitle>
                        <DialogDescription>Complete information about this health case</DialogDescription>
                      </DialogHeader>
                      {selectedCase && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Patient Name</Label>
                              <p className="font-medium">{selectedCase.patient}</p>
                            </div>
                            <div>
                              <Label>Age & Gender</Label>
                              <p className="font-medium">
                                {selectedCase.age} years, {selectedCase.gender}
                              </p>
                            </div>
                            <div>
                              <Label>Contact</Label>
                              <p className="font-medium">{selectedCase.contact}</p>
                            </div>
                            <div>
                              <Label>Location</Label>
                              <p className="font-medium">{selectedCase.location}</p>
                            </div>
                          </div>
                          <div>
                            <Label>Symptoms</Label>
                            <p className="font-medium">{selectedCase.symptoms}</p>
                          </div>
                          <div>
                            <Label>Notes</Label>
                            <p className="font-medium">{selectedCase.notes}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={getStatusColor(selectedCase.status) as any}>
                              {selectedCase.status.replace("-", " ")}
                            </Badge>
                            <Badge variant={getPriorityColor(selectedCase.priority) as any}>
                              {selectedCase.priority} priority
                            </Badge>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  {case_.status === "pending" && (
                    <Button size="sm" onClick={() => handleVerifyCase(case_.id)}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No cases found</h3>
            <p className="text-muted-foreground">No cases match your current filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
