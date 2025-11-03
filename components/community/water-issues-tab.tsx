"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Droplets, Camera, AlertTriangle } from "lucide-react"

const waterIssueTypes = [
  "Contaminated water",
  "No water supply",
  "Low water pressure",
  "Bad taste/smell",
  "Dirty/muddy water",
  "Pipe leakage",
  "Pump not working",
  "Other",
]

export function WaterIssuesTab() {
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    location: "",
    severity: "",
    photo: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Water issue report submitted successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Water Quality Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            Water Quality Status
          </CardTitle>
          <CardDescription>Current water quality status in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Droplets className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-medium text-green-800">Main Supply</p>
              <p className="text-sm text-green-600">Good Quality</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="font-medium text-yellow-800">Bore Well</p>
              <p className="text-sm text-yellow-600">Needs Testing</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-medium text-blue-800">Hand Pump</p>
              <p className="text-sm text-blue-600">Safe to Use</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Water Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Water Issues</CardTitle>
          <CardDescription>Water issues reported in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Low water pressure in main supply</p>
                <p className="text-sm text-muted-foreground">Reported 1 day ago</p>
              </div>
              <Badge variant="destructive">High Priority</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Pipe leakage near community center</p>
                <p className="text-sm text-muted-foreground">Reported 3 days ago</p>
              </div>
              <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Water Issue */}
      <Card>
        <CardHeader>
          <CardTitle>Report Water Issue</CardTitle>
          <CardDescription>Help us maintain clean water supply by reporting any water-related issues</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="issueType">Type of Issue *</Label>
              <Select
                value={formData.issueType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, issueType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {waterIssueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="severity">Severity Level *</Label>
              <Select
                value={formData.severity}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, severity: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                  <SelectItem value="medium">Medium - Affects daily use</SelectItem>
                  <SelectItem value="high">High - No water available</SelectItem>
                  <SelectItem value="critical">Critical - Health risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the water issue in detail"
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Specific Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Near community center, House no. 123"
              />
            </div>

            <div>
              <Label htmlFor="photo">Upload Photo (Optional)</Label>
              <div className="mt-2">
                <Button type="button" variant="outline" className="gap-2 bg-transparent">
                  <Camera className="w-4 h-4" />
                  Take Photo / Upload Image
                </Button>
                <p className="text-xs text-muted-foreground mt-1">Photo helps us understand the issue better</p>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Submit Water Issue Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
