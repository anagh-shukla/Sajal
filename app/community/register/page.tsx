"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, Users, Phone, Mail } from "lucide-react"

const states = [
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
]

export default function CommunityRegister() {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    district: "",
    tehsil: "",
    gram: "",
    mobile: "",
    email: "",
    otp: "",
  })
  const [step, setStep] = useState(1)
  const [otpSent, setOtpSent] = useState(false)
  const { t } = useLanguage()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSendOTP = () => {
    if (formData.mobile || formData.email) {
      setOtpSent(true)
      alert(t("otpSentSuccess"))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      // Mock registration completion
      window.location.href = "/community/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6">
        <Button variant="ghost" onClick={() => (window.location.href = "/role-selection")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t("back")}
        </Button>
        <LanguageSelector />
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">{t("communityUserRegistration")}</h1>
          <p className="text-muted-foreground">{t("joinHealthNetwork")}</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{step === 1 ? t("personalLocationDetails") : t("contactVerification")}</CardTitle>
            <CardDescription>{step === 1 ? t("providePersonalInfo") : t("verifyContactOTP")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                <>
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">{t("fullName")} *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder={t("enterFullName")}
                        required
                      />
                    </div>

                    {/* Location Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">{t("state")} *</Label>
                        <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
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
                      </div>

                      <div>
                        <Label htmlFor="district">{t("district")} *</Label>
                        <Input
                          id="district"
                          value={formData.district}
                          onChange={(e) => handleInputChange("district", e.target.value)}
                          placeholder={t("enterDistrict")}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="tehsil">{t("tehsil")} *</Label>
                        <Input
                          id="tehsil"
                          value={formData.tehsil}
                          onChange={(e) => handleInputChange("tehsil", e.target.value)}
                          placeholder={t("enterTehsil")}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="gram">{t("gramVillage")} *</Label>
                        <Input
                          id="gram"
                          value={formData.gram}
                          onChange={(e) => handleInputChange("gram", e.target.value)}
                          placeholder={t("enterGramVillage")}
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="mobile">{t("mobileNumber")}</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="mobile"
                            value={formData.mobile}
                            onChange={(e) => handleInputChange("mobile", e.target.value)}
                            placeholder="+91 XXXXX XXXXX"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">{t("emailAddress")}</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your@email.com"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* OTP Verification */}
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {t("otpSentTo")} {formData.mobile || formData.email}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="otp">{t("enterOTP")} *</Label>
                      <Input
                        id="otp"
                        value={formData.otp}
                        onChange={(e) => handleInputChange("otp", e.target.value)}
                        placeholder={t("enter6DigitOTP")}
                        maxLength={6}
                        required
                      />
                    </div>

                    <Button type="button" variant="outline" onClick={handleSendOTP} className="w-full bg-transparent">
                      {t("resendOTP")}
                    </Button>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" size="lg">
                {step === 1 ? t("continue") : t("completeRegistration")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
