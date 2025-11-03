"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Camera, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ReportSymptomsTab() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    symptoms: [] as string[],
    otherSymptoms: "",
    location: "",
    useGPS: false,
    photo: null as File | null,
  })

  const commonSymptoms = [
    { key: "fever", label: t("fever") },
    { key: "cough", label: t("cough") },
    { key: "headache", label: t("headache") },
    { key: "bodyAche", label: t("bodyAche") },
    { key: "nausea", label: t("nausea") },
    { key: "vomiting", label: t("vomiting") },
    { key: "diarrhea", label: t("diarrhea") },
    { key: "skinRash", label: t("skinRash") },
    { key: "difficultyBreathing", label: t("difficultyBreathing") },
    { key: "fatigue", label: t("fatigue") },
  ]

  const handleSymptomToggle = (symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Symptom report submitted successfully!")
  }

  return (
    <div className="space-y-12">
      {/* Recent Reports */}
      <Card className="shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-lg tracking-tight">
            <Calendar className="w-4 h-4" />
            {t("recentReports")}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed mt-2 tracking-wide">
            {t("recentSymptomsReports")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm leading-tight tracking-wide">
                  {t("fever")}, {t("headache")}
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed tracking-wide">
                  {t("submittedDaysAgo")}
                </p>
              </div>
              <Badge variant="secondary" className="ml-4 py-1 px-3 tracking-wide">
                {t("underReview")}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm leading-tight tracking-wide">
                  {t("cough")}, {t("bodyAche")}
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed tracking-wide">
                  {t("submittedWeekAgo")}
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 ml-4 py-1 px-3 tracking-wide">{t("reviewed")}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Report Form */}
      <Card className="shadow-sm">
        <CardHeader className="pb-8">
          <CardTitle className="text-xl leading-tight tracking-tight">{t("reportNewSymptoms")}</CardTitle>
          <CardDescription className="text-base leading-relaxed mt-3 tracking-wide">
            {t("helpMonitorCommunityHealth")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <Label htmlFor="age" className="text-base font-medium tracking-wide">
                  {t("age")} *
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                  placeholder={t("enterAge")}
                  className="h-12 tracking-wide"
                  required
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="gender" className="text-base font-medium tracking-wide">
                  {t("gender")} *
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t("selectGender")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t("male")}</SelectItem>
                    <SelectItem value="female">{t("female")}</SelectItem>
                    <SelectItem value="other">{t("other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-8">
              <Label className="text-base font-medium tracking-wide">{t("selectSymptoms")} *</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {commonSymptoms.map((symptom) => (
                  <div
                    key={symptom.key}
                    className="flex items-center space-x-5 p-5 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={symptom.key}
                      checked={formData.symptoms.includes(symptom.key)}
                      onCheckedChange={() => handleSymptomToggle(symptom.key)}
                    />
                    <Label
                      htmlFor={symptom.key}
                      className="text-sm font-medium cursor-pointer flex-1 leading-relaxed tracking-wide"
                    >
                      {symptom.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="otherSymptoms" className="text-base font-medium tracking-wide">
                {t("otherSymptoms")}
              </Label>
              <Textarea
                id="otherSymptoms"
                value={formData.otherSymptoms}
                onChange={(e) => setFormData((prev) => ({ ...prev, otherSymptoms: e.target.value }))}
                placeholder={t("describeOtherSymptoms")}
                rows={4}
                className="resize-none leading-relaxed tracking-wide"
              />
            </div>

            <div className="space-y-6">
              <Label htmlFor="location" className="text-base font-medium tracking-wide">
                {t("location")}
              </Label>
              <div className="space-y-6">
                <div className="flex items-center space-x-5 p-5 rounded-lg border">
                  <Checkbox
                    id="useGPS"
                    checked={formData.useGPS}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, useGPS: checked as boolean }))}
                  />
                  <Label htmlFor="useGPS" className="text-sm font-medium cursor-pointer leading-relaxed tracking-wide">
                    {t("useCurrentGPS")}
                  </Label>
                </div>
                {!formData.useGPS && (
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder={t("enterLocationManually")}
                    className="h-12 tracking-wide"
                  />
                )}
              </div>
            </div>

            <div className="space-y-6">
              <Label htmlFor="photo" className="text-base font-medium tracking-wide">
                {t("uploadPhoto")}
              </Label>
              <div className="space-y-4">
                <Button type="button" variant="outline" className="gap-4 h-12 bg-transparent tracking-wide">
                  <Camera className="w-4 h-4" />
                  {t("takePhotoUpload")}
                </Button>
                <p className="text-sm text-muted-foreground leading-relaxed tracking-wide">{t("uploadPhotoDesc")}</p>
              </div>
            </div>

            <Button type="submit" className="w-full h-14 text-base font-medium tracking-wide" size="lg">
              {t("submitReport")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
