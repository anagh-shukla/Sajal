"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"

export type Language = {
  code: string
  name: string
  nativeName: string
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const globalTranslationCache = new Map<string, Record<string, string>>()

const loadTranslations = async (languageCode: string): Promise<Record<string, string>> => {
  try {
    console.log("[v0] Loading translations for:", languageCode)

    // Use a switch statement for more reliable dynamic imports
    let translationModule
    switch (languageCode) {
      case "en":
        translationModule = await import("../translations/en.json")
        break
      case "hi":
        translationModule = await import("../translations/hi.json")
        break
      case "bn":
        translationModule = await import("../translations/bn.json")
        break
      case "te":
        translationModule = await import("../translations/te.json")
        break
      case "mr":
        translationModule = await import("../translations/mr.json")
        break
      case "ta":
        translationModule = await import("../translations/ta.json")
        break
      case "gu":
        translationModule = await import("../translations/gu.json")
        break
      case "ur":
        translationModule = await import("../translations/ur.json")
        break
      case "kn":
        translationModule = await import("../translations/kn.json")
        break
      case "or":
        translationModule = await import("../translations/or.json")
        break
      case "pa":
        translationModule = await import("../translations/pa.json")
        break
      case "ml":
        translationModule = await import("../translations/ml.json")
        break
      default:
        // Fallback to English
        translationModule = await import("../translations/en.json")
    }

    console.log("[v0] Successfully loaded translations:", Object.keys(translationModule.default).length, "keys")
    return translationModule.default
  } catch (error) {
    console.error("[v0] Error loading translations for", languageCode, ":", error)
    // Fallback to English
    try {
      const fallbackModule = await import("../translations/en.json")
      console.log("[v0] Loaded fallback English translations")
      return fallbackModule.default
    } catch (fallbackError) {
      console.error("[v0] Error loading fallback translations:", fallbackError)
      return {}
    }
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("selectedLanguage")
      if (savedLanguage) {
        const language = languages.find((lang) => lang.code === savedLanguage)
        if (language) {
          return language
        }
      }
    }
    return languages[0] // Default to English
  })

  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadLanguageTranslations = async () => {
      if (globalTranslationCache.has(currentLanguage.code)) {
        const cachedTranslations = globalTranslationCache.get(currentLanguage.code)!
        console.log(
          "[v0] Using cached translations for:",
          currentLanguage.code,
          "with",
          Object.keys(cachedTranslations).length,
          "keys",
        )
        setTranslations(cachedTranslations)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      console.log("[v0] Loading translations for language:", currentLanguage.code)

      const translationData = await loadTranslations(currentLanguage.code)
      globalTranslationCache.set(currentLanguage.code, translationData)
      setTranslations(translationData)
      setIsLoading(false)

      console.log("[v0] Translation loading complete. Available keys:", Object.keys(translationData))
    }

    loadLanguageTranslations()
  }, [currentLanguage])

  const setLanguage = useCallback((language: Language) => {
    console.log("[v0] Setting language to:", language.code)
    setCurrentLanguage(language)
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLanguage", language.code)
      // Update HTML lang attribute
      document.documentElement.lang = language.code
    }
  }, [])

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key]
      if (!translation) {
        console.warn("[v0] Missing translation for key:", key, "in language:", currentLanguage.code)
        return key
      }
      return translation
    },
    [translations, currentLanguage.code],
  )

  const contextValue = useMemo(
    () => ({
      currentLanguage,
      setLanguage,
      t,
    }),
    [currentLanguage, setLanguage, t],
  )

  if (isLoading) {
    return <div>Loading translations...</div>
  }

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
