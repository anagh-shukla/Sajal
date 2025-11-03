"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, Eye, Upload, FileText, Video, Volume2 } from "lucide-react"

const materials = [
  {
    title: "Dengue Prevention Guidelines",
    description: "Comprehensive guide for dengue prevention and control measures",
    type: "document",
    format: "PDF",
    language: "English/Hindi",
    size: "2.3 MB",
    downloads: 45,
  },
  {
    title: "Water Quality Testing Procedures",
    description: "Step-by-step guide for conducting water quality tests",
    type: "document",
    format: "PDF",
    language: "English",
    size: "1.8 MB",
    downloads: 32,
  },
  {
    title: "Community Health Education Posters",
    description: "Collection of health awareness posters for community display",
    type: "poster",
    format: "ZIP",
    language: "Hindi/Tribal",
    size: "15.2 MB",
    downloads: 67,
  },
  {
    title: "First Aid Training Video",
    description: "Basic first aid procedures for health workers",
    type: "video",
    format: "MP4",
    language: "Hindi",
    size: "125 MB",
    downloads: 23,
  },
  {
    title: "Vaccination Schedule Audio Guide",
    description: "Audio guide for child vaccination schedules",
    type: "audio",
    format: "MP3",
    language: "Tribal",
    size: "8.5 MB",
    downloads: 18,
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "document":
      return <FileText className="w-5 h-5" />
    case "poster":
      return <BookOpen className="w-5 h-5" />
    case "video":
      return <Video className="w-5 h-5" />
    case "audio":
      return <Volume2 className="w-5 h-5" />
    default:
      return <FileText className="w-5 h-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "document":
      return "bg-blue-100 text-blue-600"
    case "poster":
      return "bg-green-100 text-green-600"
    case "video":
      return "bg-purple-100 text-purple-600"
    case "audio":
      return "bg-orange-100 text-orange-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

export function AwarenessMaterialTab() {
  const handleDownload = (title: string) => {
    alert(`Downloading: ${title}`)
  }

  const handleUpload = () => {
    alert("Upload functionality would open file picker to add new materials")
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Awareness Material
          </CardTitle>
          <CardDescription>Share health education materials with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                Upload posters, documents, videos, or audio files to share with community members and other health
                workers.
              </p>
            </div>
            <Button onClick={handleUpload} className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Material
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Materials Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Health Education Materials
          </CardTitle>
          <CardDescription>Access and download health awareness materials for community education</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((material, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(material.type)}`}
                    >
                      {getTypeIcon(material.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{material.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{material.description}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary">{material.format}</Badge>
                        <Badge variant="outline">{material.language}</Badge>
                        <Badge variant="outline">{material.size}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Download className="w-3 h-3" />
                          {material.downloads} downloads
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                            <Eye className="w-3 h-3" />
                            Preview
                          </Button>
                          <Button size="sm" onClick={() => handleDownload(material.title)} className="gap-1">
                            <Download className="w-3 h-3" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference Guidelines</CardTitle>
          <CardDescription>Essential health guidelines for immediate reference</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Emergency Response</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Assess patient condition immediately</li>
                <li>• Call emergency services if critical</li>
                <li>• Provide basic first aid as needed</li>
                <li>• Document all actions taken</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Disease Prevention</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Promote hand hygiene practices</li>
                <li>• Ensure safe drinking water</li>
                <li>• Maintain vaccination schedules</li>
                <li>• Monitor disease patterns</li>
              </ul>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">Water Quality</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Test water sources regularly</li>
                <li>• Report contamination immediately</li>
                <li>• Educate on water purification</li>
                <li>• Monitor waterborne diseases</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-2">Community Education</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Conduct regular health talks</li>
                <li>• Distribute educational materials</li>
                <li>• Organize health camps</li>
                <li>• Engage community leaders</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
