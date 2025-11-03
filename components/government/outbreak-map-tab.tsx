"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Map, MapPin, AlertTriangle, Activity, X, Search } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

const outbreakData = [
  {
    id: "OB001",
    location: "Mumbai, Maharashtra",
    disease: "Dengue",
    cases: 245,
    severity: "critical",
    status: "active",
    population: 12442373,
    lastUpdated: "2024-01-15",
    coordinates: { lat: 19.076, lng: 72.8777 },
  },
  {
    id: "OB002",
    location: "Delhi, Delhi",
    disease: "Chikungunya",
    cases: 189,
    severity: "high",
    status: "active",
    population: 32941309,
    lastUpdated: "2024-01-14",
    coordinates: { lat: 28.7041, lng: 77.1025 },
  },
  {
    id: "OB003",
    location: "Kolkata, West Bengal",
    disease: "Malaria",
    cases: 156,
    severity: "high",
    status: "monitoring",
    population: 14850066,
    lastUpdated: "2024-01-13",
    coordinates: { lat: 22.5726, lng: 88.3639 },
  },
  {
    id: "OB004",
    location: "Chennai, Tamil Nadu",
    disease: "Typhoid",
    cases: 98,
    severity: "medium",
    status: "active",
    population: 7088000,
    lastUpdated: "2024-01-12",
    coordinates: { lat: 13.0827, lng: 80.2707 },
  },
  {
    id: "OB005",
    location: "Bangalore, Karnataka",
    disease: "Hepatitis A",
    cases: 67,
    severity: "medium",
    status: "monitoring",
    population: 8443675,
    lastUpdated: "2024-01-11",
    coordinates: { lat: 12.9716, lng: 77.5946 },
  },
  {
    id: "OB006",
    location: "Hyderabad, Telangana",
    disease: "Gastroenteritis",
    cases: 134,
    severity: "high",
    status: "active",
    population: 6809970,
    lastUpdated: "2024-01-10",
    coordinates: { lat: 17.385, lng: 78.4867 },
  },
  {
    id: "OB007",
    location: "Ahmedabad, Gujarat",
    disease: "Conjunctivitis",
    cases: 45,
    severity: "low",
    status: "monitoring",
    population: 5570585,
    lastUpdated: "2024-01-09",
    coordinates: { lat: 23.0225, lng: 72.5714 },
  },
  {
    id: "OB008",
    location: "Pune, Maharashtra",
    disease: "Respiratory Infection",
    cases: 78,
    severity: "medium",
    status: "active",
    population: 3124458,
    lastUpdated: "2024-01-08",
    coordinates: { lat: 18.5204, lng: 73.8567 },
  },
]

const indianStates = [
  // States
  {
    name: "Andhra Pradesh",
    status: "medium",
    cases: 87,
    population: 49386799,
    color: "bg-orange-500",
    capital: "Amaravati",
  },
  {
    name: "Arunachal Pradesh",
    status: "safe",
    cases: 3,
    population: 1383727,
    color: "bg-green-500",
    capital: "Itanagar",
  },
  { name: "Assam", status: "safe", cases: 15, population: 31205576, color: "bg-green-500", capital: "Dispur" },
  { name: "Bihar", status: "medium", cases: 56, population: 104099452, color: "bg-orange-500", capital: "Patna" },
  { name: "Chhattisgarh", status: "low", cases: 22, population: 25545198, color: "bg-yellow-500", capital: "Raipur" },
  { name: "Goa", status: "safe", cases: 7, population: 1458545, color: "bg-green-500", capital: "Panaji" },
  { name: "Gujarat", status: "low", cases: 45, population: 60439692, color: "bg-yellow-500", capital: "Gandhinagar" },
  { name: "Haryana", status: "safe", cases: 19, population: 25351462, color: "bg-green-500", capital: "Chandigarh" },
  { name: "Himachal Pradesh", status: "safe", cases: 4, population: 6864602, color: "bg-green-500", capital: "Shimla" },
  { name: "Jharkhand", status: "medium", cases: 41, population: 32988134, color: "bg-orange-500", capital: "Ranchi" },
  {
    name: "Karnataka",
    status: "medium",
    cases: 67,
    population: 61095297,
    color: "bg-orange-500",
    capital: "Bangalore",
  },
  {
    name: "Kerala",
    status: "low",
    cases: 28,
    population: 33406061,
    color: "bg-yellow-500",
    capital: "Thiruvananthapuram",
  },
  { name: "Madhya Pradesh", status: "low", cases: 34, population: 72626809, color: "bg-yellow-500", capital: "Bhopal" },
  {
    name: "Maharashtra",
    status: "critical",
    cases: 323,
    population: 112374333,
    color: "bg-red-600",
    capital: "Mumbai",
  },
  { name: "Manipur", status: "safe", cases: 6, population: 2855794, color: "bg-green-500", capital: "Imphal" },
  { name: "Meghalaya", status: "safe", cases: 2, population: 2966889, color: "bg-green-500", capital: "Shillong" },
  { name: "Mizoram", status: "safe", cases: 1, population: 1097206, color: "bg-green-500", capital: "Aizawl" },
  { name: "Nagaland", status: "safe", cases: 2, population: 1978502, color: "bg-green-500", capital: "Kohima" },
  { name: "Odisha", status: "safe", cases: 23, population: 42155082, color: "bg-green-500", capital: "Bhubaneswar" },
  { name: "Punjab", status: "safe", cases: 8, population: 27743338, color: "bg-green-500", capital: "Chandigarh" },
  { name: "Rajasthan", status: "safe", cases: 12, population: 68548437, color: "bg-green-500", capital: "Jaipur" },
  { name: "Sikkim", status: "safe", cases: 1, population: 610577, color: "bg-green-500", capital: "Gangtok" },
  { name: "Tamil Nadu", status: "medium", cases: 98, population: 72147030, color: "bg-orange-500", capital: "Chennai" },
  { name: "Telangana", status: "high", cases: 134, population: 35003674, color: "bg-red-400", capital: "Hyderabad" },
  { name: "Tripura", status: "safe", cases: 5, population: 3673917, color: "bg-green-500", capital: "Agartala" },
  {
    name: "Uttar Pradesh",
    status: "medium",
    cases: 89,
    population: 199812341,
    color: "bg-orange-500",
    capital: "Lucknow",
  },
  { name: "Uttarakhand", status: "safe", cases: 9, population: 10086292, color: "bg-green-500", capital: "Dehradun" },
  { name: "West Bengal", status: "high", cases: 156, population: 91276115, color: "bg-red-400", capital: "Kolkata" },

  // Union Territories
  {
    name: "Andaman and Nicobar Islands",
    status: "safe",
    cases: 1,
    population: 380581,
    color: "bg-green-500",
    capital: "Port Blair",
  },
  { name: "Chandigarh", status: "safe", cases: 3, population: 1055450, color: "bg-green-500", capital: "Chandigarh" },
  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    status: "safe",
    cases: 2,
    population: 585764,
    color: "bg-green-500",
    capital: "Daman",
  },
  { name: "Delhi", status: "high", cases: 189, population: 32941309, color: "bg-red-400", capital: "New Delhi" },
  {
    name: "Jammu and Kashmir",
    status: "low",
    cases: 18,
    population: 12267032,
    color: "bg-yellow-500",
    capital: "Srinagar (Summer), Jammu (Winter)",
  },
  { name: "Ladakh", status: "safe", cases: 1, population: 274000, color: "bg-green-500", capital: "Leh" },
  { name: "Lakshadweep", status: "safe", cases: 0, population: 64473, color: "bg-green-500", capital: "Kavaratti" },
  { name: "Puducherry", status: "safe", cases: 4, population: 1247953, color: "bg-green-500", capital: "Puducherry" },
]

const getDistrictByCoordinates = (x: number, y: number) => {
  const regions = [
    // Major Metropolitan Cities
    {
      name: "Mumbai",
      state: "Maharashtra",
      x: [15, 25],
      y: [60, 70],
      cases: 245,
      population: 12442373,
      disease: "Dengue",
      severity: "critical",
    },
    {
      name: "Pune",
      state: "Maharashtra",
      x: [12, 22],
      y: [65, 75],
      cases: 78,
      population: 3124458,
      disease: "Respiratory Infection",
      severity: "medium",
    },
    {
      name: "New Delhi",
      state: "Delhi",
      x: [25, 35],
      y: [25, 35],
      cases: 189,
      population: 32941309,
      disease: "Chikungunya",
      severity: "high",
    },
    {
      name: "Kolkata",
      state: "West Bengal",
      x: [70, 80],
      y: [45, 55],
      cases: 156,
      population: 14850066,
      disease: "Malaria",
      severity: "high",
    },
    {
      name: "Chennai",
      state: "Tamil Nadu",
      x: [55, 65],
      y: [85, 95],
      cases: 98,
      population: 7088000,
      disease: "Typhoid",
      severity: "medium",
    },
    {
      name: "Bangalore",
      state: "Karnataka",
      x: [50, 60],
      y: [75, 85],
      cases: 67,
      population: 8443675,
      disease: "Hepatitis A",
      severity: "medium",
    },
    {
      name: "Hyderabad",
      state: "Telangana",
      x: [55, 65],
      y: [65, 75],
      cases: 134,
      population: 6809970,
      disease: "Gastroenteritis",
      severity: "high",
    },

    // State Capitals
    {
      name: "Jaipur",
      state: "Rajasthan",
      x: [20, 30],
      y: [35, 45],
      cases: 12,
      population: 3073350,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Lucknow",
      state: "Uttar Pradesh",
      x: [35, 45],
      y: [35, 45],
      cases: 89,
      population: 2817105,
      disease: "Viral Fever",
      severity: "medium",
    },
    {
      name: "Thiruvananthapuram",
      state: "Kerala",
      x: [50, 60],
      y: [90, 100],
      cases: 28,
      population: 957730,
      disease: "Food Poisoning",
      severity: "low",
    },
    {
      name: "Ahmedabad",
      state: "Gujarat",
      x: [15, 25],
      y: [45, 55],
      cases: 45,
      population: 5570585,
      disease: "Conjunctivitis",
      severity: "low",
    },
    {
      name: "Gandhinagar",
      state: "Gujarat",
      x: [18, 28],
      y: [42, 52],
      cases: 8,
      population: 208299,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Bhopal",
      state: "Madhya Pradesh",
      x: [30, 40],
      y: [50, 60],
      cases: 34,
      population: 1798218,
      disease: "Water-borne",
      severity: "low",
    },
    {
      name: "Patna",
      state: "Bihar",
      x: [45, 55],
      y: [35, 45],
      cases: 56,
      population: 1684222,
      disease: "Encephalitis",
      severity: "medium",
    },
    {
      name: "Raipur",
      state: "Chhattisgarh",
      x: [40, 50],
      y: [55, 65],
      cases: 22,
      population: 1010087,
      disease: "Malaria",
      severity: "low",
    },
    {
      name: "Ranchi",
      state: "Jharkhand",
      x: [50, 60],
      y: [50, 60],
      cases: 41,
      population: 1073440,
      disease: "Tuberculosis",
      severity: "medium",
    },
    {
      name: "Bhubaneswar",
      state: "Odisha",
      x: [60, 70],
      y: [55, 65],
      cases: 23,
      population: 837737,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Dispur",
      state: "Assam",
      x: [75, 85],
      y: [30, 40],
      cases: 15,
      population: 957352,
      disease: "Japanese Encephalitis",
      severity: "safe",
    },
    {
      name: "Panaji",
      state: "Goa",
      x: [45, 55],
      y: [70, 80],
      cases: 7,
      population: 114405,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Shimla",
      state: "Himachal Pradesh",
      x: [25, 35],
      y: [20, 30],
      cases: 4,
      population: 169578,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Chandigarh",
      state: "Punjab/Haryana",
      x: [28, 38],
      y: [25, 35],
      cases: 11,
      population: 1055450,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Dehradun",
      state: "Uttarakhand",
      x: [30, 40],
      y: [25, 35],
      cases: 9,
      population: 578420,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Amaravati",
      state: "Andhra Pradesh",
      x: [55, 65],
      y: [70, 80],
      cases: 87,
      population: 103000,
      disease: "Dengue",
      severity: "medium",
    },
    {
      name: "Itanagar",
      state: "Arunachal Pradesh",
      x: [80, 90],
      y: [20, 30],
      cases: 3,
      population: 59490,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Imphal",
      state: "Manipur",
      x: [82, 92],
      y: [35, 45],
      cases: 6,
      population: 268243,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Shillong",
      state: "Meghalaya",
      x: [78, 88],
      y: [35, 45],
      cases: 2,
      population: 143229,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Aizawl",
      state: "Mizoram",
      x: [80, 90],
      y: [40, 50],
      cases: 1,
      population: 293416,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Kohima",
      state: "Nagaland",
      x: [82, 92],
      y: [30, 40],
      cases: 2,
      population: 99039,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Gangtok",
      state: "Sikkim",
      x: [70, 80],
      y: [25, 35],
      cases: 1,
      population: 100286,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Agartala",
      state: "Tripura",
      x: [78, 88],
      y: [45, 55],
      cases: 5,
      population: 400004,
      disease: "None",
      severity: "safe",
    },

    // Union Territory Capitals
    {
      name: "Port Blair",
      state: "Andaman and Nicobar Islands",
      x: [80, 90],
      y: [85, 95],
      cases: 1,
      population: 108059,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Daman",
      state: "Dadra and Nagar Haveli and Daman and Diu",
      x: [18, 28],
      y: [55, 65],
      cases: 2,
      population: 44282,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Srinagar",
      state: "Jammu and Kashmir",
      x: [22, 32],
      y: [15, 25],
      cases: 18,
      population: 1273312,
      disease: "Respiratory",
      severity: "low",
    },
    {
      name: "Leh",
      state: "Ladakh",
      x: [25, 35],
      y: [10, 20],
      cases: 1,
      population: 30870,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Kavaratti",
      state: "Lakshadweep",
      x: [40, 50],
      y: [85, 95],
      cases: 0,
      population: 11210,
      disease: "None",
      severity: "safe",
    },
    {
      name: "Puducherry",
      state: "Puducherry",
      x: [58, 68],
      y: [82, 92],
      cases: 4,
      population: 244377,
      disease: "None",
      severity: "safe",
    },
  ]

  for (const region of regions) {
    if (x >= region.x[0] && x <= region.x[1] && y >= region.y[0] && y <= region.y[1]) {
      return region
    }
  }
  return null
}

const hotspotData = [
  {
    id: 1,
    name: "Mumbai Central",
    coordinates: { x: 18, y: 65 },
    severity: "critical",
    cases: 450,
    type: "Dengue Outbreak",
    population: 125000,
    mortalityRate: 3.2,
    description: "Major dengue outbreak in densely populated area",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Delhi NCR",
    coordinates: { x: 30, y: 30 },
    severity: "critical",
    cases: 380,
    type: "Chikungunya",
    population: 200000,
    mortalityRate: 2.8,
    description: "Rapid spread of chikungunya in urban areas",
    lastUpdated: "1 hour ago",
  },
  {
    id: 3,
    name: "Kolkata East",
    coordinates: { x: 75, y: 50 },
    severity: "high",
    cases: 290,
    type: "Malaria",
    population: 95000,
    mortalityRate: 4.1,
    description: "Seasonal malaria spike in waterlogged areas",
    lastUpdated: "3 hours ago",
  },
  {
    id: 4,
    name: "Chennai South",
    coordinates: { x: 60, y: 88 },
    severity: "high",
    cases: 220,
    type: "Typhoid",
    population: 80000,
    mortalityRate: 2.5,
    description: "Water contamination leading to typhoid cases",
    lastUpdated: "4 hours ago",
  },
  {
    id: 5,
    name: "Pune District",
    coordinates: { x: 25, y: 70 },
    severity: "medium",
    cases: 150,
    type: "H1N1",
    population: 110000,
    mortalityRate: 1.8,
    description: "Seasonal flu outbreak in educational institutions",
    lastUpdated: "6 hours ago",
  },
  {
    id: 6,
    name: "Hyderabad Tech City",
    coordinates: { x: 60, y: 70 },
    severity: "medium",
    cases: 130,
    type: "COVID-19",
    population: 75000,
    mortalityRate: 1.2,
    description: "New COVID variant detected in IT corridor",
    lastUpdated: "5 hours ago",
  },
]

export function OutbreakMapTab() {
  // Using useLanguage hook for translation
  const { t } = useLanguage()
  const [selectedRegion, setSelectedRegion] = useState("All States")
  const [mapView, setMapView] = useState("outbreak")
  const [selectedOutbreak, setSelectedOutbreak] = useState<(typeof outbreakData)[0] | null>(null)
  const [selectedState, setSelectedState] = useState<(typeof indianStates)[0] | null>(null)
  const [clickedDistrict, setClickedDistrict] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("") // Added for search functionality
  // Renamed selectedFilter to selectedRegion for consistency
  const [selectedFilter, setSelectedFilter] = useState("All States")

  const filteredOutbreaks = outbreakData.filter(
    (outbreak) => selectedRegion === "All States" || outbreak.location.includes(selectedRegion),
  )

  const filteredStates = indianStates.filter(
    (state) => selectedRegion === "All States" || state.name === selectedRegion,
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "destructive"
      case "monitoring":
        return "default"
      case "resolved":
        return "default"
      default:
        return "secondary"
    }
  }

  const handleHotspotClick = (hotspot: any, event: React.MouseEvent) => {
    event.stopPropagation()
    setClickedDistrict(hotspot)
  }

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    const districtData = getDistrictByCoordinates(x, y)
    if (districtData) {
      setClickedDistrict(districtData)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      {/* Applying gradient background and using t() for translations */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Map className="w-5 h-5" />
            {t("interactiveHealthMap")}
          </CardTitle>
          <CardDescription className="text-slate-300">{t("realTimeHealthAlerts")}</CardDescription>
        </CardHeader>
        {/* Added p-6 to CardContent and adjusted gap */}
        <CardContent className="p-6">
          {/* Adjusted flex direction for smaller screens and added gap */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t("searchStatesDistricts")}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Renamed selectedRegion to selectedFilter and using t() for translations */}
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full md:w-48 bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder={t("allAlerts")} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="All States" className="text-white hover:bg-slate-700">
                  {t("allAlerts")}
                </SelectItem>
                <SelectItem value="Critical" className="text-red-400 hover:bg-slate-700">
                  {t("criticalAlert")}
                </SelectItem>
                <SelectItem value="Warning" className="text-orange-400 hover:bg-slate-700">
                  {t("warningAlert")}
                </SelectItem>
                <SelectItem value="Safe" className="text-green-400 hover:bg-slate-700">
                  {t("safeZone")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Added mb-4 and adjusted text color */}
          <div className="flex items-center gap-2 mb-4 text-sm text-slate-300 bg-slate-800 p-3 rounded-md">
            <AlertTriangle className="w-4 h-4" />
            <span>
              {t("activeOutbreaks")}: {filteredOutbreaks.length} | {t("criticalHotspots")}:{" "}
              {hotspotData.filter((h) => h.severity === "critical").length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">{t("interactiveHealthMap")}</CardTitle>
              <CardDescription className="text-slate-300">{t("realTimeHealthAlerts")}</CardDescription>
            </CardHeader>
            {/* Adjusted padding */}
            <CardContent className="p-4">
              {/* Adjusted justify-between and added gap */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span className="text-sm text-white">{t("criticalAlert")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-orange-500 rounded"></div>
                    <span className="text-sm text-white">{t("warningAlert")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm text-white">{t("safeZone")}</span>
                  </div>
                  <div className="ml-auto text-sm text-slate-400">{t("fullCoverage")}</div>
                </div>
              </div>

              {/* Added background, padding, min-height, and centering */}
              <div className="relative bg-slate-800 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <div
                  className="relative cursor-pointer hover:brightness-110 transition-all duration-200"
                  title={t("clickRegionForData")}
                >
                  <img
                    src="/india-outbreak-map-transparent.png"
                    alt={t("indiaOutbreakMap")}
                    className="max-w-full h-auto brightness-125 contrast-110"
                    style={{ filter: "brightness(1.2) contrast(1.1)" }}
                  />

                  <div className="absolute inset-0">
                    {hotspotData.map((hotspot) => (
                      <div
                        key={hotspot.id}
                        className={`absolute cursor-pointer group`}
                        style={{
                          top: `${hotspot.coordinates.y}%`,
                          left: `${hotspot.coordinates.x}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={(e) => handleHotspotClick(hotspot, e)}
                        title={`${hotspot.name} - ${hotspot.type} (${hotspot.cases} cases)`}
                      >
                        {/* Hotspot marker with severity-based styling */}
                        <div
                          className={`relative ${
                            hotspot.severity === "critical"
                              ? "w-4 h-4 bg-red-600 border-2 border-red-300"
                              : hotspot.severity === "high"
                                ? "w-3.5 h-3.5 bg-orange-500 border-2 border-orange-300"
                                : "w-3 h-3 bg-yellow-500 border-2 border-yellow-300"
                          } rounded-full animate-pulse shadow-lg`}
                        >
                          {/* Pulsing ring effect for critical hotspots */}
                          {hotspot.severity === "critical" && (
                            <div className="absolute inset-0 w-4 h-4 bg-red-600 rounded-full animate-ping opacity-75"></div>
                          )}

                          {/* Warning icon for critical hotspots */}
                          {hotspot.severity === "critical" && (
                            <AlertTriangle className="absolute -top-1 -right-1 w-2 h-2 text-white fill-red-600" />
                          )}
                        </div>

                        {/* Hover tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {hotspot.name}: {hotspot.cases} cases
                        </div>
                      </div>
                    ))}

                    {/* Major Metropolitan Cities */}
                    <div
                      className="absolute top-[30%] left-[30%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      title="Delhi - Click for data"
                    />
                    <div
                      className="absolute top-[65%] left-[18%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      title="Mumbai - Click for data"
                    />
                    <div
                      className="absolute top-[50%] left-[75%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      title="Kolkata - Click for data"
                    />
                    <div
                      className="absolute top-[88%] left-[60%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      title="Chennai - Click for data"
                    />
                    <div
                      className="absolute top-[80%] left-[55%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      title="Bangalore - Click for data"
                    />
                    <div
                      className="absolute top-[70%] left-[60%] w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      title="Hyderabad - Click for data"
                    />

                    {/* State Capitals */}
                    <div
                      className="absolute top-[40%] left-[25%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Jaipur - Click for data"
                    />
                    <div
                      className="absolute top-[40%] left-[40%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Lucknow - Click for data"
                    />
                    <div
                      className="absolute top-[95%] left-[55%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Thiruvananthapuram - Click for data"
                    />
                    <div
                      className="absolute top-[50%] left-[20%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Ahmedabad - Click for data"
                    />
                    <div
                      className="absolute top-[55%] left-[35%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Bhopal - Click for data"
                    />
                    <div
                      className="absolute top-[40%] left-[50%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Patna - Click for data"
                    />
                    <div
                      className="absolute top-[60%] left-[45%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Raipur - Click for data"
                    />
                    <div
                      className="absolute top-[55%] left-[55%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Ranchi - Click for data"
                    />
                    <div
                      className="absolute top-[60%] left-[65%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Bhubaneswar - Click for data"
                    />
                    <div
                      className="absolute top-[35%] left-[80%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Dispur - Click for data"
                    />
                    <div
                      className="absolute top-[75%] left-[50%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Panaji - Click for data"
                    />
                    <div
                      className="absolute top-[25%] left-[30%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Shimla - Click for data"
                    />
                    <div
                      className="absolute top-[30%] left-[33%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Chandigarh - Click for data"
                    />

                    {/* Northeast Capitals */}
                    <div
                      className="absolute top-[25%] left-[85%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Itanagar - Click for data"
                    />
                    <div
                      className="absolute top-[40%] left-[87%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Imphal - Click for data"
                    />
                    <div
                      className="absolute top-[40%] left-[83%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Shillong - Click for data"
                    />
                    <div
                      className="absolute top-[45%] left-[85%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Aizawl - Click for data"
                    />
                    <div
                      className="absolute top-[35%] left-[87%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Kohima - Click for data"
                    />
                    <div
                      className="absolute top-[30%] left-[75%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Gangtok - Click for data"
                    />
                    <div
                      className="absolute top-[50%] left-[83%] w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
                      title="Agartala - Click for data"
                    />

                    {/* Union Territory Capitals */}
                    <div
                      className="absolute top-[20%] left-[27%] w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"
                      title="Srinagar - Click for data"
                    />
                    <div
                      className="absolute top-[15%] left-[30%] w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"
                      title="Leh - Click for data"
                    />
                    <div
                      className="absolute top-[90%] left-[85%] w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"
                      title="Port Blair - Click for data"
                    />
                  </div>
                </div>

                {/* Moved map legend inside the map container and adjusted styling */}
                <div className="absolute top-4 left-4 bg-slate-800/95 backdrop-blur-sm p-3 rounded-lg shadow-md max-w-xs border border-slate-600">
                  <h4 className="font-medium text-sm mb-2 text-white">{t("mapLegend")}</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse border-2 border-red-300" />
                      <span className="text-red-400 font-medium">{t("criticalHotspots")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 bg-orange-500 rounded-full animate-pulse border-2 border-orange-300" />
                      <span className="text-orange-400">{t("highRiskHotspots")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse border-2 border-yellow-300" />
                      <span className="text-yellow-400">{t("mediumRiskHotspots")}</span>
                    </div>
                    <div className="border-t border-slate-600 my-2"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-600 rounded" />
                      <span className="text-slate-300">
                        {t("critical")} (200+ {t("cases")})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded" />
                      <span className="text-slate-300">
                        {t("high")} (100-199 {t("cases")})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded" />
                      <span className="text-slate-300">
                        {t("medium")} (50-99 {t("cases")})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded" />
                      <span className="text-slate-300">
                        {t("low")} (20-49 {t("cases")})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded" />
                      <span className="text-slate-300">
                        {t("safe")} (0-19 {t("cases")})
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-blue-400">{t("clickRegionsForData")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* State-wise Data Summary */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="w-5 h-5" />
              {t("allStatesUTsHealthStatus")}
            </CardTitle>
            <CardDescription className="text-slate-300">{t("currentHealthAlerts")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {filteredStates.map((state) => (
                <div
                  key={state.name}
                  className="p-3 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors border border-slate-600"
                  onClick={() => setSelectedState(state)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-white">{state.name}</h4>
                    <Badge
                      variant={
                        state.status === "critical"
                          ? "destructive"
                          : state.status === "high"
                            ? "destructive"
                            : state.status === "medium"
                              ? "default"
                              : state.status === "low"
                                ? "secondary"
                                : "secondary"
                      }
                      className={
                        state.status === "critical"
                          ? "bg-red-600 text-white"
                          : state.status === "high"
                            ? "bg-orange-600 text-white"
                            : "bg-slate-600 text-white"
                      }
                    >
                      {state.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Capital: {state.capital}
                    </div>
                    <p>Active Cases: {state.cases}</p>
                    <p>Population: {state.population.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`w-3 h-3 rounded ${state.color}`} />
                      <span className="text-xs text-slate-300">Risk Level: {state.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {clickedDistrict && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {clickedDistrict.name || clickedDistrict.district}
                {clickedDistrict.type && (
                  <Badge variant="destructive" className="ml-2">
                    {t("hotspot").toUpperCase()}
                  </Badge>
                )}
              </span>
              <Button variant="ghost" size="sm" onClick={() => setClickedDistrict(null)}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
            <CardDescription>
              {clickedDistrict.type ? t("criticalOutbreakHotspot") : t("districtHealthInfo")} • {t("lastUpdated")}:{" "}
              {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Health Metrics</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Active Cases:</span>
                    <span className="font-medium text-red-600">{clickedDistrict.cases}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Population:</span>
                    <span>{clickedDistrict.population?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Infection Rate:</span>
                    <span>{((clickedDistrict.cases / clickedDistrict.population) * 100).toFixed(2)}%</span>
                  </div>
                  {clickedDistrict.mortalityRate && (
                    <div className="flex justify-between">
                      <span>Mortality Rate:</span>
                      <span className="text-red-600">{clickedDistrict.mortalityRate}%</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Disease Information</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Primary Disease:</span>
                    <span className="font-medium">{clickedDistrict.type || clickedDistrict.disease}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Severity Level:</span>
                    <Badge variant={getSeverityColor(clickedDistrict.severity || clickedDistrict.status)}>
                      {clickedDistrict.severity || clickedDistrict.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Recovery Rate:</span>
                    <span className="text-green-600">
                      {clickedDistrict.recoveryRate || Math.floor(Math.random() * 30 + 60)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Additional Info</h4>
                <div className="text-sm text-muted-foreground">
                  <p>{clickedDistrict.description || "Monitoring ongoing health situation in the region."}</p>
                  {clickedDistrict.type && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800">
                      <AlertTriangle className="w-4 h-4 inline mr-1" />
                      Critical hotspot requiring immediate attention
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed State Information */}
      {selectedState && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {selectedState.name}
              <Button variant="ghost" size="sm" onClick={() => setSelectedState(null)}>
                ×
              </Button>
            </CardTitle>
            <CardDescription>
              {t("comprehensiveHealthData")} {selectedState.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Capital:</strong> {selectedState.capital}
                  </p>
                  <p>
                    <strong>Population:</strong> {selectedState.population.toLocaleString()}
                  </p>
                  <p>
                    <strong>Active Cases:</strong> {selectedState.cases}
                  </p>
                  <p>
                    <strong>Risk Level:</strong>
                    <Badge
                      variant={
                        selectedState.status === "critical"
                          ? "destructive"
                          : selectedState.status === "high"
                            ? "destructive"
                            : selectedState.status === "medium"
                              ? "default"
                              : selectedState.status === "low"
                                ? "secondary"
                                : "secondary"
                      }
                      className="ml-2"
                    >
                      {selectedState.status}
                    </Badge>
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Health Metrics</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Infection Rate:</strong>{" "}
                    {((selectedState.cases / selectedState.population) * 100000).toFixed(2)} per 100k
                  </p>
                  <p>
                    <strong>Healthcare Facilities:</strong> {Math.floor(selectedState.population / 50000)} hospitals
                  </p>
                  <p>
                    <strong>Medical Staff:</strong> {Math.floor(selectedState.population / 1000)} personnel
                  </p>
                  <p>
                    <strong>Vaccination Coverage:</strong> {Math.floor(Math.random() * 20 + 70)}%
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Recent Trends</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>7-day Change:</strong>{" "}
                    <span className="text-red-600">+{Math.floor(Math.random() * 10 + 5)}%</span>
                  </p>
                  <p>
                    <strong>Recovery Rate:</strong>{" "}
                    <span className="text-green-600">{Math.floor(Math.random() * 10 + 85)}%</span>
                  </p>
                  <p>
                    <strong>Testing Rate:</strong> {Math.floor(Math.random() * 5000 + 10000)} per day
                  </p>
                  <p>
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Outbreak List */}
      <Card>
        <CardHeader>
          <CardTitle>Outbreak Details</CardTitle>
          <CardDescription>Comprehensive list of all health outbreaks and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOutbreaks.map((outbreak) => (
              <Card key={outbreak.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          outbreak.severity === "critical"
                            ? "bg-red-100"
                            : outbreak.severity === "high"
                              ? "bg-orange-100"
                              : outbreak.severity === "medium"
                                ? "bg-yellow-100"
                                : "bg-green-100"
                        }`}
                      >
                        <AlertTriangle
                          className={`w-6 h-6 ${
                            outbreak.severity === "critical"
                              ? "text-red-600"
                              : outbreak.severity === "high"
                                ? "text-orange-600"
                                : outbreak.severity === "medium"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{outbreak.disease} Outbreak</h4>
                          <Badge variant="outline">{outbreak.id}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {outbreak.location}
                          </div>
                          <p>
                            <strong>Cases:</strong> {outbreak.cases}
                          </p>
                          <p>
                            <strong>Population:</strong> {outbreak.population.toLocaleString()}
                          </p>
                          <p>
                            <strong>Last Updated:</strong> {outbreak.lastUpdated}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getSeverityColor(outbreak.severity) as any}>{outbreak.severity}</Badge>
                          <Badge variant={getStatusColor(outbreak.status) as any}>{outbreak.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
