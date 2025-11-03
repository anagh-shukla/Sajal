"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const alertsData = [
  {
    id: "A001",
    title: "Dengue Outbreak - Guwahati",
    description: "15 confirmed dengue cases reported in Guwahati area. Immediate vector control required.",
    type: "disease_outbreak",
    severity: "critical",
    status: "active",
    location: "Guwahati, Kamrup",
    reportedBy: "Dr. Rajesh Kumar",
    reportedDate: "2024-01-15",
    actionTaken: "Vector control team deployed, public awareness campaign initiated",
    affectedPopulation: 12000,
  },
  {
    id: "A002",
    title: "Water Contamination Alert",
    description: "Bacteria detected in multiple water sources in Barpeta district.",
    type: "water_quality",
    severity: "high",
    status: "in_progress",
    location: "Barpeta, Barpeta",
    reportedBy: "Dr. Priya Nath",
    reportedDate: "2024-01-13",
    actionTaken: "Water testing increased, alternative sources identified",
    affectedPopulation: 8500,
  },
  {
    id: "A003",
    title: "Health Camp Request - Remote Village",
    description: "Urgent request for mobile health camp in remote village due to accessibility issues.",
    type: "health_camp",
    severity: "medium",
    status: "approved",
    location: "Remote Village, Jorhat",
    reportedBy: "Community Health Worker",
    reportedDate: "2024-01-12",
    actionTaken: "Mobile health camp scheduled for next week",
    affectedPopulation: 1200,
  },
  {
    id: "A004",
    title: "Medical Supply Shortage",
    description: "Critical shortage of essential medicines in district hospital.",
    type: "resource_shortage",
    severity: "high",
    status: "resolved",
    location: "District Hospital, Silchar",
    reportedBy: "Dr. Amit Sharma",
    reportedDate: "2024-01-10",
    actionTaken: "Emergency supply arranged, procurement process expedited",
    affectedPopulation: 25000,
  },
]

export function AlertsManagementTab() {
  const { t } = useLanguage()
  const [selectedAlert, setSelectedAlert] = useState<(typeof alertsData)[0] | null>(null)
  const [showPlanIntervention, setShowPlanIntervention] = useState(false)
  const [filters, setFilters] = useState({
    status: "all",
    severity: "all",
    type: "all",
    searchTerm: "",
  })
  const [interventionPlan, setInterventionPlan] = useState({
    title: "",
    description: "",
    resources: "",
    timeline: "",
    responsible: "",
  })

  const filteredAlerts = alertsData.filter((alert) => {
    const matchesStatus = filters.status === "all" || alert.status === filters.status
    const matchesSeverity = filters.severity === "all" || alert.severity === filters.severity
    const matchesType = filters.type === "all" || alert.type === filters.type
    const matchesSearch =
      !filters.searchTerm ||
      alert.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(filters.searchTerm.toLowerCase())

    return matchesStatus && matchesSeverity && matchesType && matchesSearch
  })

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
      case "in_progress":
        return "default"
      case "approved":
        return "default"
      case "resolved":
        return "default"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="w-4 h-4" />
      case "in_progress":
        return <Clock className="w-4 h-4" />
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const handlePlanIntervention = () => {
    alert(t("interventionPlanCreated"))
    setInterventionPlan({
      title: "",
      description: "",
      resources: "",
      timeline: "",
      responsible: "",
    })
    setShowPlanIntervention(false)
  }

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("criticalAlerts")}</p>
                <p className="text-2xl font-bold text-red-600">
                  {alertsData.filter((alert) => alert.severity === "critical").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("inProgress")}</p>
                <p className="text-2xl font-bold text-orange-600">
                  {alertsData.filter((alert) => alert.status === "in_progress").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("resolved")}</p>
                <p className="text-2xl font-bold text-green-600">
                  {alertsData.filter((alert) => alert.status === "resolved").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("totalAlerts")}</p>
                <p className="text-2xl font-bold text-blue-600">{alertsData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t("search")}</label>
              <input
                type="text"
                placeholder={t("searchAlerts")}
                className="w-full px-3 py-2 border rounded-md"
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("status")}</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">{t("allStatus")}</option>
                <option value="active">{t("active")}</option>
                <option value="in_progress">{t("inProgress")}</option>
                <option value="approved">{t("approved")}</option>
                <option value="resolved">{t("resolved")}</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("severity")}</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={filters.severity}
                onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
              >
                <option value="all">{t("allSeverity")}</option>
                <option value="critical">{t("critical")}</option>
                <option value="high">{t("high")}</option>
                <option value="medium">{t("medium")}</option>
                <option value="low">{t("low")}</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t("type")}</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">{t("allTypes")}</option>
                <option value="disease_outbreak">{t("diseaseOutbreak")}</option>
                <option value="water_quality">{t("waterQuality")}</option>
                <option value="health_camp">{t("healthCamp")}</option>
                <option value="resource_shortage">{t("resourceShortage")}</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {t("activeAlerts")} ({filteredAlerts.length})
          </h3>
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`cursor-pointer transition-colors ${
                selectedAlert?.id === alert.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedAlert(alert)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(alert.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === "critical"
                          ? "bg-red-100 text-red-800"
                          : alert.severity === "high"
                            ? "bg-orange-100 text-orange-800"
                            : alert.severity === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {t(alert.severity).toUpperCase()}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.status === "active"
                        ? "bg-red-100 text-red-800"
                        : alert.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : alert.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {t(alert.status.replace("_", "")).toUpperCase()}
                  </span>
                </div>
                <h4 className="font-semibold text-sm mb-2">{alert.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{alert.location}</span>
                  <span>{alert.reportedDate}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alert Details */}
        <div>
          {selectedAlert ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{t("alertDetails")}</h3>
                  <button
                    onClick={() => setShowPlanIntervention(true)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
                  >
                    {t("planIntervention")}
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t("alertId")}</label>
                    <p className="font-medium">{selectedAlert.id}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t("alertTitle")}</label>
                    <p className="font-medium">{selectedAlert.title}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t("alertDescription")}</label>
                    <p>{selectedAlert.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t("severityLevel")}</label>
                      <p className="font-medium">{t(selectedAlert.severity)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t("status")}</label>
                      <p className="font-medium">{t(selectedAlert.status.replace("_", ""))}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t("location")}</label>
                    <p className="font-medium">{selectedAlert.location}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t("reportedBy")}</label>
                    <p className="font-medium">{selectedAlert.reportedBy}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t("reportedDate")}</label>
                    <p className="font-medium">{selectedAlert.reportedDate}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t("affectedPopulation")}</label>
                    <p className="font-medium">
                      {selectedAlert.affectedPopulation.toLocaleString()} {t("people")}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t("actionTaken")}</label>
                    <p>{selectedAlert.actionTaken}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t("selectAlertToView")}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Plan Intervention Modal */}
      {showPlanIntervention && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t("planIntervention")}</h3>
                <button
                  onClick={() => setShowPlanIntervention(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("interventionTitle")}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={interventionPlan.title}
                    onChange={(e) => setInterventionPlan({ ...interventionPlan, title: e.target.value })}
                    placeholder={t("enterInterventionTitle")}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t("alertDescription")}</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md h-24"
                    value={interventionPlan.description}
                    onChange={(e) => setInterventionPlan({ ...interventionPlan, description: e.target.value })}
                    placeholder={t("describeInterventionPlan")}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t("requiredResources")}</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-md h-20"
                    value={interventionPlan.resources}
                    onChange={(e) => setInterventionPlan({ ...interventionPlan, resources: e.target.value })}
                    placeholder={t("listRequiredResources")}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t("timeline")}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={interventionPlan.timeline}
                    onChange={(e) => setInterventionPlan({ ...interventionPlan, timeline: e.target.value })}
                    placeholder={t("expectedTimeline")}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t("responsibleDepartment")}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={interventionPlan.responsible}
                    onChange={(e) => setInterventionPlan({ ...interventionPlan, responsible: e.target.value })}
                    placeholder={t("whoWillBeResponsible")}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handlePlanIntervention}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    {t("createInterventionPlan")}
                  </button>
                  <button
                    onClick={() => setShowPlanIntervention(false)}
                    className="px-4 py-2 border rounded-md hover:bg-muted"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
