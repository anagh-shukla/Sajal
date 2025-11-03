"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import { OngoingCasesTab } from "@/components/health-worker/ongoing-cases-tab"
import { UploadCaseTab } from "@/components/health-worker/upload-case-tab"
import { WaterTestTab } from "@/components/health-worker/water-test-tab"
import { AlertsTab } from "@/components/health-worker/alerts-tab"
import { AwarenessMaterialTab } from "@/components/health-worker/awareness-material-tab"
import { MiniDashboardTab } from "@/components/health-worker/mini-dashboard-tab"
import { Stethoscope, FileText, Upload, Droplets, Bell, BookOpen, BarChart3, User, LogOut, MapPin } from "lucide-react"

export default function HealthWorkerDashboard() {
  const [activeTab, setActiveTab] = useState("mini-dashboard")
  const router = useRouter()
  const { t } = useLanguage()

  const handleProfileClick = () => {
    console.log("[v0] Navigating to health worker profile")
    router.push("/health-worker/profile")
  }

  const handleLogout = () => {
    console.log("[v0] Logging out health worker")
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
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary tracking-wide">{t("appName")}</h1>
                <p className="text-sm text-muted-foreground tracking-normal">{t("healthWorkerPortal")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-2 px-3 py-1">
                <MapPin className="w-3 h-3" />
                <span className="tracking-normal">{t("blockPHCDistrict")}</span>
              </Badge>
              <LanguageSelector />
              <Button variant="ghost" size="sm" className="gap-2 px-3" onClick={handleProfileClick}>
                <User className="w-4 h-4" />
                <span className="tracking-normal">{t("drRajeshKumar")}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 px-3" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span className="tracking-normal">{t("logout")}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-bold text-foreground tracking-wide leading-relaxed">
            {t("welcomeBackHealthWorker")}
          </h2>
          <p className="text-muted-foreground text-base tracking-normal leading-relaxed">
            {t("manageCommunityHealthCases")}
          </p>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 gap-1 p-1">
            <TabsTrigger value="mini-dashboard" className="gap-2 px-3 py-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline tracking-normal">{t("dashboard")}</span>
              <span className="sm:hidden tracking-normal">{t("home")}</span>
            </TabsTrigger>
            <TabsTrigger value="ongoing-cases" className="gap-2 px-3 py-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline tracking-normal">{t("cases")}</span>
              <span className="sm:hidden tracking-normal">{t("cases")}</span>
            </TabsTrigger>
            <TabsTrigger value="upload-case" className="gap-2 px-3 py-2">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline tracking-normal">{t("upload")}</span>
              <span className="sm:hidden tracking-normal">{t("add")}</span>
            </TabsTrigger>
            <TabsTrigger value="water-test" className="gap-2 px-3 py-2">
              <Droplets className="w-4 h-4" />
              <span className="hidden sm:inline tracking-normal">{t("water")}</span>
              <span className="sm:hidden tracking-normal">{t("water")}</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2 px-3 py-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline tracking-normal">{t("alerts")}</span>
              <span className="sm:hidden tracking-normal">{t("alerts")}</span>
            </TabsTrigger>
            <TabsTrigger value="awareness" className="gap-2 px-3 py-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline tracking-normal">{t("materials")}</span>
              <span className="sm:hidden tracking-normal">{t("info")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mini-dashboard">
            <MiniDashboardTab />
          </TabsContent>

          <TabsContent value="ongoing-cases">
            <OngoingCasesTab />
          </TabsContent>

          <TabsContent value="upload-case">
            <UploadCaseTab />
          </TabsContent>

          <TabsContent value="water-test">
            <WaterTestTab />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsTab />
          </TabsContent>

          <TabsContent value="awareness">
            <AwarenessMaterialTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
