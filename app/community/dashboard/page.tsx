"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { LanguageSelector } from "@/components/language-selector"
import { ReportSymptomsTab } from "@/components/community/report-symptoms-tab"
import { WaterIssuesTab } from "@/components/community/water-issues-tab"
import { AwarenessTab } from "@/components/community/awareness-tab"
import { EmergencyTab } from "@/components/community/emergency-tab"
import { Heart, Droplets, BookOpen, Phone, Bell, MapPin, User, LogOut } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function CommunityDashboard() {
  const [activeTab, setActiveTab] = useState("symptoms")
  const router = useRouter()
  const { t } = useLanguage()

  const handleProfileClick = () => {
    console.log("[v0] Navigating to community profile")
    router.push("/community/profile")
  }

  const handleLogout = () => {
    console.log("[v0] Logging out user")
    // Clear any stored user data/tokens here
    localStorage.removeItem("userToken")
    localStorage.removeItem("userRole")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary leading-tight tracking-wide">{t("appName")}</h1>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed tracking-normal">
                  {t("communityDashboard")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-2 hidden sm:flex py-2 px-3 tracking-normal">
                <MapPin className="w-3 h-3" />
                Gram Panchayat, District
              </Badge>
              <LanguageSelector />
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 px-3 py-2 tracking-normal"
                onClick={handleProfileClick}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{t("profile")}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 px-3 py-2 tracking-normal" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t("logout")}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        {/* Welcome Section */}
        <div className="mb-12 text-center sm:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight tracking-wide">
            {t("welcomeBackCommunity")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed tracking-normal">
            {t("helpKeepCommunityHealthy")}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1 leading-relaxed tracking-normal">
                    {t("reportsSubmitted")}
                  </p>
                  <p className="text-xl font-bold tracking-wide">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1 leading-relaxed tracking-normal">
                    {t("waterIssues")}
                  </p>
                  <p className="text-xl font-bold tracking-wide">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1 leading-relaxed tracking-normal">
                    {t("activeAlerts")}
                  </p>
                  <p className="text-xl font-bold tracking-wide">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1 leading-relaxed tracking-normal">
                    {t("resourcesRead")}
                  </p>
                  <p className="text-xl font-bold tracking-wide">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-2">
            <TabsTrigger value="symptoms" className="gap-3 py-4 px-4 tracking-normal">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">{t("reportSymptoms")}</span>
              <span className="sm:hidden">{t("symptoms")}</span>
            </TabsTrigger>
            <TabsTrigger value="water" className="gap-3 py-4 px-4 tracking-normal">
              <Droplets className="w-4 h-4" />
              <span className="hidden sm:inline">{t("waterIssues")}</span>
              <span className="sm:hidden">{t("water")}</span>
            </TabsTrigger>
            <TabsTrigger value="awareness" className="gap-3 py-4 px-4 tracking-normal">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">{t("awareness")}</span>
              <span className="sm:hidden">{t("learn")}</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="gap-3 py-4 px-4 tracking-normal">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{t("emergency")}</span>
              <span className="sm:hidden">{t("help")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="symptoms">
            <ReportSymptomsTab />
          </TabsContent>

          <TabsContent value="water">
            <WaterIssuesTab />
          </TabsContent>

          <TabsContent value="awareness">
            <AwarenessTab />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
