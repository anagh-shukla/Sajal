"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import { CaseDataTab } from "@/components/government/case-data-tab"
import { WaterQualityTab } from "@/components/government/water-quality-tab"
import { ChartsTab } from "@/components/government/charts-tab"
import { OutbreakMapTab } from "@/components/government/outbreak-map-tab"
import { AlertsManagementTab } from "@/components/government/alerts-management-tab"
import { WorkerReportsTab } from "@/components/government/worker-reports-tab"
import { Building2, BarChart3, Droplets, TrendingUp, Map, Bell, Users, User, LogOut, MapPin } from "lucide-react"

export default function GovernmentDashboard() {
  const [activeTab, setActiveTab] = useState("case-data")
  const router = useRouter()
  const { t } = useLanguage()

  const handleProfileClick = () => {
    console.log("[v0] Navigating to government profile")
    router.push("/government/profile")
  }

  const handleLogout = () => {
    console.log("[v0] Logging out government official")
    localStorage.removeItem("userToken")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">{t("appName")}</h1>
                <p className="text-sm text-muted-foreground">{t("governmentPortal")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-1">
                <MapPin className="w-3 h-3" />
                {t("districtHealthOffice")}
              </Badge>
              <LanguageSelector />
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleProfileClick}>
                <User className="w-4 h-4" />
                {t("drPriyaSharma")}
              </Button>
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                {t("logout")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">{t("welcomeBackGovernment")}</h2>
          <p className="text-muted-foreground">{t("monitorHealthIndicators")}</p>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="case-data" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">{t("caseData")}</span>
              <span className="sm:hidden">{t("cases")}</span>
            </TabsTrigger>
            <TabsTrigger value="water-quality" className="gap-2">
              <Droplets className="w-4 h-4" />
              <span className="hidden sm:inline">{t("waterQuality")}</span>
              <span className="sm:hidden">{t("water")}</span>
            </TabsTrigger>
            <TabsTrigger value="charts" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">{t("analytics")}</span>
              <span className="sm:hidden">{t("charts")}</span>
            </TabsTrigger>
            <TabsTrigger value="outbreak-map" className="gap-2">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">{t("outbreakMap")}</span>
              <span className="sm:hidden">{t("map")}</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{t("alerts")}</span>
              <span className="sm:hidden">{t("alerts")}</span>
            </TabsTrigger>
            <TabsTrigger value="worker-reports" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{t("workers")}</span>
              <span className="sm:hidden">{t("workers")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="case-data">
            <CaseDataTab />
          </TabsContent>

          <TabsContent value="water-quality">
            <WaterQualityTab />
          </TabsContent>

          <TabsContent value="charts">
            <ChartsTab />
          </TabsContent>

          <TabsContent value="outbreak-map">
            <OutbreakMapTab />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsManagementTab />
          </TabsContent>

          <TabsContent value="worker-reports">
            <WorkerReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
