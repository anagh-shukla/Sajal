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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bell, AlertTriangle, Plus, Calendar, Users, Stethoscope } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const existingAlerts = [
  {
    id: "A001",
    title: "Dengue Alert - Increased Cases",
    description: "5 new dengue cases reported in the last week. Immediate vector control measures needed.",
    type: "disease_outbreak",
    severity: "high",
    affectedAreas: ["Ward 1", "Ward 3"],
    createdDate: "2024-01-15",
    status: "active",
    createdBy: "Dr. Rajesh Kumar",
  },
  {
    id: "A002",
    title: "Water Contamination - Hand Pump",
    description: "Bacteria detected in school hand pump water. Alternative water source arranged.",
    type: "water_quality",
    severity: "critical",
    affectedAreas: ["Ward 2"],
    createdDate: "2024-01-13",
    status: "resolved",
    createdBy: "Dr. Rajesh Kumar",
  },
  {
    id: "A003",
    title: "Health Camp Request - Remote Village",
    description: "Request for mobile health camp in remote village due to transportation issues.",
    type: "health_camp",
    severity: "medium",
    affectedAreas: ["Remote Village A"],
    createdDate: "2024-01-12",
    status: "pending",
    createdBy: "Community Health Worker",
  },
]

export function AlertsTab() {
  const { t } = useLanguage()
  const [showCreateAlert, setShowCreateAlert] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    severity: "",
    affectedAreas: "",
    actionRequired: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(t("alertCreatedSuccessfully"))
    setFormData({
      title: "",
      description: "",
      type: "",
      severity: "",
      affectedAreas: "",
      actionRequired: "",
    })
    setShowCreateAlert(false)
  }

  const handleRequestHealthCamp = () => {
    alert(t("healthCampRequestSubmitted"))
  }

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
      case "pending":
        return "default"
      case "resolved":
        return "default"
      default:
        return "secondary"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "disease_outbreak":
        return <AlertTriangle className="w-4 h-4" />
      case "water_quality":
        return <AlertTriangle className="w-4 h-4" />
      case "health_camp":
        return <Stethoscope className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Alert Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{t("createNewAlert")}</h3>
                <p className="text-sm text-muted-foreground">{t("reportHealthEmergencies")}</p>
              </div>
              <Dialog open={showCreateAlert} onOpenChange={setShowCreateAlert}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    {t("createAlert")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{t("createNewHealthAlert")}</DialogTitle>
                    <DialogDescription>{t("reportHealthEmergencyDescription")}</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">{t("alertTitle")} *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder={t("briefTitlePlaceholder")}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">{t("alertType")} *</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectAlertType")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="disease_outbreak">{t("diseaseOutbreak")}</SelectItem>
                            <SelectItem value="water_quality">{t("waterQualityIssue")}</SelectItem>
                            <SelectItem value="health_camp">{t("healthCampRequest")}</SelectItem>
                            <SelectItem value="medical_emergency">{t("medicalEmergency")}</SelectItem>
                            <SelectItem value="resource_shortage">{t("resourceShortage")}</SelectItem>
                            <SelectItem value="other">{t("other")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="severity">{t("severityLevel")} *</Label>
                        <Select
                          value={formData.severity}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, severity: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t("selectSeverity")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">{t("lowInformationOnly")}</SelectItem>
                            <SelectItem value="medium">{t("mediumAttentionNeeded")}</SelectItem>
                            <SelectItem value="high">{t("highUrgentAction")}</SelectItem>
                            <SelectItem value="critical">{t("criticalEmergencyResponse")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">{t("description")} *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder={t("detailedDescriptionPlaceholder")}
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="affectedAreas">{t("affectedAreas")}</Label>
                      <Input
                        id="affectedAreas"
                        value={formData.affectedAreas}
                        onChange={(e) => setFormData((prev) => ({ ...prev, affectedAreas: e.target.value }))}
                        placeholder={t("affectedAreasPlaceholder")}
                      />
                    </div>

                    <div>
                      <Label htmlFor="actionRequired">{t("actionRequired")}</Label>
                      <Textarea
                        id="actionRequired"
                        value={formData.actionRequired}
                        onChange={(e) => setFormData((prev) => ({ ...prev, actionRequired: e.target.value }))}
                        placeholder={t("actionRequiredPlaceholder")}
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1">
                        {t("createAlert")}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowCreateAlert(false)}>
                        {t("cancel")}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{t("requestHealthCamp")}</h3>
                <p className="text-sm text-muted-foreground">{t("requestMobileHealthCamp")}</p>
              </div>
              <Button variant="outline" onClick={handleRequestHealthCamp} className="gap-2 bg-transparent">
                <Plus className="w-4 h-4" />
                {t("requestCamp")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            {t("healthAlertsNotifications")}
          </CardTitle>
          <CardDescription>{t("currentHealthAlertsDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {existingAlerts.map((alert) => (
              <Card key={alert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          alert.severity === "critical"
                            ? "bg-red-100"
                            : alert.severity === "high"
                              ? "bg-orange-100"
                              : "bg-blue-100"
                        }`}
                      >
                        {getTypeIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{alert.title}</h4>
                          <Badge variant="outline">{alert.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {alert.createdDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {alert.affectedAreas.join(", ")}
                          </div>
                          <span>
                            {t("createdBy")} {alert.createdBy}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant={getSeverityColor(alert.severity) as any}>{alert.severity}</Badge>
                      <Badge variant={getStatusColor(alert.status) as any}>{alert.status}</Badge>
                    </div>
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
