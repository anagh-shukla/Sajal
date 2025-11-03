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
import { Camera, Droplets, TestTube, MapPin } from "lucide-react"

const waterSources = [
  "Hand Pump",
  "Bore Well",
  "Village Well",
  "Tube Well",
  "River/Stream",
  "Pond",
  "Tank Water",
  "Piped Supply",
  "Other",
]

const recentTests = [
  {
    id: "WT001",
    source: "Village Well - Center",
    location: "Main Square, Ward 1",
    ph: 7.2,
    turbidity: "Low",
    bacteria: "Absent",
    chlorine: "0.5 mg/L",
    status: "safe",
    date: "2024-01-14",
    testedBy: "Dr. Rajesh Kumar",
  },
  {
    id: "WT002",
    source: "Hand Pump - School",
    location: "Primary School, Ward 2",
    ph: 6.8,
    turbidity: "Medium",
    bacteria: "Present",
    chlorine: "0.1 mg/L",
    status: "unsafe",
    date: "2024-01-13",
    testedBy: "Dr. Rajesh Kumar",
  },
  {
    id: "WT003",
    source: "Bore Well - Community",
    location: "Community Center, Ward 3",
    ph: 7.5,
    turbidity: "Low",
    bacteria: "Absent",
    chlorine: "0.3 mg/L",
    status: "safe",
    date: "2024-01-12",
    testedBy: "Dr. Rajesh Kumar",
  },
]

export function WaterTestTab() {
  const [formData, setFormData] = useState({
    source: "",
    customSource: "",
    location: "",
    ph: "",
    turbidity: "",
    bacteria: "",
    chlorine: "",
    otherTests: "",
    notes: "",
    photo: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Water test results uploaded successfully!")
    // Reset form
    setFormData({
      source: "",
      customSource: "",
      location: "",
      ph: "",
      turbidity: "",
      bacteria: "",
      chlorine: "",
      otherTests: "",
      notes: "",
      photo: null,
    })
  }

  return (
    <div className="space-y-6">
      {/* Recent Water Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Recent Water Test Results
          </CardTitle>
          <CardDescription>Latest water quality tests conducted in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTests.map((test) => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{test.source}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {test.location}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tested on {test.date} by {test.testedBy}
                      </p>
                    </div>
                    <Badge variant={test.status === "safe" ? "default" : "destructive"}>{test.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">pH Level</p>
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
                    <div>
                      <p className="text-muted-foreground">Chlorine</p>
                      <p className="font-medium">{test.chlorine}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Water Test Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            New Water Test Entry
          </CardTitle>
          <CardDescription>Record new water quality test results</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Source Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Water Source Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source">Water Source Type *</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, source: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      {waterSources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.source === "Other" && (
                  <div>
                    <Label htmlFor="customSource">Specify Source</Label>
                    <Input
                      id="customSource"
                      value={formData.customSource}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customSource: e.target.value }))}
                      placeholder="Specify the water source"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="location">Location Details *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Near School, Ward 2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Test Results</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ph">pH Level *</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={formData.ph}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ph: e.target.value }))}
                    placeholder="e.g., 7.2"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">Normal range: 6.5 - 8.5</p>
                </div>

                <div>
                  <Label htmlFor="turbidity">Turbidity Level *</Label>
                  <Select
                    value={formData.turbidity}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, turbidity: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select turbidity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low (Clear)</SelectItem>
                      <SelectItem value="Medium">Medium (Slightly cloudy)</SelectItem>
                      <SelectItem value="High">High (Very cloudy)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bacteria">Bacteria Presence *</Label>
                  <Select
                    value={formData.bacteria}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, bacteria: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bacteria status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Absent">Absent (Safe)</SelectItem>
                      <SelectItem value="Present">Present (Unsafe)</SelectItem>
                      <SelectItem value="High">High Count (Very Unsafe)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="chlorine">Chlorine Level</Label>
                  <Input
                    id="chlorine"
                    value={formData.chlorine}
                    onChange={(e) => setFormData((prev) => ({ ...prev, chlorine: e.target.value }))}
                    placeholder="e.g., 0.5 mg/L"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Recommended: 0.2 - 0.5 mg/L</p>
                </div>
              </div>

              <div>
                <Label htmlFor="otherTests">Other Test Results</Label>
                <Textarea
                  id="otherTests"
                  value={formData.otherTests}
                  onChange={(e) => setFormData((prev) => ({ ...prev, otherTests: e.target.value }))}
                  placeholder="Record any other test results (TDS, hardness, iron content, etc.)"
                  rows={3}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>

              <div>
                <Label htmlFor="notes">Notes & Recommendations</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any observations, recommendations for treatment, or follow-up actions"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="photo">Upload Photo (Optional)</Label>
                <div className="mt-2">
                  <Button type="button" variant="outline" className="gap-2 bg-transparent">
                    <Camera className="w-4 h-4" />
                    Take Photo / Upload Image
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload photos of the water source, test equipment, or results
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" size="lg">
                Submit Test Results
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  setFormData({
                    source: "",
                    customSource: "",
                    location: "",
                    ph: "",
                    turbidity: "",
                    bacteria: "",
                    chlorine: "",
                    otherTests: "",
                    notes: "",
                    photo: null,
                  })
                }}
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
