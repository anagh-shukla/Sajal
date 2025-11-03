"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart3, Users, TrendingUp, AlertTriangle, Search, Filter, Download } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const mockCaseData = [
  {
    id: "C001",
    patient: "Ramesh Kumar",
    age: 45,
    gender: "Male",
    symptoms: "Fever, Headache",
    location: { state: "Assam", district: "Kamrup", tehsil: "Guwahati", gram: "Beltola" },
    reportedDate: "2024-01-15",
    status: "verified",
    priority: "medium",
    healthWorker: "Dr. Rajesh Kumar",
  },
  {
    id: "C002",
    patient: "Sunita Devi",
    age: 32,
    gender: "Female",
    symptoms: "Diarrhea, Vomiting",
    location: { state: "Assam", district: "Kamrup", tehsil: "Guwahati", gram: "Jalukbari" },
    reportedDate: "2024-01-14",
    status: "under-treatment",
    priority: "high",
    healthWorker: "Dr. Rajesh Kumar",
  },
  {
    id: "C003",
    patient: "Mohan Singh",
    age: 28,
    gender: "Male",
    symptoms: "Cough, Body ache",
    location: { state: "Assam", district: "Kamrup", tehsil: "Barpeta", gram: "Howly" },
    reportedDate: "2024-01-13",
    status: "resolved",
    priority: "low",
    healthWorker: "Dr. Priya Nath",
  },
]

export function CaseDataTab() {
  const { t } = useLanguage()

  const states = [
    t("allStates"),
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    // Union Territories
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ]

  const districts = [t("allDistricts"), "Kamrup", "Barpeta", "Darrang", "Golaghat", "Jorhat"]
  const tehsils = [t("allTehsils"), "Guwahati", "Barpeta", "Mangaldoi", "Golaghat", "Jorhat"]

  const [filters, setFilters] = useState({
    state: t("allStates"),
    district: t("allDistricts"),
    tehsil: t("allTehsils"),
    gram: "",
    searchTerm: "",
  })

  const filteredCases = mockCaseData.filter((case_) => {
    const matchesState = filters.state === t("allStates") || case_.location.state === filters.state
    const matchesDistrict = filters.district === t("allDistricts") || case_.location.district === filters.district
    const matchesTehsil = filters.tehsil === t("allTehsils") || case_.location.tehsil === filters.tehsil
    const matchesGram = !filters.gram || case_.location.gram.toLowerCase().includes(filters.gram.toLowerCase())
    const matchesSearch =
      !filters.searchTerm ||
      case_.patient.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      case_.symptoms.toLowerCase().includes(filters.searchTerm.toLowerCase())

    return matchesState && matchesDistrict && matchesTehsil && matchesGram && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
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
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("totalCases")}</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-green-600">+23 this week</p>
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
                <p className="text-sm text-muted-foreground">{t("activeCases")}</p>
                <p className="text-2xl font-bold">89</p>
                <p className="text-xs text-orange-600">Needs attention</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("recoveryRate")}</p>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-xs text-green-600">+2.1% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("criticalCases")}</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-red-600">Immediate action</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {t("caseDataFilters")}
          </CardTitle>
          <CardDescription>{t("filterCasesByLocation")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <Select value={filters.state} onValueChange={(value) => setFilters((prev) => ({ ...prev, state: value }))}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectState")} />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.district}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, district: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectDistrict")} />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.tehsil}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, tehsil: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectTehsil")} />
              </SelectTrigger>
              <SelectContent>
                {tehsils.map((tehsil) => (
                  <SelectItem key={tehsil} value={tehsil}>
                    {tehsil}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder={t("enterGramVillage")}
              value={filters.gram}
              onChange={(e) => setFilters((prev) => ({ ...prev, gram: e.target.value }))}
            />

            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("searchCases")}
                value={filters.searchTerm}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {t("showingCases")
                .replace("{current}", filteredCases.length.toString())
                .replace("{total}", mockCaseData.length.toString())}
            </p>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              {t("exportData")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t("caseDetails")}</CardTitle>
          <CardDescription>{t("detailedViewOfHealthCases")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{case_.patient}</h4>
                        <Badge variant="outline">{case_.id}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <p>
                          <strong>{t("age")}:</strong> {case_.age} {t("years")}, {case_.gender}
                        </p>
                        <p>
                          <strong>{t("symptoms")}:</strong> {case_.symptoms}
                        </p>
                        <p>
                          <strong>{t("location")}:</strong> {case_.location.gram}, {case_.location.tehsil},{" "}
                          {case_.location.district}
                        </p>
                        <p>
                          <strong>{t("healthWorkerLabel")}:</strong> {case_.healthWorker}
                        </p>
                        <p>
                          <strong>{t("reported")}:</strong> {case_.reportedDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(case_.status) as any}>{case_.status.replace("-", " ")}</Badge>
                        <Badge variant={getPriorityColor(case_.priority) as any}>{case_.priority} priority</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">{t("noCasesFound")}</h3>
              <p className="text-muted-foreground">{t("noCasesMatchFilters")}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
