"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplets, TestTube, AlertTriangle, CheckCircle, MapPin, Download } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

const waterQualityData = [
  {
    id: "WQ001",
    location: "Village Well - Beltola",
    district: "Kamrup",
    tehsil: "Guwahati",
    ph: 7.2,
    turbidity: "Low",
    bacteria: "Absent",
    chlorine: "0.5 mg/L",
    status: "safe",
    lastTested: "2024-01-14",
    testedBy: "Dr. Rajesh Kumar",
    population: 2500,
  },
  {
    id: "WQ002",
    location: "Hand Pump - School",
    district: "Kamrup",
    tehsil: "Guwahati",
    ph: 6.8,
    turbidity: "Medium",
    bacteria: "Present",
    chlorine: "0.1 mg/L",
    status: "unsafe",
    lastTested: "2024-01-13",
    testedBy: "Dr. Rajesh Kumar",
    population: 800,
  },
  {
    id: "WQ003",
    location: "Bore Well - Community Center",
    district: "Barpeta",
    tehsil: "Barpeta",
    ph: 7.5,
    turbidity: "Low",
    bacteria: "Absent",
    chlorine: "0.3 mg/L",
    status: "safe",
    lastTested: "2024-01-12",
    testedBy: "Dr. Priya Nath",
    population: 1200,
  },
  {
    id: "WQ004",
    location: "River Water - Brahmaputra",
    district: "Kamrup",
    tehsil: "Guwahati",
    ph: 6.5,
    turbidity: "High",
    bacteria: "High Count",
    chlorine: "0.0 mg/L",
    status: "critical",
    lastTested: "2024-01-11",
    testedBy: "Dr. Rajesh Kumar",
    population: 5000,
  },
]

export function WaterQualityTab() {
  const { t } = useLanguage()
  const [selectedDistrict, setSelectedDistrict] = useState(t("allDistricts"))

  const filteredData = waterQualityData.filter(
    (item) => selectedDistrict === t("allDistricts") || item.district === selectedDistrict,
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe":
        return "default"
      case "unsafe":
        return "destructive"
      case "critical":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="w-4 h-4" />
      case "unsafe":
      case "critical":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <TestTube className="w-4 h-4" />
    }
  }

  const safeCount = filteredData.filter((item) => item.status === "safe").length
  const unsafeCount = filteredData.filter((item) => item.status === "unsafe").length
  const criticalCount = filteredData.filter((item) => item.status === "critical").length
  const totalPopulation = filteredData.reduce((sum, item) => sum + item.population, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("safeSources")}</p>
                <p className="text-2xl font-bold">{safeCount}</p>
                <p className="text-xs text-green-600">Good quality</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("unsafeSources")}</p>
                <p className="text-2xl font-bold">{unsafeCount}</p>
                <p className="text-xs text-orange-600">Needs treatment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("criticalSources")}</p>
                <p className="text-2xl font-bold">{criticalCount}</p>
                <p className="text-xs text-red-600">Immediate action</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("populationServed")}</p>
                <p className="text-2xl font-bold">{totalPopulation.toLocaleString()}</p>
                <p className="text-xs text-blue-600">Total people</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Water Quality Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            {t("waterQualityDashboard")}
          </CardTitle>
          <CardDescription>{t("monitorWaterQualityAcrossSources")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t("selectDistrict")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={t("allDistricts")}>{t("allDistricts")}</SelectItem>
                <SelectItem value="Kamrup">Kamrup</SelectItem>
                <SelectItem value="Barpeta">Barpeta</SelectItem>
                <SelectItem value="Darrang">Darrang</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              {t("exportReport")}
            </Button>
          </div>

          <div className="space-y-4">
            {filteredData.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item.status === "safe"
                            ? "bg-green-100"
                            : item.status === "unsafe"
                              ? "bg-orange-100"
                              : "bg-red-100"
                        }`}
                      >
                        <Droplets
                          className={`w-6 h-6 ${
                            item.status === "safe"
                              ? "text-green-600"
                              : item.status === "unsafe"
                                ? "text-orange-600"
                                : "text-red-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{item.location}</h4>
                          <Badge variant="outline">{item.id}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                          <MapPin className="w-3 h-3" />
                          {item.tehsil}, {item.district}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-muted-foreground">pH Level</p>
                            <p className="font-medium">{item.ph}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Turbidity</p>
                            <p className="font-medium">{item.turbidity}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Bacteria</p>
                            <p className="font-medium">{item.bacteria}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Chlorine</p>
                            <p className="font-medium">{item.chlorine}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Last tested: {item.lastTested}</span>
                          <span>By: {item.testedBy}</span>
                          <span>Population: {item.population.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(item.status) as any} className="gap-1">
                      {getStatusIcon(item.status)}
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Water Quality Parameters Guide */}
      <Card>
        <CardHeader>
          <CardTitle>{t("waterQualityParametersGuide")}</CardTitle>
          <CardDescription>{t("understandingWaterQualityTestResults")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">pH Level</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Safe Range: 6.5 - 8.5</li>
                  <li>• Below 6.5: Acidic (corrosive)</li>
                  <li>• Above 8.5: Alkaline (bitter taste)</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Turbidity</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Low: Clear water (safe)</li>
                  <li>• Medium: Slightly cloudy (caution)</li>
                  <li>• High: Very cloudy (unsafe)</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800 mb-2">Bacteria Presence</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Absent: Safe for consumption</li>
                  <li>• Present: Requires treatment</li>
                  <li>• High Count: Critical - do not use</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-800 mb-2">Chlorine Level</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Recommended: 0.2 - 0.5 mg/L</li>
                  <li>• Below 0.2: Insufficient disinfection</li>
                  <li>• Above 0.5: Strong taste/odor</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
