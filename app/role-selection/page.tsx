"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { Users, Stethoscope, Building2, ArrowLeft, ArrowRight } from "lucide-react"

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const { t } = useLanguage()

  const roles = [
    {
      id: "community",
      title: t("communityUser"),
      description: t("communityUserDesc"),
      icon: Users,
      features: [t("reportSymptoms"), t("waterIssues"), t("healthAwareness"), t("emergencyContacts")],
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600",
      route: "/community/register",
    },
    {
      id: "health-worker",
      title: t("healthWorker"),
      description: t("healthWorkerDesc"),
      icon: Stethoscope,
      features: [t("caseManagement"), t("waterTesting"), t("createAlerts"), t("healthCamps")],
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconColor: "text-green-600",
      route: "/health-worker/register",
    },
    {
      id: "government",
      title: t("governmentOfficial"),
      description: t("governmentOfficialDesc"),
      icon: Building2,
      features: [t("dataAnalytics"), t("outbreakMonitoring"), t("interventionPlanning"), t("workerReports")],
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-600",
      route: "/government/register",
    },
  ]

  const handleContinue = () => {
    const role = roles.find((r) => r.id === selectedRole)
    if (role) {
      window.location.href = role.route
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <Button variant="ghost" onClick={() => (window.location.href = "/")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t("back")}
        </Button>
        <LanguageSelector />
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">{t("chooseYourRole")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">{t("selectRoleDescription")}</p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id

            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all duration-200 ${role.color} ${
                  isSelected ? "ring-2 ring-primary shadow-lg scale-105" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <Icon className={`w-8 h-8 ${role.iconColor}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{role.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground text-pretty">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-card-foreground mb-3">{t("keyFeatures")}</h4>
                    <ul className="space-y-1">
                      {role.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedRole}
            className="px-8 py-6 text-lg gap-2 disabled:opacity-50"
          >
            {t("continue")}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            {t("notSureRole")}{" "}
            <Button variant="link" className="p-0 h-auto text-sm">
              {t("learnMoreRoles")}
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
