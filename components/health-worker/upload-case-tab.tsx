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
import { Camera, Upload } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const commonSymptoms = [
  "Fever",
  "Cough",
  "Headache",
  "Body ache",
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Skin rash",
  "Difficulty breathing",
  "Fatigue",
  "Chest pain",
  "Abdominal pain",
]

export function UploadCaseTab() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    symptoms: [] as string[],
    otherSymptoms: "",
    location: "",
    useGPS: false,
    notes: "",
    priority: "",
    photo: null as File | null,
  })

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
    alert(t("newCaseUploadedSuccessfully"))
    // Reset form
    setFormData({
      name: "",
      age: "",
      gender: "",
      contact: "",
      symptoms: [],
      otherSymptoms: "",
      location: "",
      useGPS: false,
      notes: "",
      priority: "",
      photo: null,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            {t("uploadNewCase")}
          </CardTitle>
          <CardDescription>{t("addNewHealthCase")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("patientInformation")}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t("patientName")} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder={t("enterPatientFullName")}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact">{t("contactNumber")}</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">{t("age")} *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                    placeholder={t("enterAge")}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">{t("gender")} *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger>
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
            </div>

            {/* Symptoms */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("symptomsDiagnosis")}</h3>

              <div>
                <Label>{t("selectSymptoms")} *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {commonSymptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <Checkbox
                        id={symptom}
                        checked={formData.symptoms.includes(symptom)}
                        onCheckedChange={() => handleSymptomToggle(symptom)}
                      />
                      <Label htmlFor={symptom} className="text-sm">
                        {t(symptom.toLowerCase().replace(/\s+/g, ""))}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="otherSymptoms">{t("otherSymptoms")}</Label>
                <Textarea
                  id="otherSymptoms"
                  value={formData.otherSymptoms}
                  onChange={(e) => setFormData((prev) => ({ ...prev, otherSymptoms: e.target.value }))}
                  placeholder={t("describeOtherSymptoms")}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="priority">{t("priorityLevel")} *</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectPriorityLevel")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t("lowMildSymptoms")}</SelectItem>
                    <SelectItem value="medium">{t("mediumModerateSymptoms")}</SelectItem>
                    <SelectItem value="high">{t("highSevereSymptoms")}</SelectItem>
                    <SelectItem value="critical">{t("criticalEmergency")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("locationInformation")}</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="useGPS"
                    checked={formData.useGPS}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, useGPS: checked as boolean }))}
                  />
                  <Label htmlFor="useGPS" className="text-sm">
                    {t("useCurrentGPSLocation")}
                  </Label>
                </div>
                {!formData.useGPS && (
                  <div>
                    <Label htmlFor="location">{t("locationDetails")}</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder={t("enterSpecificLocation")}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("additionalInformation")}</h3>

              <div>
                <Label htmlFor="notes">{t("clinicalNotes")}</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder={t("addClinicalObservations")}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="photo">{t("uploadPhotoOptional")}</Label>
                <div className="mt-2">
                  <Button type="button" variant="outline" className="gap-2 bg-transparent">
                    <Camera className="w-4 h-4" />
                    {t("takePhotoUploadImage")}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">{t("uploadPhotosDescription")}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" size="lg">
                {t("uploadCase")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  setFormData({
                    name: "",
                    age: "",
                    gender: "",
                    contact: "",
                    symptoms: [],
                    otherSymptoms: "",
                    location: "",
                    useGPS: false,
                    notes: "",
                    priority: "",
                    photo: null,
                  })
                }}
              >
                {t("clearForm")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
