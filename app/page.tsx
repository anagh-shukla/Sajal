"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Shield, Users, ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <ThemeToggle />
        <LanguageSelector />
      </div>

      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="absolute inset-0 opacity-25">
          <img
            src="/diverse-indian-healthcare-community-with-doctors-n.jpg"
            alt="Community Health Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg p-4">
                <img src="/sajal-logo.jpg" alt="SAJAL Logo" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Shield className="w-3 h-3 text-success-foreground" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance leading-tight tracking-wide">
            {t("appName")}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-16 text-pretty max-w-3xl mx-auto leading-relaxed tracking-normal">
            {t("tagline")}
          </p>

          <div className="flex justify-center items-center gap-12 md:gap-20 mb-16">
            <div className="flex flex-col items-center gap-3">
              <Users className="w-10 h-10 text-blue" />
              <span className="text-sm font-medium text-muted-foreground text-center leading-tight tracking-wide">
                {t("community")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Heart className="w-10 h-10 text-red" />
              <span className="text-sm font-medium text-muted-foreground text-center leading-tight tracking-wide">
                {t("health")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Shield className="w-10 h-10 text-green" />
              <span className="text-sm font-medium text-muted-foreground text-center leading-tight tracking-wide">
                {t("safety")}
              </span>
            </div>
          </div>

          <div className="flex justify-center mb-12">
            <Button
              size="lg"
              className="text-lg py-6 px-16 group bg-gradient-vibrant hover:opacity-90 transition-all duration-300 text-white font-semibold tracking-wide"
              onClick={() => (window.location.href = "/role-selection")}
            >
              {t("getStarted")}
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-lg mx-auto tracking-normal">
            {t("empoweringCommunities")}
          </p>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div
            className={`grid md:grid-cols-3 gap-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-10 text-center hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue hover:border-l-blue/80">
              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                <img
                  src="/indian-community-members-using-mobile-phones-to-re.jpg"
                  alt="Community Health Reporting"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-blue mb-6 text-xl leading-tight tracking-wide">
                {t("communityReporting")}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed tracking-normal">
                {t("communityReportingDesc")}
              </p>
            </Card>

            <Card className="p-10 text-center hover:shadow-lg transition-all duration-300 border-l-4 border-l-green hover:border-l-green/80">
              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                <img
                  src="/indian-female-health-worker-in-uniform-using-digit.jpg"
                  alt="Health Worker Tools"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-green mb-6 text-xl leading-tight tracking-wide">
                {t("healthWorkerTools")}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed tracking-normal">
                {t("healthWorkerToolsDesc")}
              </p>
            </Card>

            <Card className="p-10 text-center hover:shadow-lg transition-all duration-300 border-l-4 border-l-red hover:border-l-red/80">
              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                <img
                  src="/indian-government-officials-viewing-comprehensive-.jpg"
                  alt="Government Dashboard"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-red mb-6 text-xl leading-tight tracking-wide">
                {t("governmentOversight")}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed tracking-normal">
                {t("governmentOversightDesc")}
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* SAJAL in Action Section */}
      <div className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div
            className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center leading-tight tracking-wide">
                {t("sajalInAction")}
              </h2>
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/indian-health-workers-conducting-village-health-ch.jpg"
                    alt="Community Health Workers"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6 bg-background border-l-4 border-l-green">
                    <h3 className="font-semibold text-green mb-3 text-lg leading-tight tracking-wide">
                      {t("communityOutreach")}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed tracking-normal">
                      {t("communityOutreachDesc")}
                    </p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/indian-healthcare-professionals-analyzing-digital-.jpg"
                    alt="Data Analysis"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6 bg-background border-l-4 border-l-blue">
                    <h3 className="font-semibold text-blue mb-3 text-lg leading-tight tracking-wide">
                      {t("dataDrivenDecisions")}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed tracking-normal">
                      {t("dataDrivenDecisionsDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Card className="p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 leading-tight tracking-wide">
                {t("makingHealthcareAccessible")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="p-8 rounded-lg bg-blue/10 border border-blue/20 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue mb-3 leading-none tracking-wide">24/7</div>
                  <div className="text-sm text-muted-foreground leading-relaxed tracking-normal">
                    {t("healthMonitoring")}
                  </div>
                </div>
                <div className="p-8 rounded-lg bg-green/10 border border-green/20 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-green mb-3 leading-none tracking-wide">100+</div>
                  <div className="text-sm text-muted-foreground leading-relaxed tracking-normal">
                    {t("communitiesServed")}
                  </div>
                </div>
                <div className="p-8 rounded-lg bg-red/10 border border-red/20 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-red mb-3 leading-none tracking-wide">500+</div>
                  <div className="text-sm text-muted-foreground leading-relaxed tracking-normal">
                    {t("healthWorkers")}
                  </div>
                </div>
                <div className="p-8 rounded-lg bg-orange/10 border border-orange/20 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-orange mb-3 leading-none tracking-wide">50+</div>
                  <div className="text-sm text-muted-foreground leading-relaxed tracking-normal">
                    {t("governmentPartners")}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
